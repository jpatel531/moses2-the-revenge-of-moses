import React from 'react';

export default class Timeline extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      className: "hide"
    }
  }

  componentWillReceiveProps(nextProps){
    var className = "animated";
    if (nextProps.activate) {
      className += " slideInUp";
    } else {
      if (this.props.activate) {
        className += " slideOutDown"
      } else {
        className += " hide"
      }
    }
    this.setState({className});
  }

  _onGuardKeyDown(evt){
    var {value} = this.guardInput;
    this.props._onGuardKeyDown(evt, value);
  }

  render(){
    var action;

    switch(this.props.mode){
      case "guard":
        action = (
          <div className="timeline-action">
            <input
              ref={(ref)=> this.guardInput = ref}
              onKeyDown={(evt)=>this._onGuardKeyDown(evt)}
              autoFocus={true}
              className="text-input"
              placeholder="Enter Message" />
          </div>
        );
        break;
      default:
        break;
    }
    return (
      <div 
        className={this.state.className}
        id="timeline">
          {action}
      </div>
    );
  }

}