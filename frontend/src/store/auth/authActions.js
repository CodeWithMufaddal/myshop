import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosConfig from '../../utils/axiosConfig';
import { successToast } from '../../utils';

export const registerUser = createAsyncThunk('user/register', async ({
	fullName, email, password
}, { rejectWithValue }) => {
	try {
		const response = await axiosConfig.post('/auth/local/register', {
			username: fullName,
			email,
			password
		});

		return await response
	} catch (error) {
		return rejectWithValue({
			error: error.response.data ? error.response.data.message : error.message
		});
	}
});

export const loginUser = createAsyncThunk('user/login', async ({
	email, password
}, { rejectWithValue }) => {
	try {
		const response = await axiosConfig.post('/auth/local', {
			identifier: email,
			password: password
		});
		successToast(`Welcome ${response.data.user.username} 😃`)
		return await response.data;
	} catch (error) {
		console.log(error, 'res from login');
		return rejectWithValue({
			error: error.response.data ? error.response.data.error.message : error.error.message
		});
	}
});

export const verifyUserDetails = createAsyncThunk('user/verify', async (_, { rejectWithValue }) => {
	try {
		const response = await axiosConfig.get('/verify/user');

		return await response.data;
	} catch (error) {
		return rejectWithValue({
			error: error.response.data ? error.response.data.message : error.message
		});
	}
});

export const logoutUser = createAsyncThunk('user/logout', async (_, { rejectWithValue }) => {
	try {
		const response = await axiosConfig.get('/logout');

		return response.data.message;
	} catch (error) {
		return rejectWithValue({
			error: error.response.data ? error.response.data.message : error.message
		});
	}
});
