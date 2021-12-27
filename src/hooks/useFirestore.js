import { useEffect, useReducer, useState } from "react";
import { firestore, timestamp } from "../firebase/config";

let firestoreInitialize = {
  documents: null,
  isPending: false,
  error: null,
  success: null,
};
const firestoreReducer = (state, action) => {
  switch (action.type) {
    case "IS_PENDING":
      return {
        isPending: true,
        documents: null,
        success: false,
        error: null,
      };
    case "ADDED_DOCUMENTS":
      return {
        isPending: false,
        documents: action.payload,
        success: true,
        error: null,
      };
    case "DELETED_DOCUMENT":
      return {
        isPending: false,
        documents: null,
        success: true,
        error: null,
      };
    case "UPDATED_DOCUMENT":
      return {
        isPending: false,
        documents: action.payload,
        success: true,
        error: null,
      };
    case "ERROR":
      return {
        isPending: false,
        documents: null,
        success: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const useFirestore = (collection) => {
  const [response, dispatch] = useReducer(
    firestoreReducer,
    firestoreInitialize
  );
  const [isCancelled, setIsCancelled] = useState(false);
  // collection refrence
  const firestoreRefrence = firestore.collection(collection);
  // dispatch only when it's not cancelled
  function dispatchIfNotCancelled(action) {
    if (!isCancelled) {
      dispatch(action);
    }
  }
  // adding document to the collection
  const addDocumentToFirestore = async (doc) => {
    try {
      dispatch({ type: "IS_PENDING" });
      const createdAt = timestamp.fromDate(new Date());
      const addDoc = await firestoreRefrence.add({ ...doc, createdAt });
      if (addDoc) {
        dispatchIfNotCancelled({ type: "ADDED_DOCUMENTS", payload: addDoc });
      }
    } catch (err) {
      dispatchIfNotCancelled({ type: "ERROR", payload: err.message });
    }
  };
  // deleting document from the collection
  const deleteDocumentFromFirestore = async (id) => {
    dispatch({ type: "IS_PENDING" });
    try {
      await firestoreRefrence.doc(id).delete();
      dispatchIfNotCancelled({ type: "DELETED_DOCUMENT" });
    } catch (err) {
      dispatchIfNotCancelled({ type: "ERROR", payload: err.message });
    }
  };
  // updating document in specific collection
  const updatingDocumentInFirestore = async (id, updateObject) => {
    dispatch({ type: "IS_PENDING" });
    try {
      const updateAction = await firestore
        .collection(collection)
        .doc(id)
        .update(updateObject);
      dispatchIfNotCancelled({
        type: "UPDATED_DOCUMENT",
        payload: updateAction,
      });
      return updateAction;
    } catch (err) {
      dispatchIfNotCancelled({ type: "ERROR", payload: err.message });
    }
  };
  useEffect(() => {
    return () => {
      setIsCancelled(true);
    };
  });
  return {
    addDocumentToFirestore,
    deleteDocumentFromFirestore,
    updatingDocumentInFirestore,
    ...response,
  };
};
