import React, { Component } from 'react';
import "./SelectStickButton.scss"

class SelectStickButton extends Component {

    constructor(props) {
        super(props)
        this.state = {
            active: false
        }
    }

    render() {
        const { active } = this.state;
        const { title = "μmoI/L" } = this.props

        if (active) {
            return <a className="active-select-stick-button" onClick={this.buttonActive.bind(this)}>
                <span className="active-stick-title active">{title}</span>
            </a>
        }

        return <a className="select-stick-button" onClick={this.buttonActive.bind(this)}>
            <span className="stick-title">{title}</span>
        </a>
    }

    buttonActive() {
        console.log('active')
        this.setState({
            active: !this.state.active
        })
    }
}

export default SelectStickButton