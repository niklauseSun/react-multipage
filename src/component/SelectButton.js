import React, { Component } from 'react';
import './SelectButton.scss'

class SelectButton extends Component {

    render() {
        // const { value } = this.state;
        const { gender } = this.props
        return (
            <div className="select-button-item">
                <div className={ gender === 0 ? "select-button" : "un-select-button"}>
                    <span onClick={this.changeSelectButton.bind(this, 0)}>男</span>
                </div>
                <div className={ gender === 1 ? "select-button" : "un-select-button"}>
                    <span onClick={this.changeSelectButton.bind(this, 1)}>女</span>
                </div>
            </div>
        )
    }

    changeSelectButton(val) {
        const { changeGender } = this.props
        changeGender(val)
    }
}

export default SelectButton