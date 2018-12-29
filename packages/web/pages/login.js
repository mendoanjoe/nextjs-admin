import React from 'react';
import Router from 'next/router';
import Cookies from 'universal-cookie';
import { NextAuth } from 'next-auth/client';
import Page from '../components/page';
import Layout from '../components/layout';
import SignIn from '../components/signin';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

export default class extends Page {
  static async getInitialProps({req, res, query}) {
    let props = await super.getInitialProps({req});
    props.session = await NextAuth.init({force: true, req: req});
    props.providers = await NextAuth.providers({req});

    if (props.session.user) {
      if (req) {
        res.redirect('/account');
      } else {
        Router.push('/account');
      }
    }

    // If passed a redirect parameter, save it as a cookie
    if (query.redirect) {
      const cookies = new Cookies((req && req.headers.cookie) ? req.headers.cookie : null);
      cookies.set('redirect_url', query.redirect, { path: '/' });
    }
    return props;
  }

  render() {
    if (this.props.session.user) {
      Router.push('/items');
    } else {
      return (
        <Layout {...this.props} navmenu={false} signinBtn={false}>
          <Card>
            <CardContent>
              <SignIn session={this.props.session} providers={this.props.providers}/>
            </CardContent>
          </Card>
        </Layout>
      );
    }
  }
}