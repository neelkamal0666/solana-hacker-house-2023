import { createSlice } from "@reduxjs/toolkit";

const homeSlice = createSlice({
	name: "home",
	initialState: {
		selectedSidebarOption: "Dashboard",
	},
	reducers: {
		updateSelectedSidebarOption(state, action) {
			state.selectedSidebarOption = action.payload ? action.payload : "Dashboard";
		},
	},
});

const homeActions = homeSlice.actions;

export { homeActions };
export default homeSlice;
