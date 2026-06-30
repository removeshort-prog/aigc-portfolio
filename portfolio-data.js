window.PORTFOLIO_DATA = {
  profile: {
    name: "我思故汝永存 / AIGC 视觉作品集",
    target: "AIGC Visual Design Intern",
    summary:
      "面向二次元游戏视觉内容，展示直出稳定性、编辑模型重构、Prompt 画面控制和自制辅助工具。",
  },

  socialLinks: [
    {
      kind: "bilibili",
      platform: "B站",
      value: "1.9w",
      label: "粉丝",
      url: "https://space.bilibili.com/651921014?spm_id_from=333.1007.0.0",
      note: "主要的作品集合",
    },
    {
      kind: "pixiv",
      platform: "Pixiv",
      value: "1w",
      label: "粉丝",
      url: "https://www.pixiv.net/users/106312931",
      note: "p站的作品",
    },
    {
      kind: "mail",
      platform: "邮箱",
      value: "Contact",
      label: "联系我",
      url: "2651173237@qq.com",
      note: "或者直接b站联系我",
    },
  ],

  directGroups: [
    {
      id: "group",
      title: "多人图",
      difficulty: "难度最高",
      folderHint: "assets/works/direct/group",
      cover: "./assets/works/direct/group/cover.jpg",
      fallback: "最强多人图作为封面，命名为 cover.jpg",
      summary:
        "用于展示多人站位、角色遮挡、动作差异、手部稳定、服装区分和画面中心控制。",
      judgePoints: ["多人关系", "站位遮挡", "手部稳定", "主体区分"],
      tags: ["直出", "多人", "高难度"],
      samples: [],
    },
    {
      id: "single",
      title: "单人角色",
      difficulty: "基础完成度",
      folderHint: "assets/works/direct/single",
      cover: "./assets/works/direct/single/cover.jpg",
      fallback: "最强单人图作为封面，命名为 cover.jpg",
      summary:
        "用于展示面部稳定、角色姿态、服装材质、光影控制和二次元角色审美。",
      judgePoints: ["面部稳定", "姿态动作", "服装材质", "光影控制"],
      tags: ["直出", "单人", "角色"],
      samples: [],
    },
    {
      id: "styles",
      title: "画风集合",
      difficulty: "风格覆盖",
      folderHint: "assets/works/direct/styles",
      cover: "./assets/works/direct/styles/cover.jpg",
      fallback: "画风集合拼图作为封面，命名为 cover.jpg",
      summary:
        "用于展示可控的画风收集、风格标签控制、色彩倾向和角色比例差异。",
      judgePoints: ["画风标签", "色彩倾向", "角色比例", "上色方式"],
      tags: ["直出", "画风", "集合"],
      samples: [],
    },
  ],

  rebuilds: [
    {
      title: "背景重构：从可用初稿到宣发完成度",
      before: "./assets/works/rebuild-01-before.jpg",
      after: "./assets/works/rebuild-01-after.jpg",
      beforeFallback: "初稿",
      afterFallback: "重构后",
      summary:
        "保留主体方向，重构背景空间、环境光和镜头层次，减少 AI 味和背景杂乱。",
      tags: ["背景", "光影", "空间"],
    },
    {
      title: "主体强化：人物稳定与画面中心",
      before: "./assets/works/rebuild-02-before.jpg",
      after: "./assets/works/rebuild-02-after.jpg",
      beforeFallback: "原图",
      afterFallback: "重构后",
      summary:
        "针对主体漂移、服饰细节弱、视觉中心不明确的问题进行二次处理。",
      tags: ["主体", "细节", "构图"],
    },
  ],

  tools: [
    {
      title: "Danbooru-getter",
      summary:
        "用于批量获取、整理和筛选 Danbooru 相关素材，服务于参考图收集和素材库建设。",
      tags: ["GitHub", "素材获取", "数据整理"],
      url: "https://github.com/removeshort-prog/Danbooru-getter",
    },
    {
      title: "sd-webui-memory-monitor",
      summary:
        "本地生成环境性能监控项目，用于观察显存占用和运行状态，辅助判断批量任务稳定性。",
      tags: ["GitHub", "性能监控", "效率工具"],
      url: "https://github.com/removeshort-prog/sd-webui-memory-monitor",
    },
    {
      title: "AI 图片编辑自定义端点页面",
      summary:
        "前端单页工具，支持自定义图像编辑端点、图片上传、参数输入和原尺寸结果处理。",
      tags: ["HTML", "API", "图像编辑"],
      url: "./assets/projects/ai-image-editor-custom-endpoint.html",
    },
  ],

};
