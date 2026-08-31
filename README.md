# Responsive Focus Video Reels

一个基于 **Swiper + HTML5 Video** 实现的响应式居中焦点视频轮播组件。

当前卡片保持完整高度与完整视觉权重，左右邻近卡片通过 **高度收缩 + 透明度降低** 弱化，从而在不使用 `3D Coverflow`、也不依赖 `transform: scale()` 的情况下，形成自然、稳定且适合企业网站使用的焦点效果。

项目采用纯 HTML / CSS / JavaScript 编写，Swiper 已本地化，无 CDN、无 npm、无构建流程，下载后可直接运行，也方便复制到现有网站项目中继续修改。

---

## 适用场景

这套组件适合用于需要“连续浏览 + 当前内容重点展示”的视频内容区，例如：

- 产品短视频
- 产品系列展示
- 建筑材料应用场景
- 工程项目案例
- 品牌故事
- 客户案例
- 设计作品展示
- 社交媒体短视频精选
- 企业官网首页重点内容区

与普通等高轮播相比，这种布局能够更明确地告诉用户“当前正在观看哪一项”，同时左右保留部分邻近内容，继续维持横向浏览的方向感。

---

## 效果特点

### 1. 居中焦点布局

Swiper 使用：

```js
centeredSlides: true
```

当前 Active 卡片始终保持在视觉中心。

左右邻近卡片继续可见，在桌面端形成横向延伸感，在移动端则通过露出部分邻卡提示用户可以继续滑动。

### 2. 不使用 `scale()` 的焦点变化

普通卡片的媒体区域：

```css
height: 80%;
```

当前卡片：

```css
height: 100%;
```

同时普通卡片降低透明度，Active 卡片恢复完整透明度。

这种方式只改变卡片的纵向视觉权重，不会同时放大宽度、文字、圆角和间距，因此比直接使用 `transform: scale()` 更稳定，也更适合规则型企业网站布局。

### 3. Active 视频独立播放

页面只播放当前 Active 卡片中的视频。

切换到下一张时：

```text
暂停全部视频
      ↓
Swiper 完成切换
      ↓
播放新的 Active 视频
```

避免多个视频同时解码和播放，减少不必要的 CPU、GPU 和内存占用。

### 4. 视频控制

当前卡片支持：

- 播放 / 暂停
- 静音 / 取消静音
- 顶部播放进度条
- 自动循环播放
- `playsinline` 移动端内嵌播放
- `poster` 视频封面

普通卡片隐藏这些控制元素，只保留当前内容的完整交互。

### 5. 内容信息浮层

Active 卡片底部显示毛玻璃信息卡，可用于：

- 产品名称
- 产品系列
- 案例名称
- 项目地区
- 分类信息
- 详情入口

当前 Demo 使用产品标题 + 简短描述，实际项目可直接替换为自己的业务内容。

### 6. 页面可见性管理

组件通过 `IntersectionObserver` 判断当前 Section 是否处于页面可视区域。

当组件离开视口时自动暂停视频；重新进入可视区域后恢复当前 Active 视频。

同时监听：

```js
document.visibilitychange
```

切换到其他浏览器标签页时也会自动暂停播放。

### 7. Reduced Motion 支持

当系统启用“减少动态效果”时：

```css
prefers-reduced-motion: reduce
```

组件会关闭主要过渡动画，同时 JavaScript 不再自动播放视频，降低动态内容对敏感用户的影响。

---

## 技术组成

| 技术 | 用途 |
| --- | --- |
| HTML5 | 页面与视频结构 |
| CSS3 | 焦点高度、透明度、毛玻璃与响应式布局 |
| JavaScript | 视频状态、分页、可见性与交互管理 |
| Swiper 14.1.0 | 轮播、触摸滑动、Navigation 与 Loop |
| IntersectionObserver | 判断组件是否处于可视区域 |
| HTML5 Video API | 播放、暂停、静音与进度管理 |

---

## 项目结构

```text
focus-video-reels/
│
├─ index.html
│
├─ css/
│  └─ style.css
│
├─ js/
│  └─ main.js
│
├─ vendor/
│  └─ swiper/
│     ├─ swiper-bundle.min.css
│     └─ swiper-bundle.min.js
│
├─ videos/
│  ├─ video-01.mp4
│  ├─ video-02.mp4
│  ├─ ...
│  └─ video-09.mp4
│
└─ images/
   ├─ poster-01.jpg
   ├─ poster-02.jpg
   ├─ ...
   ├─ poster-09.jpg
   ├─ thumb-01.svg
   ├─ thumb-02.svg
   ├─ ...
   └─ thumb-09.svg
```

目录职责保持单一：

- `index.html`：内容结构
- `style.css`：组件视觉样式
- `main.js`：Swiper 与视频行为
- `vendor/`：第三方本地依赖
- `videos/`：视频资源
- `images/`：视频封面与信息卡缩略图

---

## 快速使用

项目没有构建流程。

下载后直接打开：

```text
index.html
```

即可本地预览。

不需要：

```text
npm install
npm run build
服务器环境
远程 CDN
```

因此非常适合用于独立 Demo、GitHub 代码仓库、企业网站区块原型以及后续二次集成。

---

## Section 作用域设计

整个组件统一使用：

```html
<section id="section01">
```

所有自定义 CSS 都限制在：

```css
#section01 ...
```

JavaScript 也首先获取：

```js
const section = document.querySelector('#section01');
```

然后只在当前 Section 内部查找元素。

这样做的目的不是增加命名复杂度，而是避免组件复制到其他页面后污染全局样式。

如果后续复制成另一个区块，只需要整体替换：

```text
section01 → section02
```

并同步修改：

- `index.html`
- `css/style.css`
- `js/main.js`

内部类名则保持简短，例如：

```text
.head
.reels
.item
.media
.video
.ctrl
.info
.prev
.next
.pages
```

---

## Swiper 响应式配置

当前断点：

```text
320px   → 1.2 张
480px   → 1.5 张
768px   → 3.5 张
992px   → 4.2 张
1500px  → 5.5 张
```

对应代码：

```js
breakpoints: {
  320:  { slidesPerView: 1.2, spaceBetween: 10 },
  480:  { slidesPerView: 1.5, spaceBetween: 15 },
  768:  { slidesPerView: 3.5, spaceBetween: 20 },
  992:  { slidesPerView: 4.2, spaceBetween: 30 },
  1500: { slidesPerView: 5.5, spaceBetween: 30 }
}
```

这里故意使用小数形式的 `slidesPerView`。

例如：

```text
1.2
3.5
5.5
```

目的就是让页面边缘保留部分下一张 / 上一张内容，从视觉上直接提示“这里可以继续滑动”。

---

## Loop 缓冲机制

这是本项目最需要理解的维护点之一。

当前使用：

```js
centeredSlides: true
loop: true
```

同时大屏需要显示约：

```text
5.5 张
```

HTML 中维护 9 张真实内容时，如果只让 Swiper 使用这 9 张 Slide，在 Swiper 14 的 Loop 重排机制下，某些首尾位置可能出现一侧内容不足的空白。

因此 `main.js` 会在 Swiper 初始化之前自动复制一整组真实 Slide：

```text
HTML 真实内容
1 2 3 4 5 6 7 8 9

        ↓ JS 自动复制

Swiper 实际运行
1 2 3 4 5 6 7 8 9
1 2 3 4 5 6 7 8 9
```

这样可以为大屏居中 Loop 提供足够的循环缓冲。

### 重要维护原则

**只维护 HTML 中的真实卡片。**

不要手工复制第二组 Slide。

JavaScript 会自动完成循环缓冲。

---

## Pagination 为什么仍然只有 9 个圆点

虽然 Swiper 实际运行时存在两组 Slide，但页面逻辑内容仍然只有 9 条。

因此项目没有直接使用 Swiper 默认 Pagination，而是建立了一套逻辑分页：

```text
真实内容数量：9
实际运行 Slide：18
Pagination：9
```

每个真实卡片与复制卡片共用同一个：

```html
data-key
```

例如：

```text
真实第 4 张  → key = 3
复制第 4 张  → key = 3

两者都对应第 4 个圆点
```

点击某个 Pagination 圆点时，JavaScript 会从两组相同内容中寻找距离当前 Active 最近的目标 Slide，从而减少不必要的跨段跳转，让圆点与卡片切换保持连贯。

---

## 替换视频

最简单的方式是直接替换：

```text
videos/video-01.mp4
videos/video-02.mp4
...
videos/video-09.mp4
```

并保持文件名不变。

这样不需要修改 HTML。

如果需要修改文件名，则同步修改：

```html
<source src="videos/video-01.mp4" type="video/mp4">
```

### 推荐视频规格

当前卡片比例约为：

```css
aspect-ratio: 3 / 5;
```

因此推荐优先使用竖屏视频，例如：

```text
720 × 1200
900 × 1500
1080 × 1800
```

`9:16` 视频也可以直接使用，页面会通过：

```css
object-fit: cover;
```

自动裁切。

对于企业网站，通常没有必要上传超高码率视频。更重要的是控制首屏加载体积和移动网络体验。

---

## 视频封面 Poster

每个视频都配置独立封面：

```html
<video poster="images/poster-01.jpg">
```

作用包括：

- 视频尚未加载时避免黑屏
- 网络较慢时保持卡片完整
- 视频暂停前提供稳定视觉
- 改善初始页面观感

实际项目建议直接从对应视频中截取有代表性的画面作为 Poster。

Poster 建议尽量与视频比例保持一致。

---

## 修改卡片内容

每张卡片的主要结构可以概括为：

```html
<div class="swiper-slide item">
  <div class="media">

    <video class="video">...</video>

    <div class="bar">...</div>

    <div class="ctrl">...</div>

    <a class="info" href="#">
      ...
    </a>

  </div>
</div>
```

实际开发时主要修改：

- 视频路径
- Poster
- 缩略图
- 标题
- 描述
- 详情链接

Swiper 结构与 JavaScript 行为通常不需要修改。

---

## 增加或减少卡片

当前 Demo 使用 9 条真实内容，但代码并没有把 Pagination 固定写死为 9 个。

JavaScript 会读取：

```js
const originals = [...wrapper.querySelectorAll(':scope > .item')];
```

再根据真实卡片数量动态生成分页圆点。

因此可以继续增加或减少内容。

不过需要注意：

> **内容数量不能只看 Pagination，还要同时考虑最大 `slidesPerView`。**

如果真实内容非常少，例如只有 4～5 张，而桌面端仍然配置：

```js
slidesPerView: 5.5
```

那么整体横向构图就不再合理。

这种情况下建议同步降低桌面端 `slidesPerView`，而不是继续增加复杂的 Loop 修补逻辑。

---

## 修改焦点强度

### 普通卡片透明度

```css
#section01 .item {
  opacity: .68;
}
```

数值越低，Active 与邻卡的层级差越明显。

### 普通卡片高度

```css
#section01 .media {
  height: 80%;
}
```

如果希望邻卡更矮，可以修改为：

```css
height: 75%;
```

如果希望整体更平缓：

```css
height: 85%;
```

Active 始终保持：

```css
height: 100%;
```

建议优先通过这两个参数调整视觉强度，而不是增加额外的 `scale()` 或 3D Transform。

---

## 移动端设计

移动端没有重新创建另一套 HTML，而是继续复用同一个 Swiper。

主要变化包括：

- `slidesPerView` 降低到 `1.2 / 1.5`
- 左右邻卡只露出部分区域
- Navigation 始终显示
- 控制按钮缩小
- 信息卡缩小
- 标题和正文重新调整字号
- Section 最大宽度限制在移动端阅读范围内

这种方案避免维护两套 DOM，也让桌面端与移动端的内容和交互逻辑保持一致。

---

## 性能设计

本项目已经针对多视频轮播做了一些基础性能控制：

### 只播放 Active 视频

非当前视频始终暂停。

### 使用 `preload="metadata"`

浏览器优先获取视频元信息，而不是初始化时立即完整加载所有视频。

### 离开视口暂停

避免用户已经滚到其他 Section 后视频仍持续播放。

### 页面隐藏暂停

切换浏览器标签页后停止视频。

### Swiper 本地化

第三方 JS / CSS 不依赖远程 CDN，避免网络资源失效导致页面布局或交互异常。

实际部署到正式网站时，仍建议继续控制：

- MP4 文件大小
- 视频码率
- Poster 大小
- 页面同时出现的视频组件数量

---

## 可访问性细节

组件保留了基础的可访问性支持：

- 控制按钮使用 `button`
- Play / Mute 按钮包含 `aria-label`
- Navigation 包含上一张 / 下一张说明
- Pagination 使用真实按钮而不是普通 `span`
- 当前圆点使用 `aria-current`
- 支持键盘 Focus 样式
- 支持 `prefers-reduced-motion`

如果用于正式生产环境，可以根据项目的无障碍规范继续扩展键盘操作与状态提示。

---

## 设计取舍

这个 Demo 刻意没有加入：

- 3D Coverflow
- 大幅度缩放
- 自动切换到下一条视频
- 复杂时间轴
- 全屏短视频模式
- 弹窗播放器
- AJAX 内容加载
- 前端框架
- npm / Vite / Webpack

原因是这个组件的目标并不是做一个完整“短视频 App”，而是提供一个：

> **容易理解、容易复制、容易维护、适合嵌入企业网站的焦点视频内容区块。**

保持结构简单，比继续叠加功能更重要。

---

## 浏览器兼容

建议使用现代浏览器：

- Chrome
- Edge
- Firefox
- Safari
- iOS Safari
- Android Chrome

组件依赖现代浏览器对以下功能的支持：

```text
HTML5 Video
CSS aspect-ratio
backdrop-filter
IntersectionObserver
matchMedia
```

对于极旧浏览器不做专门兼容处理。

---

## 后续可扩展方向

如果实际项目需要，可以继续扩展：

- 视频播放完自动切换下一张
- 根据 CMS 动态输出 Slide
- WordPress Gutenberg Block
- WordPress 自定义内容类型读取
- 商品价格与按钮
- 视频弹窗预览
- 视频懒加载策略
- 动态 Poster
- 多套主题配色
- 横屏视频比例

这些功能建议按实际业务需求增加，不建议为了“功能更多”提前复杂化当前结构。

---

## 核心实现总结

这套组件真正值得复用的不是某个具体样式，而是下面这组组合：

```text
Swiper centeredSlides
        +
Partial Slides
        +
Active Height Focus
        +
Opacity Focus
        +
HTML5 Video
        +
Active-only Playback
        +
Logical Pagination
        +
Loop Buffer
        +
IntersectionObserver
```

最终形成一种兼顾视觉表现、响应式体验、性能和维护成本的 **Centered Focus Video Reels** 模式。

---

## License

本 Demo 代码可根据自己的项目需求继续修改和扩展。

Swiper 为第三方开源项目，其授权方式请以项目内对应版本及 Swiper 官方许可说明为准。
