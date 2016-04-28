import React from "react";
import StoreComponent from "./store-component";
import EditorLine from "./editor-line";
import {shouldShowUserIcon, addLangToLines} from "./editor";
import {createCompiler} from "./syntax/markup";
import {decorateLines} from "./syntax/decorator";

export default class Viewer extends StoreComponent{

  mapState(state){
    return {page: state.page};
  }

  componentWillMount(){
    super.componentWillMount();
    this.compiler = createCompiler({state: this.state, action: this.action});
  }

  render(){
    const {page} = this.state;
    const lines = decorateLines(page.lines);
    const lis = Object.keys(page.lines).map(i => {
      const line = lines[i];
      return (
        <li key={line.id || i} style={{marginLeft: line.indent*20}}>
          <EditorLine
             line={line}
             compiler={this.compiler}
             showUser={shouldShowUserIcon(lines, i)}
             />
        </li>
      );
    });
    return (
      <div className="editor">
        <ul>{lis}</ul>
      </div>
    );
  }
}
