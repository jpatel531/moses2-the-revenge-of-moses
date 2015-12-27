var fs = require('fs');
var ChildProcess = require('child_process');

export default {

  isGitRepository(path){
    var files = fs.readdirSync(path);
    return files.indexOf(".git") > -1;
  },

  initializeRepository(path, fn){
    var command = "git init";
    ChildProcess.exec(command, {
      cwd: path
    }, function(err){
      if (err) console.log('Error', err);
      if (fn) fn();
    })
  },

  commit(path, message, fn){

    var command = `
      git add . 
      git commit -m "${message}"
    `;

    ChildProcess.exec(command, {
      cwd: path
    }, function(err){
      if (fn) fn(err);
    })

  }
}