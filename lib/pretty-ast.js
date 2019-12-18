'use babel'

/* global atom */

import { CompositeDisposable } from 'atom'

// These functions taken from
// https://github.com/GrammaticalFramework/gf-core/blob/master/src/runtime/javascript/gflib.js
function parseTree (str) {
  const tokens = str.match(/[\w'."]+|\(|\)|\?|:/g)
  return parseTree_(tokens, 0)
}

function parseTree_ (tokens, prec) {
  if (tokens === null || tokens.length === 0 || tokens[0] === ')') {
    return null
  }
  const t = tokens.shift()
  if (t === '(') {
    const tree = parseTree_(tokens, 0)
    tokens.shift()
    return tree
  } else if (t === '?') {
    return {
      fun: '?',
      args: []
    }
  } else {
    const tree = {
      fun: t,
      args: []
    }
    if (prec === 0) {
      let c
      for (let i = 0; (c = parseTree_(tokens, 1)) !== null; i++) {
        tree.args[i] = c
      }
    }
    return tree
  }
}

export default {

  subscriptions: null,

  activate (state) {
    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable()

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'pretty-ast:pretty-print': () => this.prettyPrint()
    }))
  },

  deactivate () {
    this.subscriptions.dispose()
  },

  serialize () {
    return {
    }
  },

  prettyPrint () {
    const editor = atom.workspace.getActiveTextEditor()
    editor.mutateSelectedText((selection, ix) => {
      // TODO split into lines
      const text = selection.getText().trim()
      let out = ''
      function pp (node, level) {
        out += '  '.repeat(level) + node.fun + '\n'
        for (const a of node.args) {
          pp(a, level + 1)
        }
      }

      const tree = parseTree(text)
      pp(tree, 0)

      selection.insertText(out, {
        select: true
      })
    })
  }

}
