# PixiJS指南
## 资源包

资源包是旧的`PIXI.Loader`类的现代替代品。它是一个基于Promise的资源管理解决方案，可以下载、缓存和解析您的资源，使其可供使用。下载可以同时进行并在后台进行，这意味着应用程序启动时间更快；缓存确保您不会重复下载相同的资源；可扩展的解析器系统使您可以轻松扩展和自定义处理过程以满足您的需求。

## 入门指南

在PixiJS 6.x版本中，`@pixi/assets`包不包含在PixiJS中，必须外部添加，但在版本7中将与PixiJS集成。负责所有繁重工作的类名为`AssetsClass`，但您不需要创建自己的实例，因为您可以在`PIXI.Assets`中找到一个可用的实例。该包在很大程度上依赖于现代浏览器都支持的JavaScript Promises，但是，如果您的目标浏览器不支持Promises，您应该考虑[使用polyfill](https://github.com/zloirock/core-js#ecmascript-promise)来支持它们。


## 创建我们的第一个Assets Promise
要快速使用`PIXI.Assets`实例，只需调用`PIXI.Assets.load`并传入一个资源即可。这将返回一个Promise，当解析完成时，将返回您所需的值。
在这个例子中，我们将加载一个纹理，然后将其转换为精灵。

<div class="responsive-4-3"><iframe src="https://pixijs.io/examples/?embed=1&showcode=1#/assets/promise.js"></iframe></div>

在使用`Assets`时需要牢记的一个非常重要的事情是，所有请求都会被缓存，如果URL相同，返回的Promise也将相同。
以代码形式展示：
```js
promise1 = PIXI.Assets.load('bunny.png')
promise2 = PIXI.Assets.load('bunny.png')

//promise1 === promise2
```

开箱即用，以下类型的资源可以在不需要外部插件的情况下加载：

- 纹理（`avif`、`webp`、`png`、`jpg`、`gif`）
- 精灵表（`json`）
- 位图字体（`xml`、`fnt`、`txt`）
- Web字体（`ttf`、`woff`、`woff2`）
- Json文件（`json`）
- 文本文件（`txt`）

通过创建额外的加载器解析器，可以相对容易地添加更多类型的资源。


## 关于已解决的Promise的警告

当下载一个资源时，它会作为一个Promise被缓存在`Assets`实例中，如果您尝试再次下载它，您将获得对已解决的Promise的引用。
然而，Promise处理程序`.then(...)`/`.catch(...)`/`.finally(...)`总是异步的，这意味着即使一个Promise已经解决，`.then(...)`/`.catch(...)`/`.finally(...)`中的代码之后的代码也会在其中的代码之前执行。
看一下这个例子：


```js
console.log(1);
alreadyResolvedPromise.then(() => console.log(2));
console.log(3);

// Console output:
// 1
// 3
// 2
```

要了解更多关于为什么会发生这种情况，您需要学习有关微任务（Microtasks）的知识，然而，使用异步函数应该可以减轻这个问题。

## 使用Async/Await

有一种更直观、更易读的处理Promise的方式：`async`/`await`。

要使用它，我们首先需要创建一个函数或方法，并将其标记为`async`。


```js
async function test() {
    // ...
}
```

这个函数现在将返回值包装在一个 Promise 中，并且允许我们在一个 Promise 前使用 `await` 关键字，以便在 Promise 被解析之前暂停代码的执行，并给我们返回值。

看下面这个例子：

<div class="responsive-4-3"><iframe src="https://pixijs.io/examples/?embed=1&showcode=1#/assets/async.js"></iframe></div>

现在，`texture` 变量不再是一个 Promise，而是在等待该 Promise 解析后得到的已解析纹理。

```js
const texture = await PIXI.Assets.load('examples/assets/bunny.png');
```

这使我们能够编写更易读的代码，避免陷入回调地狱，并且能够更好地思考当我们的程序暂停和产生结果时的情况。

## 加载多个资源

我们可以将资源添加到缓存中，然后通过使用 `PIXI.Assets.add(...)` 并调用带有您想要加载的所有键的 `PIXI.Assets.load(...)` 来同时加载它们。
请参考以下示例：

<div class="responsive-4-3"><iframe src="https://pixijs.io/examples/?embed=1&showcode=1#/assets/multiple.js"></iframe></div>

然而，如果您想充分利用 `@pixi/Assets`，您应该使用 bundles（捆绑包）。
Bundles 只是一种将资源分组的方法，可以通过调用 `PIXI.Assets.addBundle(...)` 或 `PIXI.Assets.loadBundle(...)` 来手动添加。

```js
  PIXI.Assets.addBundle('animals', {
    bunny: 'bunny.png',
    chicken: 'chicken.png',
    thumper: 'thumper.png',
  });

 const assets = await PIXI.Assets.loadBundle('animals');
```

然而，处理 bundles（捆绑包）的最佳方式是使用清单（manifest），并使用该清单（或者更好的是，指向清单的 URL）调用 `PIXI.Assets.init({manifest})`。
将我们的资源分成与应用程序的屏幕或阶段相对应的 bundles 将会非常方便，可以在用户使用应用程序时在后台加载，而不是将用户锁定在单一的庞大加载屏幕中。

```json
{
   "bundles":[
      {
         "name":"load-screen",
         "assets":[
            {
               "name":"background",
               "srcs":"sunset.png"
            },
            {
               "name":"bar",
               "srcs":"load-bar.{png,webp}"
            }
         ]
      },
      {
         "name":"game-screen",
         "assets":[
            {
               "name":"character",
               "srcs":"robot.png"
            },
            {
               "name":"enemy",
               "srcs":"bad-guy.png"
            }
         ]
      }
   ]
}
```
```js
PIXI.Assets.init({manifest: "path/manifest.json"});
```

请注意，**只能调用一次 `init`**。

请记住，重复的 URL 没有任何副作用，因为它们都会被缓存，所以如果您需要在两个 bundles 中使用相同的资源，您可以在没有任何额外成本的情况下复制请求！

## 后台加载

以前加载的方法是在应用程序开始时使用 `PIXI.Loader` 加载所有资源，但现在的用户更加没有耐心，希望立即获取内容，因此实践方法正在转向加载所需的最低限度的内容，以向用户显示一些内容，当他们与内容交互时，我们继续在后台加载接下来的内容。

幸运的是，`@pixi/assets` 为我们提供了一个系统，允许我们在后台加载所有内容，并且在我们立即需要一些资源的情况下，将它们提升到队列的顶部，以便我们可以最小化加载时间。

为了实现这一点，我们有 `PIXI.Assets.backgroundLoad(...)` 和 `PIXI.Assets.backgroundLoadBundle(...)` 方法，它们将被动地开始在后台加载这些资源。因此，当您最终开始加载它们时，您将立即获得一个解析为加载资源的 promise。

当您最终需要这些资源以显示时，您调用通常的 `PIXI.Assets.load(...)` 或 `PIXI.Assets.loadBundle(...)`，然后您将获得相应的 promise。

最好的方法是使用 bundles，参见以下示例：

<div class="responsive-4-3"><iframe src="https://pixijs.io/examples/?embed=1&showcode=1#/assets/bundle.js"></iframe></div>

我们为游戏中的每个屏幕创建一个 bundle，并在应用程序开始时将它们全部设置为开始下载。如果用户在我们的应用程序中的进度足够缓慢，他们应该永远不会在第一个加载屏幕之后再看到加载屏幕！
