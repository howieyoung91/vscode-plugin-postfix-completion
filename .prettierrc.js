module.exports = {
    // 一行最多 140 字符
    printWidth: 140,
    // 关闭 tab 缩进
    useTabs: false,
    // 使用 2个tab 缩进
    tabWidth: 4,
    // 行尾需要有分号
    semi: true,
    // 使用单引号
    singleQuote: false,
    // 对象key是否使用引号 <as-needed|consistent|preserve>
    // as-needed 仅在需要的时候使用
    // consistent 有一个属性需要引号，就都需要引号
    // preserve 保留用户输入的情况
    quoteProps: "preserve",
    // jsx 使用单引号代替双引号
    jsxSingleQuote: false,
    // 末尾不需要逗号 <es5|none|all>
    trailingComma: "es5",
    // 大括号内的首尾需要空格
    bracketSpacing: true,
    // jsx 标签的反尖括号需要换行
    jsxBracketSameLine: false,
    // 箭头函数，只有一个参数的时候，也需要括号 <always|avoid>
    arrowParens: "avoid",
    // 每个文件格式化的范围是文件的全部内容
    rangeStart: 0,
    rangeEnd: Infinity,
    // 不需要写文件开头的 @prettier 用于逐步过渡大型项目中未被格式化的代码标识
    requirePragma: false,
    // 不需要自动在文件开头插入 @prettier 用于逐步过渡大型项目中未被格式化的代码标识
    insertPragma: false,
    // 使用默认的折行标准
    proseWrap: "preserve",
    // 根据显示样式决定 html 要不要折行 <css|strict|ignore>"
    htmlWhitespaceSensitivity: "css",
    // 换行符使用 lf 结尾  <lf|crlf|cr|auto>
    endOfLine: "lf",
    embeddedLanguageFormatting: "off",
};
