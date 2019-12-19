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
      'pretty-ast:pretty-print': () => prettyPrint(),
      'pretty-ast:collapse': () => collapse()
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
