import React, { Component, useEffect } from "react";
import { Grid, Loader } from "semantic-ui-react";
import { Event } from "../eventContants";
import { connect, useDispatch, useSelector } from "react-redux";
import { StoreState } from "../../../app/reducers";
import { Loading } from "../../../app/layout/Loading";
import { EventActivity } from "../EventActivity/EventActivity";
import { getEventsForDashboard, listenForEvents } from "../eventActions";
import { toastr } from "react-redux-toastr";
import { createAsyncId } from "../../async/asyncReducer";
import { AsyncActionName } from "../../async/asyncConstants";
import { EVENTS_PAGINATION } from "../../../config";
import { EventList } from "../EventList/EventList";
import {
  dataFromSnapshot,
  getEventsFromFirestore,
} from "../../../app/firestore/firestoreService";
import {
  errorAsyncAction,
  finishAsyncAction,
  startAsyncAction,
} from "../../async/asyncActions";

const fetchEventsProgress = { actionName: "fetch-events" };

export const EventDashboard = (): JSX.Element => {
  // const [events, setEvents] = useState([]);
  const { events, loading } = useSelector((state: any) => ({
    events: state.events,
    loading: state.async["fetch-events"],
  }));
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(startAsyncAction(fetchEventsProgress));
    const unsub = getEventsFromFirestore({
      next: (snapshot: any) => {
        const events = snapshot.docs.map(dataFromSnapshot);

        dispatch(listenForEvents(events));
        dispatch(finishAsyncAction(fetchEventsProgress));
        // setEvents(events);
      },
      error: (err: any) => {
        console.log(err);
        dispatch(errorAsyncAction(fetchEventsProgress));
      },
    });

    return unsub;
  }, []);

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

interface Props {
  events: Event[];
  loading: boolean;
  getEventsForDashboard: typeof getEventsForDashboard;
}

interface State {
  hasMoreEvents: boolean;
  initialLoading: boolean;
  loadedEvents: Event[];
}

export class _EventDashboard extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasMoreEvents: true,
      initialLoading: true,
      loadedEvents: [],
    };
  }

  async componentDidMount() {
    try {
      const querySnapshot: any = await this.props.getEventsForDashboard();
      this.setState({ initialLoading: false });
      this.checkLastBatch(querySnapshot);
    } catch (e) {
      toastr.error("Oooops", "Can not fetch events");
    }
  }

  checkLastBatch(queryReturned: any) {
    const isLastBatch = queryReturned.docs.length < EVENTS_PAGINATION;
    const outOfEvents = queryReturned.docs.length === 0;

    if (!outOfEvents) {
      const newEvents = [...this.props.events];
      this.setState((prevState) => ({
        loadedEvents: [...prevState.loadedEvents, ...newEvents],
      }));
    }
    if (isLastBatch) {
      this.setState({ hasMoreEvents: false });
    }
  }

  loadMoreEvents = async () => {
    const lastEvent =
      this.state.loadedEvents[this.state.loadedEvents.length - 1];
    const querySnapshot: any = await this.props.getEventsForDashboard(
      lastEvent as any
    );
    this.checkLastBatch(querySnapshot);
  };

  render() {
    if (this.state.initialLoading) return <Loading />;
    return (
      <Grid>
        <Grid.Column width={10}>
          <EventList
            events={this.state.loadedEvents}
            loadMore={this.loadMoreEvents}
            hasMoreEvents={this.state.hasMoreEvents}
            loading={this.props.loading}
          />
        </Grid.Column>
        <Grid.Column width={6}>
          <EventActivity />
        </Grid.Column>
        <Grid.Column width={10}>
          <Loader active={this.props.loading} />
        </Grid.Column>
      </Grid>
    );
  }
}

const mapStateToProps = (state: StoreState) => {
  const eventLoadingId = createAsyncId({
    actionName: AsyncActionName.FetchEvents,
  });
  const eventloadingState =
    state.async[eventLoadingId] && state.async[eventLoadingId].loading;
  return {
    events: state.events,
    loading: eventloadingState,
  };
};

const actions = {
  getEventsForDashboard,
};

export const EventDashboardDeprecated = connect(
  mapStateToProps,
  actions
)(_EventDashboard as any);
