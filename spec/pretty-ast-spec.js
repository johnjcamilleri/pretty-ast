'use babel'

/* globals
atom
describe it expect
beforeEach waitsForPromise
*/

import { File } from 'atom'
// import PrettyAst from '../lib/pretty-ast'

// Use the command `window:run-package-specs` (cmd-alt-ctrl-p) to run specs.
//
// To run a specific `it` or `describe` block add an `f` to the front (e.g. `fit`
// or `fdescribe`). Remove the `f` to unfocus the block.

const packageName = 'pretty-ast'

describe('Pretty AST', () => {
  let workspaceElement
  let activationPromise
  let packagePath

  beforeEach(() => {
    workspaceElement = atom.views.getView(atom.workspace)
    activationPromise = atom.packages.activatePackage(packageName)
    packagePath = atom.packages.resolvePackagePath(packageName)
  })

  describe('pretty printing', () => {
    it('multiple lines', () => {
      const testPath = 'spec/test.txt'
      const goldPath = 'spec/gold.txt'

      waitsForPromise(() =>
        atom.workspace.open(`${packagePath}/${testPath}`).then(editor => {
          // trigger command
          editor.selectAll()
          atom.commands.dispatch(workspaceElement, 'pretty-ast:pretty-print')
          waitsForPromise(() => activationPromise)

          const f = new File(`${packagePath}/${goldPath}`)
          expect(f.existsSync())

          waitsForPromise(() =>
            f.read().then(gold => {
              expect(editor.getText().trim()).toEqual(gold.trim())
            })
          )
        })
      )
    })
  })

  describe('collapsing', () => {
  })

  describe('toggling', () => {
    it('is reversible', () => {
      const testPath = 'spec/test.txt'
      waitsForPromise(() =>
        atom.workspace.open(`${packagePath}/${testPath}`).then(editor => {
          editor.setCursorBufferPosition([0, 0])
          editor.selectDown(1)
          const original = editor.getSelectedText()

          atom.commands.dispatch(workspaceElement, 'pretty-ast:toggle')
          waitsForPromise(() => activationPromise)
          // const pretty = editor.getSelectedText()

          atom.commands.dispatch(workspaceElement, 'pretty-ast:toggle')
          waitsForPromise(() => activationPromise)
          const collapsed = editor.getSelectedText()

          expect(original).toEqual(collapsed)
        })
      )
    })
  })
})
