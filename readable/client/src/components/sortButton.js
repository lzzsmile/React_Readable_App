import React, {Component} from 'react'
import {ButtonToolbar, ToggleButtonGroup, ToggleButton} from 'react-bootstrap'
import {connect} from 'react-redux'
import * as PreferenceActions from '../actions/preferenceActions'

class SortButton extends Component {

  onSortByDate() {
    this.props.setSortingPreferenceByDate()
  }

  onSortByScore() {
    this.props.setSortingPreferenceByScore()
  }

  render() {
    return (
      <div className="sortButtons">
        <ButtonToolbar>
          <ToggleButtonGroup type="radio" name="options" defaultValue={2}>
            <ToggleButton value={1} onClick={this.onSortByDate.bind(this)}>
              <strong>Sort by Date</strong>
            </ToggleButton>
            <ToggleButton value={2} onClick={this.onSortByScore.bind(this)}>
              <strong>Sort by Score</strong>
            </ToggleButton>
          </ToggleButtonGroup>
        </ButtonToolbar>
      </div>
    )
  }
}

const mapStateToProps = state => {
  const {preference} = state.preferences
  return {preference}
}

const mapDispatchToProps = {
  ...PreferenceActions
}

export default connect(mapStateToProps, mapDispatchToProps)(SortButton)
