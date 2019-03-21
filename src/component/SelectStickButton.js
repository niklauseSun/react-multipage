import React, { Component } from 'react';
import "./SelectStickButton.scss"

class SelectStickButton extends Component {

    constructor(props) {
        super(props)
    }

    render() {
        const { title = "μmoI/L", active = false, activeIndex, changeIndex, style } = this.props

        if (active) {
            return <a className="active-select-stick-button" style={style} onClick={this.buttonActive.bind(this)}>
                <span className="active-stick-title active">{title}</span>
            </a>
        }

        return <a className="select-stick-button" style={style} onClick={this.buttonActive.bind(this)}>
            <span className="stick-title">{title}</span>
        </a>
    }

    buttonActive() {
        console.log('active')
        const { activeIndex, changeIndex } = this.props
        changeIndex(activeIndex)
    }
}

export default SelectStickButton