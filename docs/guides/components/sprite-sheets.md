# 精灵表（Spritesheets）

现在您已经了解了基本的精灵，是时候谈谈一种更好的创建它们的方式 - [Spritesheet](https://pixijs.download/release/docs/PIXI.Spritesheet.html) 类。

精灵表是一种更有效地下载和渲染精灵的媒体格式。虽然创建和使用它们可能会更加复杂，但它们是优化项目的关键工具。

## 精灵表的结构

精灵表的基本思想是将一系列图像合并到单个图像中，跟踪每个源图像的位置，然后使用该组合图像作为生成的精灵的共享 BaseTexture。

第一步是收集要组合的图像。然后，精灵打包工具会收集这些图像，并创建一个新的组合图像。

<!--TODO: 显示多个源图像被合并到一个图像中-->

在创建此图像时，构建它的工具会跟踪每个源图像存储的矩形的位置。然后，它会生成一个带有该信息的 JSON 文件。

<!--TODO: SpriteSheet json 在这里-->

这两个文件结合在一起后，可以传递给 SpriteSheet 构造函数。然后，SpriteSheet 对象会解析 JSON，为每个源图像创建一系列 Texture 对象，根据 JSON 数据设置每个的源矩形。每个纹理都使用相同的共享 BaseTexture 作为其源。

## 双重效率

精灵表通过两种方式提升您的项目效率。

首先，它通过 __加快加载过程__ 来提升效率。虽然下载精灵表的纹理需要移动相同（甚至更多！）数量的字节，但它们被组合到单个文件中。这意味着用户的浏览器可以为相同数量的精灵请求和下载更少的文件。文件的数量本身是下载速度的关键驱动因素，因为每个请求都需要往返到 Web 服务器，浏览器对同时下载的文件数量有限制。将项目从单个源图像转换为共享精灵表可以将下载时间减少一半，而无需降低质量。

其次，它通过 __改善批次渲染__ 来提高效率。WebGL 渲染速度大致随着绘制调用次数的增加而增加。将多个精灵等批处理到单个绘制调用中是 PixiJS 可以运行得如此快的主要秘诀。最大化批处理是一个复杂的主题，但当多个精灵共享一个共同的 BaseTexture 时，它更有可能被一起批处理并在单个调用中渲染。

## 创建精灵表

您可以使用第三方工具来组装精灵表文件。以下是两个可能适合您需求的工具：

[ShoeBox](http://renderhjs.net/shoebox/)：ShoeBox 是一个基于 Adobe AIR 的免费精灵包装实用程序，非常适用于小型项目或了解 SpriteSheets 如何工作。

[TexturePacker](https://www.codeandweb.com/texturepacker)：TexturePacker 是一个更加成熟的工具，支持高级功能和工作流程。有一个免费版本可用，具有所有必要的功能，用于为 PixiJS 打包精灵表。它非常适用于较大的项目和专业游戏开发，或需要更复杂的瓦片映射功能的项目。

精灵表数据也可以手动或以编程方式创建，并供新的 AnimatedSprite 使用。如果您的精灵已经包含在单个图像中，这可能是一个更简单的选项。

```javascript
// 创建对象以存储精灵表数据
const atlasData = {
	frames: {
		enemy1: {
			frame: { x: 0, y:0, w:32, h:32 },
			sourceSize: { w: 32, h: 32 },
			spriteSourceSize: { x: 0, y: 0, w: 32, h

: 32 }
		},
		enemy2: {
			frame: { x: 32, y:0, w:32, h:32 },
			sourceSize: { w: 32, h: 32 },
			spriteSourceSize: { x: 0, y: 0, w: 32, h: 32 }
		},
	},
	meta: {
		image: 'images/spritesheet.png',
		format: 'RGBA8888',
		size: { w: 128, h: 32 },
		scale: 1
	},
	animations: {
		enemy: ['enemy1','enemy2'] // 按名称的帧数组
	}
}


// 从数据和图像创建 SpriteSheet
const spritesheet = new PIXI.Spritesheet(
	PIXI.BaseTexture.from(atlasData.meta.image),
	atlasData
);

// 异步生成所有纹理
await spritesheet.parse();

// 精灵表已准备好使用！
const anim = new PIXI.AnimatedSprite(spritesheet.animations.enemy);

// 设置动画速度
anim.animationSpeed = 0.1666;
// 循环播放动画
anim.play();
// 将其添加到舞台以渲染
app.stage.addChild(anim);
```
