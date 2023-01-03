import { configureStore } from '@reduxjs/toolkit';
import { departureListReducer } from './slices/departureListSlice';
import { simOptionsReducer } from './slices/simOptionsSlice';

export const store = configureStore({
  reducer: {
    simOptions: simOptionsReducer,
    departureList: departureListReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
