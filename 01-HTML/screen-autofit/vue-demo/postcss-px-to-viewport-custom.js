// 默认配置
const defaultOptions = {
  // 设计稿的视口宽度，用于计算 vw 单位
  // 例如：设计稿宽度为 750px，但配置为 375px 实现 2 倍缩放
  viewportWidth: 375,
  
  // 设计稿的视口高度（通常不用于计算，保留兼容性）
  viewportHeight: 667,
  
  // 转换后保留的小数位数
  // 例如：3 表示保留 3 位小数，如 2.667vw
  unitPrecision: 3,
  
  // 转换后的视口单位类型
  // 可选值：'vw', 'vh', 'vmin', 'vmax'
  viewportUnit: 'vw',
  
  // 选择器黑名单，匹配的选择器不会被转换
  // 支持字符串和正则表达式
  // 例如：['.ignore', /\.no-convert/]
  selectorBlackList: [],
  
  // 最小转换像素值，小于等于此值的 px 不会被转换
  // 例如：1 表示 1px 及以下不转换，避免边框等细节失真
  minPixelValue: 1,
  
  // 是否转换媒体查询中的 px
  // false: 不转换媒体查询中的 px
  // true: 转换媒体查询中的 px
  mediaQuery: false,
  
  // 是否直接替换原值
  // true: 直接替换 px 为 vw
  // false: 保留原 px 值，添加 vw 值
  replace: true,
  
  // 排除的文件或目录
  // 支持字符串、正则表达式或数组
  // 例如：['node_modules', /\.min\.css$/]
  exclude: [],
  
  // 最大显示宽度限制（自定义配置项）
  // 当屏幕宽度超过此值时，使用 px 单位而非 vw
  // null: 不限制最大宽度
  // 数字: 设置最大宽度像素值，如 750
  maxDisplayWidth: null,
  
  // 原始设计稿宽度（自定义配置项）
  // 用于计算缩放比例，通常是 UI 设计稿的实际宽度
  // 例如：设计稿是 750px，但 viewportWidth 设为 375px 实现 2 倍缩放
  designWidth: 750,
  
  // 是否启用最大宽度限制功能（自定义配置项）
  // true: 启用双重输出策略（PC 端用 px，移动端用 vw）
  // false: 禁用最大宽度限制，所有设备都使用 vw
  enableMaxWidth: true
};

// 检查是否应该排除某个文件
function isExclude(file, exclude) {
  if (!exclude || !file) return false;
  
  if (Array.isArray(exclude)) {
    return exclude.some(pattern => {
      if (pattern instanceof RegExp) {
        return pattern.test(file);
      }
      return file.includes(pattern);
    });
  }
  
  if (exclude instanceof RegExp) {
    return exclude.test(file);
  }
  
  return file.includes(exclude);
}

// 检查选择器是否在黑名单中
function isBlacklistedSelector(selector, blacklist) {
  if (!blacklist || blacklist.length === 0) return false;
  
  return blacklist.some(item => {
    if (typeof item === 'string') {
      return selector.includes(item);
    }
    if (item instanceof RegExp) {
      return item.test(selector);
    }
    return false;
  });
}

// 转换 px 到 viewport 单位
function pxToViewport(value, options) {
  const { viewportWidth, unitPrecision, viewportUnit } = options;
  const pixels = parseFloat(value);
  
  if (pixels <= options.minPixelValue) {
    return value;
  }
  
  const vwValue = (pixels / viewportWidth) * 100;
  return `${vwValue.toFixed(unitPrecision)}${viewportUnit}`;
}

// 主插件函数
function postcsspxtoviewportCustom(options = {}) {
  const opts = { ...defaultOptions, ...options };
  
  return {
    postcssPlugin: 'postcss-px-to-viewport-custom',
    Once(root, { AtRule }) {
      const file = root.source?.input?.from;
      
      // 检查是否排除此文件
      if (isExclude(file, opts.exclude)) {
        return;
      }
      
      // 如果启用了最大宽度限制，使用双重输出策略
      if (opts.maxDisplayWidth && opts.enableMaxWidth) {
        const rulesToProcess = [];
        
        // 收集需要处理的规则
        root.walkRules(rule => {
          // 跳过已经在媒体查询中的规则
          if (rule.parent.type === 'atrule' && rule.parent.name === 'media') {
            return;
          }
          
          // 检查选择器黑名单
          if (isBlacklistedSelector(rule.selector, opts.selectorBlackList)) {
            return;
          }
          
          let hasPixels = false;
          rule.walkDecls(decl => {
            if (decl.value.includes('px')) {
              hasPixels = true;
            }
          });
          
          if (hasPixels) {
            rulesToProcess.push(rule);
          }
        });
        
        // 如果有需要处理的规则，创建媒体查询
        if (rulesToProcess.length > 0) {
          const mediaRule = new AtRule({
            name: 'media',
            params: `(max-width: ${opts.maxDisplayWidth}px)`
          });
          
          rulesToProcess.forEach(rule => {
            const clonedRule = rule.clone();
            
            // 转换克隆规则中的 px 到 vw
            clonedRule.walkDecls(decl => {
              const value = decl.value;
              
              if (!value.includes('px')) {
                return;
              }
              
              const newValue = value.replace(/(-?\d+(?:\.\d+)?)px/g, (match, num) => {
                const pixels = parseFloat(num);
                
                if (pixels <= opts.minPixelValue) {
                  return match;
                }
                
                return pxToViewport(match, opts);
              });
              
              decl.value = newValue;
            });
            
            mediaRule.append(clonedRule);
          });
          
          // 将媒体查询添加到根节点末尾
          root.append(mediaRule);
        }
      } else {
        // 标准转换模式（不使用最大宽度限制）
        root.walkRules(rule => {
          // 检查选择器黑名单
          if (isBlacklistedSelector(rule.selector, opts.selectorBlackList)) {
            return;
          }
          
          // 处理媒体查询
          if (!opts.mediaQuery && rule.parent.type === 'atrule' && rule.parent.name === 'media') {
            return;
          }
          
          rule.walkDecls(decl => {
            const value = decl.value;
            
            if (!value.includes('px')) {
              return;
            }
            
            const newValue = value.replace(/(-?\d+(?:\.\d+)?)px/g, (match, num) => {
              const pixels = parseFloat(num);
              
              if (pixels <= opts.minPixelValue) {
                return match;
              }
              
              return pxToViewport(match, opts);
            });
            
            if (opts.replace) {
              decl.value = newValue;
            } else {
              decl.cloneBefore({ value: newValue });
            }
          });
        });
      }
    }
  };
}

// 设置 postcss 标识
postcsspxtoviewportCustom.postcss = true;

// ES6 默认导出
export default postcsspxtoviewportCustom;