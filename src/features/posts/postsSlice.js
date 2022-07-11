import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import postsService from "./postsService";

const initialState = {
    posts: [],
    isLoading: false,
    isSuccess: false,
    isError: false,
    post: {},
    message: ""
};

export const getAll = createAsyncThunk("posts/getAll", async () => {
    try {
        return await postsService.getAll();
    } catch (error) {
        console.error(error);
    }
});
export const getById = createAsyncThunk("posts/getById", async (_id) => {

    try {
        return await postsService.getById(_id);
    } catch (error) {
        console.error(error);
    }
});

export const getPostByName = createAsyncThunk("posts/getPostByName", async (postName) => {
    try {
        return await postsService.getPostByName(postName);
    } catch (error) {
        console.error(error);
    }
});

export const deletePost = createAsyncThunk("posts/deletePost", async (id, thunkAPI) => {
    try {
        let action = await postsService.deletePost(id);
        if (action.post == null) {
            return thunkAPI.rejectWithValue(action)
        }
        return action
    } catch (error) {
        
        const message = error.response.data;
        return thunkAPI.rejectWithValue(message);
    }
});


export const like = createAsyncThunk("posts/like", async (_id) => {
    try {
        return await postsService.like(_id);
    } catch (error) {
        console.error(error);
    }
});

export const unLike = createAsyncThunk("posts/unLike", async (_id) => {
    try {
        return await postsService.unLike(_id);
    } catch (error) {
        console.error(error);
    }
});

export const createPost = createAsyncThunk("posts/", async (postData) => {
    try {
        return await postsService.createPost(postData);
    } catch (error) {
        console.error(error)
    }
});

export const updatePost = createAsyncThunk("posts/update", async (data, thunkAPI) => {
    try {

        return await postsService.updatePost(data);
    } catch (error) {
       
        const message = error.response.data.message;
        return thunkAPI.rejectWithValue(message);
        // console.error(error)
    }
});

export const comment = createAsyncThunk("posts/comments", async (comment) => {
    console.log("this is id",comment)
    
    try {
        return await postsService.comment(comment);
    } catch (error) {
        console.error(error)
    }
});

export const postsSlice = createSlice({
    name: "posts",
    initialState,
    reducers: {
        reset: (state) => {
           
            state.isLoading = false;
            state.isSuccess = false;
            state.isError = false;
            state.message = "";
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAll.fulfilled, (state, action) => {
                state.posts = action.payload;
            })
            .addCase(getAll.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getById.fulfilled, (state, action) => {
                state.post = action.payload;
            })
            .addCase(getPostByName.fulfilled, (state, action) => {
                state.posts = action.payload;
            })
            .addCase(deletePost.fulfilled, (state, action) => {
                state.posts = state.posts.filter(
                    (post) => post._id !== action.payload.post._id);
                 
                state.isSuccess = true;
                state.isError = false;
                state.message = action.payload.message
            })
            .addCase(deletePost.rejected, (state, action) => {
                state.isError = true
                state.isSuccess = false;
                state.message = action.payload.message;
            })
            .addCase(like.fulfilled, (state, action) => {
                const posts = state.posts.map((post) => {
                    if (post._id === action.payload._id) {
                        post = action.payload;
                    }
                    return post
                })
                state.posts = posts
            })
            .addCase(unLike.fulfilled, (state, action) => {
                const posts = state.posts.map((post) => {
                    if (post._id === action.payload._id) {
                        post = action.payload;
                    }
                    return post
                })
                state.posts = posts
            })
            .addCase(createPost.fulfilled, (state, action) => {
                state.posts = [action.payload, ...state.posts];
            })
            .addCase(updatePost.fulfilled, (state, action) => {
                const posts = state.posts.map((post) => {
                    if (post._id === action.payload.post._id) {
                        post = action.payload.post;
                    }
                    return post;
                });
                state.posts = posts
                state.isSuccess = true
                state.isError = false;
                state.message = action.payload.message
            })
            .addCase(updatePost.rejected, (state, action) => {
                state.isError = true
                state.isSuccess = false;
                state.message = action.payload;

            })
            .addCase(comment.fulfilled, (state, action) => {
                console.log("holis", action.payload)
                state.post = action.payload;
            })

    },

});


export const { reset, resetMessage } = postsSlice.actions;
export default postsSlice.reducer;