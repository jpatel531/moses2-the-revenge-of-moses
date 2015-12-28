import React from "react";

export default class MetaData extends React.Component {
  render(){
    return (
      <div className="full-width metadata-view">
        <span className="small">
          Word Count: {this.props.wordCount}
        </span>
      </div>
    );
  }
}