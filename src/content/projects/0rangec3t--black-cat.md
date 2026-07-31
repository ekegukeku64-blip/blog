---
title: "0rangec3t/Black-cat"
owner: "0rangec3t"
name: "Black-cat"
fullName: "0rangec3t/Black-cat"
description: "Claude Code RedTeam Skill — Hypothesis-Driven Cognitive Architecture。一个假设-证据驱动的红队skill"
sourceUrl: "https://github.com/0rangec3t/Black-cat"
stars: 94
forks: 11
language: "未知"
topics: ["pentest", "pentest-tools", "red-team"]
license: "未标注"
defaultBranch: "master"
snapshotDate: "2026-07-31"
pushedAt: "2026-07-30T10:21:25Z"
---

> 本页保存的是公开项目资料快照，阅读过程不需要连接 GitHub。

# Black cat


  


一只头戴女巫帽的魔法黑猫。
Claude code Redteam skill

## 做这个 Skill 的原因

最近一直在看自动化渗透相关，尝试性写了几个框架，但是最后效果都不太满意。相反，之前当玩具写的 Skill 放在 Claude Code 里面，效果却出乎意料地好。

本 Skill 主要使用**假设—证据驱动**，为了模仿人在真实场景下的渗透测试。

## 与市面上所有 pentest skill 的本质区别

市面上的 pentest skill 都是 **Pipeline（流水线）**：Recon → Scan → Exploit → Report。每个 phase 绑定固定工具，失败就跳到下一步，没有回边。

我们的设计是 **State Machine（状态机）**：RECON ⇄ ENUMERATE ⇄ VALIDATE。证伪、失败和新发现都可以回到前面的状态重新开始。横向移动成功后在新目标上重启 RECON。

| 维度 | 市面 skill | 本 skill |
|------|-----------|---------|
| 驱动方式 | Tool-first（到这个 phase 就该跑 nmap） | **Hypothesis-first**（看到什么信号 → 形成假设 → 验证） |
| 流程模型 | 单向 Pipeline | **有回边的 State Machine** |
| 失败处理 | 跳到下一步（sqlmap negative = 没有 SQLi） | **证伪产生新假设**（sqlmap negative = 大概率 ORM → 转查 Mass Assignment） |
| 证据 | 孤立截图 | **可追溯因果链** Observation → Reproduction → Impact |
| 目标切换 | 不支持 | **状态机重启**：进入新网段 → 新 RECON |
| 运行时追踪 | 无或分散文件 | **单文档 Engagement Tracker**（Active/Confirmed/Killed 三类状态） |
| 上下文管理 | 全部加载 | **显式文件路由**，活跃技术目录默认 1 个、最多 2 个 |
| 清理义务 | 无 | **Cleanup Ledger** 追踪所有工件 |
| 决策记录 | 隐式 | **显式 Decision Log** 记录每个 Gate 的选择和理由 |

## 架构

```
┌─────────────────────────────────────────────┐
│  SKILL.md (98 行)                           │
│  L1: 7 个强制约束                            │
│  L2: 有回边的 State Machine + Decision Gates │
│  L3: 信号 → 动作链                           │
├─────────────────────────────────────────────┤
│  6 个 technique 文件（显式文件路由）          │
│  信号→假设→验证→证实→证伪→升级               │
│  默认 1 个，最多 2 个                        │
├─────────────────────────────────────────────┤
│  Engagement Tracker (运行时唯一真相源)       │
│  ⚡ Active → ✅ Confirmed / ❌ Killed         │
│  evidence/{id}/ 独立证据目录                 │
└─────────────────────────────────────────────┘
```

### 文件结构

```
skills/pentest-redteam/
├── SKILL.md                     # L1+L2+L3 核心框架
├── techniques/
│   ├── web.md                   # 信息收集 + 漏洞发现 + Web 利用
│   ├── ad.md                    # 内网三阶段：信息收集→OPSEC横向→提权维持
│   ├── cloud.md                 # 容器逃逸/K8s/IAM/Serverless
│   ├── evasion.md               # 免杀/EDR对抗/C2隐匿 + BOF开发 + Telemetry分散
│   ├── database.md              # MySQL/PG/MSSQL/Oracle/NoSQL
│   └── reversing.md             # APK/IPA/EXE/固件逆向
└── templates/
    ├── engagement-tracker.md    # 复制到工作区 ./engagement-tracker.md 作运行时唯一真相源
    ├── finding-report.md        # 单个 Finding 格式
    └── engagement-report.md     # 最终报告模板
```

## 攻击面覆盖

### Web 渗透
- CDN 绕过 + 内部主机名泄露（多引擎 SSL 证书/Favicon/CT 日志全量采样）
- JS Source Map 源码还原 + 端点提取（unwebpack-sourcemap → LinkFinder → SecretFinder）
- 企业拓线（GA/Hotjar 追踪 ID 反向查询 + ICP 备案反查 + CI/CD 制品扫描）
- API Fuzzing（Kiterunner 路由爆破 + HTTP Method 切换 + deprecated 端点）
- GraphQL 攻击面（Introspection / 别名过载 / 批处理 / 订阅劫持，跳过 DoS）
- 供应链攻击（6 生态依赖混淆 + CI/CD 审计 + Octoscan repo-jacking 检测）
- ORM Leaking（跨 Django/Prisma/Beego/Entity Framework/OData，比较操作符二分提取）
- 递归请求利用 RRE（多步骤 API 流程状态机遍历找鉴权缺口，DEF CON 33）
- Delimiter Smuggling（跨组件解析器分隔符语义差异走私，DEF CON 33）
- WAF 绕过 8 种策略（HPP/HPF/编码/正则逆向工程）
- 反序列化（Java/PHP/.NET 完整 Gadget 链）
- ★ Fastjson 1.x CVE-2026-16723（@JSONType 注解绕过，不需 AutoType/gadget/JNDI）
- ★ Fastjson 2.x（FNV-1a 哈希碰撞绕过，≤ 2.0.62，不做字符串等值验证）
- SSRF 完整升级链（8 种 IP 编码 + 盲 SSRF 转可见重定向链 + Redis 主从 RCE）
- SSTI 沙箱逃逸（44+ 引擎 Polyglot + 继承链遍历）
- XXE 7 种变体 + SAML Void Canonicalization 签名绕过
- JWT/SAML 认证绕过（算法混淆 + 空签名 + XSW1-XSW8）

### AD / 内网（三阶段：信息收集→OPSEC横向→提权维持）

**Phase 1 — 信息收集（零命令行，全部 BOF/原生 API）**：
- BloodHound CE v4.3+ 采集（含 AzureHound Entra ID + OpenGraph 跨平台）
- 15 条命令→API 映射表（GetExtendedTcpTable替代netstat、GetAdaptersAddresses替代ipconfig、LDAP直连替代net group 等）
- Ghost SPNs + Kerberos Reflection（CVE-2025-58726）+ lolol.farm 综合索引

**Phase 2 — OPSEC 横向（零进程创建）**：
- PTH/PTT 通过原生 API（COM WMI/原生 SCManager/BOF WinRM）
- MSSQL Linked Server 链式横向 + Kerberos 反射横向 + RMM 工具滥用（LOLRMM）
- Windows Admin Center 反射 RPE（CVE-2026-26119）+ Dev Tunnels/LOT Tunnels

**Phase 3 — 提权与维持**：
- ADCS ESC14-17（altSecurityIdentities/Application Policy/安全扩展禁用/Certighost）
- BadSuccessor dMSA→域管（DEF CON 33）+ LSA 保护绕过（nanodump multilayered）
- AD 持久化 9 种 + Entra ID 混合持久化（EntraGoat 六大场景）+ AAD Connect 密码提取

### 云环境
- Copy Fail CVE-2026-31431 无特权容器逃逸
- 容器逃逸 11 种路径全集（CDK）
- badPods 五维风险分级
- K8s Admission Webhook 后门 + etcd 直接访问
- Shadow API Server 持久化
- IMDS 元数据探测 + IAM 权限枚举
- AWS IAM 信任策略后门 + sts:GetFederationToken 存活
- Lambda Serverless 后门（Extension 注入）
- Azure AD Connect 密码提取

### 免杀 / EDR 对抗

**工具链免杀开发（BOF + 原生 API）**：
- BOF 开发方法论（Dynamic Function Resolution/栈字符串/符号解析）
- 15 条命令→API 对照表（GetExtendedTcpTable/GetAdaptersAddresses/LDAP直连等）
- 4 种内网免杀模式（全BOF/.NET内存执行/间接syscall/LOL+参数混淆）
- 6 项内网免杀检查清单

**Telemetry 分散与进程拆分**：
- 进程分叉 + 操作拆分（Divide and Conquer——父子孙进程拆分注入链）
- 无线程进程注入（Entry Point Hijacking——修改PE入口点劫持执行流）
- SysWhispers4（Win11 24H2 + ARM64 + WoW64 全架构）

**内容免杀**：
- AI 免杀管线（Trae+Skills 迭代 + LLVM IR 混淆 + LLM 反推规则）
- Ankou Poly Engine + COFF Mixing
- AMSI WRITE RAID（零 VirtualProtect）+ AMSI 5 层复合 + ETW 完全禁用

**运行时对抗**：
- EDR-GhostLocker（AppLocker 反制 EDR）+ Kernel Callback Removal + BYOVD 终结链
- 硬件断点调用栈欺骗（hw-call-stack）+ SilentMoonwalk ROP 解同步
- Caro-Kann 两阶段绕过（EDR 扫描时机差）

**C2 隐匿**：
- Dev Tunnels C2（Ouroboros）+ 6 信道隐匿 + Cavern C2 7 层反分析

### 数据库
- MySQL Rogue Server 客户端攻击 + FEDERATED 链式横向
- MySQL general_log 写 Webshell + UNC Path NTLM 窃取
- PostgreSQL COPY PROGRAM RCE + PL/PythonU RCE
- MSSQL xp_cmdshell + OLE Automation + CLR 程序集 RCE
- MSSQL Linked Server 多级链式横向
- Oracle DBMS_SCHEDULER + TNS Poisoning
- MongoDB NoSQL 注入 + Redis 未授权 RCE 5 条路径

### 逆向
- Android 加固检测 + 脱壳（FART/FRIDA-DEXDump/Youpk）
- JNI/SO 层 Frida hook + 动态调试
- SSL Pinning 绕过 + 移动端 API 提取
- iOS 砸壳 + Keychain dump
- 二进制补丁 Diff 反推漏洞（Ghidriff + AutoPiff）
- .NET 反编译/反混淆（de4dot + dnSpy）
- 固件提取与解包（binwalk） + U-Boot 分析


## 使用方式

### 安装

将下面这句话发给 Claude Code：

> 帮我安装 https://github.com/0rangec3t/Black-cat

### 使用

在 Claude Code 中加载 skill：

```
/skill pentest-redteam
```

或直接在对话中描述目标，skill 会自动按信号匹配技术目录。

**授权声明**：本 skill 仅用于已明确授权的渗透测试。使用前确认目标授权范围、操作深度和时间窗口。

## 未完待续......
