var fs = require('fs');
var ChildProcess = require('child_process');

export default {

  isGitRepository(path){
    var files = fs.readdirSync(path);
    return files.indexOf(".git") > -1;
  },

  initializeRepository(path, fn){
    Repository.init(path, false).then((repo)=> {
      if (fn) fn(repo);
    });
  },

  commit(path, message){

    var command = `
      git add . 
      git commit -m "${message}"
    `;

    ChildProcess.exec(command, {
      cwd: path
    }, function(err, stdout, stderr){
      if (err) console.log('Error', err);
    })

  }
}