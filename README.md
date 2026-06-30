# AIGC Portfolio

这是一个用于展示 AIGC 图像作品与可定制画风的作品集页面。

页面主要面向想了解作品效果、选择画风方向或沟通定制需求的观众。内容按不同类型整理，包括直出样本、画风集合、初稿到重构案例，以及部分自研辅助工具。观众可以通过作品集快速判断画面风格、角色表现、多人构图、背景重构和最终完成度是否符合需求。

在线访问：

```text
https://removeshort-prog.github.io/aigc-portfolio/
```
<img width="1748" height="959" alt="image" src="https://github.com/user-attachments/assets/d6bee651-fc67-48bd-a30e-767fcfe6088c" />

## 内容说明

- **多人图：** 展示多人站位、角色区分、遮挡关系、服装材质和画面稳定性。
- **单人角色：** 展示角色脸部、姿态、服装细节、光影和整体完成度。
- **画风集合：** 展示可参考或可选择的不同画风方向，方便定制前沟通审美倾向。
- **初稿到重构：** 展示从初稿到重构后的变化，包括角色排版、背景空间、光影统一和画面层次。
- **自研辅助工具：** 展示部分围绕图像生产流程开发的小工具。

## 画风定制参考

如果需要定制图片，可以先从作品集中选择接近目标的画风或案例，再沟通：

- 角色数量：单人 / 双人 / 多人
- 画风方向：厚涂、赛璐璐、插画感、游戏宣发感等
- 画面需求：头像、半身、全身、横图、竖图、封面图等
- 重点要求：角色姿态、服装材质、背景复杂度、光影氛围、构图关系

作品集中的图片主要作为风格与完成度参考，具体效果会根据角色、素材和需求进行调整。

## 维护说明

本项目是静态页面，启用 GitHub Actions 后，可以只上传图片，自动生成图集、压缩图片并部署到 GitHub Pages。

## 更新图片

把图片上传到对应文件夹后提交到 `main` 分支即可。

### 直出样本

- 多人图：`assets/works/direct/group/`
- 单人图：`assets/works/direct/single/`
- 画风集合：`assets/works/direct/styles/`

每个文件夹里可以放一张封面图，命名为：

```text
cover.jpg
cover.png
cover.webp
```

没有封面时，会自动使用文件夹里的第一张图作为封面。

### 初稿到重构

每个案例一个文件夹：

```text
assets/works/rebuild/案例名称/before.jpg
assets/works/rebuild/案例名称/after.jpg
```

也支持中文命名：

```text
原图.jpg
初稿.jpg
重构.jpg
成品.jpg
```

案例标题、说明和标签可以在同一个文件夹里加 `meta.json`：

```json
{
  "title": "背景重构案例",
  "summary": "保留角色主体，重新整理背景空间、光影和画面层次。",
  "tags": ["Before", "After", "背景"]
}
```

如果没有 `meta.json`，标题会自动使用文件夹名，说明会使用默认文案。

## 自动部署设置

首次使用需要在 GitHub 仓库里设置：

1. 进入仓库 `Settings`
2. 打开 `Pages`
3. `Build and deployment` 的 `Source` 选择 `GitHub Actions`
4. 回到仓库上传或提交文件
5. 等 `Actions` 里的 `Build and Deploy Pages` 变成绿色

## 本地预览

本地改图后也可以手动生成：

```powershell
node scripts\generate-gallery.js
python scripts\build-publish.py
```

然后打开 `_site/index.html` 查看压缩后的发布版本。
