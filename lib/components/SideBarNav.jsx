import React from "react";

class ActivatableNavItem extends React.Component {
  render() {
    var mode = this.props.mode;
    var activeMode = this.props.activeMode;
    var className = "";
    if (mode === activeMode) className += " active";

    return (
      <li className="tab col s3">
        <a href={this.props.link} 
          onClick={()=>this.props.onSelect(mode)}
          className={className}>
          {this.props.text}
        </a>
      </li>
    );

  }
}

export default class SideBarNav extends React.Component {

  render(){
    return(
     <div className="row">
        <div className="col s12">
          <ul className="tabs">
            <ActivatableNavItem 
              mode="guard" 
              onSelect={this.props.onSelect}
              activeMode={this.props.activeMode}
              text="Guard Work"
              link="#guard-item" />
            <ActivatableNavItem 
              mode="history" 
              onSelect={this.props.onSelect}
              activeMode={this.props.activeMode}
              text="View History"
              link="#" />
            <ActivatableNavItem 
              mode="etc" 
              onSelect={this.props.onSelect}
              activeMode={this.props.activeMode}
              text="ETC."
              link="#" />
          </ul>
        </div>
      </div>   
    );
  }

}