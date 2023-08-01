# 什么是 PixiJS

那么究竟 **什么是** PixiJS？在其核心，PixiJS 是一个渲染系统，它使用 WebGL（或可选的 Canvas）来显示图像和其他 2D 可视内容。它提供了完整的场景图（对象渲染的层次结构），并提供交互支持以实现处理点击和触摸事件。在现代 HTML5 的世界中，它是 Flash 的自然替代品，但提供了更好的性能和超越 Flash 可以实现的像素级效果。它非常适合在线游戏、教育内容、互动广告、数据可视化等任何需要复杂图形的基于网络的应用。并且结合 Cordova 和 Electron 等技术，PixiJS 应用程序可以作为移动应用和桌面应用分发到浏览器之外。

<!--（TODO: 添加实际项目的示例 - 游戏，数据可视化，广告）-->

以下是 PixiJS 的其他优点：

## PixiJS 是快速的

区别于其他基于 web 的渲染解决方案，PixiJS 最重要的特性之一就是 **速度**。从底层开始，渲染流水线被构建得尽可能从用户的浏览器中获得最高的性能。自动的精灵（sprite）和几何（geometry）批处理，谨慎使用 WebGL 资源，紧密的场景图 - 无论你的应用是什么，速度都是宝贵的，而 PixiJS 绝对拥有这个优势。

##  不仅仅是精灵（Sprites）

使用 HTML5 和 DOM 可以在页面上绘制图像，那为什么要使用 PixiJS 呢？除了性能之外，答案是 PixiJS 远远超越简单的图像。使用 [SimpleRope](https://pixijs.download/release/docs/PIXI.SimpleRope.html) 绘制路径和轨迹。使用 [Graphics](https://pixijs.download/release/docs/PIXI.Graphics.html) 绘制多边形、线条、圆形和其他基本图形。[Text](https://pixijs.download/release/docs/PIXI.Text.html) 提供完整的文本渲染支持，其性能与精灵一样出色。即使绘制简单的图像，PixiJS 本身也支持精灵表，以实现高效的加载和开发便利。

##  原生支持 WebGL

WebGL 是用于访问用户 GPU 进行快速渲染和高级效果的 JavaScript API。PixiJS 利用 WebGL 即使在移动设备上也可以高效地显示数千个移动的精灵。然而使用 WebGL 不仅仅意味着速度。通过使用 [Filter](https://pixijs.download/release/docs/PIXI.Filter.html) 类，你可以编写着色器程序（或使用预先构建的着色器！）来实现位移映射、模糊和其他使用 DOM 或 Canvas API 无法实现的高级视觉效果。

##  开源的

想要了解引擎的工作原理？在寻找 bug？曾经因为闭源项目无法获取支持而受挫？使用 PixiJS，你将获得一个成熟的项目，可以完全访问源代码。我们使用 MIT 许可证以保持兼容性，并在 [GitHub 上进行托管](https://github.com/pixijs/pixijs) 以便问题跟踪和便捷访问。

##  可扩展的

开源有帮助，JavaScript 也有帮助。但 PixiJS 之所以易于扩展，真正的原因在于整个系统的内部 API 都是清晰的。经过多年的开发和 5 个主要发布版本，PixiJS 已经准备好使你的项目成功，无论你的需求是什么。

##  部署简单

Flash 需要播放器。Unity 需要安装程序或应用商店。PixiJS 需要 一个浏览器。在 web 上部署 PixiJS 就像部署一个网站一样简单。它只是 JavaScript + 图像 + 音频，就像你做过的数百次一样。用户只需访问一个 URL，你的游戏或其他内容就可以运行。但它不仅限于 web。如果你想要部署一个移动应用，将你的 PixiJS 代码包裹在 Cordova 中。想要部署一个独立的桌面程序？构建一个 Electron 封装器，你就可以开始使用了。
