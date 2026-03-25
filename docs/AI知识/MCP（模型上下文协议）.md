# MCP（模型上下文协议）终极知识笔记：从基础原理到实战开发（基础+进阶篇）
本内容从**基础实操**到**进阶开发**全方位拆解Anthropic推出的**MCP（Model Context Protocol，模型上下文协议）**，涵盖核心概念、安装配置、实操使用、自定义开发及协议底层逻辑，彻底讲清MCP如何让大模型拥有调用外部工具的能力，以下是核心知识点总结：

## 一、MCP 核心基础认知
1. **定义与发布**：2024年11月25日由Anthropic发布的协议，直译“模型上下文协议”，核心是**让大模型更好地调用各类外部工具**的标准化通信规则。
2. **核心价值**：弥补纯大模型“只会问答、不会使用外部工具”的缺陷，让大模型能实现上网查询、操作软件、查询实时数据（天气/路况）等功能，拓展大模型的落地能力。
3. **关键核心概念**
    - **MCP Host**：支持MCP协议的软件/载体，是大模型与MCP Server的中间桥梁，常见如Claude Desktop、Cursor、**Cline（VS Code插件，教程主用）**、Cherry Studio；
    - **MCP Server**：本质是**符合MCP协议的本地程序**（与传统远程服务器无关），可由Python/Node等语言编写，内置实现具体功能的模块，支持本地/联网运行；
    - **Tool（工具）**：MCP Server内置的功能模块，**本质是编程语言中的函数**，接收指定输入参数，执行特定任务并返回结果（如查天气的`get_forecast`、抓网页的`fetch`）；
    - **主流启动方式**：运行MCP Server的常用工具，`uvx`（启动Python编写的MCP Server，Python包管理工具UV的子命令）、`npx`（启动Node编写的MCP Server，Node自带工具）。

## 二、MCP 基础实操：安装配置与快速使用（以Cline为例）
核心目标：完成Cline配置，实现MCP Server的安装、调用，让大模型通过MCP实现**实时功能调用**（如查纽约天气）。
### 1. 基础环境准备
1. 安装**VS Code**，在插件市场安装**Cline插件**（MCP Host）；
2. 获取API Key：可选择Open Router（支持多模型，含免费/付费）、DeepSeek、Anthropic等，**Open Router需手动创建Key并记录（仅创建时可见）**；
3. 配置Cline：进入Cline设置，选择API Provider、填入API Key、选择模型（对MCP支持最好：Claude 3.7；高性价比：DeepSeek V3.0324），并同步配置Plan/X双模式。

### 2. MCP Server 核心操作（两种方式）
#### （1）自动安装（模型主导，简单但可控性低）
- 直接向Cline提需求（如“纽约明天的天气怎么样？”），模型会自动推荐对应的MCP Server，按提示确认即可；
- 或在Cline的MCP Server市场（类似手机应用市场），直接点击`install`安装现成的MCP Server。
#### （2）手动配置（通用且可控性高，推荐）
1. 进入Cline的`installed → configure mcp servers`，打开**JSON配置文件**；
2. 按规范添加MCP Server配置，核心字段：
   - `name`：MCP Server名称（如weather）；
   - `disabled`：是否禁用（默认启动，可省略）；
   - `timeout`：连接超时时间（单位秒，如60）；
   - `command/args`：启动程序及参数（如`uvx`+对应启动指令，核心字段）；
   - `transport_type`：通信方式（主流`stdio`，通过标准输入/输出通信；小众`sse`）；
3. 保存配置，Cline自动加载，绿色开关表示启动成功。

### 3. MCP Server 实战调用（以天气查询为例）
1. 配置并启动`weather` MCP Server（内置`get_forecast`（经纬度查天气）、`get_alerts`（美国州代码查气象预警）两个Tool）；
2. 向Cline提需求：“纽约明天的天气怎么样？”；
3. Cline会识别可用的MCP Server和Tool，请求用户确认是否调用，点击`approve`；
4. MCP Server执行Tool并返回结果，大模型总结后输出最终答案（如纽约明日的气温、天气状况、出行建议）。

### 4. 现成MCP Server 调用（uvx/npx两种启动方式）
#### （1）uvx启动（Python编写的MCP Server，如fetch抓网页）
1. 先安装**UV**（Python包管理工具），终端执行官方安装命令；
2. 在MCP市场（mcp.so/mcp.market）找到目标MCP Server，复制uvx启动配置；
3. 粘贴到Cline的JSON配置文件，若加载超时（首次需下载依赖），**先在终端执行启动命令完成下载**，再回到Cline点击`retry connection`；
4. 提需求调用（如“抓取XX网页内容并转成Markdown保存”），确认调用即可完成。
#### （2）npx启动（Node编写的MCP Server，如hotnews拉取新闻）
1. 安装**Node.js**（npx为其自带工具，无需额外安装）；
2. 在MCP市场复制npx启动配置，粘贴到Cline的JSON配置文件；
3. 直接提需求调用，流程与uvx一致，超时处理方式相同。

### 5. MCP 完整交互流程（核心）
1. **MCP Server注册**：Cline通过配置的启动命令运行MCP Server，二者完成“打招呼”，Cline查询MCP Server的**Tool列表**并记录；
2. **用户提需求**：Cline将**用户问题+已注册的MCP Server/Tool列表**一起传给大模型；
3. **模型决策**：大模型判断自身无法解答，选择匹配的Tool，向Cline发送**Tool调用请求（含参数）**；
4. **Tool执行**：Cline将调用请求传给对应的MCP Server，MCP Server执行Tool并返回结果；
5. **结果返回**：Cline将Tool执行结果传给大模型，大模型总结后通过Cline返回给用户。

## 三、MCP 进阶开发：自定义编写MCP Server + 协议底层拆解
核心目标：用**Python**从零开发一个MCP Server（以weather为例），并通过截取交互日志，彻底讲清MCP协议的底层通信规则。
### 1. 开发前准备（环境+工具）
1. 编程语言：Python 3.10+（MacOS自带，Windows需手动安装）；
2. 必备工具：UV（Python包管理）、VS Code（代码编写）、Cline（MCP Host，用于测试）；
3. 安装MCP开发依赖：终端执行`uv add mcp-cli httpx`（`mcp-cli`为MCP开发核心依赖，`httpx`用于HTTP请求）。

### 2. 从零编写MCP Server（Python版weather为例）
#### （1）项目初始化
1. 终端执行`uv new weather`：新建名为weather的项目；
2. `cd weather`：进入项目目录；
3. `uv venv`：新建虚拟环境（避免依赖污染系统环境）；
4. `source .venv/bin/activate`：激活虚拟环境（终端前缀显示`(weather)`即为成功）；
5. VS Code打开项目，新建核心文件`weather.py`。

#### （2）核心代码编写逻辑
1. **初始化MCP Server**：通过`fast_mcp`函数创建MCP实例，指定名称并设置日志级别（`log_level="error"`，避免日志干扰运行）；
2. **定义工具函数**：编写实现具体功能的函数（如`get_forecast`/`get_alerts`），调用外部API（如美国气象局接口）实现功能，并对返回结果做格式化；
3. **注册Tool**：通过**装饰器**将函数注册为MCP的Tool，装饰器会自动提取函数的**注释（docstring）**和**参数定义**，生成Tool的描述和入参规范；
4. **配置启动项**：指定通信方式（`transports=["stdio"]`），编写启动代码，让程序运行时启动MCP Server。
#### （3）关键细节
- 函数注释：需清晰描述Tool功能、参数含义，供大模型判断是否匹配需求；
- 入参规范：函数参数类型会被自动转换为**JSON Schema**，约束大模型传入的参数格式（如经纬度必须为数字）；
- 装饰器：MCP开发的核心，实现函数到Tool的转换，自动提取Tool的关键信息。

#### （4）注册到Cline并测试
1. 按基础篇的**手动配置方式**，在Cline的JSON配置文件中添加自定义MCP Server的启动配置（`command="uv"`，参数指向`weather.py`）；
2. 保存配置，Cline自动加载；
3. 向Cline提需求（如“纽约明天的天气怎么样？”），确认调用后，若能正常返回结果，说明自定义MCP Server开发成功。

### 3. MCP 协议底层拆解：截取交互日志+逐行分析
#### （1）日志截取方案
编写**mcplogger.py**脚本（可由大模型生成），作为Cline和MCP Server的中间层，**截取二者的输入/输出数据**并写入日志文件（`mcpiolog.log`），通过分析日志理解协议通信规则。
#### （2）核心通信流程（日志中的JSON数据）
1. **握手阶段**：Cline向MCP Server发送协议版本、自身版本信息；MCP Server回复协议版本、自身名称/版本、不支持的能力；
2. **Tool列表查询**：Cline请求MCP Server返回Tool列表；MCP Server返回所有Tool的**描述、入参规范（JSON Schema）**（信息均来自函数注释和参数定义）；
3. **资源查询**：Cline询问MCP Server是否有资源/资源模板，一般返回空列表；
4. **Tool调用阶段**：Cline向MCP Server发送**Tool名称+符合入参规范的参数**；MCP Server执行Tool后，返回格式化的执行结果；
5. **结束阶段**：Tool调用完成后，二者交互终止，Cline将结果传给大模型。

#### （3）MCP 协议的核心本质
- MCP协议仅规定**MCP Host与MCP Server之间的通信规则**，核心是**Tool的注册（发现）与调用**，**与大模型本身无直接关联**；
- 协议不规定大模型与MCP Host的交互方式，不同MCP Host与大模型的通信格式不同（如Cline用XML，Cherry Studio用OpenAI的Function Calling）；
- 脱离大模型，MCP协议仍可独立使用（直接在终端与MCP Server通信），只是实际场景中为大模型服务。

### 4. 无MCP Host 直接与MCP Server通信
MCP协议是标准化的通信规则，无需借助Cline等MCP Host，可直接在终端与MCP Server交互：
1. 终端执行MCP Server的启动命令，运行自定义的`weather` MCP Server；
2. 按MCP协议规范，向终端输入**JSON格式的指令**（握手、查询Tool列表、调用Tool）；
3. MCP Server会按协议规范返回JSON格式的结果，实现直接通信（此时用户自身就是“MCP Host”）。

## 四、MCP 协议的深层解读
1. **名称的争议**：“模型上下文协议”命名存在误导性，易让人误以为规定了大模型的交互规则，实际仅为大模型**感知外部环境（可用的Tool）**提供标准化方式，本质是**Tool的注册与调用协议**；
2. **协议的无语言性**：MCP协议与开发语言无关，可使用Python/Node/Java/C#等任意语言编写MCP Server，只需遵循协议的通信规范；
3. **与Agent/Agent Skill的关联**：MCP是大模型调用外部工具的**底层协议**，是AI Agent的“工具调用基础”；Agent Skill是教大模型**如何处理工具返回的数据**，二者互补，可结合使用实现更强大的智能体能力。

## 五、MCP 核心总结
1. **核心定位**：大模型与外部工具之间的**标准化通信桥梁**，让大模型能高效、规范地调用各类外部工具，拓展大模型的落地场景；
2. **核心构成**：MCP Host（桥梁）+ MCP Server（协议化程序）+ Tool（函数化功能模块），三者按MCP协议实现通信；
3. **使用关键**：基础使用优先选择现成的MCP Server（uvx/npx启动），需个性化功能则基于Python/Node自定义开发，手动配置更可控；
4. **开发关键**：自定义MCP Server的核心是**函数注册为Tool**，通过装饰器提取Tool信息，遵循JSON Schema做入参约束，按stdio规范实现通信；
5. **协议本质**：仅规定MCP Host与MCP Server的交互规则，核心是Tool的发现与调用，与大模型无直接关联，是可独立使用的标准化协议。

我可以帮你把这份MCP笔记和之前的AI底层逻辑、Agent、Claude Code笔记整合，梳理出**从底层协议到实战工具的AI Agent完整知识体系**，标注各模块的关联和实操优先级，需要吗？