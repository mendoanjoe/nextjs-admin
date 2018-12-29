import React from 'react';
import Router from 'next/router';
import { withRouter } from 'next/router';
import Layout from '../components/layout';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const handlerButtonHome = () => {
  Router.push('/');
};
class ErrorPage extends React.Component {

  static propTypes() {
    return {
      errorCode: React.PropTypes.number.isRequired,
      url: React.PropTypes.string.isRequired
    };
  }

  static getInitialProps({res, xhr}) {
    const errorCode = res ? res.statusCode : (xhr ? xhr.status : null);
    return {errorCode};
  }

  render() {
    var response;
    switch (this.props.errorCode) {
      case 200:
      case 404:
        response = (
          <Layout {...this.props} navmenu={false}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                <h1>Page not Found</h1>
              </Typography>
              <Typography color="textSecondary">
                404 page not found. <br />
                Your page request not found.
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="medium" className="align-center" onClick={handlerButtonHome}>Home</Button>
            </CardActions>
          </Card>
        </Layout>
        );
        break;
      case 500:
        response = (
          <Layout {...this.props} navmenu={false}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                <h1>Internal Server Error</h1>
              </Typography>
              <Typography color="textSecondary">
                An internal server error occurred.
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="medium" className="align-center" onClick={handlerButtonHome}>Home</Button>
            </CardActions>
          </Card>
        </Layout>
        );
        break;
      default:
        response = (
          <Layout {...this.props} navmenu={false}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                <h1>HTTP { this.props.errorCode } Error</h1>
              </Typography>
              <Typography color="textSecondary">
                An <strong>HTTP { this.props.errorCode }</strong> error occurred while
                trying to access <strong>{ this.props.router.pathname }</strong>
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="medium" className="align-center" onClick={handlerButtonHome}>Home</Button>
            </CardActions>
          </Card>
        </Layout>
        );
    }

    return response;
  }

}

export default withRouter(ErrorPage);