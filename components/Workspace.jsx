import React from 'react';
import EditView from './EditView.jsx';
import FileStorage from './FileStorage';
import WorkspaceFile from './File';

import {menuEmitter} from "./menu/Main";

export default class Workspace extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      file: new WorkspaceFile()
    };
  }

  openFile(){
    FileStorage.open((file)=>{
      this.setState({file});
    });
  }

  saveFile(){
    FileStorage.save(this.state.file);
  }

  componentWillMount() {
    menuEmitter.on('open', ()=> this.openFile());
    menuEmitter.on('save', ()=> this.saveFile());
  }

  onStage(contents){
    var {file} = this.state;
    file.contents = contents;
    this.setState({file});
  }

  render(){
    document.title = this.state.file.name || "untitled";
    return (
      <EditView 
        onStage={(contents)=> this.onStage(contents)}
        file={this.state.file} />
    );
  }
}
