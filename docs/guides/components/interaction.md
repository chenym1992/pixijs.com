# 交互（Interaction）

PixiJS 主要是一个渲染系统，但它也包括对交互的支持。将鼠标和触摸事件添加到您的项目中非常简单且一致。

## 事件模式

新的基于事件的系统替代了 v6 中的 InteractionManager，扩展了 DisplayObject 的交互定义。通过这个系统，我们引入了 `eventMode`，允许您控制对象如何响应交互事件。这类似于 v6 中的 `interactive` 属性，但具有更多选项。

| eventMode | 描述 |
|---|---|
| `none` | 忽略所有交互事件，类似于 CSS 的 `pointer-events: none`，用于非交互式子对象的优化 |
|  `passive`  | 不会发出事件，对自身不执行命中测试，但允许事件和命中测试仅限于其交互式子对象。如果要与 v6 兼容，请将其设置为默认的 `eventMode`（请参阅 Renderer、Application 等中的选项） |
|  `auto`  | 不会发出事件，但如果父对象是交互式的，会执行命中测试。与 v7 中的 `interactive = false` 相同 |
|  `static`  | 发出事件并执行命中测试。与 v7 中的 `interaction = true` 相同，适用于像按钮这样不会移动的对象。 |
|  `dynamic` | 发出事件并执行命中测试，但还将从计时器接收模拟的交互事件，以允许在鼠标不移动时进行交互。这对于独立移动或动画的元素非常有用。 |

## 事件类型

PixiJS 支持以下事件类型：

| 事件类型 | 描述 |
|---|---|
| `pointercancel` | 当指针设备按钮在最初注册 pointerdown 的显示对象外释放时触发。 |
| `pointerdown` | 当指针设备按钮在显示对象上按下时触发。 |
| `pointerenter` | 当指针设备进入显示对象时触发。 |
| `pointerleave` | 当指针设备离开显示对象时触发。 |
| `pointermove` | 当指针设备在显示对象上移动时触发。 |
| `globalpointermove` | 当指针设备移动时触发，无论当前对象是否进行命中测试。 |
| `pointerout` | 当指针设备移动到显示对象外时触发。 |
| `pointerover` | 当指针设备移动到显示对象上时触发。 |
| `pointertap` | 当指针设备在显示对象上双击时触发。 |
| `pointerup` | 当指针设备按钮在显示对象上释放时触发。 |
| `pointerupoutside` | 当指针设备按钮在最初注册 pointerdown 的显示对象外释放时触发。 |
| `mousedown ` | 当鼠标按钮在显示对象上按下时触发。 |
| `mouseenter` | 当鼠标光标进入显示对象时触发。 |
| `mouseleave` | 当鼠标光标离开显示对象时触发。 |
| `mousemove ` | 当鼠标光标在显示对象上移动时触发。 |
| `globalmousemove` | 当鼠标移动时触发，无论当前对象是否进行命中测试。 |
| `mouseout ` | 当鼠标光标移动到显示对象外时触发。 |
| `mouseover ` | 当鼠标光标移动到显示对象上时触发。 |
| `mouseup ` | 当鼠标按钮在显示对象上释放时触发。 |
| `mouseupoutside ` | 当鼠标按钮在最初注册 mousedown 的显示对象外释放时触发。 |
| `click ` | 当鼠标按钮在显示对象上点击（按下并释放）时触发。 |
| `touchcancel ` | 当触摸点在最初注册 touchstart 的显示对象外部被移除时触发。 |
| `touchend ` | 当触摸点从显示对象上移除时触发。 |
| `touchendoutside ` | 当触摸点在最初注册 touchstart 的显示对象外部被移除时触发。 |
| `touchmove ` | 当触摸点沿显示对象移动时触发。 |
| `globaltouchmove` | 当触摸点移动时触发，无论当前对象是否进行命中测试。 |
| `touchstart ` | 当触摸点放在显示对象上时触发。 |
| `tap ` | 当触摸点在显示对象上双击时触发。 |
| `wheel ` | 当鼠标滚轮在显示对象上滚动时触发。 |
| `rightclick ` | 当右鼠标按钮在显示对象上点击（按下并释放）时触发。 |
| `rightdown ` | 当右鼠标按钮在显示对象上按下时触发。 |
| `rightup ` | 当右鼠标按钮在显示对象上释放时触发。 |
| `rightupoutside ` | 当右鼠标按钮在最初注册 rightdown 的显示对象外释放时触发。 |

## 启用交互

任何派生自 DisplayObject 的对象（Sprite、Container 等）都可以通过将其 `eventMode` 属性设置为上述任何 `eventMode` 来变得交互式。这样做将导致对象发出交互事件，您可以响应这些事件以驱动项目的行为。

请查看[交互示例代码](/examples/events/click)。

要响应点击和触摸，可以绑定在对象上触发的事件，如下所示：

```javascript
let sprite = PIXI.Sprite.from('/some/texture.png');
sprite.on('pointerdown', (event) => { alert('clicked!'); });
sprite.eventMode = 'static';
```

请

查看[DisplayObject](https://pixijs.download/release/docs/PIXI.DisplayObject.html)以获取支持的交互事件列表。

### 检查对象是否可交互

您可以通过调用 `isInteractive` 属性来检查对象是否可交互。如果 `eventMode` 设置为 `static` 或 `dynamic`，则将返回 true。

```javascript
if (sprite.isInteractive()) {
    // sprite is interactive
}
```

## 使用指针事件

PixiJS 支持三种类型的交互事件 - 鼠标、触摸和指针。鼠标事件由鼠标移动、点击等触发。触摸事件用于支持触摸设备。而指针事件同时适用于鼠标和触摸设备。

这意味着，在许多情况下，您可以编写支持指针事件的项目，然后无论是鼠标还是触摸输入，都可以正常工作。在其他情况下，仅在需要根据输入类型支持不同操作模式或支持多点触摸交互时才使用非指针事件。在其他情况下，请优先使用指针事件。

## 优化

命中测试需要遍历整个对象树，在复杂项目中可能会成为优化瓶颈。为了缓解这个问题，PixiJS 的容器派生对象具有一个名为 `interactiveChildren` 的属性。如果您拥有容器或其他具有复杂子树的对象，并且知道这些子对象永远不会是交互式的，您可以将此属性设置为 `false`，在检查悬停和点击事件时，命中测试算法将跳过这些子对象。例如，如果您正在构建一个侧滑游戏，您可能会为包含岩石、云、花等内容的背景层设置 `background.interactiveChildren = false`。这将由于背景层将包含大量不可点击的子对象而大大加速命中测试。`EventSystem` 也可以自定义为更高性能：

```js
const app = new PIXI.Application({
    /**
     * 默认情况下我们使用 `auto` 以保持向后兼容性。
     * 但是 `passive` 更高效，并且将在未来成为默认选项，
     */
    eventMode: 'passive',
    eventFeatures: {
        move: true,
        /** 禁用全局移动事件，大型场景中可能非常昂贵 */
        globalMove: false,
        click: true,
        wheel: true,
    }
});
```
