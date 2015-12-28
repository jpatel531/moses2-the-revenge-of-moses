import React from 'react';
import EditView from './EditView.jsx';
import FileStorage from '../services/FileStorage';
import WorkspaceFile from '../services/File';
import {newWindow} from "../services/Factory";
import {menuEmitter} from "../services/Menu";
const {remote} = require('electron');
const {BrowserWindow, getCurrentWindow} = remote;
import WorkingDirectory from "../services/WorkingDirectory";
import SideBar from "./SideBar.jsx";
import ConfigModal from "./ConfigModal.jsx";
import MetaData from "./MetaData.jsx";
var path = require('path');

export default class Workspace extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      file: new WorkspaceFile(),
      dirty: false,
      cwd: WorkingDirectory.fromStorage(),
      activateSideBar: false,
      getConfig: false,
      sideBarMode: null,
      wordCount: 0
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
      this.setState({activateSideBar: !this.state.activateSideBar});
    });
    menuEmitter.on('save-as', ()=>{

    })
    menuEmitter.on('guard', ()=> this.setState({
      sideBarMode: 'guard',
      activateSideBar: 'true'
    }));

    getCurrentWindow().on('moses:new-file', (file)=>{
      this.setState({file});
    });

    if (!this.state.cwd) {
      this.setState({getConfig:true});
    }
  }

  onStage(contents){
    var {file} = this.state;
    file.contents = contents;
    var dirty = true;
    this.setState({file, dirty});
  }

  _onGuardKeyDown(evt, value){
    this.state.cwd.guard(value, (err)=>{
      if (err) {
        console.log('Error', err);
      } else {
        evt.target.value = '';
        this.setState({activateSideBar: false});
      }
    });  
  }

  saveSettings(path, origin){
    var workingDirectory = new WorkingDirectory({path, origin});
    workingDirectory.persist();
    this.setState({
      cwd: workingDirectory,
      getConfig: false
    })
  }

  _getWordCount(contents){
    if (typeof(contents)==="string") {
      return (contents.trim().
              replace(/['";:,.?¿\-!¡]+/g, '').
              match(/\S+/g) || []).
              length;
    } else {
      return 0;
    }
  }

  _onNavSelect(sideBarMode){
    this.setState({sideBarMode})
  }

  render(){
    var fileName = this.state.file.name;
    document.title = fileName ? path.basename(fileName) : "untitled"

    return (
      <div className="full-height">
        <MetaData 
          wordCount={this._getWordCount(this.state.file.contents)} />
        <ConfigModal 
          show={this.state.getConfig} 
          saveSettings={(path, origin)=> this.saveSettings(path, origin)}/>
        <EditView 
          sideBarActivated={this.state.activateSideBar}
          onStage={(contents)=> this.onStage(contents)}
          file={this.state.file} />
        <SideBar 
          mode={this.state.sideBarMode}
          onSelect={(mode)=> this._onNavSelect(mode)}
          _onGuardKeyDown={({nativeEvent}, message)=>{this._onGuardKeyDown(nativeEvent, message)}}
          activate={this.state.activateSideBar} />
      </div>
    );
  }
}
