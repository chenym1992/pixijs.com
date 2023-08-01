# 架构概述

好的，现在您已经对如何轻松构建PixiJS应用有了一定的了解，让我们深入了解具体细节。在基础部分的其余内容中，我们将从高层次到细节进行讲解。首先，让我们概览PixiJS的组成结构。

## 代码

在深入了解代码布局之前，让我们来谈谈代码的位置。PixiJS是一个开源产品，托管在 [GitHub](https://github.com/pixijs/pixijs) 上。像任何GitHub存储库一样，您可以浏览和下载每个PixiJS类的原始源代码文件，还可以搜索现有的问题和错误，甚至可以提交您自己的问题。PixiJS是用一种称为 [TypeScript](https://www.typescriptlang.org) 的JavaScript变体编写的，它通过预编译步骤实现了JavaScript的类型检查。

## 组件

PixiJS是一个模块化的渲染引擎。生成、更新和显示内容所需的每个任务都被拆分成自己的组件。这不仅使代码更加清晰，还允许更大的可扩展性。此外，通过使用 [PixiJS Customize 工具](https://pixijs.io/customize/)，您可以构建一个仅包含项目所需功能子集的自定义PixiJS文件，从而节省下载大小。

以下是构成PixiJS的主要组件列表。请注意，这个列表不是详尽无遗的。此外，请不要过于关心每个组件的工作方式。我们的目标是在开始探索引擎时，让您对内部机制有所了解。

### 主要组件

| 组件                                      | 描述                                                                                                                                                                                               |
| ---                                       | ---                                                                                                                                                                                               |
| **Renderer** `@pixi/core`                  | PixiJS系统的核心是渲染器，它显示场景图并将其绘制到屏幕上。PixiJS的默认渲染器在底层使用WebGL实现。                                                                                      |
| **Container** `@pixi/display`              | 主要的显示对象，它创建了一个场景图：可渲染对象的树形结构，如精灵、图形和文本等。有关更多详细信息，请参见 [Scene Graph](scene-graph)。                                                  |
| **Loader** `@pixi/loader`                  | 加载器系统提供了异步加载资源（如图像和音频文件）的工具。                                                                                                                                     |
| **Ticker** `@pixi/ticker`                  | Ticker基于时钟提供周期性回调。您的游戏更新逻辑通常会在每一帧的tick触发时运行。您可以同时使用多个ticker。                                                                                  |
| **Application** `@pixi/app`                | Application是一个简单的辅助工具，它将Loader、Ticker和Renderer封装成一个方便易用的对象。非常适合快速入门、原型设计和构建简单项目。                                                      |
| **Interaction** `@pixi/interaction`        | PixiJS支持基于触摸和鼠标的交互，使对象可点击，触发悬停事件等。                                                                                                                                |
| **Accessibility** `@pixi/accessibility`    | 在我们的显示系统中，穿插着丰富的工具，用于启用键盘和屏幕阅读器的辅助功能。                                                                                                                    |
