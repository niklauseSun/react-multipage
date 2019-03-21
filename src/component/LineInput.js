import React, { Component } from 'react';
import './LineInput.scss'
import TextField from '@material-ui/core/TextField';

class LineInput extends Component {

    render () {
        const { title = "年龄", subTitle = "岁", textValue = "" } = this.props;
        return (
            <div className="line-input-item">
                <span className="line-title">{title}</span>
                <TextField onChange={this.changeTextField.bind(this)} className="input-item" id="age-input" value={textValue} placeholder="请输入" />
                <span className="line-sub-title">{subTitle}</span>
            </div>
        )
    }

    changeTextField(event) {
        console.log('onChangeText', event.target.value)
        const { onChangeText } = this.props
        onChangeText(event.target.value)
    }
}

export default LineInput