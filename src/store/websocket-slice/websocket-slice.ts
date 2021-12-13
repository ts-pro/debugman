import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type WebsocketStateItem = Record<string, unknown>;

type WebsocketState = {
  items: WebsocketStateItem[];
  isEmptyHidden: boolean;
  isLogPreserved: boolean;
};

const initialState: WebsocketState = {
  items: [],
  isEmptyHidden: true,
  isLogPreserved: false,
};

export const websocketSlice = createSlice({
  name: 'websocket',
  initialState,
  reducers: {
    websocketAdd: (state, action: PayloadAction<WebsocketStateItem>) => {
      state.items.push(action.payload);
    },
    websocketSetIsEmptyHidden: (state, action: PayloadAction<boolean>) => {
      state.isEmptyHidden = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { websocketAdd, websocketSetIsEmptyHidden } =
  websocketSlice.actions;

export default websocketSlice.reducer;
