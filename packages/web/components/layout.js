import React from 'react';
import Router from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import Signin from './signin';
import { NextAuth } from 'next-auth/client';
import Cookies from 'universal-cookie';

import Styles from '../css/index.scss';

import CssBaseline from '@material-ui/core/CssBaseline';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const stylesTheme = theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white,
    },
  },
  appBar: {
    position: 'relative',
  },
  layout: {
    width: 'auto',
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(900 + theme.spacing.unit * 3 * 2)]: {
      width: 900,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  heroContent: {
    maxWidth: '100%',
    margin: '0 auto',
    padding: `${theme.spacing.unit * 8}px 0 ${theme.spacing.unit * 6}px`,
  },
  toolbarTitle: {
    flex: 1,
  }
});

class Index extends React.Component {

  static propTypes() {
    return {
      session: React.PropTypes.object.isRequired,
      providers: React.PropTypes.object.isRequired,
      children: React.PropTypes.object.isRequired,
      classes: React.PropTypes.object.isRequired
    };
  }

  constructor(props) {
    super(props);
    this.state = {
      navOpen: false,
      modal: false,
      providers: null
    };
    this.toggleModal = this.toggleModal.bind(this);
  }

  async toggleModal(e) {
    if (e) e.preventDefault();

    // Save current URL so user is redirected back here after signing in
    if (this.state.modal !== true) {
      const cookies = new Cookies();
      cookies.set('redirect_url', window.location.pathname, { path: '/' });
    }

    this.setState({
      providers: this.state.providers || await NextAuth.providers(),
      modal: !this.state.modal
    });
  }

  render() {
    return (
      <React.Fragment>
        <Head>
          <meta charSet="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1"/>
          <title>{this.props.title || 'Next.js Starter Project'}</title>
          <style dangerouslySetInnerHTML={{__html: Styles}}/>
        </Head>

        <CssBaseline />
        <AppBar position="static" className={this.props.classes.appBar}>
          <Toolbar>
            <Typography variant="h6" color="inherit" noWrap className={this.props.classes.toolbarTitle}>
              Nextjs Admin
            </Typography>
            <UserMenu session={this.props.session} classes={this.props.classes}/>
          </Toolbar>
        </AppBar>

        {/* Content */}
        <main className={this.props.classes.layout}>
          <div className={this.props.classes.heroContent}>
            {this.props.children}
          </div>
        </main>

      </React.Fragment>
    );
  }
}
export default withStyles(stylesTheme)(Index);

export class UserMenu extends React.Component {
  constructor(props) {
    super(props);
    this.handleSignoutSubmit = this.handleSignoutSubmit.bind(this);
  }

  async handleSignoutSubmit(event) {
    event.preventDefault();
    // Save current URL so user is redirected back here after signing out
    const cookies = new Cookies();
    cookies.set('redirect_url', window.location.pathname, { path: '/' });

    await NextAuth.signout();
    Router.push('/');
  }

  render() {
    // SIGN IN = TRUE
    if (this.props.session && this.props.session.user) {
      return (
        <div>
          <Button color="inherit" href="/">
            Home
          </Button>

          <Button color="inherit" href="/items">
            Items
          </Button>

          <Button color="inherit" href="/account">
            Account
          </Button>

          <Button color="inherit" href="/logout">
            Logout
          </Button>
        </div>
      );
    } else { // SIGN IN = FALSE
      return (
        <div>
          <Button color="inherit" href="/">
            Home
          </Button>

          <Button color="inherit" href="/login">
            Login
          </Button>

          <Button color="inherit" href="/register">
            Register
          </Button>
        </div>
      );
    }
  }
}

export class AdminMenuItem extends React.Component {
  render() {
    if (this.props.session.user && this.props.session.user.admin === true) {
      return (
        <React.Fragment>
          <Link prefetch href="/admin">
            <a href="/admin" className="dropdown-item"><span className="icon ion-md-settings mr-1"></span> Admin</a>
          </Link>
        </React.Fragment>
      );
    } else {
      return(<div/>);
    }
  }
}
