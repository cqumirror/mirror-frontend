const startCollapseRegex = /{{%\s+(expand).+%}}/
const endCollapseRegex = /{{%\s+(\/expand).+%}}/

// TODO expend collapse support

module.exports = expand

function expand(options) {
  return (node) => {
    // console.log(node)
    const nodeCopy = node
    nodeCopy.children.forEach((item, index) => {
      const children = item.children

      if (item.type === 'paragraph') {
        children.forEach((child, childIndex) => {
          if (startCollapseBlock(child.value)) {
            if (isCollapseBlock(child.value)) {
              // block without html inside

              const block = child.value.split('\n')
              const start = block[0]
              const end = block[block.length - 1]

              const startHtml =
                '<details>' +
                '<summary>' +
                start.replace('{{% expand "', '').replace('" %}}', '').trim() +
                '</summary><p>'

              const endHtml = '</p></details>'

              const result = {
                type: 'html',
                value: child.value
                  .replace(start, startHtml)
                  .replace(end, endHtml)
              }

              node.children = [
                ...node.children.slice(0, index),
                result,
                ...node.children.slice(index + 1)
              ]
            } else {
              // TODO 跨区块expand,现在实现不了
            }
          }
        })
      }
    })
  }

  function startCollapseBlock(value) {
    return startCollapseRegex.test(value)
  }

  function endCollapseBlock(value) {
    return endCollapseRegex.test(value)
  }

  function isCollapseBlock(value) {
    return startCollapseRegex.test(value) && endCollapseRegex.test(value)
  }

  function parseCollapse(value) {
    let va = value.split('%}}')[0]
    return {
      tag: va
        .replace('\n', '')
        .replace('{{%', '')
        .replace('expand"', '')
        .trim(),
      text: value.split('%}}')[1]
    }
  }
}
