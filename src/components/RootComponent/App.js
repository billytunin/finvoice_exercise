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

    debugger

    if (_.isEqual(obj1, obj2)) {
      score.totalValue++
      score.divisor++
    } else {
      score.divisor--
      this.recursiveComparisonIteration(obj1, obj2, score)
    }

    console.log('delete me 9')
    console.log(score)
    // Could be NaN
    console.log(score.totalValue / score.divisor)
  }

  recursiveComparisonIteration(valueA, valueB, scoreObj) {
    if (_.isEqual(valueA, valueB)) {
      scoreObj.totalValue++
    } else {
      if (Array.isArray(valueA) && Array.isArray(valueB)) {
        // If the values we are comparing are arrays and they differ in length:
        // Iterate over the longest array, and apply these length differences negatively
        // towards the total score by adding divisor counts
        const lengthDifference = valueA.length - valueB.length
        if (lengthDifference === 0) {
          this.iterateArrays(valueA, valueB, scoreObj)
        } else if (lengthDifference > 0) {
          scoreObj.divisor += lengthDifference
          this.iterateArrays(valueA, valueB, scoreObj)
        } else {
          scoreObj.divisor -= lengthDifference
          this.iterateArrays(valueB, valueA, scoreObj)
        }
      } else if (_.isPlainObject(valueA) && _.isPlainObject(valueB)) {
        // If the values we are comparing are objects and they differ in length of keys:
        // Iterate over the longest object, and apply these length differences negatively
        // towards the total score by adding divisor counts
        const lengthDifference = Object.keys(valueA).length - Object.keys(valueB).length
        if (lengthDifference === 0) {
          this.iterateObjects(valueA, valueB, scoreObj)
        } else if (lengthDifference > 0) {
          scoreObj.divisor += lengthDifference
          this.iterateObjects(valueA, valueB, scoreObj)
        } else {
          scoreObj.divisor -= lengthDifference
          this.iterateObjects(valueB, valueA, scoreObj)
        }
      }
    }
    scoreObj.divisor++
  }

  iterateArrays(arrayA, arrayB, scoreObj) {
    arrayA.forEach(valA => {
      arrayB.forEach(valB => this.recursiveComparisonIteration(valA, valB, scoreObj))
    })
  }

  iterateObjects(objA, objB, scoreObj) {
    for (let keyA in objA) {
      for (let keyB in objB) {
        if (keyA === keyB) {
          this.recursiveComparisonIteration(objA[keyA], objB[keyB], scoreObj)
          // We can stop the loop because we already found the keys we wanted to compare
          break
        }
      }
    }
  }

  compareButtonClicked = () => {
    const result = this.compareObjects(this.state[ObjOneID], this.state[ObjTwoID])
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
