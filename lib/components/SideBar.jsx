import React from 'react';
import SideBarNav from "./SideBarNav.jsx";
import GuardView from "./GuardView.jsx";

export default class SideBar extends React.Component {

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
    var {which, target: {value}} = evt;
    if (which !== 13) return;
    this.props._onGuardKeyDown(evt, value);
  }

  render(){
    return (
      <div
        className={this.state.className}
        id="timeline">
          <SideBarNav 
            onSelect={this.props.onSelect}
            mode={this.props.mode} />
          <GuardView
            activate={this.props.mode === "guard"}
            onGuardKeyDown={(evt)=>this._onGuardKeyDown(evt)}
            />
      </div>
    );
  }

}