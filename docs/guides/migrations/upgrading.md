# PixiJS 升级指南

PixiJS 在内部使用许多 `peerDependencies` 来定义软件包之间的关系。这在使用 `npm` 更新时会产生不可预测的错误，因为 `npm` 在升级时解决 peers 的方式（例如 [#8382](https://github.com/pixijs/pixijs/issues/8382)、[#8268](https://github.com/pixijs/pixijs/issues/8268)、[#8144](https://github.com/pixijs/pixijs/issues/8144)、[#7209](https://github.com/pixijs/pixijs/issues/7209)）。

在使用 `npm` 进行**升级**时，请完全卸载而不仅仅在您的 **package.json** 中更改版本：

```
npm uninstall pixi.js
npm install pixi.js
```

如果您正在使用任何 PixiJS 社区插件，请确保也卸载这些插件：

```
npm uninstall pixi.js @pixi/particle-emitter pixi-sound
npm install pixi.js @pixi/particle-emitter pixi-sound
```
