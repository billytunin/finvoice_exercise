import React from 'react'
import './Button.css'

class Button extends React.Component {
  buttonClicked = () => {
    this.props.buttonClicked()
  }

  render() {
    return (
    <button className="compare-button" disabled={this.props.disabled} onClick={this.buttonClicked}>
      Compare
    </button>
    )
  }
}

export default Button
