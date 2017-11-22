import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import { connect } from 'react-redux'
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table'
import Paper from 'material-ui/Paper'

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
})

class NormalPlayNext extends Component  {

  render () {
    const {classes}   = this.props 
    const { plays }   = this.props.plays  
    return (
      <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell numeric> Location </TableCell>
            <TableCell numeric>JukeId</TableCell>
            <TableCell numeric>Origin</TableCell>
            <TableCell numeric>Type</TableCell>
            <TableCell numeric> playNow</TableCell>
            <TableCell numeric> playCount</TableCell>          
          </TableRow>
        </TableHead>
        <TableBody>
          {plays.map( (n, index) => {
            return (
              <TableRow key={n.index}>
                <TableCell numeric>{n.locationId}</TableCell>
                <TableCell numeric>{n.jukeboxId}</TableCell>
                <TableCell numeric>{n.origin}</TableCell>
                <TableCell numeric>{n.type}</TableCell>
                <TableCell numeric>{n.playNow.toString()}</TableCell>
                <TableCell numeric>{n.playCount}</TableCell>              
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </Paper>
    )
  }
}

NormalPlayNext.propTypes = {
  classes: PropTypes.object.isRequired,
}

const mapStateToProps = state => {
  const { plays } = state
  return {
    plays: plays.toJS(),
  }
}

const styled =  withStyles(styles)(NormalPlayNext)

export default connect(mapStateToProps)(styled)