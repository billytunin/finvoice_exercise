import React from 'react'
import './App.css'
import JSONViewer from '../JSONViewer/JSONViewer'
import CompareButton from '../Button/Button'
import _ from 'lodash'

// These could be whatever you want!
const ObjOneID = 'one'
const ObjTwoID = 'two'

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      [ObjOneID]: null,
      [ObjTwoID]: null,
      compareButtonDisabled: true
    }
  }

  objectChanged = (objectName, newValue) => {
    this.setState({ [objectName]: newValue }, () => {
      this.setState({
        compareButtonDisabled: this.state[ObjOneID] && this.state[ObjTwoID] ? false : true
      })
    })
  }

  compareObjects(obj1, obj2) {
    // We will be adding 1 point for each key+value we found to be the same in both
    // objects. Afterwards, to get a score from the range 0 to 1, we will need to divide that total by
    // however many times we iterate over it.
    // For example:
    // 1 + 1 + 1 + 1 (4 times) = 4. And 4 / 4 = 1
    // 1 + 1 + 0 + 0 (4 times) = 2. And 2 / 4 = 0.5
    // 1 + 0 + 0 + 0 (4 times) = 1. And 1 / 4 = 0.25
    const score = {
      totalValue: 0,
      divisor: 0
    }

    this.recursiveTest(obj1, obj2, score)
    alert(
      `Values analyzed: ${score.divisor}\nMatching values: ${score.totalValue}\nTotal score: ${score.totalValue / score.divisor}`
    )
  }

  recursiveTest(obj1, obj2, scoreObj) {
    _.forEach(obj1, (iteratedValue, indexOrKey) => {
      if (obj2[indexOrKey] === undefined) {
        // We are inspecting an undefined value here because:
        // 1) Object: the specified key doesn't exist
        // 2) Array: we are inspecting a value outside array's length
        // Increment divisor count and nothing else, this counts negatively towards total score.
        scoreObj.divisor++
        return
      }

      if (_.isEqual(iteratedValue, obj2[indexOrKey])) {
        // We found matching values!
        scoreObj.totalValue++
        scoreObj.divisor++
      } else if (_.isPlainObject(iteratedValue)) {
        if (_.isPlainObject(obj2[indexOrKey])) {
          // If the values we are comparing are objects and they differ in length of keys,
          // iterate over the longest object.
          const lengthDifference = Object.keys(iteratedValue).length - Object.keys(obj2[indexOrKey]).length
          if (lengthDifference < 0) {
            this.recursiveTest(obj2[indexOrKey], iteratedValue, scoreObj)
          } else {
            this.recursiveTest(iteratedValue, obj2[indexOrKey], scoreObj)
          }
        } else {
          // One value was an object, the other one wasn't. Non-matching values
          scoreObj.divisor++
        }
      } else if (Array.isArray(iteratedValue)) {
        if (Array.isArray(obj2[indexOrKey])) {
          // If the values we are comparing are arrays and they differ in length of values,
          // iterate over the longest array.
          const lengthDifference = iteratedValue.length - obj2[indexOrKey].length
          if (lengthDifference < 0) {
            this.recursiveTest(obj2[indexOrKey], iteratedValue, scoreObj)
          } else {
            this.recursiveTest(iteratedValue, obj2[indexOrKey], scoreObj)
          }
        } else {
          // One value was an array, the other one wasn't. Non-matching values
          scoreObj.divisor++
        }
      } else {
        // Non-matching values which, in addition, were not an object or an array... so there's nothing more
        // to recursively check
        scoreObj.divisor++
      }
    })
  }

  compareButtonClicked = () => {
    this.compareObjects(this.state[ObjOneID], this.state[ObjTwoID])
  }

  render() {
    return (
      <div className="app">
        <JSONViewer objectChanged={this.objectChanged} objID={ObjOneID} />
        <JSONViewer objectChanged={this.objectChanged} objID={ObjTwoID} />
        <CompareButton buttonClicked={this.compareButtonClicked} disabled={this.state.compareButtonDisabled} />
      </div>
    )
  }
}

export default App
