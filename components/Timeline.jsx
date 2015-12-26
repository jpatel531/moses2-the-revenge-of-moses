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
      }
    }
    this.setState({className});
  }

  _onGuardKeyDown(evt){
    if (evt.which !== 13) return;
    var {value} = this.guardInput;
    this.props.cwd.guard(value);
  }

  render(){
    var action;

    switch(this.props.mode){
      case "guard":
        action = (
          <div className="timeline-action">
            <input
              ref={(ref)=> this.guardInput = ref}
              onKeyDown={({nativeEvent})=> this._onGuardKeyDown(nativeEvent)}
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