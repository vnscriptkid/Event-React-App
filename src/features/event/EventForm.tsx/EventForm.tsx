/*global google*/
import React, { useState } from "react";
import { Segment, Button, Grid, Header } from "semantic-ui-react";
// import { RouteComponentProps } from "react-router";
import * as Yup from "yup";

// import {
//   createEvent,
//   updateEvent,
//   createEventAsync,
//   updateEventAsync,
//   toggleEventCancelAsync,
// } from "../eventActions";
// import { Event } from "../eventContants";
// import { WithFirestoreProps } from "react-redux-firebase";
import { Form, Formik } from "formik";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { MyTextInput } from "../../../app/common/form/MyTextInput";
import { MySelectInput } from "../../../app/common/form/MySelectInput";
import { MyTextArea } from "../../../app/common/form/MyTextarea";
// import { MyPlaceInput } from "../../../app/common/form/MyPlaceInput";
import { MyDateInput } from "../../../app/common/form/MyDateInput";
import { categoryData } from "../../../app/api/categoryOptions";
import { toast } from "react-toastify";
import { addEventToFirestore } from "../../../app/firestore/firestoreService";

export const EventForm = ({ history }: any): JSX.Element => {
  // const dispatch = useDispatch();
  const [loadingCancel, setLoadingCancel] = useState(false);
  const selectedEvent = useSelector((state: any) => state.event);
  const [confirmOpen, setConfirmOpen] = useState(false);
  // const { loading, error } = useSelector((state: any) => state.async);

  const initialValues = {
    title: "",
    category: "",
    description: "",
    city: "",
    venue: "",
    // city: {
    //   address: "",
    //   latLng: null,
    // },
    // venue: {
    //   address: "",
    //   latLng: null,
    // },
    date: "",
  };

  const validationSchema = Yup.object({
    title: Yup.string().required("You must provide a title"),
    category: Yup.string().required("You must provide a category"),
    description: Yup.string().required(),
    city: Yup.string().required(),
    venue: Yup.string().required(),
    // city: Yup.object().shape({
    //   address: Yup.string().required("City is required"),
    // }),
    // venue: Yup.object().shape({
    //   address: Yup.string().required("Venue is required"),
    // }),
    date: Yup.string().required(),
  });

  // async function handleCancelToggle(event: any) {
  //   setConfirmOpen(false);
  //   setLoadingCancel(true);
  //   try {
  //     await cancelEventToggle(event);
  //     setLoadingCancel(false);
  //   } catch (error) {
  //     setLoadingCancel(true);
  //     toast.error(error.message);
  //   }
  // }

  return (
    <Grid>
      <Grid.Column width={10}>
        <Segment clearing>
          <Formik
            enableReinitialize
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={async (values, { setSubmitting }) => {
              try {
                // selectedEvent
                //   ? await updateEventInFirestore(values)
                //   :
                await addEventToFirestore(values);
                setSubmitting(false);
                history.push("/events");
              } catch (error) {
                toast.error(error.message);
                setSubmitting(false);
              }
            }}
          >
            {({ isSubmitting, dirty, isValid, values }) => (
              <Form className="ui form">
                <Header sub color="teal" content="Event Details" />
                <MyTextInput name="title" placeholder="Event title" />
                <MySelectInput
                  name="category"
                  placeholder="Event category"
                  options={categoryData}
                />
                <MyTextArea
                  name="description"
                  placeholder="Description"
                  rows={3}
                />
                <Header sub color="teal" content="Event Location Details" />
                <MyTextInput name="city" placeholder="City" />
                <MyTextInput name="venue" placeholder="Venue" />
                {/* <MyPlaceInput name="city" placeholder="City" />
                <MyPlaceInput
                  name="venue"
                  disabled={!values.city.latLng}
                  placeholder="Venue"
                  options={{
                    location: new google.maps.LatLng(values.city.latLng as any),
                    radius: 1000,
                    types: ["establishment"],
                  }}
                /> */}
                <MyDateInput
                  name="date"
                  placeholderText="Event date"
                  timeFormat="HH:mm"
                  showTimeSelect
                  timeCaption="time"
                  dateFormat="MMMM d, yyyy h:mm a"
                  autoComplete="off"
                />
                {selectedEvent && (
                  <Button
                    loading={loadingCancel}
                    type="button"
                    floated="left"
                    color={selectedEvent.isCancelled ? "green" : "red"}
                    content={
                      selectedEvent.isCancelled
                        ? "Reactivate event"
                        : "Cancel Event"
                    }
                    onClick={() => setConfirmOpen(true)}
                  />
                )}
                <Button
                  loading={isSubmitting}
                  disabled={!isValid || !dirty || isSubmitting}
                  type="submit"
                  floated="right"
                  positive
                  content="Submit"
                />
                <Button
                  disabled={isSubmitting}
                  as={Link}
                  to="/events"
                  type="submit"
                  floated="right"
                  content="Cancel"
                />
              </Form>
            )}
          </Formik>
        </Segment>
      </Grid.Column>
    </Grid>
  );
};
// interface Props extends RouteComponentProps, WithFirestoreProps {
//   createEvent: typeof createEvent;
//   updateEvent: typeof updateEvent;
//   createEventAsync: typeof createEventAsync;
//   updateEventAsync: typeof updateEventAsync;
//   toggleEventCancelAsync: typeof toggleEventCancelAsync;
//   event: Event;
//   eventId: string;
// }

// interface State {
//   cityLatlng: google.maps.LatLngLiteral | null;
//   venueLatLng: google.maps.LatLngLiteral | null;
// }

// enum InputNames {
//   title = "title",
//   date = "date",
//   city = "city",
//   venue = "venue",
//   category = "category",
//   description = "description",
// }

// const categories: any[] = [
//   { key: "1", text: "Culture", value: "Culture" },
//   { key: "2", text: "Nature", value: "Nature" },
//   { key: "3", text: "Food And Beverage", value: "F&B" },
//   { key: "4", text: "Music", value: "Music" },
//   { key: "5", text: "Dance", value: "Dance" },
// ];
// type AllProps = Props & InjectedFormProps;

// class _EventForm extends Component<AllProps, State> {
//   eventItemListener: ReduxFirestoreQuerySetting | undefined;
//   constructor(props: AllProps) {
//     super(props);
//     this.state = {
//       venueLatLng: null,
//       cityLatlng: null
//     };
//   }

//   async componentDidMount() {
//     const { firestore, history, eventId } = this.props;

//     // case of update form
//     if (eventId) {
//       try {
//         this.eventItemListener = { collection: `events`, doc: eventId };
//         await firestore.setListener(this.eventItemListener);
//       } catch (e) {
//         toastr.error('Ooops', e.message);
//         history.push('/events');
//       }
//     }
//   }

//   componentWillUnmount() {
//     if (this.eventItemListener) {
//       this.props.firestore.unsetListener(this.eventItemListener);
//     }
//   }

//   onFormSubmit: any = async (values: Event) => {
//     // values.date now is a Date (JS native) object
//     if (values.id) {
//       // update form
//       const { ...valuesToUpdate } = values;
//       const { cityLatlng, venueLatLng } = this.state;
//       if (cityLatlng) {
//         valuesToUpdate.cityLatLng = cityLatlng;
//       }
//       if (venueLatLng) {
//         valuesToUpdate.venueLatLng = venueLatLng;
//       }
//       await this.props.updateEventAsync(values.id, valuesToUpdate);
//       this.props.history.push(`/events/${values.id}`);
//     } else {
//       // create form
//       const newEvent: Event = {
//         ...values,
//         venueLatLng: this.state.venueLatLng as any,
//         cityLatLng: this.state.cityLatlng as any
//       };
//       try {
//         const savedEvent = await this.props.createEventAsync(newEvent);
//         this.props.history.push(`/events/${(savedEvent as any).id}`);
//         toastr.success('success', 'New event has been created');
//       } catch (e) {
//         toastr.error('Ooops', e.message);
//       }
//     }
//   };

//   handleCitySelect = (city: string): void => {
//     this.props.change(InputNames.city, city);
//     this.getGeocodeByAddress(city, (latLng: google.maps.LatLngLiteral) =>
//       this.setState({ cityLatlng: latLng })
//     );
//   };

//   handleVenueSelect = (venue: string): void => {
//     this.props.change(InputNames.venue, venue);
//     this.getGeocodeByAddress(venue, (latLng: google.maps.LatLngLiteral) =>
//       this.setState({ venueLatLng: latLng })
//     );
//   };

//   handleToggleCancel = () => {
//     const { id, cancelled } = this.props.event;
//     const message = cancelled
//       ? 'You will reactive this event, are you sure'
//       : 'Are you sure to cancel this event';
//     toastr.confirm(message, {
//       onOk: async () => {
//         try {
//           await this.props.toggleEventCancelAsync(id as string, !cancelled);
//           toastr.success('Success', `Event has been updated`);
//         } catch (e) {
//           toastr.error('Ooops!', e.message);
//         }
//       }
//     });
//   };

//   getGeocodeByAddress = (address: string, cb: Function): void => {
//     geocodeByAddress(address)
//       .then(results => results[0])
//       .then(geo => getLatLng(geo))
//       .then(latLng => cb(latLng));
//   };

//   render() {
//     const {
//       history,
//       initialValues,
//       invalid,
//       submitting,
//       pristine,
//       event
//     } = this.props;
//     const isUpdateForm = event.id;

//     let venueOptions = {};
//     if (this.state.cityLatlng) {
//       const { lat, lng } = this.state.cityLatlng;
//       venueOptions = {
//         location: new google.maps.LatLng(lat, lng),
//         radius: 10000,
//         types: ['establishment']
//       };
//     }

//     return (
//       <Grid>
//         <Grid.Column width={10}>
//           <Segment>
//             <Form
//               onSubmit={this.props.handleSubmit(this.onFormSubmit)}
//               autoComplete='off'
//             >
//               <Header sub color='teal' content='Event Details' />
//               <Field
//                 component={TextInput}
//                 name={InputNames.title}
//                 type='text'
//                 placeholder='Type in the name of event'
//               />
//               <Field
//                 component={SelectInput}
//                 name={InputNames.category}
//                 type='text'
//                 options={categories}
//                 placeholder='What is the event about?'
//               />
//               <Field
//                 component={TextArea}
//                 name={InputNames.description}
//                 rows={3}
//                 placeholder='Tell us something about ur event'
//               />
//               <Header sub color='teal' content='Event Location Details' />
//               <Field
//                 component={AutocompleteInput}
//                 name={InputNames.city}
//                 options={{ types: ['(cities)'] }}
//                 placeholder='Event City'
//                 handleSelect={this.handleCitySelect}
//               />
//               <Field
//                 component={AutocompleteInput}
//                 name={InputNames.venue}
//                 type='text'
//                 placeholder='Event Venue'
//                 options={venueOptions}
//                 disabled={!this.state.cityLatlng}
//                 handleSelect={this.handleVenueSelect}
//               />
//               <Field
//                 component={DateInput}
//                 name={InputNames.date}
//                 placeholder='Event Date'
//                 dateFormat='dd LLL yyyy h:mm a'
//                 showTimeSelect
//                 timeFormat='HH:mm'
//                 width={16}
//               />
//               <Button
//                 disabled={pristine || invalid || submitting}
//                 positive
//                 type='submit'
//               >
//                 Submit
//               </Button>
//               <Button
//                 type='button'
//                 onClick={
//                   (initialValues as any).id
//                     ? () => history.push(`/events/${(initialValues as any).id}`)
//                     : () => history.push(`/events`)
//                 }
//               >
//                 Cancel
//               </Button>
//               {isUpdateForm && (
//                 <Button
//                   type='button'
//                   color={event.cancelled ? 'green' : 'red'}
//                   onClick={this.handleToggleCancel}
//                   floated='right'
//                   content={
//                     event.cancelled ? 'Reactivate Event' : 'Cancel Event'
//                   }
//                 ></Button>
//               )}
//             </Form>
//           </Segment>
//         </Grid.Column>
//       </Grid>
//     );
//   }
// }

// const mapStateToProps = (
//   state: StoreState,
//   ownProps: RouteComponentProps<{ id: string }>
// ) => {
//   let initialValues = {
//     title: '',
//     category: '',
//     description: '',
//     date: '',
//     city: '',
//     venue: ''
//   };
//   const eventId = ownProps.match.params.id;
//   const { events = [] } = state.firestore.ordered;
//   const foundEvent: Event =
//     events.find((event: Event) => event.id === eventId) || {};
//   if (foundEvent) {
//     initialValues = foundEvent;
//   }
//   return { initialValues, event: foundEvent, eventId };
// };

// export const EventForm = compose(
//   withFirestore,
//   connect(
//     mapStateToProps,
//     {
//       createEvent,
//       updateEvent,
//       createEventAsync,
//       updateEventAsync,
//       toggleEventCancelAsync
//     }
//   ),
//   reduxForm({ form: 'event', validate, enableReinitialize: true })
// )(_EventForm) as any;
