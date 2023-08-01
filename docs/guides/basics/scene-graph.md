# 场景图

每一帧，PixiJS都会更新并渲染场景图。让我们讨论一下场景图中包含了什么，以及它如何影响您开发项目。如果您以前构建过游戏，这些内容应该听起来非常熟悉，但如果您来自HTML和DOM，了解这些内容在我们深入研究特定类型的可渲染对象之前是值得的。

## 场景图是一棵树

场景图的根节点是应用程序维护的容器，可以用`app.stage`引用。当您将精灵或其他可渲染对象作为子元素添加到舞台上时，它们将被添加到场景图中，并且会被渲染和响应交互。大多数PixiJS对象也可以有子元素，因此随着您构建更复杂的场景，您将得到一个根为应用程序舞台的父子关系树。

（在探索项目时，一个有用的工具是Chrome中的[Pixi.js devtools插件](https://chrome.google.com/webstore/detail/pixijs-devtools/aamddddknhcagpehecnhphigffljadon)，它允许您实时查看和操作场景图！）

## 父级和子级

当父级移动时，它的子元素也会移动。当父级旋转时，其子元素也会跟随旋转。隐藏父级时，子元素也会被隐藏。如果您有一个由多个精灵组成的游戏对象，您可以将它们收集在一个容器下，将它们作为世界中的单个对象进行移动和旋转。

<!--TODO：验证这一点 - 模糊记得例如对变换的缓存，以避免每帧运行树？-->

每一帧，PixiJS从根节点开始，从上到下遍历整个场景图，计算每个对象的最终位置、旋转、可见性、透明度等。如果父级的透明度设置为0.5（使其透明度为50%），所有子元素的透明度也将从50%开始。如果然后将子元素的透明度设置为0.5，它将不是50%的透明度，而是0.5 x 0.5 = 0.25透明度，即75%的透明度。类似地，对象的位置是相对于其父级的，因此如果父级的x位置设置为50像素，子级的x位置设置为100像素，它将在屏幕上的偏移量为150像素，即50 + 100。

以下是一个示例。我们将创建三个精灵，每个精灵都是上一个精灵的子元素，并通过动画来改变它们的位置、旋转、缩放和透明度。即使每个精灵的属性设置为相同的值，父子链将放大每个更改：

```javascript
// 创建应用程序辅助对象并将其渲染目标添加到页面上
const app = new PIXI.Application({ width: 640, height: 360 });
document.body.appendChild(app.view);

// 添加一个容器来将精灵堆栈居中在页面上
const container = new PIXI.Container();
container.x = app.screen.width / 2;
container.y = app.screen.height / 2;
app.stage.addChild(container);

// 创建3个精灵，每个精灵都是上一个精灵的子元素
const sprites = [];
let parent = container;
for (let i = 0; i < 3; i++) {
  let sprite = PIXI.Sprite.from('assets/images/sample.png');
  sprite.anchor.set(0.5);
  parent.addChild(sprite);
  sprites.push(sprite);
  parent = sprite;
}

// 将所有精灵的属性设置为相同的值，并在一段时间内进行动画
let elapsed = 0.0;
app.ticker.add((delta) => {
  elapsed += delta / 60;
  const amount = Math.sin(elapsed);
  const scale = 1.0 + 0.25 * amount;
  const alpha = 0.75 + 0.25 * amount;
  const angle = 40 * amount;
  const x = 75 * amount;
  for (let i = 0; i < sprites.length; i++) {
    const sprite = sprites[i];
    sprite.scale.set(scale);
    sprite.alpha = alpha;
    sprite.angle = angle;
    sprite.x = x;
  }
});
```

场景图中任何给定节点的累积平移、旋转、缩放和扭曲变换以及透明度值存储在对象的`worldTransform`属性中。同样，累积的alpha值存储在`worldAlpha`属性中。

## 渲染顺序

所以我们有一个绘制对象树的问题。谁会先绘制？

PixiJS 从树的根节点开始自上而下进行渲染。在每个级别上，首先绘制当前对象，然后按照插入顺序依次绘制每个子对象。这意味着第二个子对象将绘制在第一个子对象的上面，第三个子对象将绘制在第二个子对象的上面。

我们来看一个示例，有两个父对象 A 和 D，以及 A 下面有两个子对象 B 和 C：



```javascript
// Create the application helper and add its render target to the page
const app = new PIXI.Application({ width: 640, height: 360 });
document.body.appendChild(app.view);

// Label showing scene graph hierarchy
const label = new PIXI.Text('Scene Graph:\n\napp.stage\n  ┗ A\n     ┗ B\n     ┗ C\n  ┗ D', {fill: '#ffffff'});
label.position = {x: 300, y: 100};
app.stage.addChild(label);

// Helper function to create a block of color with a letter
const letters = [];
function addLetter(letter, parent, color, pos) {
  const bg = new PIXI.Sprite(PIXI.Texture.WHITE);
  bg.width = 100;
  bg.height = 100;
  bg.tint = color;

  const text = new PIXI.Text(letter, {fill: "#ffffff"});
  text.anchor.set(0.5);
  text.position = {x: 50, y: 50};

  const container = new PIXI.Container();
  container.position = pos;
  container.visible = false;
  container.addChild(bg, text);
  parent.addChild(container);

  letters.push(container);
  return container;
}

// Define 4 letters
let a = addLetter('A', app.stage, 0xff0000, {x: 100, y: 100});
let b = addLetter('B', a,         0x00ff00, {x: 20,  y: 20});
let c = addLetter('C', a,         0x0000ff, {x: 20,  y: 40});
let d = addLetter('D', app.stage, 0xff8800, {x: 140, y: 100});

// Display them over time, in order
let elapsed = 0.0;
app.ticker.add((delta) => {
  elapsed += delta / 60.0;
  if (elapsed >= letters.length) { elapsed = 0.0; }
  for (let i = 0; i < letters.length; i ++) {
    letters[i].visible = elapsed >= i;
  }
});
```

如果您想重新排序子对象，可以使用 `setChildIndex()` 方法。要在父对象的列表中的特定位置添加一个子对象，可以使用 `addChildAt()` 方法。最后，您可以通过使用 `sortableChildren` 选项并在每个子对象上设置 `zIndex` 属性来启用对象子元素的自动排序。

## 裁剪

如果你正在构建一个项目，其中大部分的 `DisplayObject` 都在屏幕外面（比如一个横向滚动的游戏），你可能想要对这些对象进行 *裁剪*。裁剪是评估一个对象（或其子对象！）是否在屏幕上的过程，如果不在屏幕上，就将其渲染关闭。如果你不裁剪屏幕外的对象，渲染器仍会绘制它们，即使它们的像素最终不会显示在屏幕上。

PixiJS 并不提供内置的视口裁剪支持，但你可以找到第三方插件来满足你的需求。或者，如果你想要构建自己的裁剪系统，只需在每个 `tick` 运行你的对象，并在任何不需要绘制的对象上将 `renderable` 属性设置为 false。

## 局部坐标与全局坐标

如果你将一个精灵（sprite）添加到舞台（stage），默认情况下它会显示在屏幕的左上角。那是 PixiJS 使用的全局坐标空间的原点。如果所有的对象都是舞台的子对象，那么你只需要关心这个坐标系。但一旦你引入容器和子对象，情况会变得更加复杂。一个位于 [50, 100] 的子对象是相对于其父对象向右 50 个像素，向下 100 个像素。

我们将这两种坐标系统称为“全局坐标”和“局部坐标”。当你使用 `position.set(x, y)` 在一个对象上时，你总是在使用局部坐标，相对于该对象的父对象。

问题是，有很多时候你想要知道一个对象的全局位置。例如，如果你想要裁剪屏幕外的对象以节省渲染时间，你需要知道给定子对象是否在视图矩形之外。

要将局部坐标转换为全局坐标，你可以使用 `toGlobal()` 函数。以下是一个示例用法：

```javascript
// 获取一个对象的全局位置，相对于屏幕左上角
let globalPos = obj.toGlobal(new PIXI.Point(0, 0));
```

这段代码片段将设置 globalPos 变量为子对象的全局坐标，相对于全局坐标系统中的 [0, 0] 点。

## 全局坐标与屏幕坐标

当你的项目与主机操作系统或浏览器交互时，会涉及到第三个坐标系 - "屏幕" 坐标（也称为 "视口" 坐标）。屏幕坐标表示相对于 PixiJS 渲染到的画布元素的左上角的位置。DOM 和原生鼠标点击事件等在屏幕空间中工作。

现在，在很多情况下，屏幕空间等同于世界空间。这是因为画布的大小与创建 PIXI.Application 时指定的渲染视图大小相同。默认情况下，这将成立 - 例如，你创建了一个 800x600 的应用窗口并将其添加到你的 HTML 页面，它将保持这个大小。世界坐标中的 100 个像素将等于屏幕空间中的 100 个像素。但是！通常会将渲染视图拉伸以使其填充屏幕，或者以较低的分辨率进行渲染，并进行高比例缩放以提高速度。在这种情况下，画布元素的屏幕大小会改变（例如通过 CSS），但底层的渲染视图不会改变，从而导致世界坐标与屏幕坐标不匹配。

<!--TODO: 从世界坐标转换到屏幕坐标的最佳方法是什么？-->

