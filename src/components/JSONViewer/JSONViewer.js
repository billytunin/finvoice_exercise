import React from 'react'
import './JSONViewer.css'

class JSONViewer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isValidJSON: false
    }
  }

  textAreaChanged = (event) => {
    try {
      const parsedObj = JSON.parse(event.target.value)
      this.setState({ isValidJSON: true })
      this.props.objectChanged(
        this.props.objID,
        parsedObj
      )
    } catch(error) {
      this.setState({ isValidJSON: false })
      this.props.objectChanged(
        this.props.objID,
        null
      )
    }
  }

  render() {
    return (
      <div className="json-viewer-body">
        <p className="json-viewer-title">Write your JSON Object {this.props.objID}</p>
        <textarea
          onChange={this.textAreaChanged}
          rows="15"
          cols="100"
          data-testid="json-text-area"
        />
        <p className={`json-text ${this.state.isValidJSON ? 'valid' : 'invalid'}`}>
          {this.state.isValidJSON ? 'Valid' : 'Invalid'} JSON
        </p>
      </div>
    )
  }
}

export default JSONViewer
