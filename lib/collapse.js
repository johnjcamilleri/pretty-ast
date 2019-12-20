'use babel'

export default {
  collapse (text) {
    const tree = parseTree(text)
    if (!tree) return

    let out = ''
    function upp (node) {
      out += node.fun
      for (const a of node.args) {
        out += a.args.length === 0 ? ' ' : ' ('
        upp(a)
        out += a.args.length === 0 ? '' : ')'
      }
    }
    upp(tree)

    return out + '\n'
  }
}

function parseTree (str) {
  const lines = str.split(/\r?\n/)
  if (!lines) return null
  return parseTree_(lines)
}

function parseTree_ (lines) {
  const l0 = lines.shift()
  const node = {
    fun: l0.trim(),
    args: []
  }

  if (lines.length === 0) return node

  // collect all descendent lines, grouped by child
  const parentIndent = l0.match(/^\s*/)[0].length
  const baseIndent = lines[0].match(/^\s*/)[0].length // first child
  const liness = []
  for (const l of lines) {
    const thisIndent = l.match(/^\s*/)[0].length
    if (thisIndent <= parentIndent || thisIndent < baseIndent) {
      break // end of children
    } else if (thisIndent === baseIndent) {
      liness.push([l]) // start new group
    } else if (thisIndent > baseIndent) {
      liness[liness.length - 1].push(l)
    } else {
      console.error('Should never arrive here')
    }
  }

  node.args = liness.filter(ls => ls.length > 0).map(parseTree_)
  return node
}
