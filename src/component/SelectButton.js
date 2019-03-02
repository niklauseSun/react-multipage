import React, { Component } from 'react';
import './SelectButton.scss'

class SelectButton extends Component {
    state = {
        value: 0
    }

    render() {
        const { value } = this.state;

        return (
            <div className="select-button-item">
                <div className={ value === 0 ? "select-button" : "un-select-button"}>
                    <span onClick={this.changeSelectButton.bind(this, 0)}>男</span>
                </div>
                <div className={ value === 1 ? "select-button" : "un-select-button"}>
                    <span onClick={this.changeSelectButton.bind(this, 1)}>女</span>
                </div>
            </div>
        )
    }

    changeSelectButton(val) {
        this.setState({
            value: val
        })
    }
}

export default SelectButton