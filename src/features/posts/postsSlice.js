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

export const getPostByName = createAsyncThunk("posts/getPostByName", async(postName) => {
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


export const like = createAsyncThunk("products/like", async (_id) => {
    try {
        return await postsService.like(_id);
    } catch (error) {
        console.error(error);
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
            builder.addCase(getAll.pending, (state) => {
                state.isLoading = true;
            })
            builder.addCase(getById.fulfilled, (state, action) => {
                state.post = action.payload;
            })
            builder.addCase(getPostByName.fulfilled, (state, action) => {
                state.posts = action.payload;
            })
            builder.addCase(deletePost.fulfilled, (state, action) => {
            console.log(action.payload)
            state.posts = state.posts.filter((post) => post.id !== +action.payload.id);

            })
                .addCase(like.fulfilled, (state, action) => {
                    const posts = state.posts.map((post) => {
                        if (post._id === action.payload._id) {
                            post = action.payload;
                        }
                        return post
                    })
                    state.posts = posts
                });
    },
});
export const { reset } = postsSlice.actions;
export default postsSlice.reducer;