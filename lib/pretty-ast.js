'use babel'

/* global atom */

import { CompositeDisposable } from 'atom'
import { prettyPrint } from './pretty.js'
import { collapse } from './collapse.js'

export default {

  subscriptions: null,

  activate (state) {
    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable()

    // Register commands
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'pretty-ast:toggle': () => {
        atom.workspace.getActiveTextEditor().mutateSelectedText((selection) => {
          let out
          if (selection.isSingleScreenLine()) {
            out = prettyPrint(selection.getText())
          } else {
            out = collapse(selection.getText())
          }
          if (out) {
            selection.insertText(out, {
              select: true
            })
          }
        })
      },
      'pretty-ast:pretty-print': () => {
        atom.workspace.getActiveTextEditor().mutateSelectedText((selection) => {
          let out
          if (selection.isSingleScreenLine()) {
            out = prettyPrint(selection.getText())
          } else {
            out = ''
            for (const line of selection.getText().split(/\r?\n/)) {
              out += prettyPrint(line)
            }
          }
          if (out) {
            selection.insertText(out, {
              select: true
            })
          }
        })
      },
      'pretty-ast:collapse': () => {
        atom.workspace.getActiveTextEditor().mutateSelectedText((selection) => {
          const out = collapse(selection.getText())
          if (out) {
            selection.insertText(out, {
              select: true
            })
          }
        })
      }
    }))
  },

  deactivate () {
    this.subscriptions.dispose()
  },

  serialize () {
    return {
    }
  }

}
