const startRegex = /%\s+(notice).+%/
const endRegex = /%\s+(\/notice).+%/

const classMap = {
  tip: 'notice-tip',
  note: 'notice-note',
  warn: 'notice-warn',
  info: 'notice-info',
  error: 'notice-error',
  link: 'notice-link'
}
// TODO expend collapse support

export default function shortcodes(options) {
  return (node) => {
    const nodeCopy = node
    nodeCopy.children.forEach((item, index) => {
      const children = item.children

      if (item.type === 'paragraph') {
        children.forEach((child, childIndex) => {
          // Hugo shortcode 格式会被误识别为 binding，故这样检测
          if (child.name === 'binding' && startCodeBlock(child.attributes.value)) {
            // block contains html for markdown
            const startIndex = childIndex
            let endIndex
            for (
              let i = startIndex;
              i < nodeCopy.children[index].children.length;
              i++
            ) {
              const currChild = nodeCopy.children[index].children[i]
              if (currChild.name === 'binding' && endCodeBlock(currChild.attributes.value)) {
                endIndex = i
                break
              }
            }
            const oldStart = nodeCopy.children[index].children[startIndex].attributes.value
            const typeMatched = oldStart.match(/%\s+notice\s+(\w+)\s+%/)
            const noticeClass = typeMatched ? classMap[typeMatched[1]] : ''

            const startHtml = `<div class="${noticeClass}"><p class="shortcode-block">`
            const endHtml = '</p></div>'

            const start = {
              type: 'html',
              value: startHtml
            }

            const end = {
              type: 'html',
              value: endHtml
            }

            node.children[index].children = [
              ...node.children[index].children.slice(0, startIndex),
              start,
              ...node.children[index].children.slice(startIndex + 1, endIndex),
              end,
              ...node.children[index].children.slice(endIndex + 1)
            ]
          }
        })
      }
    })
  }

  function startCodeBlock(value) {
    return startRegex.test(value)
  }

  function endCodeBlock(value) {
    return endRegex.test(value)
  }
}
