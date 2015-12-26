export default class WorkspaceFile {

  /*
  { name, contents }
   */
  constructor(name, contents){
    // Object.assign(this, options);
    this.name = name;
    this.contents = contents;
    this.dirty = false;
  }

  // contentListener(){
  //   if (this.listener) return this.listener;
  //   this.listener = new EventEmitter();
  //   this.listener.on('stage', (contents)=>{
  //     if (!this.dirty) this.dirty = true;
  //     this.contents = contents;
  //   });
  //   return this.listener;
  // }

}