const { remote } = require('electron');

var dialog = remote.require('dialog');
var fs = require('fs');
var { EventEmitter } = require('events');
import WorkspaceFile from "./File";
import WorkingDirectory from "./WorkingDirectory";

var FileStorage = {

  emitter: new EventEmitter(),

  open(fn) {
    dialog.showOpenDialog({
      defaultPath: WorkingDirectory.current.path
    },(fileNames) => {
      if (fileNames === undefined) return;
      var name = fileNames[0];

      fs.readFile(name, 'utf-8', (err, contents) => {
        var file = new WorkspaceFile(name, contents);
        if (fn) fn(file);
      });
    }); 
  }, 

  save(file, fn){
    var {name, contents} = file;
    if (name) {
      this._writeFile(name, contents, fn);
      return;
    }

    dialog.showSaveDialog({
      defaultPath: WorkingDirectory.current.path
    },(name) => {
      if (name === undefined) return;
      this._writeFile(name, contents, fn)
    });
  },

  _writeFile(name, contents, fn){
    fs.writeFile(name, contents, (err) => {
      if (err) throw err;
      if (fn) fn(name);
    });
  }
};

export default FileStorage;