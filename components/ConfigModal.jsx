import React from "react";
import WorkingDirectory from "./WorkingDirectory";

export default class ConfigModal extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      directory: null,
      remote: null
    }
  }

  inputDirectory(){
    WorkingDirectory.request((directory)=>{
      this.setState({directory});
    });
  }

  inputRemote(remote){
    this.setState({remote});
  }

  confirmSettings(){
    var {directory, remote} = this.state;
    this.props.saveSettings(directory, remote);
  }

  render(){

    var className = "modal config-modal";
    if (this.props.show) className += " show";

    return (
      <div id="modal1" className={className}>
        <div className="modal-content">
          <h4>Input your settings</h4>
          <p>A bunch of text</p>
          <div className="row">
            <div className="input-field col s12">
              <input 
                type="text" 
                id="directory" 
                onClick={()=> this.inputDirectory()} 
                value={this.state.directory}
                className="validate" />
              <label htmlFor="directory">Choose Working Directory</label>
            </div>
          </div>
          <div className="row">
            <div className="input-field col s12">
              <input 
                type="text" 
                id="origin" 
                value={this.state.remote}
                onChange={({target: {value}}) => {this.inputRemote(value)}}
                className="validate" />
              <label htmlFor="origin">Github Origin</label>
            </div>
          </div>
        </div>
        <div className="modal-footer">
          <a onClick={()=> this.confirmSettings()} className=" modal-action modal-close waves-effect waves-teal btn-flat">
            Confirm
          </a>
        </div>
      </div>
    );
  }


}