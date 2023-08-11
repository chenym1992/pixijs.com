# 显示对象（Display Objects）

[显示对象（DisplayObject）](https://pixijs.download/release/docs/PIXI.DisplayObject.html) 是引擎可以渲染的任何内容的核心类。它是精灵（sprites）、文本、复杂图形、容器等的基类，并为这些对象提供了许多共同的功能。在学习 PixiJS 时，重要的是要[阅读此类的文档][DisplayObject](https://pixijs.download/release/docs/PIXI.DisplayObject.html)，以了解如何移动、缩放、旋转和组合项目的视觉元素。

请注意，您不会直接使用 DisplayObject - 您将在派生类中使用其函数和属性。

## 常用属性

在 PixiJS 中布局和动画内容时，您将使用的最常用的属性由 DisplayObject 类提供：

| 属性 | 描述 |
| --- | --- |
| **position** | X 和 Y 位置以像素为单位给出，并且改变对象相对于其父对象的位置，也可以直接用 `object.x` / `object.y` 来设置 |
| **rotation** | 旋转以弧度为单位指定，将对象顺时针旋转（0.0 - 2 * Math.PI） |
| **angle** | 角度是旋转的别名，以度数而不是弧度指定（0.0 - 360.0） |
| **pivot** | 对象围绕的点，以像素为单位旋转 - 也设置子对象的原点 |
| **alpha** | 不透明度从 0.0（完全透明）到 1.0（完全不透明），被子对象继承 |
| **scale** | 缩放以百分比表示，1.0 表示 100% 或实际大小，并且可以分别独立设置 x 和 y 轴的缩放 |
| **skew** | 倾斜以 x 和 y 的方式对对象进行变换，类似于 CSS 的 skew() 函数，以弧度指定 |
| **visible** | 对象是否可见，作为布尔值 - 阻止更新和渲染对象及其子对象 |
| **renderable** | 是否应该渲染对象 - 当为 `false` 时，对象仍然会被更新，但不会被渲染，不影响子对象 |
