---
title: "OpenClaw Skills 使用教程（从入门到实战）"
date: 2026-06-16
abbrlink: openclaw-skills-guide
tags:
  - OpenClaw
  - Skills
  - 教程
language: zh
description: "下面给你写一篇完整、入门级的 OpenClaw Skills 使用教程（含原理 + 安装 + 编写 + 调试），尽量让你看完就能自己动手做一个 skill。"
---
下面给你写一篇**完整、入门级的 OpenClaw Skills 使用教程（含原理 + 安装 + 编写 + 调试）**，尽量让你看完就能自己动手做一个 skill。

---

# 🦞 OpenClaw Skills 使用教程（从入门到实战）

OpenClaw 的 **Skills（技能）** 是一种“行为规则包”，用来告诉 AI 在特定任务下应该怎么做。它本质是一个带有规则的 `SKILL.md` 文件，用来扩展 AI 的能力，而不是修改模型本身。([digitalocean.com](https://www.digitalocean.com/resources/articles/what-are-openclaw-skills?utm_source=chatgpt.com))

简单理解：

> Skill = 一份“工作流程说明书”，让 OpenClaw 在遇到某类任务时按固定步骤执行

---

# 1️⃣ Skills 的基本结构

一个 OpenClaw Skill 本质就是一个文件夹，里面至少包含：

```plain text
skills/
  my-skill/
    SKILL.md
```

其中核心文件是：

```plain text
SKILL.md
```

---

## 🧠 SKILL.md 的基本格式

一个标准 skill 文件包含两部分：

### ✔ YAML 头（metadata）

```yaml
---
name: hello-skill
description: 处理问候类请求
user-invocable: true
---
```

### ✔ 正文（行为规则）

```markdown
# Hello Skill

当用户请求问候时：

1. 判断用户是否在打招呼
2. 如果是：
   - 使用 echo tool 回复 "Hello from OpenClaw Skill!"
3. 如果不是：
   - 不要触发此 skill
```

👉 这就是 skill 的核心：**规则 + 判断 + 执行流程**

---

# 2️⃣ 安装 OpenClaw Skills

## 📦 方法 1：CLI 安装（推荐）

```bash
openclaw skills install log-triage
```

或者从 ClawHub：

```bash
openclaw skills install <skill-slug>
```

([GitHub](https://github.com/VoltAgent/awesome-openclaw-skills?utm_source=chatgpt.com))

---

## 📁 方法 2：手动安装

复制到本地目录：

```plain text
~/.openclaw/skills/
```

或者项目目录：

```plain text
your-project/skills/
```

优先级是：

> workspace > local > bundled

([lumadock.com](https://lumadock.com/tutorials/openclaw-skills-guide?utm_source=chatgpt.com))

---

## 🔄 启用 skill

安装后需要重启 OpenClaw：

```bash
openclaw gateway restart
```

或：

```bash
/new
```

---

# 3️⃣ 如何编写一个 Skill（核心重点🔥）

下面我们做一个真实可用的 skill👇

---

## 🎯 示例：日志分析 Skill（log-triage）

### 📁 目录结构

```plain text
skills/
  log-triage/
    SKILL.md
```

---

## ✍️ SKILL.md 内容

```yaml
---
name: log-triage
description: 自动分析系统日志并总结错误
user-invocable: true
---
```

````markdown
# Log Triage Skill

当用户请求日志分析时：

## 步骤

1. 询问用户：
   - 服务名称
   - 时间范围

2. 执行日志获取：
   - Linux: journalctl
   - Docker: docker logs

3. 分析规则：
   - 统计重复错误
   - 找出最频繁异常
   - 标记 critical error

4. 输出格式：

## Summary
- Error count:
- Most frequent error:
- Time range:

## Raw command used:
```bash
<实际执行命令>
````

1. 如果日志为空：
  - 告知“未找到日志”
  - 提供排查建议
```plain text

---

# 4️⃣ Skill 的工作原理（很重要）

OpenClaw 执行 skill 时大致流程：
```

用户输入

↓

Skill 匹配（description / trigger）

↓

加载 SKILL.md

↓

AI 按规则执行步骤

↓

调用工具（shell / api / echo）

↓

返回结果

```plain text

👉 Skill 本身不是程序，而是：

> “给 AI 的执行剧本”

---

# 5️⃣ Skill 设计技巧（进阶🔥）

## ✅ 1. 写清触发条件

不好：
```

处理日志

```plain text

好：
```

当用户请求 system logs / error logs / docker logs 时触发

````plain text

---

## ✅ 2. 明确输出格式

建议强制结构化：

```md
输出必须包含：
- Summary
- Root cause
- Suggested fix
````

---

## ✅ 3. 加“防呆规则”

例如：

```plain text
如果信息不足，必须先提问，不允许直接执行
```

---

## ✅ 4. 限定工具使用

例如：

```plain text
只能使用 journalctl，不允许使用 rm / kill
```

👉 这是 OpenClaw Skills 的安全关键点（很重要）

([TechRadar](https://www.techradar.com/pro/what-are-openclaw-skills-a-detailed-guide?utm_source=chatgpt.com))

---

# 6️⃣ 调试 Skill 方法

## 🧪 方法 1：list skills

```bash
openclaw skills list
```

---

## 🧪 方法 2：查看是否加载

启动后看日志：

```plain text
Skill loaded: log-triage
```

---

## 🧪 方法 3：测试触发

直接输入：

```plain text
帮我分析 docker logs
```

看 skill 是否自动触发。

---

# 7️⃣ 常见问题

## ❓ Skill 不生效？

检查：

- name 是否一致
- SKILL.md 是否在正确目录
- 是否重启 OpenClaw
---

## ❓ skill 被覆盖？

优先级：

```plain text
workspace > local > bundled
```

([lumadock.com](https://lumadock.com/tutorials/openclaw-skills-guide?utm_source=chatgpt.com))

---

## ❓ skill 乱触发？

优化 description，增加限制条件：

```plain text
only trigger when explicitly asking for logs
```

---

# 8️⃣ 总结

OpenClaw Skills 的本质是：

> 🧠 “用 Markdown 写 AI 的行为脚本”

你需要记住三点：

### ✔ 结构

- SKILL.md + YAML + rules
### ✔ 核心

- 描述触发条件
- 定义执行步骤
- 控制工具调用
### ✔ 本质

- 不写代码，写“行为逻辑”
---

# 🚀 如果你想继续深入

我可以帮你做这些进阶内容：

- 👉 写一个「自动写代码 Skill」
- 👉 写一个「ChatGPT prompt 优化 Skill」
- 👉 做一个「Git 自动提交 Skill」
- 👉 或者帮你设计一个完整 Skill 系统（像插件生态）
只要说一声 👍
