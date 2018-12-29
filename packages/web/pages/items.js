import React from 'react';
import Router from 'next/router';
import { NextAuth } from 'next-auth/client';
import Page from '../components/page';
import Layout from '../components/layout';
import Cookies from 'universal-cookie';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';

const handlerButtonLogin = () => {
  Router.push('/login');
};

const CustomTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
  row: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default,
    },
  },
});

let id = 0;
function createData(name, calories, fat, carbs, protein) {
  id += 1;
  return { id, name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

class Index extends Page {
  static propTypes() {
    return {
      classes: React.PropTypes.object.isRequired
    };
  }

  static async getInitialProps({req}) {
    let props = await super.getInitialProps({req});
    props.linkedAccounts = await NextAuth.linked({req});

    return props;
  }

  constructor(props) {
    super(props);
    this.state = {
      session: props.session,
      isSignedIn: (props.session.user) ? true : false,
      name: '',
      email: '',
      emailVerified: false,
      alertText: null,
      alertStyle: null
    };
    if (props.session.user) {
      this.state.name = props.session.user.name;
      this.state.email = props.session.user.email;
    }
  }

  async componentDidMount() {
    const session = await NextAuth.init({force: true});
    this.setState({
      session: session,
      isSignedIn: (session.user) ? true : false
    });

    const cookies = new Cookies();
    cookies.set('redirect_url', window.location.pathname, { path: '/' });
  }

  render() {
    if (this.state.isSignedIn === true) {
      return (
        <Layout {...this.props} navmenu={false}>
        <Paper className={this.props.classes.root}>
      <Table className={this.props.classes.table}>
        <TableHead>
          <TableRow>
            <CustomTableCell>Dessert (100g serving)</CustomTableCell>
            <CustomTableCell align="right">Calories</CustomTableCell>
            <CustomTableCell align="right">Fat (g)</CustomTableCell>
            <CustomTableCell align="right">Carbs (g)</CustomTableCell>
            <CustomTableCell align="right">Protein (g)</CustomTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => {
            return (
              <TableRow className={this.props.classes.row} key={row.id}>
                <CustomTableCell component="th" scope="row">
                  {row.name}
                </CustomTableCell>
                <CustomTableCell align="right">{row.calories}</CustomTableCell>
                <CustomTableCell align="right">{row.fat}</CustomTableCell>
                <CustomTableCell align="right">{row.carbs}</CustomTableCell>
                <CustomTableCell align="right">{row.protein}</CustomTableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </Paper>
        </Layout>
      );
    } else {
      return (
        <Layout {...this.props} navmenu={false}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                <h1>Access denied</h1>
              </Typography>
              <Typography color="textSecondary">
                You do not have permission to access this page. <br />
                Please login or register to request access.
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="medium" className="align-center" onClick={handlerButtonLogin}>Login</Button>
            </CardActions>
          </Card>
        </Layout>
      );
    }
  }
}

export default withStyles(styles)(Index);