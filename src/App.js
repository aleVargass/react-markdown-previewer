// Putra's way
// with bundle.js, but no index.js created, i dont rememeber why i dit not work
import React from "react";
import ReactDOM from "react-dom";
import "./App.css";
import icon from "./expand-icon.svg";
const {marked} = require("marked")
import Prism from "prismjs";

marked.setOptions({
    breaks: true,
    highlight: function (code) {
        return Prism.highlight(code, Prism.languages.javascript, "javascript")
    }
});

const renderer = new marked.Renderer();
renderer.link = function (href, title, text) {
    return `<a target="_blank" href="${href}">${text}</a>`;
}

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            markdown: placeholder,
            editorMaximized: false,
            previewerMaximized: false
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleEditorMaximize = this.handleEditorMaximize.bind(this);
        this.handlePreviewerMaximize = this.handlePreviewerMaximize.bind(this);

    }
    handleChange(e) {
        this.setState({
            markdown: e.target.value
        });
    }
    handleEditorMaximize() {
        this.setState({
            editorMaximized: !this.state.editorMaximized
        });
    }
    handlePreviewerMaximize() {
        this.setState({
            previewerMaximized: !this.state.previewerMaximized
        });
    }
    render() {
        const classes = this.state.editorMaximized 
        ? ["editorWrap maximized", "previewerWrap hide"] 
        : this.state.previewerMaximized
        ? ["editorWrap hide", "previewerWrap maximized"]
        : ["editorWrap", "previewerWrap"];

        return (
        <div>
            <div 
            className={classes[0]}>
                <Toolbar 
                    text="Editor" 
                    onClick={this.handleEditorMaximize}
                />
                <Editor 
                    markdown={this.state.markdown}
                    onChange={this.handleChange}
                />
            </div>
            <div 
                className={classes[1]}>
                    <Toolbar 
                        text="Previewer" 
                        onClick={this.handlePreviewerMaximize}
                    />
                    <Previewer 
                        markdown={this.state.markdown}
                    />
            </div>
        </div>
        )
    }
    
}

const Toolbar = props => {
    return (
        <div className="toolbar">
            {props.text}
            <img height={22} className="icon" src={icon} onClick={props.onClick}/>
        </div>
    )
}

const Editor = props => {
    return (
        <textarea 
            className="editor"
            value={props.markdown}
            onChange={props.onChange}
        />
    )
}

const Previewer = props => {
    return (
        <div className="previewer" 
        dangerouslySetInnerHTML={{
            __html: marked(props.markdown, { renderer: renderer })
        }}
        />
    )
}
    
const placeholder = `# Welcome to my React Markdown Previewer!

## This is a sub-heading...
### And here's some other cool stuff:

Heres some code, \`<div></div>\`, between 2 backticks.

\`\`\`
// this is multi-line code:

function anotherExample(firstLine, lastLine) {
  if (firstLine == '\`\`\`' && lastLine == '\`\`\`') {
    return multiLineCode;
  }
}
\`\`\`

You can also make text **bold**... whoa!
Or _italic_.
Or... wait for it... **_both!_**
And feel free to go crazy ~~crossing stuff out~~.

There's also [links](https://www.freecodecamp.org), and
> Block Quotes!

And if you want to get really crazy, even tables:

Wild Header | Crazy Header | Another Header?
------------ | ------------- | -------------
Your content can | be here, and it | can be here....
And here. | Okay. | I think we get it.

- And of course there are lists.
  - Some are bulleted.
     - With different indentation levels.
        - That look like this.


1. And there are numbered lists too.
1. Use just 1s if you want!
1. And last but not least, let's not forget embedded images:

![freeCodeCamp Logo](https://cdn.freecodecamp.org/testable-projects-fcc/images/fcc_secondary.svg)
`;

ReactDOM.render(<App/>, document.getElementById("app"));