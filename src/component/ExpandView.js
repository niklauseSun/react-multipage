import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import "./ExpandView.scss"

class ExpandView extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isExpand: false
        }
    }

    render() {
        const { title = "年龄", subTitle = "岁", textValue, subView = null } = this.props;

        const { isExpand } = this.state;
        if (isExpand) {
            return (
                <div className="expand-true-view">
                    <div className="expand-first-view">
                        <span className="expand-title">{title}</span>
                        {this.renderTextInput()}
                        <span className="expand-sub-title">{subTitle}</span>
                        <a className="expand-button" onClick={this.expandClick.bind(this)}>
                            收起
                        </a>
                    </div>
                    {subView}
                </div>
            )

        } else {
            return (
                <div className="expand-view">
                    <span className="expand-title">{title}</span>
                    {this.renderTextInput()}
                    <span className="expand-sub-title">{subTitle}</span>
                    <a className="expand-button" onClick={this.expandClick.bind(this)}>
                        展开
                    </a>
                </div>
            )
        }

        
    }

    renderTextInput() {
        const { showTextInput = true, textValue } = this.props
        if (showTextInput) {
            return (
                <TextField onChange={this.changeTextField.bind(this)} className="expand-input-item" id="age-input" value={textValue} placeholder="请输入" />
            )
        } else {
            return (
                <div style={{ flex: 1 }}>

                </div>
            )
        }
    }

    expandClick() {
        console.log('test')
        this.setState({
            isExpand: !this.state.isExpand
        })
    }

    changeTextField(event) {
        const { onChangeText } = this.props;
        console.log('changeTextFiled', event.target.value)
        onChangeText(event.target.value)
    }
}

export default ExpandView