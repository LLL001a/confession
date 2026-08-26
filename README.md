# confession（表白网站）

一个浪漫的表白 / 求婚网站**模板**：5 个页面循序渐进，从 2048 小游戏一路走到求婚页。**纯静态、零构建**，无需安装任何软件，没有代码基础也能在 10 分钟内部署上线。

> **核心设计：所有基础信息（名字、日期、落款、照片、视频、音乐）全部集中在 `assets/js/config.js` 一个文件里，改配置不用翻源码。**

> **本仓库为脱敏模板**：不含任何真实照片、视频或姓名，源码中姓名以占位符 `{{TA}}` / `{{SIGN}}` 表示。

---

## 📂 项目结构

```text
confession/
├── index.html                  # 第 1 页：2048 小游戏（入口）
├── pages/                      # 子页面（每页独立、可直接打开）
│   ├── anniversary/index.html  # 第 2 页：纪念日天数计时器
│   ├── cinema/index.html       # 第 3 页：放映厅（视频）
│   ├── gallery/index.html      # 第 4 页：3D 旋转照片墙
│   └── proposal/index.html     # 第 5 页：求婚页（拒绝按钮会逃跑）
├── assets/
│   ├── js/
│   │   ├── config.js           # ⭐ 基础配置文件（你只需改这一个）
│   │   └── site.js             # 通用脚本（占位符替换，一般不用动）
│   └── media/                  # ── 你的素材放这里 ──
│       ├── photos/             #   照片（.gitignore 忽略）
│       └── video/              #   视频（.gitignore 忽略）
├── server/
│   └── music.php               # 背景音乐代理（需要 PHP 环境）
├── 404.html                    # 404 页面
├── .github/workflows/static.yml # GitHub Pages 自动部署配置
└── README.md
```

---

## ⚙️ 配置文件一览（`assets/js/config.js`）

打开 `assets/js/config.js`，改完保存、刷新页面即可生效。**不需要查找任何源码。**

| 配置项 | 作用 | 示例 |
|---|---|---|
| `mode` | 场景模式：`'proposal'` 求婚 / `'dating'` 求恋（一开关切换全站文案） | `mode: 'proposal'` |
| `years` | 纪念日周年数（第 2 页"N周年快乐"） | `years: 5` |
| `ta` | TA 的名字 / 昵称（全站标题与文案） | `ta: '宝贝'` |
| `sign` | 求婚页落款署名（"永远爱你的 XXX"） | `sign: '你的名字'` |
| `anniversary` | 纪念日日期（第 2 页天数起点） | `anniversary: '2021-12-18 10:30:00'` |
| `photos.files` | 第 4 页相册照片文件名列表 | `files: ['1.jpg', '2.jpg', …]` |
| `video` | 第 3 页视频文件名 | `video: 'movie.mp4'` |
| `music.mode` | 音乐模式：`'single'` 全站统一一首 / `'per-page'` 每页一首 | `mode: 'single'` |
| `music.single` | 统一模式下使用的歌曲 ID | `single: '1899437032'` |
| `music.perPage` | 每页模式下各页歌曲 ID（anniversary / gallery / proposal） | `perPage: { … }` |

> **场景切换示例**：`mode: 'proposal'` 时第 2 页显示"这是我们**在一起**的第"，第 5 页显示"**嫁给我好吗**"、点「我愿意」后按钮为"**抱抱我的新娘**"；改为 `mode: 'dating'` 后自动变为"这是我们**相识**的第"、"**在一起好吗**"、"**抱抱我的{ta}宝贝**"。落款署名、周年数同理在 `sign` / `years` 里改。

---

## 🚀 小白快速上手（约 10 分钟）

### 第 0 步：准备素材（只需 3 样）

| 素材 | 数量 | 放哪里 |
|---|---|---|
| 照片 | 10 张 | `assets/media/photos/`，命名 `1.jpg` ~ `10.jpg` |
| 视频 | 1 个 | `assets/media/video/`，命名为 `movie.mp4` |
| 音乐 | 1 首 | 网易云歌曲 ID 或 mp3 文件（见第 4 步） |

> 没有素材也能打开网站，只是相册 / 视频页为空，其余功能全部正常。

### 第 1 步：下载代码

- **方式 A（推荐）**：点击本仓库页面的绿色 **Code → Download ZIP**，解压到电脑。
- 方式 B：命令行 `git clone https://github.com/LLL001a/confession.git`

### 第 2 步：放入照片和视频

- 照片重命名为 `1.jpg`、`2.jpg` … `10.jpg`，放进 `assets/media/photos/`。
- 视频改名为 `movie.mp4`，放进 `assets/media/video/`。

### 第 3 步：编辑配置文件（改名字 / 日期 / 落款）

用记事本 / VSCode 打开 `assets/js/config.js`，改这几行即可：

```js
ta: '宝贝',                    // ← TA 的名字或昵称
sign: '你的名字',              // ← 你的名字（落款用）
anniversary: '2021-12-18 10:30:00',  // ← 你们的纪念日
```

### 第 4 步：换音乐（二选一）

**方式 1：有 PHP 环境（宝塔、虚拟主机等）——用内置代理（默认）**

在 `config.js` 的 `music` 里填网易云歌曲 ID：

- 想**全站统一一首**：`mode: 'single'`，只改 `single` 的 ID；
- 想**每页一首**：`mode: 'per-page'`，分别改 `perPage` 中 anniversary / gallery / proposal 的 ID。
- 歌曲 ID 获取：网易云网页版歌曲页 URL 中 `/song?id=xxxx` 的数字。

**方式 2：纯静态托管（GitHub Pages 等，不支持 PHP）**

把各页 HTML 中的音乐地址改成你的 mp3 文件，例如把 `bgm.mp3` 放入项目根目录后，在第 2 / 4 / 5 页脚本中找到：

```js
audio.src = '../../server/music.php?id=' + ...;
```

改为：

```js
audio.src = 'bgm.mp3';
```

### 第 5 步：部署上线（三选一）

**A. GitHub Pages（免费、最简单）**

1. 把代码推到本仓库的 `main` 分支（已内置自动部署配置）。
2. 进入仓库 **Settings → Pages**，Source 选择 `GitHub Actions`。
3. 等待 1~2 分钟，访问 `https://LLL001a.github.io/confession/` 即可。

> ⚠️ **地址带 `/confession/` 前缀**：子页面如 `https://LLL001a.github.io/confession/pages/anniversary/index.html`。站内跳转均为相对路径，从首页进入后逐页浏览即可，无需手动拼 URL。

**B. 宝塔面板（国内服务器）**

1. 网站 → 添加站点 → 纯静态。
2. 把整个项目上传到站点根目录（如 `/www/wwwroot/你的域名/`）。
3. 用你的域名访问（背景音乐走 `server/music.php`，方式 1 生效）。

**C. 本地预览（不部署）**

直接双击打开 `index.html` 就能看（浏览器地址栏为 `file://` 时音乐可能不播放，属正常限制，部署后即可）。

---

## ✨ 页面亮点与彩蛋

| 页面 | 亮点 |
|---|---|
| `/` | 2048 通关后金色星星雨；连点标题 5 次触发心形烟花 |
| `pages/anniversary/` | 天数滚动动画；点击屏幕漂浮甜话；连点天数 5 次弹出隐藏告白 |
| `pages/cinema/` | 视频自动播放；倒计时自动跳转 |
| `pages/gallery/` | 3D 照片墙旋转；连点相册 5 次触发照片雨 + 快门白闪 |
| `pages/proposal/` | 拒绝按钮会逃跑；连跑 6 次有彩蛋；点「我愿意」全屏烟花 |

## ✍️ 更多自定义

- **甜话词库**：各页搜索 `sweetWords`，数组里的文字（如"宝贝""乖乖"）是点击屏幕漂浮的话，可随意增删。
- **配色 / 文字**：直接改 HTML 里的中文和 CSS 变量（`--rose-*` 等在每页 `<style>` 开头）。
- **换照片 / 加照片**：照片放进 `assets/media/photos/`，然后在 `config.js` 的 `photos.files` 里按文件名列出即可，数量不限。

## ❓ 常见问题

- **GitHub Pages 上音乐不响？** 该托管不支持 PHP，请用"第 4 步方式 2"改为 mp3 文件。
- **照片墙空白？** 确认照片在 `assets/media/photos/`，且文件名与 `config.js` 中 `photos.files` 一致。
- **视频不播放？** 确认文件名与 `config.js` 中 `video` 一致，且在 `assets/media/video/`；部分浏览器需用户点击后才会播放有声视频。
- **改完 config.js 没变化？** 确认修改后已保存，并**刷新页面**（必要时 `Ctrl+F5` 强制刷新）。

## 🔒 隐私声明

- 本仓库为**脱敏模板**，不包含任何真实照片、视频、姓名等个人信息，姓名位置统一为占位符 `{{TA}}` / `{{SIGN}}`。
- 你放入的照片 / 视频属于个人数据，`.gitignore` 已阻止它们被提交到公开仓库。
- 使用他人图片、视频、音乐素材时，请确保拥有版权或授权。
