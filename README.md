##Note-taking:

### Semantic UI

- Grid has 16 cols, unlike Bootstrap with 12 cols

### Typescript

- Flow or Typescript for React?

### Packages:

- How to see info of a package: npm ls date-fns

### React

###### Break down the UI into components first

###### Idetify state

###### Controlled vs Uncontrolled, when to use which ?

###### Using `key` instead of `componentWillReceiveProps`

- Component updates when either props or state changes

###### Reuseable form for create and update Page

- location: { key: 'xyz' } -> `key` here is different for different route (location)
- `/createEvent` and `/edit/:eventId` both render `EventForm` but has differnent `key`
  <Route
  path={['/createEvent', '/manage/:id']}
  render={props => (
  <EventForm key={props.location.key} {...props} />
  )}
  />
- history.goBack() -> back to previous page in browser history (even outside the current site)

### React Router

- Link vs NavLink
- history props, when it is available?
  > Case 1: <Route path="" component={X} />
  > Case 2: Not inside Route, need withRouter
- Internal Routing: Redirect and Route inside Switch
- Change pages from client, window does not scroll to top

### Redux Form

- Order of hoc is important ( esp. when initialValues is used): connect()(
  reduxForm()(Component)
  )

- <Field component={X}>
  X get props: { input, meta }

* input { value, onChange ... }
* meta { error, touched, dirty ... }

- revalidate
- moment vs date-fns: what are the differences?
- react-datepicker v2: use native Date and date-fns

### Google Map API

- API

* Maps Javascript API
* Places API: Autocomplete
* Geocoding API: geocode <-> address

- React Libs:
  React Places Autocomplete
