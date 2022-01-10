import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type WebsocketStateItem = Record<string, unknown>;

type WebsocketState = {
  items: WebsocketStateItem[];
  isEmptyHidden: boolean;
  isLogPreserved: boolean;
};

const initialState: WebsocketState = {
  items: [],
  isEmptyHidden: false,
  isLogPreserved: false,
};

export const websocketSlice = createSlice({
  name: 'websocket',
  initialState,
  reducers: {
    websocketAdd: (state, action: PayloadAction<WebsocketStateItem>) => {
      const event = { ...action.payload };

      event.id = Math.random().toString().replace('0.', '');
      state.items.push(event);
    },
    websocketSetIsEmptyHidden: (state) => {
      state.isEmptyHidden = !state.isEmptyHidden;
    },
    websocketSetIsLogPreserved: (state) => {
      state.isLogPreserved = !state.isLogPreserved;
    },
    clearLog: (state, action: PayloadAction<{ force: boolean }>) => {
      if (state.isLogPreserved && !action.payload.force) return;

      state.items = [];
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  websocketAdd,
  websocketSetIsEmptyHidden,
  clearLog,
  websocketSetIsLogPreserved,
} = websocketSlice.actions;

export default websocketSlice.reducer;
