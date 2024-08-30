import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { persistStore } from 'redux-persist';
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userSlice from './userSlice';




const persistConfig = { key: "root", storage, version: 1 };
const reducer = combineReducers({
    userSlice
});

const persistedReducer = persistReducer(persistConfig, reducer);

const store = configureStore({
  reducer: persistedReducer,
});

const persistor = persistStore(store);

export { store, persistor };
