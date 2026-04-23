# 脑卒中患者气管切开 · 代理决策辅助工具

一份交互式网页版的代理决策辅助工具，帮助脑卒中患者家属了解气管切开、整理思绪、与医生沟通。

## 功能

- 📖 分页阅读，共 20 页，涵盖六大部分
- ✍️ 勾选、滑杆、笔记自动保存在浏览器本地
- 🖨 第 19 页"与医疗团队沟通清单"可直接打印带到医院
- ⌨️ 键盘左右方向键翻页

## 部署

本项目是纯静态网页，可直接用 GitHub Pages 托管：

1. 将本仓库 Fork 或 Clone 到你的 GitHub 账号下
2. 进入仓库 **Settings → Pages**
3. Source 选 `Deploy from a branch`，Branch 选 `main`，文件夹选 `/ (root)`
4. 保存后等 1–2 分钟，访问 `https://<你的用户名>.github.io/<仓库名>/` 即可

## 本地预览

由于使用了 `.jsx` 通过 Babel 即时编译，**不能直接双击 `index.html`**。推荐用本地服务器预览：

```bash
# Python 3
python3 -m http.server 8000

# 或 Node.js
npx serve .
```

然后浏览器打开 `http://localhost:8000`。

## 文件结构

```
index.html       主页面（样式 + 结构）
app.jsx          主程序：分页导航、目录、状态持久化
pages.jsx        各章节内容页
checklist.jsx    与医生沟通清单（可打印）
assets/          图片资源
  ├── anatomy.png  气管切开示意图
  └── compare.png  口腔插管 vs 气管切开对比图
```

## 技术栈

- React 18（通过 CDN 引入，不需要打包）
- Babel Standalone（浏览器端即时编译 JSX）
- Noto Serif SC / Noto Sans SC（Google Fonts）

## 许可

内容版权归原作者所有。
