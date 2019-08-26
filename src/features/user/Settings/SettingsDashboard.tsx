import React from 'react';
import { Grid } from 'semantic-ui-react';
import { SettingsNav } from './SettingsNav';
import { Route, Redirect, Switch } from 'react-router';
import { BasicPage } from './BasicPage';
import { AboutPage } from './AboutPage';
import { AccountPage } from './AccountPage';
import { PhotosPage } from './PhotosPage';
import { connect } from 'react-redux';
import * as actions from '../../auth/authActions';
import { StoreState } from '../../../app/reducers';
import { ProviderName } from '../../auth/authConstants';

export interface SettingsDashboardProps {
  updatePassword: typeof actions.updatePassword;
  providerName: ProviderName | undefined;
}

const _SettingsDashboard: React.SFC<SettingsDashboardProps> = ({
  updatePassword,
  providerName
}) => {
  return (
    <Grid>
      <Grid.Column width={12}>
        <Switch>
          <Redirect exact from='/settings' to='/settings/basics' />
          <Route path='/settings/basics' component={BasicPage} />
          <Route path='/settings/about' component={AboutPage} />
          <Route path='/settings/photos' component={PhotosPage} />
          <Route
            path='/settings/account'
            render={() => (
              <AccountPage
                updatePassword={updatePassword}
                providerName={providerName}
              />
            )}
          />
        </Switch>
      </Grid.Column>
      <Grid.Column width={4}>
        <SettingsNav />
      </Grid.Column>
    </Grid>
  );
};

const mapState = (state: StoreState) => ({
  providerName:
    state.firebase.auth.providerData &&
    state.firebase.auth.providerData[0].providerId
});

const SettingsDashboard = connect(
  mapState,
  actions as any
)(_SettingsDashboard);

export { SettingsDashboard };
