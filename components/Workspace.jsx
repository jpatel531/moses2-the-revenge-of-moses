import React from 'react';
import EditView from './EditView.jsx';
import FileStorage from './FileStorage';
import WorkspaceFile from './File';
import {newWindow} from "./Factory";
import {menuEmitter} from "./menu/main";
const {remote} = require('electron');
const {BrowserWindow, getCurrentWindow} = remote;
import WorkingDirectory from "./WorkingDirectory";
import Timeline from "./Timeline.jsx";

export default class Workspace extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      file: new WorkspaceFile(),
      dirty: false,
      cwd: WorkingDirectory.fromStorage(),
      activateTimeline: false
    };
  }

  openFileInNewWindow(){
    var win = newWindow();

    FileStorage.open((file)=>{
      win.emit('moses:new-file', file);
      win.show();
    });
  }

  openFile(){
    if (this.state.dirty) {
      console.log('opening in new window..')
      this.openFileInNewWindow();
    } else {
      FileStorage.open((file)=>{
        this.setState({file});
      });
    }
  }

  saveFile(){
    FileStorage.save(this.state.file, (name)=>{
      var {file} = this.state;
      file.name = name;
      this.setState({file});
    });
  }

  componentWillMount() {
    menuEmitter.on('open', ()=> this.openFile());
    menuEmitter.on('save', ()=> this.saveFile());
    menuEmitter.on('toggle-timeline', ()=>{
      this.setState({activateTimeline: !this.state.activateTimeline});
    });
    menuEmitter.on('guard', ()=> this.setState({
      timelineMode: 'guard',
      activateTimeline: 'true'
    }));

    getCurrentWindow().on('moses:new-file', (file)=>{
      this.setState({file});
    });

    if (!this.state.cwd) {
      WorkingDirectory.request((cwd)=>{
        this.setState({cwd});
      });
    }
  }

  onStage(contents){
    var {file} = this.state;
    file.contents = contents;
    var dirty = true;
    this.setState({file, dirty});
  }

  _onGuardKeyDown(evt, value){
    if (evt.which !== 13) return;
    this.state.cwd.guard(value, (err)=>{
      if (err) {
        console.log('Error', err);
      } else {
        this.setState({activateTimeline: false});
      }
    });  
  }

  render(){
    document.title = this.state.file.name || "untitled";
    
    return (
      <div>
        <EditView 
        onStage={(contents)=> this.onStage(contents)}
        file={this.state.file} />

        <Timeline 
          mode={this.state.timelineMode}
          _onGuardKeyDown={({nativeEvent}, message)=>{this._onGuardKeyDown(nativeEvent, message)}}
          activate={this.state.activateTimeline} />
      </div>
    );
  }
}
