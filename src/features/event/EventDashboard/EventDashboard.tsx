import React from "react";
import { Grid, Loader } from "semantic-ui-react";
import { useDispatch, useSelector } from "react-redux";
import { EventActivity } from "../EventActivity/EventActivity";
import { listenForEvents } from "../eventActions";
import { EventList } from "../EventList/EventList";
import { listenToEventsFromFirestore } from "../../../app/firestore/firestoreService";
import { useFirestoreCollection } from "../../../app/hooks/useFirestoreCollection";

export const EventDashboard = (): JSX.Element => {
  const { events, loading } = useSelector((state: any) => ({
    events: state.events,
    loading: state.async["fetch-events"] && state.async["fetch-events"].loading,
  }));

  const dispatch = useDispatch();

  useFirestoreCollection({
    query: listenToEventsFromFirestore,
    dataConsumer: (events) => dispatch(listenForEvents(events)),
    deps: [],
    loadingId: "fetch-events",
  });

  const loadMoreEvents = () => {};

  return (
    <Grid>
      <Grid.Column width={10}>
        <EventList
          events={events}
          loadMore={loadMoreEvents}
          hasMoreEvents={false}
          loading={loading}
        />
      </Grid.Column>
      <Grid.Column width={6}>
        <EventActivity />
      </Grid.Column>
      <Grid.Column width={10}>
        <Loader active={loading} />
      </Grid.Column>
    </Grid>
  );
};

// interface Props {
//   events: Event[];
//   loading: boolean;
//   getEventsForDashboard: typeof getEventsForDashboard;
// }

// interface State {
//   hasMoreEvents: boolean;
//   initialLoading: boolean;
//   loadedEvents: Event[];
// }

// export class _EventDashboard extends Component<Props, State> {
//   constructor(props: Props) {
//     super(props);
//     this.state = {
//       hasMoreEvents: true,
//       initialLoading: true,
//       loadedEvents: [],
//     };
//   }

//   async componentDidMount() {
//     try {
//       const querySnapshot: any = await this.props.getEventsForDashboard();
//       this.setState({ initialLoading: false });
//       this.checkLastBatch(querySnapshot);
//     } catch (e) {
//       toastr.error("Oooops", "Can not fetch events");
//     }
//   }

//   checkLastBatch(queryReturned: any) {
//     const isLastBatch = queryReturned.docs.length < EVENTS_PAGINATION;
//     const outOfEvents = queryReturned.docs.length === 0;

//     if (!outOfEvents) {
//       const newEvents = [...this.props.events];
//       this.setState((prevState) => ({
//         loadedEvents: [...prevState.loadedEvents, ...newEvents],
//       }));
//     }
//     if (isLastBatch) {
//       this.setState({ hasMoreEvents: false });
//     }
//   }

//   loadMoreEvents = async () => {
//     const lastEvent =
//       this.state.loadedEvents[this.state.loadedEvents.length - 1];
//     const querySnapshot: any = await this.props.getEventsForDashboard(
//       lastEvent as any
//     );
//     this.checkLastBatch(querySnapshot);
//   };

//   render() {
//     if (this.state.initialLoading) return <Loading />;
//     return (
//       <Grid>
//         <Grid.Column width={10}>
//           <EventList
//             events={this.state.loadedEvents}
//             loadMore={this.loadMoreEvents}
//             hasMoreEvents={this.state.hasMoreEvents}
//             loading={this.props.loading}
//           />
//         </Grid.Column>
//         <Grid.Column width={6}>
//           <EventActivity />
//         </Grid.Column>
//         <Grid.Column width={10}>
//           <Loader active={this.props.loading} />
//         </Grid.Column>
//       </Grid>
//     );
//   }
// }

// const mapStateToProps = (state: StoreState) => {
//   const eventLoadingId = createAsyncId({
//     actionName: AsyncActionName.FetchEvents,
//   });
//   const eventloadingState =
//     state.async[eventLoadingId] && state.async[eventLoadingId].loading;
//   return {
//     events: state.events,
//     loading: eventloadingState,
//   };
// };

// const actions = {
//   getEventsForDashboard,
// };

// export const EventDashboardDeprecated = connect(
//   mapStateToProps,
//   actions
// )(_EventDashboard as any);
