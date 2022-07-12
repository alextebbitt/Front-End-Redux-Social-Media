import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./authService";

const user = JSON.parse(localStorage.getItem("user"));
const initialState = {
    users: [],
    user: user ? user : null,
    isError: false,
    isSuccess: false,
    message: "",

};

export const register = createAsyncThunk("auth/register", async (user, thunkAPI) => {
    try {
        return await authService.register(user);
    } catch (error) {
        
        const message = error.response.data;
        return thunkAPI.rejectWithValue(message);
    }
});

export const login = createAsyncThunk("auth/login", async (user, thunkAPI) => {
    try {
        return await authService.login(user);
    } catch (error) {
        const message = error.response.data.message;
        return thunkAPI.rejectWithValue(message);
    }
});

export const logout = createAsyncThunk("auth/logout", async () => {
    try {
        return await authService.logout();
    } catch (error) {
        console.error(error);
    }
});

export const getInfo = createAsyncThunk("auth/getInfo", async () => {
    try {
        return await authService.getInfo();
    } catch (error) {
        console.error(error)
    }
});

export const getUserByName = createAsyncThunk("auth/getUserByName", async (userName) => {

    try {
        
        return await authService.getUserByName(userName);
    } catch (error) {
        console.error(error);
    }
});

export const follow = createAsyncThunk("auth/follow", async (_id, thunkAPI) => {
    try {
        return await authService.follow(_id);
    } catch (error) {
        console.error(error);
        const message = error.response.data.message;
        return thunkAPI.rejectWithValue(message);
    }
});

export const unFollow = createAsyncThunk("auth/unLike", async (_id) => {
    try {
        return await authService.unFollow(_id);
    } catch (error) {
        console.error(error);
    }
});

export const authSlice = createSlice({

    name: "auth",
    initialState,
    reducers: {
        reset: (state) => {
            state.isError = false;
            state.isSuccess = false;
            state.message = "";
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.fulfilled, (state, action) => {
                state.user = action.payload;
                state.isSuccess = true;
                state.message = action.payload.message;
            })
            .addCase(login.rejected, (state, action) => {
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(logout.fulfilled, (state) => {
                state.user = null;
            })
            .addCase(register.fulfilled, (state, action) => {
                state.isSuccess = true;
                state.message = action.payload.message;
            })
            .addCase(register.rejected, (state, action) => {
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(getInfo.fulfilled, (state, action) => {
                 state.user = action.payload;
             })
            .addCase(getUserByName.fulfilled, (state, action) => {

            state.user.user = action.payload[0];

            })
            .addCase(follow.fulfilled, (state, action) => {
                const users = state.users.map((user) => {
                    console.log(action.payload)
                    if (user._id === action.payload.user._id) {
                        user = action.payload.user;
                    }
                    return user;
                });
                state.users = users;
            })
             .addCase(follow.rejected, (state, action) => {
                 state.isError = true;
                 state.message = action.payload;
                 
             })
            .addCase(unFollow.fulfilled, (state, action) => {
                const users = state.users.map((user) => {
                    if (user._id === action.payload.user._id) {
                        user = action.payload.user;
                    }
                    return user;
                });
                state.users = users;
            })
    },

});
export const { reset } = authSlice.actions;
export default authSlice.reducer;