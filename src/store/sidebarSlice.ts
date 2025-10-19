import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

export interface SidebarState {
  isOpen: boolean;
  isCollapsed: boolean;
}

const initialState: SidebarState = {
  isOpen: false,
  isCollapsed: false,
};

const sidebarSlice = createSlice({
  name: 'sidebar',
  initialState,
  reducers: {
    toggleOpen: (state) => {
      state.isOpen = !state.isOpen;
    },
    toggleCollapse: (state) => {
      state.isCollapsed = !state.isCollapsed;
    },
    setOpen: (state, action: PayloadAction<boolean>) => {
      state.isOpen = action.payload;
    },
    setCollapsed: (state, action: PayloadAction<boolean>) => {
      state.isCollapsed = action.payload;
    },
    closeSidebar: (state) => {
      state.isOpen = false;
    },
    openSidebar: (state) => {
      state.isOpen = true;
    },
    expandSidebar: (state) => {
      state.isCollapsed = false;
    },
    collapseSidebar: (state) => {
      state.isCollapsed = true;
    },
  },
});

export const {
  toggleOpen,
  toggleCollapse,
  setOpen,
  setCollapsed,
  closeSidebar,
  openSidebar,
  expandSidebar,
  collapseSidebar,
} = sidebarSlice.actions;

export default sidebarSlice.reducer;
