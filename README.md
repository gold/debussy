debussy
=======

Simple, fast, and efficient file reader - line by line

Installation
------------

npm install debussy --save

Overview
--------

You want to read files line by line. And you cannot be bothered with memory
limitations because of the size of the file.

This module neatly does the trick for you, even if you need to parse a 20 GB log
file.

Usage
-----

```javascript
const Debussy = require('debussy');
const FileReader = new Debussy('/path/to/file');

FileReader.on('line', (line) => {
  process line...
});

FileReader.on('end', () => {
  do whatever you want after last line has been read...
});
```

As of node v6.2.0, `import` statement still not implemented. And not gonna
complicate things transpiling to ES5.

Technical Notes
---------------

We're using node's built-in streaming, readline, and event emit tech. The module
is tiny. The inspiration for creating this npm package was so I wouldn't have to
keep looking up and repeating the same stream and readline node syntax every
time I needed to parse a file.

Module Name: An Explanation
---------------------------

Why `debussy`? After researching similar npm modules, I discovered I really
didn't have to write this at all and I could be using someone else's npm package
instead. But that's no fun. And naming the module to indicate its functionality
would have thrown my version into a sea of names like file-reader, line-read,
read-line, stream-line-reader, line-reader-stream, read-by-line,
reader-line-stuff, etc.

I therefore paid homage to one of the greatest composers.

Enjoy!

Gerry Gold May 2016
