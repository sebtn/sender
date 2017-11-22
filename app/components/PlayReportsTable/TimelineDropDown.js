import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import List, { ListItem, ListItemText } from 'material-ui/List'
import Menu, { MenuItem } from 'material-ui/Menu'

const styles = theme => ({
  root: {
    width: '80%',
    maxWidth: 500,
    textAlign: 'right',
    background: theme.palette.background.paper,
  },
})

const options = [
  'TITLE OF THE CATEGORY',
  'Show timeline 1',
  'Show timeline 2',
  'Show timeline 3',
  'Show timeline 4',
  'Show timeline 5',  
  'Hide sensitive notification content',
  'Hide all notification content',
]

class TimelineDropDown extends Component {
  state = {
    anchorEl: null,
    open: false,
    selectedIndex: 1,
  }

  button = undefined

  handleClickListItem = event => {
    this.setState({ open: true, anchorEl: event.currentTarget })
  }

  handleMenuItemClick = (event, index) => {
    this.setState({ selectedIndex: index, open: false })
  }

  handleRequestClose = () => {
    this.setState({ open: false })
  }

  render() {
    const { classes } = this.props
    return (
      <div className={classes.root}>
        <List>
          <ListItem
            button
            aria-haspopup="true"
            aria-controls="lock-menu"
            aria-label="SomeTimeline"
            onClick={this.handleClickListItem}
          >
            <ListItemText
              primary="Select SomeTimeline"
              secondary={options[this.state.selectedIndex]}
            />
          </ListItem>
        </List>
        <Menu
          id="lock-menu"
          anchorEl={this.state.anchorEl}
          open={this.state.open}
          onRequestClose={this.handleRequestClose}
        >
          {options.map((option, index) => (
            <MenuItem
              key={option}
              disabled={index === 0}
              selected={index === this.state.selectedIndex}
              onClick={event => this.handleMenuItemClick(event, index)}
            >
              {option}
            </MenuItem>
          ))}
        </Menu>
      </div>
    )
  }
}

TimelineDropDown.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(TimelineDropDown)