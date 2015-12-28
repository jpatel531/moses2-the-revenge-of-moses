var fs = require('fs');
var ChildProcess = require('child_process');

export default {

  isGitRepository(path){
    var files = fs.readdirSync(path);
    return files.indexOf(".git") > -1;
  },

  setOrigin(path, remote, fn){
    var command = `git remote add origin ${remote}`;
    console.log(command);
    this._exec(command, path, fn);
  },

  initializeRepository(path, remote, fn){
    var command = "git init";
    var addRemote = ()=>{
      this.setOrigin(path, remote, fn);
    }
    this._exec(command, path, addRemote);
  },

  commit(path, message, fn){
    var command = `
      git add . 
      git commit -m "${message}"
    `;

    this._exec(command, path, fn);
  },

  push(remote, path, fn){
    var command = "git push origin master";
    this._exec(command, path, fn);
  },

  _exec(command, path, fn){
    ChildProcess.exec(command, {
      cwd: path
    }, function(err){
      if (fn) fn(err);
    })
  }

}