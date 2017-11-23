import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { withStyles } from 'material-ui/styles'
import AppBar from 'material-ui/AppBar'
import Tabs, { Tab } from 'material-ui/Tabs'
import Typography from 'material-ui/Typography'

import FavoritesMulticredit from './FavoritesMulticredit'
import NormalPlayNext from './NormalPlayNext'
import JukeMobileBackground from './JukeMobileBackground'

import TableNormalVsPlayNext from '../TablesRefactor/NormalVsPlaynext/TableNormalVsPlayNext.js'

function TabContainer(props) {
  return <div style={{ padding: 0, margin: 0 }}>{props.children}</div>
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
}

const styles = theme => ({
  root: {
    flexGrow: 1,
    marginTop: theme.spacing.unit * 0,
    backgroundColor: theme.palette.background.paper,
  },
  tab: {
    marginLeft: theme.spacing.unit * 0,
    padding: '0 0',
    minWidth: '275px',
    minHeight: '5rem',
  },
})

class NavBar extends Component {
  state = { value: 1 }

  handleChange = (event, value) => {
    this.setState({ value })
  }

  render() {
    const { classes } = this.props
    const { value } = this.state

    return (
      <div className={classes.root}>
        <Typography type="display3" className={classes.title}>HOME - PLAYS</Typography>
        <AppBar position="static" color="default">
            <Tabs value={value} onChange={this.handleChange} >
              <Tab className={classes.tab} label="Favorite / Multi-Credits" />
              <Tab className={classes.tab} label="Normal / Play Next" />
              {/* <Tab className={classes.tab} label="Jukebox / Mobile / Background" href="#Play-report-tables" /> */}
            </Tabs>
        </AppBar>
        {value === 0 && <TabContainer> <FavoritesMulticredit /> </TabContainer>}
        {/* {value === 1 && <TabContainer> <NormalPlayNext /> </TabContainer>} */}
        {value === 2 && <TabContainer> <TableNormalVsPlayNext /> </TabContainer>}
        {/* {value === 3 && <TabContainer> <TimelineDropDown /></TabContainer>} */}
      </div>
    )
  }
}

NavBar.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(NavBar)