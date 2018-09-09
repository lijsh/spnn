# spnn
> A terminal spinner just like ora.

## install
```
npm i spnn
```

## Usage
``` js
const spnn = require('spnn')
const spinner = spnn('twinkle twinkle little star')
spinner.start()

setTimeout(() => spinner.success(), 1000)
```