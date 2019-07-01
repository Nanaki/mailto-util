# mailto-util [![Build Status](https://travis-ci.org/nanaki/mailto-util.svg?branch=master)](https://travis-ci.org/nanaki/mailto-util)

> A dead simple mailto url builder (Browser and Node.js compatible).


## Install

```
$ npm install mailto-util
```


## Usage

### Import
```js
const mailTo = require('mailto-util');
// or
import mailTo from 'mailto-util';
```

### Empty mail
```js
mailTo();
//=> 'mailto:'
```

### Simple mail
```js
mailTo({
  recipients: {
    to: 'sugar@youhou.com',
  },
});
//=> 'mailto:sugar@youhou.com'
```

### Recipient list
```js
mailTo({
  recipients: {
    to: ['mum@youhou.com', 'daddy@youhou.com'],
    cc: ['bro@youhou.com', 'sista@youhou.com'],
    cci: ['sugar@youhou.com', 'chris@youhou.com']
  },
  subject: 'Summer party!',
  body: 'Are you ready for tonight?'
});
//=> 'mailto:mum@youhou.com,daddy@youhou.com?cc=bro@youhou.com,sista@youhou.com&cci=sugar@youhou.com,chris@youhou.com&subject=Summer%20party!&body=Are%20you%20ready%20for%20tonight%20%3F'
```

### Recipient string
```js
mailTo({
  recipients: {
    to: 'daddy@youhou.com',
    cc: 'bro@youhou.com',
    cci: 'sugar@youhou.com'
  },
  subject: 'Summer party!',
  body: 'Are you ready for tonight?'
});
//=> 'mailto:daddy@youhou.com?cc=bro@youhou.com&cci=sugar@youhou.com&subject=Summer%20party!&body=Are%20you%20ready%20for%20tonight%20%3F'
```

### Full featured mail
```js
mailTo({
  recipients: {
    to: ['mum@youhou.com', 'daddy@youhou.com'],
    cc: 'bro@youhou.com',
    cci: 'sugar@youhou.com'
  },
  subject: 'My Wedding',
  body: 'Here we go!'
});
//=> 'mailto:mum@youhou.com,daddy@youhou.com?cc=bro@youhou.com&cci=sugar@youhou.com&subject=My%20Wedding&body=Here%20we%20go!'
```


## API

### mailTo({ recipients: { to: email(s), cc: email(s), cci: email(s) }, subject: subject, body: body })

#### email(s)

Type: `string` or `string array`

string or string array representing mail recipient(s)


#### subject

Type: `string`

string representing the mail subject


#### body

Type: `string`

string representing the mail body


## License

MIT © [Sébastien NICOLAS](https://github.com/nanaki)
