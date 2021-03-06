'use babel'

export default {

  prettyPrint (text) {
    const tree = parseTree(text.trim())
    if (!tree) return

    let out = ''
    function pp (node, level) {
      out += '  '.repeat(level) + node.fun + '\n'
      for (const a of node.args) {
        pp(a, level + 1)
      }
    }

    pp(tree, 0)
    return out
  }
}

// These functions taken from
// https://github.com/GrammaticalFramework/gf-core/blob/master/src/runtime/javascript/gflib.js
function parseTree (str) {
  let tokens = str.match(/[\w'."]+|\(|\)|\?|:/g)
  if (tokens === null || tokens.length === 0) {
    return null
  }
  tokens = combineChoppedStrings(tokens)
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

// Piece together chopped up strings
// TODO strings may potentially be mangled, but at least they'll remain intact
// TODO can't handle nested/escaped quotes
function combineChoppedStrings (tokens) {
  const initial = {
    consume: false,
    tokens: []
  }
  const res = tokens.reduce((acc, val) => {
    if (!acc.consume) {
      // Not consuming strings
      acc.tokens.push(val)
      if (val.startsWith('\'') || val.startsWith('"')) {
        return {
          consume: true,
          tokens: acc.tokens
        }
      } else {
        return {
          consume: false,
          tokens: acc.tokens
        }
      }
    } else {
      // Consuming strings
      acc.tokens[acc.tokens.length - 1] += ' ' + val
      if (val.endsWith('\'') || val.endsWith('"')) {
        return {
          consume: false,
          tokens: acc.tokens
        }
      } else {
        return {
          consume: true,
          tokens: acc.tokens
        }
      }
    }
  }, initial)
  return res.tokens
}
