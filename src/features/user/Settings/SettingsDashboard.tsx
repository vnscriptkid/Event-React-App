import React from 'react';
import { Grid } from 'semantic-ui-react';
import { SettingsNav } from './SettingsNav';
import { Route, Redirect, Switch } from 'react-router';
import { BasicPage } from './BasicPage';
import { AboutPage } from './AboutPage';
import { AccountPage } from './AccountPage';
import { PhotosPage } from './Photos/PhotosPage';
import { connect } from 'react-redux';
import { StoreState } from '../../../app/reducers';
import { ProviderName, FirebaseProfile } from '../../auth/authConstants';
import {
  updateProfile,
  updateUserImage,
  deleteImage,
  setMainPhoto
} from '../userActions';
import { updatePassword } from '../../auth/authActions';

export interface SettingsDashboardProps {
  updatePassword: typeof updatePassword;
  updateProfile: typeof updateProfile;
  providerName: ProviderName | undefined;
  profile: FirebaseProfile;
  updateUserImage: typeof updateUserImage;
  deleteImage: typeof deleteImage;
  setMainPhoto: typeof setMainPhoto;
}

const _SettingsDashboard: React.SFC<SettingsDashboardProps> = ({
  updatePassword,
  updateProfile,
  updateUserImage,
  providerName,
  profile,
  deleteImage,
  setMainPhoto
}) => {
  return (
    <Grid>
      <Grid.Column width={12}>
        <Switch>
          <Redirect exact from='/settings' to='/settings/basics' />
          <Route
            path='/settings/basics'
            render={() => (
              <BasicPage
                initialValues={profile}
                updateProfile={updateProfile}
              />
            )}
          />
          <Route
            path='/settings/about'
            render={() => (
              <AboutPage
                initialValues={profile}
                updateProfile={updateProfile}
              />
            )}
          />
          <Route
            path='/settings/photos'
            render={() => (
              <PhotosPage
                updateUserImage={updateUserImage}
                deleteImage={deleteImage}
                setMainPhoto={setMainPhoto}
              />
            )}
          />
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
    state.firebase.auth.providerData[0].providerId,
  profile: state.firebase.profile
});

const actions = {
  updatePassword,
  updateProfile,
  updateUserImage,
  deleteImage,
  setMainPhoto
};

const SettingsDashboard = connect(
  mapState,
  actions as any
)(_SettingsDashboard);

export { SettingsDashboard };
