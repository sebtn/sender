import React , {Component} from 'react'
import { connect } from 'react-redux'
import { compose, bindActionCreators } from 'redux'

import NavBar from './NavBar'
import * as actionCreators from '../../actions/playTableActions'

class PlayReportsTable  extends Component  {
  render () {
    const { children } = this.props
    return (
      <div>
        {children}
        <NavBar />
      </div>
    )
  }
}

const mapDispatchToProps =  dispatch => {
  return bindActionCreators({
    startPlaysFetch: dispatch( actionCreators.startPlaysFetch() ),    
    // getPlayNextData: dispatch( actionCreators.getPlayNextData(json) ) 
  }, dispatch)
}

export default connect(null, mapDispatchToProps)(PlayReportsTable)