import { createSlice } from '@reduxjs/toolkit';
import {
	loginUser,
	logoutUser,
	registerUser,
	verifyUserDetails,
} from './authActions';

const userAccessToken = localStorage.getItem('userAccessToken')
	? localStorage.getItem('userAccessToken')
	: null;

const initialState = {
	loading: false,
	user: null,
	accessToken: userAccessToken,
	error: null,
	success: false,
};

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		setCredentials: (state, action) => {
			state.user = action.payload.user;
			state.accessToken = action.payload.access_token;

			localStorage.setItem('userAccessToken', action.payload.access_token);
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(registerUser.pending, (state) => {
				state.loading = true;
			})
			.addCase(registerUser.fulfilled, (state, action) => {
				state.loading = false;
				state.user = action.payload.message;
				state.error = null;
				state.success = true;
			})
			.addCase(registerUser.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload.error;
			})
			.addCase(loginUser.pending, (state) => {
				state.loading = true;
			})
			.addCase(loginUser.fulfilled, (state, action) => {
				state.loading = false;
				state.user = action.payload.user;
				state.accessToken = action.payload.jwt;
				localStorage.setItem('userAccessToken', action.payload.jwt);
				state.error = null;
			})
			.addCase(loginUser.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload.error;
			})
			.addCase(logoutUser.pending, (state) => {
				state.loading = true;
			})
			.addCase(logoutUser.fulfilled, (state) => {
				state.loading = false;
				state.user = null;
				state.accessToken = null;
				localStorage.removeItem('userAccessToken');
				state.success = true;
				state.error = null;
			})
			.addCase(logoutUser.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload.error;
			})
			.addCase(verifyUserDetails.pending, (state) => {
				state.loading = true;
			})
			.addCase(verifyUserDetails.fulfilled, (state, action) => {
				state.loading = false;
				state.user = action.payload.user;
				state.error = null;
			})
			.addCase(verifyUserDetails.rejected, (state) => {
				state.loading = false;
			});
	},
});

export default authSlice.reducer;

export const { setCredentials } = authSlice.actions;
