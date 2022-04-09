import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  errorAsyncAction,
  finishAsyncAction,
  startAsyncAction,
} from "../../features/async/asyncActions";
import { dataFromSnapshot } from "../firestore/firestoreService";

interface Props {
  query: any;
  dataConsumer: (data: any) => void;
  deps: any[];
  loadingId: string;
}

export const useFirestoreCollection = ({
  query,
  dataConsumer,
  deps,
  loadingId,
}: Props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(startAsyncAction({ actionName: loadingId }));

    const unsub = query().onSnapshot({
      next: (snapshot: any) => {
        const items = snapshot.docs.map(dataFromSnapshot);

        dataConsumer(items);
        dispatch(finishAsyncAction({ actionName: loadingId }));
      },
      error: (err: any) => {
        console.log(err);
        dispatch(errorAsyncAction({ actionName: loadingId }));
      },
    });

    return unsub;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
};