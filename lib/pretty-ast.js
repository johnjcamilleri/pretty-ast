'use babel'

/* global atom */

import { CompositeDisposable } from 'atom'

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
      let level = 0
      const tokens = text.split(/\s+/)
      for (const tx in tokens) {
        let token = tokens[tx]
        if (!token) continue
        while (token.startsWith('(')) {
          level++
          token = token.slice(1)
        }
        while (token.endsWith(')')) {
          level--
          token = token.slice(0, -1)
        }
        out += '  '.repeat(level) + token + '\n'
      }
      selection.insertText(out, {
        select: true
      })
    })
  }

}
