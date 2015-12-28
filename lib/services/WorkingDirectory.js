const { remote } = require('electron');
var dialog = remote.require('dialog');
var fs = require('fs');
import GitService from "./GitService";

const MOSES_CONFIG_KEY = "moses__config";

export default class WorkingDirectory {

  static fromStorage(){
    var config = localStorage.getItem(MOSES_CONFIG_KEY);
    if (!config) return null;
    return new WorkingDirectory(JSON.parse(config));
  }

  static request(fn){
    dialog.showOpenDialog({
      title: 'Choose Working Directory',
      properties: [
        'openDirectory',
        'createDirectory'
      ]
    },(fileNames) => {
      if (fileNames === undefined) return;
      var dir = fileNames[0];
      fn(dir);
    });
  }

  constructor(options){
    this.path = options.path;
    this.origin = options.origin;
    this.constructor.current = this;
  }

  persist(dir){
    localStorage.setItem(MOSES_CONFIG_KEY, JSON.stringify({
      path: this.path, 
      origin: this.origin
    }));
  }

  guard(message, fn){
    var {path, origin} = this;

    var push = function(err){
      if (err) {
        fn(err);
        return;
      }
      GitService.push(origin, path, fn);
    }

    var commit = function(){
      GitService.commit(path, message, push);
    }

    if (GitService.isGitRepository(path)){
      console.log('is git repo')
      commit()
    } else {
      GitService.initializeRepository(path, origin, commit);
    }
  }

}