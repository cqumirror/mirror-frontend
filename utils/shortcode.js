
const startRegex = /{{%\s+(notice).+%}}/;
const endRegex = /{{%\s+(\/notice).+%}}/;

const classMap = {
  "note": "notice-note",
  "warn": "notice-warn",
  "info": "notice-info",
  "error": "notice-error"
}
// TODO expend collapse support

module.exports = shortcodes;

function shortcodes(options) {

  // const startBlock = (options || {}).startBlock || "[[";
  // const endBlock = (options || {}).endBlock || "]]";
  // const inlineMode = (options || {}).inlineMode || false;


  return (node) => {
    // console.log(node)
    const nodeCopy = node
    nodeCopy.children.forEach((item, index) => {

      const children = item.children

      if (item.type === "paragraph") {
        children.forEach((child, childIndex) => {

          if (startCodeBlock(child.value)) {
            if (isShortcodeBlock(child.value)) {
              // block without html inside
              const block = child.value.split("\n")
              const start = block[0]
              const end = block[block.length - 1]

              const startHtml = '<div class="' +
                classMap[start.replace("{{%", "")
                  .replace("%}}", "").replace("notice", "").trim()] +
                '">' + '<p class="shortcode-block">'
              const endHtml = '</p></div>'

              const result = {
                type: 'html',
                value: child.value.replace(start, startHtml).replace(end, endHtml)
              }

              node.children = [
                ...node.children.slice(0, index),
                result,
                ...node.children.slice(index + 1)
              ]

            } else {
              // block contains html for markdown
              const startIndex = childIndex
              // console.log("start index: "+ startIndex)
              let endIndex
              for (let i=startIndex;i < nodeCopy.children[index].children.length;i++) {

                if (endCodeBlock(nodeCopy.children[index].children[i].value)) {
                  endIndex = i
                  break
                }
              }
              const oldStart = nodeCopy.children[index].children[startIndex].value
              const mapTag = parseTag(oldStart)

              const startHtml = '<div class="' +
                classMap[mapTag.tag]
              + '">' + '<p class="shortcode-block">' + mapTag.text
              // console.log(startHtml)
              const endTag = nodeCopy.children[index].children[endIndex].value.replace("{{% /notice %}}","")
              const endHtml = endTag + '</p></div>'

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
                ...node.children[index].children.slice(startIndex+1,endIndex),
                end,
                ...node.children[index].children.slice(endIndex+1)
              ]

            }

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

  // to test if is shortcode block
  function isShortcodeBlock(value) {
    return startRegex.test(value) && endRegex.test(value);
  }

  function parseTag(value) {

    let va = value.split("%}}")[0]
    return {
      tag: va.replace("\n", "").replace("{{%", "").replace("notice", "").trim(),
      text: value.split("%}}")[1]
    }
  }
}


