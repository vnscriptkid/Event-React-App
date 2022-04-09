import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { dataFromSnapshot } from "../firestore/firestoreService";
import {
  asyncActionStart,
  asyncActionError,
  asyncActionFinish,
} from "../../features/async/asyncReducer";

interface Props {
  query: any;
  dataConsumer: (data: any) => void;
  deps: any[];
  loadingId: string;
}

export const useFirestoreDoc = ({
  query,
  dataConsumer,
  deps,
  loadingId,
}: Props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncActionStart());

    const unsub = query().onSnapshot({
      next: (snapshot: any) => {
        if (!snapshot.exists) {
          dispatch(asyncActionError({ code: "404", message: "not-found" }));
          return;
        }

        dataConsumer(dataFromSnapshot(snapshot));
        dispatch(asyncActionFinish());
      },
      error: (err: any) => {
        console.log(err);
        dispatch(asyncActionError({}));
      },
    });

    return unsub;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
};
