import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import postsService from "./postsService";

const initialState = {
    posts: [],
    isLoading: false,
    post: {},
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

export const deletePost = createAsyncThunk("posts/deletePost", async (id) => {
    try {
        return await postsService.deletePost(id);
    } catch (error) {
        console.error(error);
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
        console.log(error)
        const message = error.response.data.message;
        return thunkAPI.rejectWithValue(message);
        // console.error(error)
    }
});

export const comment = createAsyncThunk("posts/comments", async (_id) => {
    try {
        return await postsService.comment(_id);
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
        }
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
                    // console.log(posts)
                    if (post._id === action.payload.post._id) {
                        post = action.payload.post;
                    }
                    return post;
                });
                state.posts = posts;
            })
            .addCase(updatePost.rejected, (state, action) => {
                state.isError = true;
                state.message = action.payload;
            });
 
    },

});
    

export const { reset } = postsSlice.actions;
export default postsSlice.reducer;