'use babel'

/* globals
atom
describe it expect
beforeEach waitsForPromise runs
*/

// import PrettyAst from '../lib/pretty-ast'

// Use the command `window:run-package-specs` (cmd-alt-ctrl-p) to run specs.
//
// To run a specific `it` or `describe` block add an `f` to the front (e.g. `fit`
// or `fdescribe`). Remove the `f` to unfocus the block.

describe('Pretty AST', () => {
  // let workspaceElement
  // let activationPromise

  beforeEach(() => {
    // workspaceElement = atom.views.getView(atom.workspace)
    // activationPromise = atom.packages.activatePackage('pretty-ast')
  })

  describe('when pretty-ast:pretty-print is triggered', () => {
    it('formats the tree correctly', () => {
      // open file
      const testPath = 'spec/test.txt'
      const goldPath = 'spec/gold.txt'

      waitsForPromise(() =>
        atom.workspace.open(testPath).then(editor => {
          // expect(editor.getText()).toEqual(false)
        })
      )

      // const editor1 = atom.workspace.getActiveTextEditor()
      // waitsForPromise(() => atom.workspace.open(goldPath))
      // const editor2 = atom.workspace.getActiveTextEditor()
      //
      // // trigger command
      // editor1.selectAll()
      // atom.commands.dispatch(editor1, 'pretty-ast:pretty-print')
      // waitsForPromise(() => {
      //   return activationPromise
      // })
      //
      // // compare
      // expect(editor1.getText()).toEqual(editor2.getText())
    })
  })

  // describe('when the pretty-ast:toggle event is triggered', () => {
  //   it('hides and shows the modal panel', () => {
  //     // Before the activation event the view is not on the DOM, and no panel
  //     // has been created
  //     expect(workspaceElement.querySelector('.pretty-ast')).not.toExist();
  //
  //     // This is an activation event, triggering it will cause the package to be
  //     // activated.
  //     atom.commands.dispatch(workspaceElement, 'pretty-ast:toggle');
  //
  //     waitsForPromise(() => {
  //       return activationPromise;
  //     });
  //
  //     runs(() => {
  //       expect(workspaceElement.querySelector('.pretty-ast')).toExist();
  //
  //       let prettyAstElement = workspaceElement.querySelector('.pretty-ast');
  //       expect(prettyAstElement).toExist();
  //
  //       let prettyAstPanel = atom.workspace.panelForItem(prettyAstElement);
  //       expect(prettyAstPanel.isVisible()).toBe(true);
  //       atom.commands.dispatch(workspaceElement, 'pretty-ast:toggle');
  //       expect(prettyAstPanel.isVisible()).toBe(false);
  //     });
  //   });
  //
  //   it('hides and shows the view', () => {
  //     // This test shows you an integration test testing at the view level.
  //
  //     // Attaching the workspaceElement to the DOM is required to allow the
  //     // `toBeVisible()` matchers to work. Anything testing visibility or focus
  //     // requires that the workspaceElement is on the DOM. Tests that attach the
  //     // workspaceElement to the DOM are generally slower than those off DOM.
  //     jasmine.attachToDOM(workspaceElement);
  //
  //     expect(workspaceElement.querySelector('.pretty-ast')).not.toExist();
  //
  //     // This is an activation event, triggering it causes the package to be
  //     // activated.
  //     atom.commands.dispatch(workspaceElement, 'pretty-ast:toggle');
  //
  //     waitsForPromise(() => {
  //       return activationPromise;
  //     });
  //
  //     runs(() => {
  //       // Now we can test for view visibility
  //       let prettyAstElement = workspaceElement.querySelector('.pretty-ast');
  //       expect(prettyAstElement).toBeVisible();
  //       atom.commands.dispatch(workspaceElement, 'pretty-ast:toggle');
  //       expect(prettyAstElement).not.toBeVisible();
  //     });
  //   });
  // });
})
