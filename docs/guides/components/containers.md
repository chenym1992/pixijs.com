# 容器（Containers）

[容器（Container）](https://pixijs.download/release/docs/PIXI.Container.html) 类提供了一个简单的显示对象，其功能与其名称暗示的一样 - 将一组子对象收集在一起。但除了分组对象外，容器还有一些用途需要您了解。

## 容器作为分组

几乎每种类型的显示对象都派生自容器 - 即使是精灵（Sprites）！这意味着在许多情况下，您可以创建要渲染的对象的父子层次结构。

然而，最好的做法是**不要**这样做。独立的容器对象非常**廉价**，且具有适当的容器层次结构，每个容器都包含一个或多个可渲染的对象，可以提供灵活性的渲染顺序。这还可以将您的代码未来化，因为当您需要向树的某个分支添加其他对象时，您的动画逻辑不需要更改 - 只需将新对象放入适当的容器中，您的逻辑将容器移动，而无需更改代码。

因此，这是容器的主要用途 - 作为层次结构中的可渲染对象的分组。

请查看[容器示例代码](/examples/basic/container)。

## 遮罩（Masking）

容器对象的另一个常见用途是用作遮罩内容的主机。"遮罩"是一种技术，其中您的场景图的某些部分仅在给定区域内可见。

想象一个弹出窗口。它有一个由一个或多个精灵构成的框架，然后有一个可以滚动的内容区域，该区域在框架外隐藏内容。容器加上一个遮罩使得可滚动区域易于实现。添加容器，将其`mask`属性设置为具有矩形的图形对象，并将文本、图像等内容作为遮罩容器的子项添加。超出矩形遮罩的任何内容都将被简单地省略。按需移动容器的内容以滚动。

```javascript
// 创建应用程序助手并将其渲染目标添加到页面上
let app = new PIXI.Application({ width: 640, height: 360 });
document.body.appendChild(app.view);

// 创建窗口框架
let frame = new PIXI.Graphics();
frame.beginFill(0x666666);
frame.lineStyle({ color: 0xffffff, width: 4, alignment: 0 });
frame.drawRect(0, 0, 208, 208);
frame.position.set(320 - 104, 180 - 104);
app.stage.addChild(frame);

// 创建用于定义遮罩的图形对象
let mask = new PIXI.Graphics();
// 添加要显示的矩形区域
mask.beginFill(0xffffff);
mask.drawRect(0,0,200,200);
mask.endFill();

// 添加将容纳我们遮罩内容的容器
let maskContainer = new PIXI.Container();
// 将遮罩设置为使用上述图形对象
maskContainer.mask = mask;
// 将遮罩作为子项添加，以便遮罩相对于其父项定位
maskContainer.addChild(mask);
// 通过窗口的框架宽度进行偏移
maskContainer.position.set(4,4);
// 然后将容器添加到窗口中！
frame.addChild(maskContainer);

// 为受遮罩容器创建内容
let text = new PIXI.Text(
  'This text will scroll up and be masked, so you can see how masking works.  Lorem ipsum and all that.\n\n' +
  'You can put anything in the container and it will be masked!',
  {
    fontSize: 24,
    fill: 0x1010ff,
    wordWrap: true,
    wordWrapWidth: 180
  }
);
text.x = 10;
maskContainer.addChild(text);

// 添加一个定时器回调以将文本上下滚动
let elapsed = 0.0;
app.ticker.add((delta) => {
  // 更新文本的 y 坐标以进行滚动
  elapsed += delta;
  text.y = 10 + -100.0 + Math.cos(elapsed/50.0) * 100.0;
});
```

PixiJS 支持两种遮罩类型：

使用[图形（Graphics）](https://pixijs.download/release/docs/PIXI.Graphics.html)对象创建具有任意形状的遮罩 - 强大，但不支持反锯齿

精灵（Sprite）：使用[精灵（Sprite）](https://pixijs.download/release/docs/PIXI.Sprite.html)的 alpha 通道作为遮罩，提供了反锯齿的边缘 - **不**支持 Canvas 渲染器

## 过滤（Filtering）

容器对象的另一个常见用途是作为过滤内容的主机。过滤器是一种高级、仅在 WebGL 中可用的功能，允许 PixiJS 执行每像素效果，如模糊和位移。通过在容器上设置过滤器，容器所包含的屏幕区域在渲染容器内容后，将通过过滤器进行处理。

以下是 PixiJS 默认支持的过滤器列表。然而，社区存储库中还有[许多其他过滤器](https://github.com/pixijs/filters)。

| 过滤器                                                                                  | 描述                                                                                                       |
| ---                                                                                    | ---                                                                                                       |
| AlphaFilter: `@pixi/filter-alpha`                      | 类似于设置 `alpha` 属性，但会将容器展平，而不是分别应用于子项。 |
| BlurFilter: `@pixi/filter-blur`                         | 应用模糊效果                                                                                               |
| ColorMatrixFilter: `@pixi/filter-color-matrix`   | 色彩

矩阵是一种更灵活的方式，可以应用更复杂的色调或颜色变换（例如，棕褐色）。          |
| DisplacementFilter: `@pixi/filter-displacement` | 位移映射创建视觉偏移像素，例如创建波浪水效果。                |
| FXAAFilter: `@pixi/filter-fxaa`                         | 基本的 FXAA（快速近似抗锯齿）以创建平滑效果。                     |
| NoiseFilter: `@pixi/filter-noise`                      | 创建随机噪声（例如，颗粒效果）。                                                                       |

_**重要提示：** 应谨慎使用过滤器。如果在场景中使用得太频繁，它们可能会降低性能并增加内存使用。_
