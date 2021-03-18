import { createSlice } from '@reduxjs/toolkit';

export const counterSlice = createSlice({
  name: 'counter',
  initialState: {
    value: 0,
    loading: false,
  },
  reducers: {
    increment: (state) => {
      return { ...state, value: state.value + 1 };
    },
    decrement: (state) => {
      return { ...state, value: state.value - 1 };
    },
    loadingStart: (state) => {
      return { ...state, loading: true };
    },
    incrementByAmount: (state, action) => {
      return {
        ...state,
        value: state.value + action.payload,
        loading: false,
      };
    },
  },
});

export const {
  increment,
  decrement,
  incrementByAmount,
  loadingStart,
} = counterSlice.actions;

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched
export const incrementAsync = (amount) => (dispatch) => {
  dispatch(loadingStart());
  setTimeout(() => {
    dispatch(incrementByAmount(amount));
  }, 1000);
};

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const selectCount = (state) => state.counter.value;
export const selectLoading = (state) => state.counter.loading;

export default counterSlice.reducer;
