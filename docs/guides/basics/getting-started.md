# 入门指南

在本节中，我们将构建最简单的 PixiJS 应用程序。通过这样做，我们将介绍构建和提供代码的基础知识。

### 高级用户

一个快速提示在开始之前：本指南面向刚开始使用 PixiJS 的开发者，他们对于使用基于 JavaScript 的应用程序开发的经验有限。如果你是一位编程专家，可能会发现这里的细节不够详细。如果是这种情况，你可以快速浏览本指南，然后转向像 webpack 和 npm 这样的 [如何使用 PixiJS 和打包工具](#TODO)。


### 关于 JavaScript 的说明

最后一点。JavaScript 的世界目前正在从传统的 JavaScript（ES5）过渡到较新的 ES6 风格：

```javascript
// ES5
var x = 5;
setTimeout(function() { alert(x); }, 1000);
// ES6
const x = 5;
setTimeout(() => alert(x), 1000);
```

ES6 带来了许多重要优势，包括更清晰的语法、更好的变量作用域、原生类支持等等。目前，所有主流浏览器都支持 ES6。基于此，我们在这些指南中将使用 ES6。但这并不意味着您不能在 ES5 程序中使用 PixiJS！只需在心中用 "var" 替换为 "let/const"，扩展较短的函数传递语法，一切都会正常运行。

### PixiJS 应用程序的组成部分

好的！现在让我们开始吧。编写 PixiJS 应用程序只需要几个简单的步骤：

* 创建一个 HTML 文件
* 使用 web 服务器提供文件
* 加载 PixiJS 库
* 创建一个 [应用程序](https://pixijs.download/release/docs/PIXI.Application.html)
* 将生成的视图添加到 DOM 中
* 添加一个图像到舞台
* 编写一个更新循环

让我们一起逐步完成这些步骤。


### HTML文件

PixiJS是一个在网页中运行的JavaScript库。因此，我们首先需要在一个文件中编写一些HTML代码。在真实的PixiJS应用中，您可能希望将显示区域嵌入到一个复杂的现有页面中，或者您可能希望显示区域填充整个页面。对于这个演示，我们将从一个空白页面开始构建：

```html
<!doctype html>
<html>
  <head>
  </head>
  <body>
    <h1>Hello PixiJS</h1>
  </body>
</html>
```

创建一个名为 `pixi-test` 的新文件夹，然后将这段HTML代码复制并粘贴到 `pixi-test` 文件夹中的一个名为 `index.html` 的新文件中。

### 启动文件服务器

要在本地开发PixiJS应用程序，您需要运行一个Web服务器。Web浏览器会阻止在本地加载的网页中加载本地文件（例如图片和音频文件）。如果您只是双击打开新的HTML文件，当您尝试将精灵添加到PixiJS舞台时，会出现错误。

听起来运行一个Web服务器可能复杂且困难，但实际上有许多简单的Web服务器可以满足这个需求。在本指南中，我们将使用[Mongoose](https://mongoose.ws)，但您也可以轻松地使用[XAMPP](https://www.apachefriends.org/download.html)或[http-server Node.js包](https://www.npmjs.com/package/http-server)来提供文件服务。

首先，您需要前往[Mongoose下载页面](https://mongoose.ws)下载适用于您的操作系统的免费服务器。Mongoose默认会在其运行的文件夹中提供文件服务，因此将下载的可执行文件复制到您在前面步骤（`pixi-test`）中创建的文件夹中。然后，双击可执行文件，告诉您的操作系统您信任该文件运行，这样您就会拥有一个正在运行的Web服务器，可以为您的新文件夹提供文件服务。

通过打开您喜欢的浏览器，并在地址栏中输入`http://127.0.0.1:8080`来测试是否一切正常。（Mongoose默认在8080端口提供文件服务。）您应该会看到“Hello PixiJS”，而且除此之外什么都没有。如果在这一步出现错误，这意味着您的文件名不是`index.html`，或者您配置了错误的Web服务器。

### 加载PixiJS

好的，现在我们有了一个网页，并且正在提供文件服务。但是页面还是空的。下一步是实际加载PixiJS库。如果我们正在构建一个真正的应用程序，我们会从[Pixi Github仓库](https://github.com/pixijs/pixijs)下载目标版本的PixiJS，以确保我们的版本不会改变。但是对于这个示例应用程序，我们将使用PixiJS的CDN版本。将下面这行代码添加到您的`index.html`文件的`<head>`部分：


```html
<script src="https://pixijs.download/release/pixi.js"></script>
```

这将在页面加载时包含最新版本的PixiJS的*非压缩*版本，可以立即使用。在开发中，我们使用非压缩版本。在生产环境中，您应该使用`pixi.min.js`，它经过压缩以实现更快的下载速度，并排除了在构建项目时可能有用的断言和弃用警告，但下载和运行时间会更长。

### 创建一个应用程序

加载库并不会带来太多好处，如果我们不*使用*它，所以下一步是启动PixiJS。从以下代码中替换`<h1>Hello PixiJS</h1>`行开始：

```html
<script>
  let app = new PIXI.Application({ width: 640, height: 360 });
</script>
```
我们在这里添加了一个JavaScript代码块，在该代码块中创建了一个新的PIXI.Application实例。[Application](https://pixijs.download/release/docs/PIXI.Application.html)是一个辅助类，简化了对PixiJS的操作。它创建了渲染器、创建了舞台(stage)并启动了一个更新的ticker。在生产环境中，您可能希望自行执行这些步骤以进行自定义和控制 - 我们将在后面的指南中进行介绍。目前，Application类是开始使用PixiJS的绝佳方式，无需担心细节。

### 将视图添加到DOM

当PIXI.Application类创建渲染器时，它会构建一个Canvas元素来进行渲染。为了查看我们用PixiJS绘制的内容，我们需要将这个Canvas元素添加到网页的DOM中。在页面的脚本块中追加以下代码行：

```JavaScript
  document.body.appendChild(app.view);
```
这将把应用程序创建的视图（Canvas元素）添加到页面的body中。

### 创建精灵(Sprite)

到目前为止，我们所做的都是准备工作。实际上，我们还没有告诉PixiJS绘制任何东西。让我们通过添加一个要显示的图像来修复这个问题。

在PixiJS中，有许多绘制图像的方法，但最简单的方法是使用[Sprite](https://pixijs.download/release/docs/PIXI.Sprite.html)。我们将在后面的指南中详细介绍场景图(scene graph)的工作原理，但现在你只需要知道PixiJS呈现的是一组[DisplayObjects](https://pixijs.download/release/docs/PIXI.DisplayObject.html)的层级结构。Sprite是一种DisplayObject类型，它包装了一个加载的图像资源，以允许绘制、缩放、旋转等操作。

在PixiJS渲染图像之前，它需要被加载。就像在任何网页中一样，图像加载是异步的。我们将在后面的指南中更详细地讨论资源加载。目前，我们可以使用PIXI.Sprite类上的辅助方法来处理图像加载：


```JavaScript
  // Magically load the PNG asynchronously
  let sprite = PIXI.Sprite.from('sample.png');
```

[在此处下载示例PNG](/images/sample.png)，并将其保存到 `pixi-test` 目录中，与 `index.html` 文件放在一起。

### 将精灵添加到舞台

最后，我们需要将新的精灵添加到舞台上。舞台（Stage）是一个简单的 [Container](https://pixijs.download/release/docs/PIXI.Container.html)，它是场景图的根节点。舞台容器的每个子对象都会在每一帧被渲染。通过将我们的精灵添加到舞台，我们告诉 PixiJS 的渲染器我们想要绘制它。

```JavaScript
  app.stage.addChild(sprite);
```

### 编写更新循环

虽然你可以在 PixiJS 中使用静态内容，但在大多数项目中，你可能会希望添加动画效果。我们的示例应用实际上会以每秒多次的频率渲染相同位置的精灵。要使图像移动，我们只需要在每一帧更新其属性。为此，我们要钩入应用程序的 _ticker_。ticker 是 PixiJS 的一个对象，它在每一帧运行一个或多个回调函数。做到这一点非常简单。将以下代码添加到你的脚本块的末尾：


```javascript
  // Add a variable to count up the seconds our demo has been running
  let elapsed = 0.0;
  // Tell our application's ticker to run a new callback every frame, passing
  // in the amount of time that has passed since the last tick
  app.ticker.add((delta) => {
    // Add the time to our total elapsed time
    elapsed += delta;
    // Update the sprite's X position based on the cosine of our elapsed time.  We divide
    // by 50 to slow the animation down a bit...
    sprite.x = 100.0 + Math.cos(elapsed/50.0) * 100.0;
  });
```

你只需要调用 `app.ticker.add(...)`，将一个回调函数传递给它，并在该函数中更新你的场景。它会在每一帧被调用，你可以在其中实现移动、旋转等，以驱动你项目的动画效果。


### 将所有内容整合在一起

就是这样！这是最简单的PixiJS项目！

以下是将所有代码整合在一处的内容。如果您遇到错误，请检查您的文件确保与以下代码匹配。

```html
<!doctype html>
<html>
  <head>
    <script src="https://pixijs.download/release/pixi.min.js"></script>
  </head>
  <body>
    <script>
      // Create the application helper and add its render target to the page
      let app = new PIXI.Application({ width: 640, height: 360 });
      document.body.appendChild(app.view);

      // Create the sprite and add it to the stage
      let sprite = PIXI.Sprite.from('sample.png');
      app.stage.addChild(sprite);

      // Add a ticker callback to move the sprite back and forth
      let elapsed = 0.0;
      app.ticker.add((delta) => {
        elapsed += delta;
        sprite.x = 100.0 + Math.cos(elapsed/50.0) * 100.0;
      });
    </script>
  </body>
</html>
```

一旦您使一切正常运行，接下来要做的是阅读其他基础指南，深入了解这些内容的更多细节。