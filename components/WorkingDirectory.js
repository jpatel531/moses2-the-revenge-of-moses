const { remote } = require('electron');
var dialog = remote.require('dialog');
var fs = require('fs');
import GitService from "./GitService";

const WORKING_DIRECTORY_KEY = "moses__working_directory";

export default class WorkingDirectory {

  static fromStorage(){
    var path = localStorage.getItem(WORKING_DIRECTORY_KEY);
    if (!path) return null;
    return new WorkingDirectory(path);
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
      var workingDirectory = new WorkingDirectory(dir);
      workingDirectory.persist();
      fn(workingDirectory);
    });
  }

  constructor(path){
    this.path = path;
    this.constructor.current = this;
  }

  persist(dir){
    localStorage.setItem(WORKING_DIRECTORY_KEY, this.path);
  }

  guard(message){
    var path = this.path;
    var commit = function(){
      GitService.commit(path, message);
    }
    if (GitService.isGitRepository(path)){
      console.log('is git repo')
      commit()
    } else {
      GitService.initializeRepository(path, commit);
    }
  }

}