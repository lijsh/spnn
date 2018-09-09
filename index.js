const clear = require('clear-output')
const chalk = require('chalk')
const logSymbols = require('log-symbols')

const frames = [
  '⠋',
  '⠙',
  '⠹',
  '⠸',
  '⠼',
  '⠴',
  '⠦',
  '⠧',
  '⠇',
  '⠏',
]

const interval = 80

class Spinner {
  constructor(options) {
    if (typeof options === 'string') options = { text: options }
    this.options = Object.assign({
      text: '',
      color: 'cyan',
    }, options)
    this.id = null
    this.frameIdx = 0
    this.text = this.options.text
    this.color = this.options.color
    this.init = false
  }

  start() {
    this.init = true
    this.render()
    this.init = false
    this.id = setInterval(this.render.bind(this), interval)
    return this
  }

  render() {
    if (!this.init) {
      this.clear()
    }
    process.stderr.write(this.frame())
    return this
  }

  frame() {
    let frame = frames[this.frameIdx]
    frame = chalk[this.color](frame)

    this.frameIdx = (this.frameIdx + 1) % 6
    return `${frame} ${this.text}`
  }

  clear() {
    clear(this.text)
    return this
  }

  stop(options) {
    clearInterval(this.id)
    this.id = null
    this.frameIdx = 0
    this.clear()
    if (options) {
      process.stderr.write(`${options.symbol || ' '} ${options.text || this.text}\n`)
    }
    return this
  }

  success(text) {
    return this.stop({ symbol: logSymbols.success, text })
  }

  fail(text) {
    return this.stop({ symbol: logSymbols.fail, text })
  }
}

module.exports = options => new Spinner(options)