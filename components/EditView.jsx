import React from 'react';
import ReactDOM from 'react-dom';
import Editor from './Editor.jsx';

export default class EditView extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      renderedMode: false
    }
  }

  _onKeyPress(evt){
    var {shiftKey, which} = evt;
    if (!shiftKey) return;
    switch(which){
      case 80:
        evt.preventDefault();
        var renderedMode = !this.state.renderedMode;
        this.setState({renderedMode});
        if (renderedMode) this.element.focus();
        break;
      default:
        break;
    }
  }

  render() {
    return (
      <div 
        id="edit-view"
        tabIndex={-1}
        ref={(ref)=> this.element = ref}
        onKeyPress={({nativeEvent}) => this._onKeyPress(nativeEvent)} >
        <Editor 
          onStage={this.props.onStage}
          file={this.props.file}
          renderedMode={this.state.renderedMode} />
      </div>
    );
  }

}