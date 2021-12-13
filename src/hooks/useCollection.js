import { useReducer, useEffect, useRef } from "react";
import { firestore } from "../firebase/config";

const collectionReducer = (state, action) => {
  switch (action.type) {
    case "ERROR":
      return { ...state, error: action.payload };
    case "RECIEVED_DATA":
      return { ...state, documents: action.payload };
    default:
      return state;
  }
};
export const useCollection = (collection, _query, _orderBy) => {
  const [collectionState, dispatch] = useReducer(collectionReducer, {
    documents: null,
    error: null,
  });
  // refrences with useRef to prevent infinite loop
  const query = useRef(_query);
  const orderBy = useRef(_orderBy);
  useEffect(() => {
    // firestore refrence for easy usage
    let firestoreRefrence = firestore.collection(collection);
    if (query) {
      firestoreRefrence = firestoreRefrence.where(...query);
    }
    if (orderBy) {
      firestoreRefrence = firestoreRefrence.orderBy(...orderBy);
    }
    const unSubscribe = firestoreRefrence.onSnapshot(
      (snapshot) => {
        let resultArray = [];
        snapshot.forEach((each) => {
          resultArray.push({ ...each.data(), id: each.id });
        });
        dispatch({ type: "RECIEVED_DATA", payload: resultArray });
      },
      (err) => {
        dispatch({ type: "ERROR", payload: err });
      }
    );
    // unsubscribing from firestore stream when component unmounts
    return () => {
      unSubscribe();
    };
  }, [collection]);
  return { ...collectionState };
};
