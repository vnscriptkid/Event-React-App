import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { dataFromSnapshot } from "../firestore/firestoreService";
import {
  asyncActionStart,
  asyncActionFinish,
  asyncActionError,
} from "../../features/async/asyncReducer";

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
    dispatch(asyncActionStart());

    const unsub = query().onSnapshot({
      next: (snapshot: any) => {
        const items = snapshot.docs.map(dataFromSnapshot);

        dataConsumer(items);
        dispatch(asyncActionFinish());
      },
      error: (err: any) => {
        console.log(err);
        dispatch(asyncActionError({ message: "oops" }));
      },
    });

    return unsub;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
};
