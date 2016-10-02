/* eslint: handle-callback-err: 0 */

/*
** USAGE:
**
**    const Debussy = require('debussy');
**    const FileReader = new Debussy('path/to/filename');
**
**    // or pass in options to override defaults.
**    // refer to fs.createReadStream() documentation.
**    const FileReader = new Debussy(filename, {encoding: 'utf-8'});
**
**    FileReader.on('line', line => {
**      // process line...
**
**      // found what you need; stop the stream.
**      FileReader.stop();
**    });
**
**    FileReader.on('end', () => {
**      // do something after last line has been read...
**    });
**
** The MIT License (MIT)
** Copyright (c) 2016-Eternity Gerry Gold
**/

const fs = require('fs');
const readline = require('readline');
const EventEmitter = require('events').EventEmitter;

class Debussy extends EventEmitter {
  constructor(filename, userOptions = {}) {
    super();

    // Based on: https://nodejs.org/api/fs.html
    const defaultCreateReadStreamOptions = {
      flags: 'r',
      encoding: null,
      fd: null,
      mode: 0o666,
      autoClose: true
    };

    const mergedOptions = {};
    Object.assign(mergedOptions, defaultCreateReadStreamOptions, userOptions);

    this.inputStream = fs.createReadStream(filename, mergedOptions);
    const rd = readline.createInterface({
      input: this.inputStream,
      output: process.stdout,
      terminal: false
    });

    rd.on('line', line => this.emit('line', line));
    rd.on('close', () => this.emit('end'));
  }

  stop() {
    // destroy() marks the object as destroyed and then calls close()
    // Based on: https://github.com/nodejs/node/blob/master/lib/fs.js
    this.inputStream.destroy();
  }

}

module.exports = Debussy;
