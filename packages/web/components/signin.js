import React from 'react';
import Router from 'next/router';
import Cookies from 'universal-cookie';
import { NextAuth } from 'next-auth/client';

import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';
import withStyles from '@material-ui/core/styles/withStyles';

const styles = theme => ({
  form: {
    width: '100%',
    marginTop: theme.spacing.unit,
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
  },
});

class Index extends React.Component {
  static propTypes() {
    return {
      classes: React.PropTypes.object.isRequired
    };
  }

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      session: this.props.session,
      providers: this.props.providers,
      submitting: false
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
  }

  handleEmailChange(event) {
    this.setState({
      email: event.target.value.trim()
    });
  }

  handleSubmit(event) {
    event.preventDefault();

    if (!this.state.email) return;

    this.setState({
      submitting: true
    });

    // Save current URL so user is redirected back here after signing in
    const cookies = new Cookies();
    cookies.set('redirect_url', window.location.pathname, { path: '/' });

    NextAuth.signin(this.state.email)
    .then(() => {
      Router.push(`/auth/check-email?email=${this.state.email}`);
    })
    .catch(err => {
      Router.push(`/auth/error?action=signin&type=email&email=${this.state.email}`);
    });
  }

  render() {
    if (this.props.session.user) {
      return(<div/>);
    } else {
      return (
        <React.Fragment>
          <h2 className="text-center">Sign in</h2>
          <form className={this.props.classes.form}>
          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="email">Email Address</InputLabel>
            <Input id="email" name="email" autoComplete="email" autoFocus />
          </FormControl>
          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="password">Password</InputLabel>
            <Input name="password" type="password" id="password" autoComplete="current-password" />
          </FormControl>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={this.props.classes.submit}
          >
            Sign in
          </Button>
        </form>
        </React.Fragment>
      );
    }
  }
}

export default withStyles(styles)(Index);