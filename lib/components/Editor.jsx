import React from 'react';
import ReactDOM from 'react-dom';
var marked = require('marked');

export default class Editor extends React.Component {

  constructor(props){
    super(props);
  }

  componentWillMount(){
    this.marked = marked;

    this.marked.setOptions({
      renderer: new marked.Renderer(),
        gfm: true,
        tables: true,
        breaks: true,
        pedantic: false,
        sanitize: false,
        smartLists: true,
        smartypants: false
    });
  }

  componentDidMount(){
    this._setTabbable();
  }

  _setTabbable(){
    var el = this.textArea;
    el.onkeydown = function(e) {
      if (e.keyCode === 9) {
        var val = this.value,
            start = this.selectionStart,
            end = this.selectionEnd;
        this.value = val.substring(0, start) + '\t' + val.substring(end);
        this.selectionStart = this.selectionEnd = start + 1;
        return false;
      }
    };
  }

  _onTextChange(evt){
    var text = this.textArea.value;
    this.props.onStage(text);
  }

  render(){

    var mainView;

    if (this.props.renderedMode) {
      var __html = this.marked(this.props.file.contents);
      console.log(__html);
      mainView = (
        <div id="preview-mode" dangerouslySetInnerHTML={{__html}}>
        </div>
      );
    } else {
      mainView = (
        <textarea 
          value={this.props.file.contents}
          onChange={(evt) => {this._onTextChange(evt)}}
          ref={(ref)=>this.textArea = ref}
          autoFocus={true} />
      );
    };

    return (
      <div className="editor-container" onKeyPress={this._onKeyPress}>
        {mainView}
      </div>
    );
  }

}
