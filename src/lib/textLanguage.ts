// 判断一段正文是不是「主要不是中文」。
//
// 用途：本站项目页的正文是各项目自己的 README，绝大多数是英文（实测 675 个有正文的
// 快照里 616 个、约 91% 以拉丁字母为主）。读者反馈「没有中文翻译」，而本站的翻译
// 控件依赖 Chrome 内置的 Translator API —— QQ/360/UC/Firefox/Safari 都用不了。
//
// 所以这些页面需要一个**不依赖任何 API** 的静态提示，告诉读者用浏览器自带的整页
// 翻译。判断放在这里而不是组件里，是为了能单独测。
//
// 只看正文，不看 frontmatter；样本太短时不下结论（避免把一句英文提示当成外文正文）。
const MIN_SAMPLE = 200

export function isMostlyNonChinese(text: string): boolean {
  const body = text.trim()
  if (body.length < MIN_SAMPLE) return false
  const latin = (body.match(/[A-Za-z]/g) ?? []).length
  const han = (body.match(/[\u4e00-\u9fff]/g) ?? []).length
  // 汉字占非空白字符的比例低于三分之一，就认为主要不是中文
  const visible = (body.match(/\S/g) ?? []).length || 1
  return han / visible < 0.34 && latin > han
}
