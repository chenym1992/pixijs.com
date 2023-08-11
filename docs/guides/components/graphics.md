# 图形（Graphics）

[图形（Graphics）](https://pixijs.download/release/docs/PIXI.Graphics.html) 是 PixiJS 工具箱中一个复杂且常常被误解的工具。初看起来，它似乎是一个绘制形状的工具。确实如此！但它还可以用于生成遮罩。这是如何工作的呢？

在本指南中，我们将揭示 Graphics 对象的奥秘，从如何思考它的功能开始。

请查看[图形示例代码](/examples/graphics/simple)。

## 图形是建造而不是绘制

初次使用 PIXI.Graphics 类的用户通常会对其工作方式感到困惑。让我们看一下下面的代码片段，它创建一个 Graphics 对象并绘制一个矩形：

```javascript
// 创建一个 Graphics 对象，设置填充颜色，绘制一个矩形
let obj = new PIXI.Graphics();
obj.beginFill(0xff0000);
obj.drawRect(0, 0, 200, 100);

// 将它添加到舞台以进行渲染
app.stage.addChild(obj);
```

这段代码可以工作 - 您将在屏幕上得到一个红色的矩形。但当您开始思考它时，它变得相当令人困惑。在*构造*对象时为什么要绘制一个矩形？绘制是一次性的操作吗？矩形如何在*第二*帧绘制？当您创建一个具有许多绘制和绘制调用的 Graphics 对象，然后将其用作*遮罩*时，情况变得更加奇怪。是什么？

问题在于函数名称围绕*绘制*，这是一个将像素放在屏幕上的操作。但尽管如此，Graphics 对象实际上是用于*构建*的。

让我们深入一点看看 `drawRect()` 调用。当您调用 `drawRect()` 时，PixiJS 实际上并不会绘制任何内容。相反，它将您“绘制”的矩形存储到几何列表中以供以后使用。如果随后将 Graphics 对象添加到场景中，渲染器将会来到，要求 Graphics 对象进行渲染。此时，您的矩形实际上会被绘制 - 还有您添加到几何列表中的任何其他形状、线条等。

一旦您理解了正在发生的事情，事情开始变得更加清晰。例如，当您将 Graphics 对象用作遮罩时，遮罩系统将使用几何列表中的图形原语列表来限制哪些像素传递到屏幕上。这里没有涉及绘制。

这就是为什么将 Graphics 类视为几何构建工具，而不是绘图工具。

## 基本图元类型

PIXI.Graphics 类中有很多函数，但是作为一个快速的导向，以下是您可以添加的基本图元的列表：

* 线条（Line）
* 矩形（Rect）
* 圆角矩形（RoundRect）
* 圆圈（Circle）
* 椭圆（Ellipse）
* 弧（Arc）
* 贝塞尔曲线和二次曲线（Bezier and Quadratic Curve）

此外，Graphics Extras 包 (`@pixi/graphics-extras`) 可选择包括以下复杂图元：

* 圆环（Torus）
* 倒角矩形（Chamfer Rect）
* 圆角矩形（Fillet Rect）
* 正多边形（Regular Polygon）
* 星形（Star）
* 圆角多边形（Rounded Polygon）

## 几何列表

每个 Graphics 对象内部都有一个 GraphicsGeometry 对象。[GraphicsGeometry](https://pixijs.download/release/docs/PIXI.GraphicsGeometry.html) 类管理由 Graphics 父对象创建的几何图元列表。在很大程度上，您不会直接使用此对象。拥有者 Graphics 对象会创建并管理它。然

而，在两种相关情况下，您会在列表中*工作*。

首先，您可以在另一个 Graphics 对象中重用几何图元。无论您是一遍又一遍地重新绘制相同的形状，还是一遍又一遍地将其用作遮罩，共享相同的 GraphicsGeometry 都更加高效。您可以像这样做：

```javascript
// 创建一个主要的图形对象
let template = new PIXI.Graphics();
// 添加一个圆圈
template.drawCircle(100, 100, 50);

// 创建 5 个重复对象
for (let i = 0; i < 5; i++) {
  // 使用我们模板的预先构建的几何图元来初始化重复对象
  let duplicate = new PIXI.Graphics(template.geometry);
}
```

这将引导我们到第二种情况，您需要注意底层 GraphicsGeometry 对象 - 避免内存泄漏。因为 Graphics 对象可以共享几何图元，当您不再需要它们时，*必须*调用 `destroy()`。不这样做将阻止其拥有的 GraphicsGeometry 对象被正确地取消引用，并会导致内存泄漏。

## 用于显示的图形

好了，现在我们已经了解了 PIXI.Graphics 类的工作原理，让我们看看如何使用它。Graphics 对象最明显的用途是将动态生成的形状绘制到屏幕上。

这样做很简单。创建对象，调用各种构建函数来添加您的自定义图元，然后将对象添加到场景图中。每一帧，渲染器会前来，要求 Graphics 对象进行渲染，每个图元以及相关的线条和填充样式将被绘制到屏幕上。

## 用作遮罩的图形

您还可以将 Graphics 对象用作复杂的遮罩。为此，像往常一样构建对象和图元。接下来创建一个 PIXI.Container 对象，它将包含被遮罩的内容，并将其 `mask` 属性设置为您的 Graphics 对象。容器的子对象现在将被剪切，只显示在您创建的几何图形内部。此技术适用于 WebGL 和基于 Canvas 的渲染。

请查看[遮罩示例代码](/examples/graphics/simple)。

## 注意事项和陷阱

Graphics 类是一个复杂的实体，因此在使用时需要注意一些事项。

**内存泄漏**：前面已经提到过 - 在不再需要的任何 Graphics 对象上调用 `destroy()`，以避免内存泄漏。

**空洞**：您创建的空洞必须完全包含在形状中，否则可能无法正确地进行三角剖分。<!--TODO: primitive shapes not working on canvas?-->

**更改几何图形**：如果要更改 Graphics 对象的形状，您不需要删除并重新创建它。相反，您可以使用 `clear()` 函数来重置几何图元列表的内容，然后根据需要添加新的图元。在每一帧进行此操作时要小心性能。

**性能**：Graphics 对象通常具有相当好的性能。但是，如果构建高度复杂的几何图形，您可能会超过允许在渲染期间进行批处理的阈值，从而可能对性能产生负面影响。为了进行批处理，最好使用许多 Graphics 对象，而不是一个包含许多形状的单个 Graphics 对象。

**透明度**：由于 Graphics 对象按顺序渲染其图元，因此在使用重叠几何图形时小心使用混合模式或部分透明度。混合模式如 `ADD` 和 `MULTIPLY` 将作用于*每个图元*，而不是最终的复合图像。同样，部分透明的 Graphics 对象将显示重叠的图元。要在单个平坦的表面上应用透明度或混合模式，可以考虑使用 AlphaFilter 或 RenderTexture。

<!--## Baking Into Texture

TODO: Advantages vs disadvantages of pre-rendering to a texture, using render texture: https://jsfiddle.net/bigtimebuddy/6tzyv91j/-->
