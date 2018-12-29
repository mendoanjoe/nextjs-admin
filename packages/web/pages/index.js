import React from 'react';
import Page from '../components/page';
import Layout from '../components/layout';
import Typography from '@material-ui/core/Typography';

export default class extends Page {
  render() {
    return (
      <Layout {...this.props} navmenu={false} container={false}>
        <div>
          <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
            Hello World
          </Typography>
          <Typography variant="h6" align="center" color="textSecondary" component="p">
            Et has aeterno ullamcorper, ut lucilius tacimates assueverit qui. Sit ad nisl aeterno. Eos in alii voluptua, diceret democritum id eos. Indoctum gubergren usu ea, pertinax convenire referrentur no nam. Labore pericula laboramus quo te, labores incorrupte te pri. Ad illud similique sed. An eos feugiat persequeris intellegebat, cibo scriptorem intellegebat ut cum.
          </Typography>
        </div>
      </Layout>
    );
  }
}