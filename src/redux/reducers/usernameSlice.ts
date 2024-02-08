import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UsernameState {
  value: string;
}

const initialState: UsernameState = {
  value: '',
};

export const usernameSlice = createSlice({
  name: 'username',
  initialState,
  reducers: {
    storeUsername: (state, action: PayloadAction<string>) => {
      state.value = action.payload;
    },
  },
});

export const { storeUsername } = usernameSlice.actions;

export default usernameSlice.reducer;