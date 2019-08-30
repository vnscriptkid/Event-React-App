##Note-taking:

### Semantic UI

- Grid has 16 cols, unlike Bootstrap with 12 cols
- Form
  > autoComplete="off"

### Typescript

- Flow or Typescript for React?
- Add: /_global google_/ first line of the file to bypass warning in case of calling google
- With Redux Thunk: see features/test/TestPage.tsx -> incrementAsync
- Partial<ReactReduxFirebaseConfig> -> take only a sub part of the interface

### Packages:

- How to see info of a package: npm ls date-fns

### React

- Handle loading Page that get data from parent (safe loading)

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
- <Route> : renderProps or component ? when for each?
  > when `renderProps` ? Need to pass something to Component to render, <Route render={() => <Component name="thanh"/>}>

### Redux Form

- Order of hoc is important ( esp. when initialValues is used): connect()(
  reduxForm()(Component)
  )

- <Field component={X}>
  X get props: { input, meta }

* input { value, onChange ... }
* meta { error, touched, dirty ... }

- Form Validation:
  > revalidate
  > Field validation <Field validate={[passwordMustMatch]}> : in case need value of other field for example
- moment vs date-fns: what are the differences?
- react-datepicker v2: use native Date and date-fns

- props.change('name', 'Thanh')
- SubmissionError
  > Can be throw in thunk
- reset the form values in thunk is possible
  > await dispatch(reset('formName'))
- re-render form every time initialValues changes
  > enableReinitialize=true
- updateForm uses `pristine` & `submitting` to check disabled of submit button

### Google Map API

- API

* Maps Javascript API
* Places API: Autocomplete

- options can be provided to get more specific results

* Geocoding API: geocode <-> address

- React Libs:
  React Places Autocomplete

### React Hooks come to handy

- Use cases

* button to toggle a section: [isSomethingOpen, toggleSomething] = useState(false)

### Modals

- Login and Register Form using Modal but not separate Page

* why ? Keep user at the current page after login (without redirecting back)
* When ? A website that allows users to browse anonymously on some pages
* How ? ModalManager lives at the top of the React Tree , listen for events from reducer
  and react accordingly (render appropriate Modal)

* Event here is a payload of a action, contains modalName as well as modalProps

### Redux Thunk

### DateFns

- Version matters when formating
- react-datepicker (> v2.0) internally uses Datefns
- parse(new Date, 'yyyy')
- parseISO() -> convert a string to Date object

### Firestore

- https://console.firebase.google.com/u/0/?pli=1
- attendees.map is not a function -> Object.values()
- firestore has no array
- timestamp (Timestamp type) -> convert to native Date object by calling `ts.toDate()`
- send Date as value -> store as timestamp

### Firebase Authentication

- User object has some props that can not be added more (workaround: Firestore)
- Use IndexedDB to store authentication information

### React-Redux-Firebase

- hoc: withFirebase (better than using firebase object)
  > hoc intergrate methods and data into Component props
- save userProfile into firestore (we see instant changes, whereas in case of firebase, we need to reload)

### Social Login

- Facebook
  > Turn on Facebook Authentication method in Firebase App
  > Firebase App -> callback URL -> Facebook App
  > Facebook App -> App ID, App Secret -> Firebase App

### React-Redux

- Instead of using `connect()` in every component, group them into a common parent
  Using `connect()` at parent, pass down connectedProps as props

### Javascript

- Trick: Remove some props from object
  > const { a, b, ...preservedProps } = props;
- Check if object is type of Date
  > instanceof Date
  > Object.prototype.toString.call(obj) === "[object Date]"

### Programming

- Data consistency:
  > Save Date as timestamp instead of string -> sort by order
