'use babel'

export default {
  collapse (text) {
    const tree = parseTree(text)
    if (!tree) return

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

    return out
  }
}

function parseTree (str) {
  const lines = str.split(/\r?\n/)
  if (!lines) return null
  return parseTree_(lines)
}

function parseTree_ (lines) {
  // let level = 0 // logical
  // let indent = 0 // number of spaces

  const l1 = lines.shift()
  const node = {
    fun: l1.trim(),
    args: []
  }

  if (lines.length === 0) return node

  const parentIndent = l1.match(/^\s*/)[0].length
  const liness = [[]]
  for (const l2 of lines) {
    const thisIndent = l2.match(/^\s*/)[0].length
    if (thisIndent > parentIndent) {
      liness[liness.length - 1].push(l2)
    } else if (thisIndent === parentIndent) {
      liness.push([l2])
    } else if (thisIndent < parentIndent) {
      break
    }
  }

  node.args = liness.filter(ls => ls.length > 0).map(parseTree_)
  return node
}

// function parseTree (str) {
//   return {
//     fun: 'Hello',
//     args: [{
//       fun: 'everything',
//       args: []
//     }, {
//       fun: 'ok?',
//       args: []
//     }]
//   }
// }
