/* eslint: handle-callback-err: 0 */

/*
** USAGE:
**
**    const Debussy = require('debussy');
**    const FileReader = new Debussy('path/to/filename');
**
**    FileReader.on('line', line => {
**      process line...
**    });
**
**    FileReader.on('end', () => {
**      do something after last line has been read...
**    });
**/

const fs = require('fs');
const readline = require('readline');
const EventEmitter = require('events').EventEmitter;

class Debussy extends EventEmitter {
  constructor(filename) {
    super();
    const rd = readline.createInterface({
      input: fs.createReadStream(filename),
      output: process.stdout,
      terminal: false
    });
    rd.on('line', line => this.emit('line', line));
    rd.on('close', () => this.emit('end'));
  }
};

module.exports = Debussy;
