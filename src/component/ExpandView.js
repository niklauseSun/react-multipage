import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import "./ExpandView.scss"

class ExpandView extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isExpand: true
        }
    }

    render() {
        const { title = "年龄", subTitle = "岁", changeTextFiled, textValue, subView = null } = this.props;

        const { isExpand } = this.state;
        if (isExpand) {
            return (
                <div className="expand-true-view">
                    <div className="expand-first-view">
                        <span className="expand-title">{title}</span>
                        <TextField onChange={this.changeTextField} className="expand-input-item" id="age-input" value={textValue} placeholder="请输入" />
                        <span className="expand-sub-title">{subTitle}</span>
                        <a className="expand-button" onClick={this.expandClick.bind(this)}>向下</a>
                    </div>
                    {subView}
                </div>
            )

        } else {
            return (
                <div className="expand-view">
                    <span className="expand-title">{title}</span>
                    <TextField onChange={this.changeTextField} className="expand-input-item" id="age-input" value={textValue} placeholder="请输入" />
                    <span className="expand-sub-title">{subTitle}</span>
                    <a className="expand-button" onClick={this.expandClick.bind(this)}>向下</a>
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
}

export default ExpandView