# 响应式焦点视频轮播

一个基于 **Swiper + HTML5 Video** 的居中焦点式视频轮播示例。当前卡片保持完整高度，左右邻近卡片缩短并降低透明度，从而在不使用 3D Coverflow 或 `transform: scale()` 的情况下形成自然的视觉焦点。

## 结构

```text
focus-video-reels/
├─ index.html
├─ css/
│  └─ style.css
├─ js/
│  └─ main.js
├─ vendor/swiper/
│  ├─ swiper-bundle.min.css
│  └─ swiper-bundle.min.js
├─ videos/
│  └─ video-01.mp4 ... video-09.mp4
└─ images/
   ├─ poster-01.webp ... poster-09.webp
   └─ thumb-01.webp ... thumb-09.webp
```

## 主要特点

- `#section01` 作为组件唯一作用域，便于后期整体替换 ID。
- 内部类名保持简短，如 `.head`、`.item`、`.media`、`.info`、`.prev`、`.next`。
- Swiper 使用 `centeredSlides`、`loop` 与不同断点下的 `slidesPerView`。
- HTML 只维护 9 张真实卡片，JS 初始化前自动复制一组作为 Loop 缓冲；Pagination 仍只显示 9 个逻辑圆点。
- Active 卡片内部媒体高度从 `80%` 提升到 `100%`，邻卡不做缩放。
- 只有当前 Active 视频自动播放，切换后其他视频自动暂停。
- 页面滚出可视区域或浏览器标签页切换后自动暂停视频。
- 当前视频支持播放/暂停、静音切换、播放进度条。
- 当前卡片底部显示毛玻璃信息卡，普通卡片隐藏。
- Swiper 文件已本地化，无远程 CDN 依赖。

## 修改 Section ID

当前作用域统一使用：

```html
<section id="section01">
```

如果需要复制为其他区块，可批量替换：

```text
section01 → section02
```

同时修改 `css/style.css` 和 `js/main.js` 中的对应 ID 即可。

## 替换视频

直接替换 `videos/` 下的视频文件，并保持文件名不变即可。建议使用竖屏视频，接近 `3:5`、`9:16` 均可，页面统一通过 `object-fit: cover` 裁切显示。

如果修改文件名，需要同步修改 `index.html` 中：

```html
<source src="videos/video-01.mp4" type="video/mp4">
```

## 视频封面

视频使用 `poster` 防止加载前出现黑屏：

```html
<video poster="images/poster-01.webp">
```

实际项目建议从视频中选择具有代表性的画面作为封面。

## 响应式逻辑

```text
320px   → 1.2 张
480px   → 1.5 张
768px   → 3.5 张
992px   → 4.2 张
1500px  → 5.5 张
```

通过保留部分左右邻卡，明确提示用户内容可以继续横向滑动。

> 大屏断点一次会显示约 `5.5` 张。当前使用的 Swiper 14 Loop 机制会重排现有 Slide，而不是旧版本那样自动生成 `swiper-slide-duplicate`。9 张真实卡片在这个组合下仍可能在首尾附近出现一侧空白，因此 `main.js` 会在初始化前自动复制一整组作为循环缓冲。
>
> 维护时 **只需要编辑 `index.html` 中的 9 张真实卡片**，不要手工添加复制卡片；页面分页也始终按真实卡片数量生成。

## 使用方式

本项目无构建流程。解压后直接双击 `index.html` 即可预览。
