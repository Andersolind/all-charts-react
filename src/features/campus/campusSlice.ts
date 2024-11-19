import { createSlice, PayloadAction } from '@reduxjs/toolkit';


export interface Stats {
    id:      string;
    name:    string;
    fill?:   string;
    label?:  Label;
    parent?: string;
    value?:  number;
}

export interface Label {
    fontColor:  string;
    fontWeight: string;
}


// Type for the initial state
interface UsersState {
  stats: Stats[];
  loading: boolean;
  error: string | null;
}


// Initial state for the users slice
const initialState: UsersState = {
  stats: [],
  loading: false,
  error: null,
};

// Create the users slice
const statsSlice = createSlice({
  name: 'stats',
  initialState,
  reducers: {
    loadCampusStart: (state:any) => {
      state.loading = true;
      state.error = null;
    },
    loadCampusSuccess: (state:any, action: PayloadAction<Stats[]>) => {
      state.stats = action.payload;
      state.loading = false;
    },
    loadCampusFailure: (state:any, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
  
});

// Export the actions
export const { loadCampusStart, loadCampusSuccess, loadCampusFailure } = statsSlice.actions;

// Export the reducer
export default statsSlice.reducer;