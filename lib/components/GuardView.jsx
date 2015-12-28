import React from "react";

export default class GuardView extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      className: "hide"
    }
  }

  componentWillReceiveProps(nextProps){
    var className = "timeline-action animated";
    if (nextProps.activate) {
      className += " slideInUp";
    } else {
      if (this.props.activate) {
        className += " slideOutDown"
        var hideAfterSlide = (()=>{
          this.setState({className: "hide"});
          $('#guard-view').off();
        });
        $('#guard-view').on('webkitAnimationEnd', hideAfterSlide);
      } else {
        className += " hide"
      }
    }
    this.setState({className});
  }

  render(){
    return (
      <div id="guard-view" className={this.state.className}>
        <input
          onKeyDown={(evt)=>this.props.onGuardKeyDown(evt)}
          autoFocus={true}
          className="text-input"
          placeholder="Enter Message" />
      </div>
    );
  }

}