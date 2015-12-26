var { 
  Repository, 
  Config, 
  Signature,
  Reference
} = require('nodegit');
var fs = require('fs');

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
    var index,
        oid, 
        repo, 
        head,
        username, 
        email, 
        config,
        parent;

    Repository.
    open(path).

    then((_repo)=>{
      repo = _repo;
      return repo
    }).

    then(()=> {
      return repo.openIndex();
    }).

    then((indexResult)=>{
      index = indexResult;
      return index.read(1);
    }).

    then(()=>{
      return index.addAll();
    }).

    then(()=>{
      return index.write();
    }).

    then(()=>{
      return index.writeTree();
    }).

    then((oidResult)=>{
      oid = oidResult;
      return Reference.nameToId(repo, "HEAD").then((_head)=>{
        head = _head;
      })
    }).catch((err)=>{
      console.log(err);
      return false;
    }).

    then(function(getHead) {
      if (getHead === false) return;
      return repo.getCommit(head).then((_parent)=>{
        parent = _parent;
        console.log('parent', parent);
        return;
      });
    }).

    then(()=>{
      return Config.openDefault().then((_config)=>{
        config = _config;
        return;
      });
    }).

    then(()=>{
      return config.getStringBuf("user.name").then((_username)=>{
        username = _username;
        return;
      });
    }).

    then(()=>{
      return config.getStringBuf("user.email").then((_email)=>{
        email = _email;
        return;
      });
    }).

    then(()=>{
      var now = new Date().getTime() / 1000;
      var author = Signature.create(username, email, now, 0);
      var committer = author;

      var parents = (parent) ? [parent]: null

      return repo.createCommit("HEAD", author, committer, message, oid, parents).
        then((oid)=> {
        return oid;
      });
    }).

    done(function(commitId) {
      console.log("New Commit: ", commitId);
    });
  }
}