# MCP（模型上下文协议）全体系知识笔记：基础+进阶+协议交互（含Agent实现原理）
本笔记整合MCP基础篇、进阶篇及抓包分析番外篇核心内容，从**基础概念、实操使用、自定义开发**到**MCP Host与大模型的交互协议、Agent底层实现原理**层层拆解，彻底讲清MCP的全链路运作逻辑，以及MCP与AI Agent的核心关联，以下是完整知识点总结：

## 一、MCP 核心基础认知
### 1. 定义与核心价值
- **全称**：Model Context Protocol（模型上下文协议），2024年11月25日由Anthropic发布；
- **核心定位**：**大模型与外部工具之间的标准化通信协议**，让原本只会问答的大模型拥有调用外部工具的能力（如查天气、抓网页、操作软件），是AI Agent实现工具调用的底层基础；
- **本质**：规定了**MCP Host与MCP Server**之间的通信规则，**与大模型无直接关联**，脱离大模型也可独立使用。

### 2. 三大核心组件
| 组件         | 本质/定义                                                                 | 常见实例/说明                                                                 |
|--------------|---------------------------------------------------------------------------|-----------------------------------------------------------------------------|
| **MCP Host** | 大模型与MCP Server的**中间桥梁**，支持MCP协议的软件/载体                   | Claude Desktop、Cursor、**Cline（VS Code插件，教程主用）**、Cherry Studio|
| **MCP Server** | 符合MCP协议的**本地程序**（与传统远程服务器无关），内置功能模块             | 可由Python/Node/Java编写，支持本地/联网运行，如weather（查天气）、fetch（抓网页）|
| **Tool（工具）** | MCP Server内置的功能模块，**本质是编程语言中的函数**                       | 接收指定输入参数，执行特定任务并返回结果，如`get_forecast`（经纬度查天气）、`get_alerts`（气象预警）|

### 3. 关键配套知识
- **主流启动方式**：运行MCP Server的工具，`uvx`（启动Python编写的MCP Server，依赖Python包管理工具UV）、`npx`（启动Node编写的MCP Server，Node自带）；
- **通信方式**：MCP Host与MCP Server的交互模式，主流**stdio**（通过标准输入/输出通信），小众`sse`（服务端推送）；
- **入参规范**：Tool的参数遵循**JSON Schema**，约束参数类型/必填项，确保大模型传入参数格式正确。

## 二、MCP 基础实操：安装配置与快速使用（以Cline为例）
核心目标：完成Cline环境配置，实现现成MCP Server的安装、调用，让大模型通过MCP实现**实时/工具类功能**（如查纽约天气）。

### 1. 基础环境准备
1. 安装**VS Code**，在插件市场安装**Cline插件**（MCP Host）；
2. 获取API Key：可选Open Router（支持多模型，含免费/付费）、DeepSeek、Anthropic，**Open Router的Key仅创建时可见，需手动记录**；
3. 配置Cline：进入Cline设置，选择API Provider、填入API Key、选择模型（对MCP支持最好：Claude 3.7；高性价比：DeepSeek V3.0324），同步配置Plan/X双模式。

### 2. MCP Server 安装与启动（两种方式）
#### （1）自动安装（模型主导，简单但可控性低）
- 直接向Cline提需求（如“纽约明天的天气怎么样？”），模型自动推荐对应MCP Server，按提示确认即可；
- 或在Cline的MCP Server市场（类似手机应用市场），直接点击`install`安装现成程序。

#### （2）手动配置（通用可控，推荐）
1. 进入Cline的`installed → configure mcp servers`，打开**JSON配置文件**；
2. 按规范添加配置，核心字段：
   ```json
   {
     "name": "weather", // MCP Server名称
     "timeout": 60, // 连接超时时间（秒）
     "command": "uvx", // 启动程序
     "args": ["xxx"], // 启动参数
     "transport_type": "stdio" // 通信方式（主流stdio）
   }
   ```
3. 保存配置，Cline自动加载，绿色开关表示启动成功（禁用则加`"disabled": true`）。

### 3. MCP Server 实战调用（天气查询为例）
1. 启动`weather` MCP Server（内置`get_forecast`/`get_alerts`两个Tool）；
2. 向Cline提需求：“纽约明天的天气怎么样？”；
3. Cline识别可用MCP Server/Tool，请求用户确认调用，点击`approve`；
4. MCP Server执行Tool并返回结果，大模型总结后输出最终答案（气温、天气状况、出行建议）。

### 4. 现成MCP Server 调用（uvx/npx）
#### （1）uvx启动（Python编写，如fetch抓网页）
1. 安装**UV**（Python包管理工具），执行官方安装命令；
2. 在MCP市场（mcp.so/mcp.market）复制uvx启动配置，粘贴到Cline的JSON文件；
3. 若加载超时（首次需下载依赖），**先在终端执行启动命令完成下载**，再回到Cline点击`retry connection`；
4. 提需求调用（如“抓取XX网页内容并转成Markdown保存”）。

#### （2）npx启动（Node编写，如hotnews拉取新闻）
1. 安装**Node.js**（npx为其自带工具，无需额外安装）；
2. 复制MCP市场的npx配置到Cline的JSON文件，直接调用，超时处理方式同uvx。

### 5. MCP 基础交互流程（Host ↔ Server）
1. **注册握手**：Cline通过启动命令运行MCP Server，二者完成协议握手，Cline查询MCP Server的**Tool列表**并记录；
2. **用户提需求**：Cline将**用户问题+已注册的MCP Server/Tool列表**传给大模型；
3. **模型决策**：大模型判断自身无法解答，选择匹配的Tool，向Cline发送**Tool调用请求（含参数）**；
4. **Tool执行**：Cline将请求传给MCP Server，MCP Server执行Tool并返回结果；
5. **结果返回**：Cline将Tool结果传给大模型，大模型总结后通过Cline返回给用户。

## 三、MCP 进阶开发：从零编写MCP Server（Python版）
核心目标：用Python自定义开发MCP Server（以weather为例），掌握Tool注册、参数约束、协议通信的核心逻辑。

### 1. 开发前准备
1. 环境：Python 3.10+（MacOS自带，Windows需手动安装）；
2. 工具：UV（Python包管理）、VS Code（代码编写）、Cline（测试）；
3. 安装依赖：终端执行`uv add mcp-cli httpx`（`mcp-cli`为MCP开发核心，`httpx`用于HTTP请求）。

### 2. 项目初始化（终端命令）
```bash
uv new weather # 新建项目
cd weather      # 进入项目目录
uv venv         # 新建虚拟环境（避免依赖污染）
source .venv/bin/activate # 激活虚拟环境（终端前缀显示(weather)）
```

### 3. 核心代码编写（weather.py）
整体逻辑：**初始化MCP实例 → 编写工具函数 → 注册Tool → 配置启动项**
1. **初始化MCP Server**：通过`fast_mcp`函数创建实例，设置日志级别避免干扰；
2. **编写工具函数**：实现具体功能（如`get_forecast`调用美国气象局API查天气），对返回结果格式化；
3. **注册Tool**：通过**装饰器**将函数注册为MCP Tool，装饰器会自动提取**函数注释（docstring）**和**参数定义**，生成Tool的描述、入参规范（JSON Schema）；
4. **配置启动项**：指定通信方式为`stdio`，编写启动代码，让程序运行时启动MCP Server。

### 4. 注册到Cline并测试
1. 按基础篇**手动配置方式**，在Cline的JSON文件中添加自定义MCP Server的启动配置（指向`weather.py`）；
2. 保存配置，Cline自动加载；
3. 提需求“纽约明天的天气怎么样？”，确认调用后若能正常返回结果，说明开发成功。

### 5. MCP 协议底层拆解（抓包分析）
通过编写**mcplogger.py**脚本作为中间层，**截取Cline与MCP Server的输入/输出日志**，分析协议的核心通信规则：
1. **握手阶段**：Cline发送协议版本、自身版本；MCP Server回复协议版本、自身名称/版本、不支持的能力；
2. **Tool列表查询**：Cline请求Tool列表，MCP Server返回所有Tool的**描述、入参规范（JSON Schema）**（信息来自函数注释和参数）；
3. **资源查询**：Cline询问是否有资源/资源模板，一般返回空列表；
4. **Tool调用阶段**：Cline发送**Tool名称+符合JSON Schema的参数**；MCP Server执行后返回格式化结果；
5. **结束阶段**：Tool调用完成，二者交互终止，Cline将结果传给大模型。

### 6. 无MCP Host 直接与MCP Server通信
MCP协议是标准化规则，无需借助Cline，可直接在终端交互：
1. 终端执行MCP Server的启动命令，运行自定义的`weather`程序；
2. 按MCP协议规范，输入**JSON格式指令**（握手、查Tool列表、调用Tool）；
3. MCP Server按规范返回JSON结果，此时**用户自身就是MCP Host**。

## 四、MCP 高级核心：MCP Host 与大模型的交互协议（抓包分析Cline ↔ 模型）
通过**本地中转服务器**截取Cline与大模型的请求/返回日志，彻底讲清MCP Host与大模型的交互逻辑，以及这一过程如何支撑**AI Agent的实现**。

### 1. 抓包方案设计
1. 搭建**本地Python中转服务器**（基于FastAPI），作为Cline与大模型（如Open Router）的中间层；
2. Cline配置为连接本地服务器（选择`OpenAI Compatible`，填写本地服务器地址）；
3. 中转服务器将**Cline发给模型的请求**和**模型返回给Cline的结果**写入日志文件，实现抓包分析。

### 2. 核心技术：SSE（Server Sent Events，服务端推送）
- **作用**：实现大模型的**流式输出**（一字一句生成答案），提升用户体验；
- **原理**：浏览器/客户端仅请求一次，服务器连续多次返回结果，每次携带部分内容，完成后发送结束标识，关闭连接；
- **对比传统HTTP**：传统HTTP是“一次请求一次响应”，无法实现流式输出，SSE是大模型聊天界面的主流实现方式。

### 3. Cline 与大模型的交互核心：System Prompt（系统提示词）
Cline发给大模型的请求中，核心是**超长篇System Prompt**（约4.8万字符），是约束大模型行为的“规则手册”，核心内容包括：
1. **工具使用格式**：规定大模型必须用**XML格式**发起工具调用请求，外层为工具名，内层为参数名/值；
2. **工具列表**：告知大模型可用的两类工具——**Cline内置工具**（ReadFile/WriteToFile/ExecuteCommand等）、**MCP Tool**（UseMCPTool/AccessMCPResource）；
3. **关键工具说明**
   - `UseMCPTool`：调用MCP工具的核心标签，参数为`ServerName`（MCP Server名）、`ToolName`（工具名）、`Arguments`（入参）；
   - `AttemptCompletion`：返回最终结论的标签，模型完成任务后，将结果放入`result`参数，Cline接到后结束对话；
   - `Thinking`：模型**做任何操作前必须先执行**的思考标签，强制模型思考，提升决策准确率；
4. **已连接的MCP Server**：将Cline中配置的MCP Server/Tool列表、每个Tool的用途/入参规范（JSON Schema）告知模型；
5. **运行规则**：模型的工作流程、格式要求、首选语言、Plan/X模式区别等。

### 4. Cline ↔ 大模型的完整交互流程（以查天气+写入文件为例）
1. **用户提需求**：“纽约明天的天气怎么样？把结果写入results.md”；
2. **模型第一次返回**：XML格式，包含`<Thinking>`（思考如何查天气）+`<UseMCPTool>`（请求调用weather的get_forecast，参数为纽约经纬度）；
3. **Cline执行Tool**：调用MCP Server的get_forecast，获取天气结果，**将历史对话+Tool结果**再次发给大模型（大模型无记忆，需传递历史信息）；
4. **模型第二次返回**：XML格式，包含`<Thinking>`（思考如何写入文件）+`<WriteToFile>`（请求调用内置工具，参数为文件路径/天气结果）；
5. **Cline执行内置工具**：将天气结果写入results.md，把**写入成功的结果**再次发给大模型；
6. **模型第三次返回**：XML格式，包含`<Thinking>`（确认任务完成）+`<AttemptCompletion>`（返回最终总结）；
7. **Cline结束对话**：接到`<AttemptCompletion>`标签，展示最终结果，交互终止。

### 5. 日志关键细节
- **请求部分**：包含模型类型、System Prompt、用户问题、系统环境信息（当前文件/时间/tab）、配置（temperature控制模型随机性、stream=true开启流式输出）；
- **返回部分**：SSE流式返回，每行以`data:`开头为有效JSON，`content`字段**增量返回**（拼接所有content即为完整结果），以冒号开头的是注释（仅用于保持连接，防止超时）。

## 五、MCP 与 AI Agent 的核心关联：基于ReAct模式的实现原理
MCP是AI Agent实现**工具调用**的底层协议，而Cline等MCP Host的核心运作逻辑，正是基于AI Agent最主流的**ReAct模式**，这也是MCP的最终落地价值。

### 1. ReAct 模式核心定义
- **全称**：Reasoning and Acting（思考与行动），2022年论文提出，是AI Agent最基础、最主流的构建模式；
- **核心逻辑**：**思考（Thought）→ 行动（Action）→ 观察（Observation）** 循环，直至完成任务；
- **本质**：让模型自主思考、自主调用外部工具，无需人工干预，持续执行直至解决用户问题。

### 2. Cline 是典型的ReAct模式AI Agent
Cline与大模型的交互流程，完美契合ReAct模式，XML格式只是**数据传输载体**，核心是ReAct的思考-行动-观察逻辑：
| ReAct 环节   | Cline ↔ 模型的对应实现| 说明                                                                 |
|--------------|-----------------------------------------------------------------------|----------------------------------------------------------------------|
| **思考（Thought）** | 模型返回`<Thinking>`标签，分析任务、选择工具| 强制模型思考，是ReAct的核心前提|
| **行动（Action）** | 模型返回`<UseMCPTool>`/`<WriteToFile>`等工具调用标签，Cline执行工具 | 模型通过工具改变/感知外部环境，是Agent的“动手能力”|
| **观察（Observation）** | Cline将工具执行结果（天气/写入成功）回传给模型| 模型获取行动结果，作为下一步思考的依据|
| **循环/结束** | 模型根据观察结果再次思考→行动，直至任务完成，返回`<AttemptCompletion>` | 完成循环后，用最终结论结束对话|

### 3. 格式无关性：ReAct模式不绑定具体传输格式
XML是Cline选择的传输格式，ReAct模式的核心是**思考-行动-观察的逻辑**，可适配任意格式，如：
- **纯文本格式**：`Thought: 查纽约天气→Action: get_forecast(40.7128,-74.006)→Observation: 纽约明天20℃晴→Final Answer: 纽约明天20℃晴`；
- **JSON格式**：用`{"thought":"...","action":"..."}`封装，更易被程序解析；
- **XML格式**：Cline使用，表达更精确，适合复杂参数传递。

### 4. 构建AI Agent的核心要素（基于MCP+ReAct）
想要开发一个类似Cline的AI Agent，核心需要3点，MCP负责实现工具调用的底层通信，ReAct负责实现任务执行的逻辑：
1. **定义返回格式**：明确模型的输出格式（XML/JSON/纯文本），让程序可解析；
2. **告知工具列表**：将内置工具+MCP Tool的名称、参数、用途告知模型；
3. **强制ReAct模式**：通过System Prompt要求模型**先思考、再行动、最后总结**，实现思考-行动-观察的循环。

## 六、MCP 全体系核心总结
1. **MCP的核心定位**：大模型与外部工具的**标准化通信桥梁**，是AI Agent工具调用的底层基础，仅规定Host与Server的交互，与大模型无直接关联；
2. **MCP的使用逻辑**：基础使用选现成MCP Server（uvx/npx启动），手动配置更可控；个性化需求用Python/Node自定义开发，核心是**函数注册为Tool**；
3. **MCP的开发关键**：自定义MCP Server的核心是装饰器，自动提取函数注释/参数，生成Tool的描述和入参规范（JSON Schema），通信方式主流选择stdio；
4. **Host与模型的交互关键**：通过**超长篇System Prompt**约束模型行为，用**XML格式**实现工具调用的精确解析，用**SSE**实现流式输出，核心是传递历史对话（大模型无记忆）；
5. **MCP与Agent的关联**：MCP为Agent提供**工具调用的底层协议能力**，Agent基于**ReAct模式**将MCP的工具调用与“思考-行动-观察”的逻辑结合，实现自主化、自动化的任务执行；
6. **核心价值**：MCP解决了大模型“不会用工具”的问题，ReAct模式解决了大模型“不会自主做事”的问题，二者结合是当前AI Agent落地的核心方案，也是Claude Code、Cursor等工具的底层逻辑。

我可以帮你把这份MCP全体系笔记，与之前的AI底层逻辑、Agent、Claude Code笔记整合，生成**AI Agent从底层协议到实战工具的一站式知识手册**，标注各模块的关联和实操优先级，需要吗？