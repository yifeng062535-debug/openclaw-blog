import type { PostModel } from './src/interfaces/post-model'

export const config = {
  site: 'https://openclaw-signal.pages.dev',
  description:
    'OpenClaw Signal 是一个围绕 OpenClaw 工作流、技能系统与实战教程构建的 Astro 纯前端博客。',
  siteName: 'OpenClaw Signal',
  author: 'Tang Hui',
  language: 'zh-CN',

  tip: '检测到新的静态内容，是否立即刷新信号面板？',
  tip_confirm: '刷新',
  tip_cancel: '稍后',

  postsPerPage: 6,
  linkAttr: 'abbrlink',
}

export const getPostLink = (post: PostModel) => `/posts/${post.data[config.linkAttr]}`
