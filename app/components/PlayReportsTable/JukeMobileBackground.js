import React, { Component } from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import keycode from 'keycode'
import Table, {
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
} from 'material-ui/Table'
import Toolbar from 'material-ui/Toolbar'
import Typography from 'material-ui/Typography'
import Paper from 'material-ui/Paper'
import Checkbox from 'material-ui/Checkbox'
import IconButton from 'material-ui/IconButton'
import Tooltip from 'material-ui/Tooltip'
import DeleteIcon from 'material-ui-icons/Delete'
import FilterListIcon from 'material-ui-icons/FilterList'
import { connect } from 'react-redux'

// import testAction  from '../../actions/testAction'
import TimelineDropDown from './TimelineDropDown'

const columnData = [
  { id: 'locationName', numeric: true, disablePadding: false, label: 'LocationName' },
  { id: 'locationId', numeric: true, disablePadding: false, label: 'Locations' },  
  { id: 'jukeId', numeric: true, disablePadding: false, label: 'Favorites' },
  // { id: 'origin', numeric: false, disablePadding: false, label: 'Favorites (%)' },
  { id: 'type', numeric: true, disablePadding: false, label: 'MultiCredits' },
  // { id: 'playNow', numeric: false, disablePadding: false, label: 'MultiCredits (%)' },
  { id: 'playCount', numeric: true, disablePadding: false, label: 'Play count' },
  { id: 'total', numeric: true, disablePadding: false, label: 'Total here' },
]

class EnhancedTableHead extends Component {
  static propTypes = {
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.string.isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
  }

  createSortHandler = property => event => {
    this.props.onRequestSort(event, property)
  }

  render() {
    const { onSelectAllClick, order, orderBy, numSelected, rowCount } = this.props

    return (
      <TableHead>
        <TableRow>
          <TableCell padding="checkbox">
            <Checkbox
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={numSelected === rowCount}
              onChange={onSelectAllClick}
            />
          </TableCell>
          {columnData.map(column => {
            return (
              <TableCell
                key={column.id}
                numeric={column.numeric}
                padding={column.disablePadding ? 'none' : 'default'}
              >
                <Tooltip
                  title="Sort"
                  placement={column.numeric ? 'bottom-end' : 'bottom-start'}
                  enterDelay={300}
                >
                  <TableSortLabel
                    active={orderBy === column.id}
                    direction={order}
                    onClick={this.createSortHandler(column.id)}
                  >
                    {column.label}
                  </TableSortLabel>
                </Tooltip>
              </TableCell>
            )
          } , this)}
        </TableRow>
      </TableHead>
    )
  }
}

const toolbarStyles = theme => ({
  root: {
    paddingRight: 2,
  },
  highlight:
    theme.palette.type === 'light'
      ? {
          color: theme.palette.secondary.A700,
          backgroundColor: theme.palette.secondary.A100,
        }
      : {
          color: theme.palette.secondary.A100,
          backgroundColor: theme.palette.secondary.A700,
        },
  spacer: {
    flex: '1 1 100%',
  },
  actions: {
    color: theme.palette.text.secondary,
  },
  title: {
    flex: '0 0 auto',
  },
  timeLine: {
    float: 'right',
    minWidth: '500px',
  }
})

let EnhancedTableToolbar = props => {
  const { numSelected, classes } = props

  return (
    <Toolbar
      className={classNames(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >
      <div className={classes.title}>
        {numSelected > 0 ? (
          <Typography type="subheading">{numSelected} selected</Typography>
        ) : (
          <Typography type="title">Juke vs Mobile vs BGM</Typography>
        )}
      </div>
      <div className={classes.spacer} />      
      <div className={classes.timeLine}> <TimelineDropDown  /></div>          
      <div className={classes.actions}>
        {numSelected > 0 ? (
          <Tooltip title="Delete">
            <IconButton aria-label="Delete">
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        ) : (
          <Tooltip title="Filter list">
            <IconButton aria-label="Filter list">
              <FilterListIcon />
            </IconButton>
          </Tooltip>
        )}
      </div>
    </Toolbar>
  )
}

EnhancedTableToolbar.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
}

EnhancedTableToolbar = withStyles(toolbarStyles)(EnhancedTableToolbar)

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
  },
  table: {
    minWidth: 800,
  },
  tableWrapper: {
    overflowX: 'auto',
  },
})

class JukeMobileBackground extends Component {
  constructor(props, context) {
    super(props, context)

    this.state = {
      order: 'asc',
      orderBy: 'jukeId',
      selected: [],
      data: ['one', 1].sort((a, b) => (a.JukeboxId < b.JukeboxId ? -1 : 1)),
      page: 0,
      rowsPerPage: 7,
    }
  }

  handleRequestSort = (event, property) => {
    const orderBy = property
    let order = 'desc'

    if (this.state.orderBy === property && this.state.order === 'desc') {
      order = 'asc'
    }

    const data =
      order === 'desc'
        ? this.state.data.sort((a, b) => (b[orderBy] < a[orderBy] ? -1 : 1))
        : this.state.data.sort((a, b) => (a[orderBy] < b[orderBy] ? -1 : 1))

    this.setState({ data, order, orderBy })
  }

  handleSelectAllClick = (event, checked) => {
    if (checked) {
      this.setState({ selected: this.state.data.map(n => n.id) })
      return
    }
    this.setState({ selected: [] })
  }

  handleKeyDown = (event, id) => {
    if (keycode(event) === 'space') {
      this.handleClick(event, id)
    }
  }

  handleClick = (event, id) => {
    // testAction()

    const { selected } = this.state
    const selectedIndex = selected.indexOf(id)
    let newSelected = []

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id)
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1))
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1))
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      )
    }

    this.setState({ selected: newSelected })
  }

  handleChangePage = (event, page) => {
    this.setState({ page })
  }

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value })
  }

  isSelected = id => this.state.selected.indexOf(id) !== -1

  render() {
    const { classes } = this.props
    const { plays } = this.props
    const { data, order, orderBy, selected, rowsPerPage, page } = this.state

    return (
      <Paper className={classes.root}>
        <EnhancedTableToolbar numSelected={selected.length} />
        <div className={classes.tableWrapper}>
          <Table className={classes.table}>
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={this.handleSelectAllClick}
              onRequestSort={this.handleRequestSort}
              rowCount={plays.length}
            />
            <TableBody>
              {plays.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map( (n, index) => {
                const isSelected = this.isSelected(n.id)
                return (
                  <TableRow
                    hover
                    onClick={event => this.handleClick(event, n.id)}
                    onKeyDown={event => this.handleKeyDown(event, n.id)}
                    role="checkbox"
                    aria-checked={isSelected}
                    tabIndex={-1}
                    key={n.id}
                    selected={isSelected}
                  >                                    
                    <TableCell padding="checkbox">
                      <Checkbox checked={isSelected} />
                    </TableCell>
                    <TableCell padding={'default'}>{n.locationId}</TableCell>
                    <TableCell padding={'default'} numeric>{n.jukeboxId}</TableCell>
                    <TableCell padding={'default'} numeric>{n.origin}</TableCell>
                    <TableCell padding={'default'} numeric>{n.type}</TableCell>
                    <TableCell padding={'default'} numeric>{n.playNow.toString()}</TableCell>
                    <TableCell padding={'default'} numeric>{n.playCount}</TableCell>          
                  </TableRow>
                )
              })}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  count={data.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onChangePage={this.handleChangePage}
                  onChangeRowsPerPage={this.handleChangeRowsPerPage}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </div>
      </Paper>
    )
  }
}

JukeMobileBackground.propTypes = {
  classes: PropTypes.object.isRequired,
}

const mapStateToProps = state => {
  const { plays } = state
  return {
    plays: plays.toJS(),
  }
}

const styled = withStyles(styles)(JukeMobileBackground)
export default connect(mapStateToProps)(styled)