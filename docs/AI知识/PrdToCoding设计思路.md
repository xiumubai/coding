**目标与范围**
- 输入 PRD 链接（Markdown/Notion/Confluence/Google Docs/PDF/FIGMA 等）
- 拉取与解析 PRD，抽取需求项、验收标准、页面/接口/数据变更
- 扫描当前仓库，识别路由、页面、组件、services、状态管理、代码规范与别名
- 依据“PRD × 现有代码”自动拆分工程化任务
- 生成一份结构化“提示词文件”，可直接驱动 Trae 在本仓库内按任务生成/修改代码
- 支持附加信息融合：接口文档（OpenAPI/Swagger）、UI 图（Figma/图片 OCR）

**总体架构**
- 输入层
  - PRD 拉取器：从 URL 获取文档内容与元数据
  - 文档解析器：Markdown/HTML/PDF/Notion/Confluence/Google Docs/Figma
- 语义抽取层
  - PRD 归一化：拆分“功能需求、非功能、验收标准、界面/接口/数据点”
  - 领域对齐：页面/接口/状态/权限/埋点等维度结构化
- 代码理解层
  - 项目扫描：目录结构、路由、SFC/TS 文件、services、API 类型、状态、构建与别名
  - 代码规范洞察：语言/框架/包管理、eslint/prettier 配置、HTTP 封装与拦截器
- 规划层
  - 任务规划：将差异映射到可执行任务，生成任务树（依赖/优先级/影响面）
  - 产物规划：每个任务对应文件增删改、接口定义、组件骨架、测试与校验
- 出口层
  - 提示词合成器：把上下文+任务+约束渲染成一份“Trae 可执行提示词文件”
  - MCP 资源发布：以 MCP 的资源或 tool 结果形式输出该提示词（并可多版本管理）

**MCP 能力设计（Tools/Resources）**
- 工具（tools）
  - fetch_prd: { url } → { raw, format, meta }
  - parse_prd: { raw, format } → { features[], acceptance[], ui_refs[], api_refs[] }
  - scan_repo: { root } → { routes[], pages[], components[], services[], apis[], state[], aliases, conventions }
  - ingest_api: { openapi_url|file } → { endpoints[], schemas }
  - ingest_ui: { figma_url|images[] } → { ui_struct[], tokens }
  - plan_tasks: { spec, repo, api?, ui? } → { tasks[], deps_graph, impacts }
  - render_prompt: { spec, repo, tasks, api?, ui? } → { prompt_md, uri }
- 资源（resources）
  - prd://{id}: 结构化 PRD 摘要
  - repo://snapshot/{id}: 项目快照（路由、services 摘要、规范）
  - prompt://{id}: 生成的提示词文件（最新版本可读）
- 交互方式
  - 通常由一个 generate_prompt 复合工具驱动：输入 PRD 链接+可选 API/UI 链接，直接返回 prompt://URI

**核心流程**
- Step 1: fetch_prd → parse_prd → spec
- Step 2: scan_repo（AST+文件系统+配置）
- Step 3: ingest_api（可选）/ingest_ui（可选）
- Step 4: plan_tasks（基于 spec 与 repo 的差异映射）
- Step 5: render_prompt（合成可执行提示词：包含任务、目标文件、规范与校验）
- Step 6: 暴露 prompt 资源给 LLM/Trae 使用（或保存到仓库指定路径，经人工确认后运行）

**PRD 解析要点**
- Markdown/HTML：用统一管线切块（按 H1/H2/H3），抽取功能列表、验收标准、接口/字段、页面元素与交互
- Notion/Confluence/Google Docs：用官方 API 获取结构化内容（保留层级）
- PDF：基于版面/标题/编号识别切块，配合规则抽取（“接口：”“验收：”“出错提示：” 等）
- Figma/UI 图片：优先 Figma API（节点名、约束、样式 token）；图片可走 OCR+版面检测，得到组件树近似
- 输出统一的 Spec：features[], acceptance[], ui_refs[], api_refs[], glossary[], constraints[]

**代码库分析要点**
- 目录扫描：src、views/pages、components、router、services、store、api、types、assets
- AST 提取：
  - Vue SFC：解析 script/setup、defineComponent、defineProps/useRoute/useStore
  - 路由：识别路由注册与懒加载页面组件映射
  - Services/API：定位 axios/fetch 封装、拦截器、通用请求器、接口定义与类型
  - 别名与构建：vite.config/webpack、tsconfig paths、eslint/prettier
- 产出 repo 快照：约定与模式（命名风格、目录风格、错误处理、国际化、埋点）

**任务拆解策略**
- 映射规则
  - 页面/路由需求 → 新增/修改路由、创建页面骨架、注入布局与权限守卫
  - 接口需求 → 新增/修改 services 方法、类型定义、错误提示与 loading/空态
  - 组件/交互 → 创建/复用组件，编写 props/emits/状态，插入到页面
  - 状态/缓存 → store 模块/组合式函数、缓存策略（LRU、localStorage）
  - 埋点/错误/权限 → 对应 hooks/指令/拦截器
- 任务粒度与依赖
  - 以“可评估的用户可见/可测”粒度拆分；按路由→服务→页面→组件→细化交互排序
  - 每条任务附带：目标文件清单、具体变更点、验收标准、对现有规范的约束、潜在影响
- 失败回滚与增量
  - 记录每条任务修改的路径与 patch 范围；多次执行时可做差异合并

**提示词文件结构（推荐）**
- 存储位置建议：不默认写入仓库；若需要落盘，建议放 .trae/prompts/{slug}.md（执行前由你确认）
- 内容格式：Markdown + YAML Front Matter（便于人类审核与版本化）

示例片段：

```markdown
---
title: 活动H5-优惠券模块-一期
repo_root: /Users/guojianli/Documents/fuyou/fykc_customer_activity_h5
constraints:
  - 不允许重新启动项目
  - 不运行 npm run check
  - 保持现有代码风格与目录约定
project_conventions:
  language: ts
  framework: vue3+vite
  router: vue-router
  services_dir: src/services
  pages_dir: src/pages
  store: pinia
inputs:
  prd_url: https://...
  api_docs: https://.../openapi.json
  ui_refs:
    - figma: https://.../file/xxx
---

# PRD 摘要
- 功能：发券/领券/券包/核销态展示/异常态
- 验收：领取成功提示；重复领取提示；无券空态；网络错误提示

# 代码库快照（摘要）
- 路由：/coupon, /coupon/detail
- Services：couponService.ts 已有 list()，缺 create(), claim()
- 别名：@ 指向 src；统一使用 axios 封装 request()

# 待办任务
1. 新增接口方法：couponService.create、couponService.claim
   - 文件：src/services/couponService.ts（新增）
   - 验收：类型与响应对齐 OpenAPI；错误信息走统一提示
2. 新增页面：CouponClaimPage
   - 文件：src/pages/coupon/ClaimPage.vue（新增）
   - 内容：从 services 获取券列表，点击调用 claim，处理 loading/空态/错误
3. 路由注册
   - 文件：src/router/routes.ts（修改）
   - 新增 path /coupon/claim → CouponClaimPage
4. 埋点与异常
   - 文件：src/pages/coupon/ClaimPage.vue（修改）
   - 埋点 event：coupon_claim_click / coupon_claim_success / coupon_claim_error

# 接口契约
- POST /api/coupons/claim
  - request: { couponId: string }
  - response: { code: number; message: string; data?: { status: 'success' } }
- GET /api/coupons
  - response: { code: number; data: Coupon[] }

# 约束与风格
- 使用 src/services 下 axios 实例
- 错误提示使用 useToast
- 组件命名 PascalCase，文件夹 kebab-case
- 国际化 key 前缀 coupon.*

# 校验
- 执行存在的 lint/typecheck/build 命令；若无则跳过
- 手动检查：领取成功/重复/空态/网络错误四种路径
```

Trae 在执行该提示词时能明确：
- 在哪些文件创建/修改
- 采用何种 services/路由/页面约定
- 验收与校验标准
- 项目约束（例如不重启项目、不运行指定命令）

**技术选型建议**
- 首选 TypeScript MCP Server（更贴合前端/Node 项目）
  - 解析/AST：ts-morph（TS/JS）、@vue/compiler-sfc（Vue SFC）
  - FS 与匹配：globby/fast-glob
  - Markdown：unified + remark-parse/remark-gfm
  - PDF：pdf-parse 或 pdfjs-dist（简单提取）；更复杂可接第三方服务
  - OpenAPI：openapi-types/openapi-client-axios 或 swagger-client
  - Figma：官方 REST API
- 备选 Python MCP（对 PDF/OCR/NLP 更有生态优势）
  - pdfminer/Apache Tika、pytesseract、OpenAPI-core、tree-sitter/astroid

**最小可行版本（MVP）**
- 支持 Markdown PRD + Vue3/Vite 项目
- 只做两件事：
  - 从 PRD 抽取“页面/接口/验收”三类信息
  - 扫描 repo 的 router 与 src/services，生成 3–6 条可执行任务与提示词文件
- 后续再接 OpenAPI 与 Figma

**MCP 服务器骨架（TypeScript 示例，精简版）**

```ts
import { Server } from '@modelcontextprotocol/sdk/server';
import { z } from 'zod';

const server = new Server({ name: 'prd-planner', version: '0.1.0' });

server.tool('generate_prompt', {
  inputSchema: z.object({
    prdUrl: z.string().url(),
    repoRoot: z.string(),
    openapiUrl: z.string().url().optional(),
    figmaUrl: z.string().url().optional()
  }),
  description: '拉取PRD/解析/扫描仓库/规划任务/产出提示词',
  handler: async ({ prdUrl, repoRoot, openapiUrl, figmaUrl }) => {
    const raw = await fetchPrd(prdUrl);
    const spec = await parsePrd(raw);
    const repo = await scanRepo(repoRoot);
    const api = openapiUrl ? await ingestOpenapi(openapiUrl) : undefined;
    const ui = figmaUrl ? await ingestFigma(figmaUrl) : undefined;

    const plan = await planTasks({ spec, repo, api, ui });
    const prompt = await renderPrompt({ spec, repo, plan, api, ui });

    const uri = `prompt://${Date.now()}`;
    await publishResource(uri, prompt);
    return { uri, length: prompt.length };
  }
});

server.resource('prompt', {
  read: async (uri) => {
    return await loadPromptByUri(uri);
  }
});

server.start();
```

实现要点：
- fetchPrd/parsePrd：针对 Markdown 先实现，识别“接口/页面/验收”关键词与标题层级
- scanRepo：枚举 router + services，解析 axios 封装与已有方法名
- planTasks：基于差异生成任务（新增/修改/删除），确保每条任务包含目标文件与验收
- renderPrompt：合并“项目约定/限制/任务/接口契约/校验”生成 Markdown 文本
- publishResource：把提示词挂到 MCP 的资源空间，便于 LLM 直接读取

**接口文档与 UI 集成**
- OpenAPI
  - 拉取 json 后，限定只输出与本 PRD 相关的 endpoints，合并到“接口契约”段
  - 若项目已有统一 request 封装，映射生成 service 方法签名与类型
- Figma/UI
  - 抓取 frame 名称、层级与设计 token；将关键截图或组件树摘要放进提示词“UI参考”
  - 为页面任务附带“布局/组件/交互”约束关键词（如按钮命名/禁用态/空态）

**质量与对齐**
- 输出的提示词文件必须包含：
  - 任务清单与目标文件列表
  - 接口契约与类型约束
  - 项目规范与禁止事项（例如不重启项目）
  - 校验清单（行为路径+命令建议，若命令缺失则跳过）
- 生成前做两类校验：
  - 结构校验：YAML front matter 完备，任务至少一条，文件路径存在性检查（修改类）
  - 语义校验：任务与 PRD 的条目一一对应，接口方法与 OpenAPI 对上

**扩展方向**
- 增量更新：根据 PRD 哈希与文件 mtime 做缓存，复用已有扫描结果
- 任务依赖图：对跨模块变更做拓扑排序，确保执行稳定
- 多文档融合：PRD×OpenAPI×Figma×埋点文档×权限矩阵统一入模
- 回溯链路：提示词文件中记录版本号、PRD 摘要哈希与生成时间

**落地建议**
- 先按“Markdown PRD + Vue 项目”完成 MVP 的 generate_prompt 工具
- 用一个真实 PRD 链接跑通：输出提示词 → 在 Trae 中执行提示词
- 稳定后再引入 OpenAPI、Figma 支持与更细粒度的任务规划
