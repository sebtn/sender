import React, { Component } from 'react'
import connect from 'react-redux'

import TableNormalVsPlayNext from './TableNormalVsPlayNext'

// const mapStateToProps = state => {
//   console.log(state)
// }

export default connect(mapStateToProps, mapDispatchToProps)(TableNormalVsPlayNext)