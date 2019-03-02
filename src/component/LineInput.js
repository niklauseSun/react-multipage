import React, { Component } from 'react';
import './LineInput.scss'
import TextField from '@material-ui/core/TextField';

class LineInput extends Component {

    render () {
        const { title = "年龄", subTitle = "岁", changeTextFiled, textValue } = this.props;
        return (
            <div className="line-input-item">
                <span className="title">{title}</span>
                <TextField onChange={this.changeTextField} className="input-item" id="age-input" value={textValue} placeholder="请输入" />
                <span className="sub-title">{subTitle}</span>
            </div>
        )
    }

    changeTextField(val) {
        console.log('changeTextFiled', val)
    }
}

export default LineInput