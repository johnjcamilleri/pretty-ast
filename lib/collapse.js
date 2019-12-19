'use babel'

/* global atom */

export default {
  collapse () {
    const editor = atom.workspace.getActiveTextEditor()
    editor.mutateSelectedText((selection, ix) => {
      const text = selection.getText().trim()
      const tree = parseTree(text)

      let out = ''
      function upp (node) {
        out += node.fun
        for (const a of node.args) {
          out += ' ('
          upp(a)
          out += ')'
        }
      }
      upp(tree)

      selection.insertText(out, {
        select: true
      })
    })
  }
}

function parseTree (str) {
  // const lines = text.split(/\r?\n/)
  // let out = ''
  // let level = 0 // logical
  // let indent = 0 // number of spaces
  // for (const l of lines) {
  //   const thisIndent = l.match(/^\s*/)[0].length
  //   const thisLevel = level + Math.sign(thisIndent - indent)
  //   if (thisLevel > level) {
  //     out += '('
  //   } else if (thisLevel < level) {
  //     out += ') ('
  //   }
  //   out += l.trim()
  //   level = thisLevel
  //   indent = thisIndent
  // }
  // while (level > 0) {
  //   out += ')'
  //   level--
  // }

  return {
    fun: 'Hello',
    args: [{
      fun: 'everything',
      args: []
    }, {
      fun: 'ok?',
      args: []
    }]
  }
}
