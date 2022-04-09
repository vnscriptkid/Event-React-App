import React from "react";
import { Grid } from "semantic-ui-react";
import { EventDetailedHeader } from "./EventDetailedHeader";
import { EventDetailedInfo } from "./EventDetailedInfo";
import { EventDetailedChat } from "./EventDetailedChat";
import { EventDetailedSidebar } from "./EventDetailedSidebar";
import { useDispatch, useSelector } from "react-redux";
import {
  joinEventAsync,
  cancelGoingToEvent,
  addEventComment,
  listenForEvents,
} from "../eventActions";
import { useFirestoreDoc } from "../../../app/hooks/useFirestoreDoc";
import { listenToEventFromFirestore } from "../../../app/firestore/firestoreService";
import { mergeKeyToObject } from "../../../app/common/utils/converter";
import { Redirect } from "react-router";

export const EventDetailed = ({ match }: any): JSX.Element => {
  const dispatch = useDispatch();

  const eventId: string = match.params.id;

  const { event, error } = useSelector((state: any) => ({
    event: state.events.find((event: any) => event.id === eventId),
    error: state.async?.error,
  }));

  useFirestoreDoc({
    query: () => listenToEventFromFirestore(match.params.id),
    dataConsumer: (event) => dispatch(listenForEvents([event])),
    deps: [match.params.id],
    loadingId: `fetching-event-${match.params.id}`,
  });

  if (error) return <Redirect to="/error" />;

  return (
    <Grid>
      <Grid.Column width={10}>
        <EventDetailedHeader
          event={event}
          isHost={false}
          isGoing={false}
          joinEventAsync={joinEventAsync}
          cancelGoingToEvent={cancelGoingToEvent}
        />
        <EventDetailedInfo event={event} />
        <EventDetailedChat
          addEventComment={addEventComment}
          eventId={eventId}
          eventChat={[]}
        />
      </Grid.Column>
      <Grid.Column width={6}>
        <EventDetailedSidebar attendees={mergeKeyToObject(event?.attendees)} />
      </Grid.Column>
    </Grid>
  );
};

// export interface EventDetailedProps
//   extends WithFirestoreProps,
//     RouteComponentProps {
//   event: Event;
//   eventId: string;
//   auth: any;
//   joinEventAsync: typeof joinEventAsync;
//   cancelGoingToEvent: typeof cancelGoingToEvent;
//   addEventComment: typeof addEventComment;
//   eventChat: EventChat[];
// }

// export interface EventDetailedState {}

// type Params = { id: string };

// class _EventDetailed extends React.Component<
//   EventDetailedProps,
//   EventDetailedState
// > {
//   async componentDidMount() {
//     const { firestore, eventId, history } = this.props;
//     try {
//       await firestore.setListener({
//         collection: `events`,
//         doc: eventId,
//       });
//     } catch (e) {
//       toastr.error("Oooops!", e.message);
//       history.push(`/events`);
//     }

//     // db.collection("cities").doc("SF")
//     // .onSnapshot((doc) => {
//     //     console.log("Current data: ", doc.data());
//     // });
//   }

//   componentWillUnmount() {
//     this.props.firestore.unsetListener({
//       collection: `events`,
//       doc: this.props.eventId,
//     });
//   }

//   render() {
//     const {
//       event,
//       auth,
//       joinEventAsync,
//       cancelGoingToEvent,
//       addEventComment,
//       eventChat,
//     } = this.props;
//     console.log(eventChat);
//     let { attendees = {}, hostUid = null } = event || {};
//     const attendeesArr = mergeKeyToObject(attendees);
//     const isHost = auth.uid === hostUid;
//     const isGoing = attendeesArr.some((a) => a.id === auth.uid);
//     return (
//       <Grid>
//         <Grid.Column width={10}>
//           <EventDetailedHeader
//             event={this.props.event}
//             isHost={isHost}
//             isGoing={isGoing}
//             joinEventAsync={joinEventAsync}
//             cancelGoingToEvent={cancelGoingToEvent}
//           />
//           <EventDetailedInfo event={this.props.event} />
//           <EventDetailedChat
//             addEventComment={addEventComment}
//             eventId={event && (event.id as string)}
//             eventChat={eventChat}
//           />
//         </Grid.Column>
//         <Grid.Column width={6}>
//           <EventDetailedSidebar attendees={attendeesArr as any} />
//         </Grid.Column>
//       </Grid>
//     );
//   }
// }

// const mapStateToProps = (
//   state: StoreState,
//   ownProps: RouteComponentProps<Params>
// ) => {
//   const { events = [] } = state.firestore.ordered;
//   const eventId = ownProps.match.params.id;
//   let event = null;

//   if (events.length > 0) {
//     event = events.find((event: any) => event.id === eventId);
//   }

//   let eventChat =
//     state.firebase.data.event_chat && state.firebase.data.event_chat[eventId];

//   if (eventChat) {
//     eventChat = mergeKeyToObject(eventChat);
//   }

//   return { event, eventId, auth: state.firebase.auth, eventChat };
// };

// const actions = {
//   joinEventAsync: joinEventAsync,
//   cancelGoingToEvent: cancelGoingToEvent,
//   addEventComment: addEventComment,
// };

// export const EventDetailed = compose(
//   connect(mapStateToProps, actions),
//   withFirestore,
//   firebaseConnect((props: RouteComponentProps<Params>) => [
//     `event_chat/${props.match.params.id}`,
//   ])
// )(_EventDetailed);
