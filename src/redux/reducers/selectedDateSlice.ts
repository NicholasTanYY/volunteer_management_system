import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SelectedDateState {
  value: string;
}

const initialState: SelectedDateState = {
  value: new Date().toISOString(),
};

export const selectedDateSlice = createSlice({
  name: 'selectedDate',
  initialState,
  reducers: {
    storeSelectedDate: (state, action: PayloadAction<string>) => {
      state.value = action.payload;
    },
  },
});

export const { storeSelectedDate } = selectedDateSlice.actions;

export default selectedDateSlice.reducer;