import React, { Fragment } from 'react';
import { EventDashboard } from '../../features/event/EventDashboard/EventDashboard';
import { NavBar } from '../../features/nav/NavBar/NavBar';
import { Container } from 'semantic-ui-react';
import { Route, Switch } from 'react-router';
import { HomePage } from '../../features/home/HomePage';
import { EventDetailed } from '../../features/event/EventDetailed/EventDetailedPage';
import { PeopleDashboard } from '../../features/user/PeopleDashboard/PeopleDashboard';
import { UserDetailed } from '../../features/user/UserDetailed/UserDetailed';
import { SettingsDashboard } from '../../features/user/Settings/SettingsDashboard';
import { EventForm } from '../../features/event/EventForm.tsx/EventForm';
import { TestPage } from '../../features/test/TestPage';

const App: React.FC = () => {
  return (
    <Fragment>
      <Switch>
        <Route path='/' exact component={HomePage} />
        <Route
          path='/'
          render={() => (
            <Fragment>
              <NavBar />
              <Container className='main'>
                <Route path='/events' exact component={EventDashboard} />
                <Route path='/events/:id' component={EventDetailed} />
                <Route path='/people' component={PeopleDashboard} />
                <Route path='/profile/:id' component={UserDetailed} />
                <Route
                  path={['/createEvent', '/manage/:id']}
                  render={props => (
                    <EventForm key={props.location.key} {...props} />
                  )}
                />
                <Route path='/settings' component={SettingsDashboard} />
                <Route path='/test' component={TestPage} />
              </Container>
            </Fragment>
          )}
        />
      </Switch>
    </Fragment>
  );
};

export default App;
