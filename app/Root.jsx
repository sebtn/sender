import React from 'react'
import { connect } from 'react-redux'
import { Route } from 'react-router-dom'
import PlayReportsTable from './components/PlayReportsTable/PlayReportsTable'

export const Root = props => (
  <div>
    <Route component={PlayReportsTable} />
  </div>
)

export default connect()(Root)
