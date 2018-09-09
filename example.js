const spnn = require('.')

const spinner = spnn('twinkle twinkle little star')

spinner.start()

setTimeout(() => spinner.success(), 1000)