import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
    response: null,
    error: null,
    isLoading: false,
    posts: [],
};

export const getPosts = createAsyncThunk(
    "posts/getPosts",

    async ({page, pageSize}, { rejectWithValue }) => {
        //funzione gestione errore in fase di rigetto, lo mostra
        try {
            const response = await fetch(`${process.env.REACT_APP_BASE_URL}/posts?page=${page}&pageSize=${pageSize}`);
            const data = await response.json();
            return data;
        } catch (error) {
            console.error("Error fetching posts:", error);
            return rejectWithValue(error);
        }
    }
);

const postsSlice = createSlice({
    name: "posts",
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(getPosts.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getPosts.fulfilled, (state, action) => {
                console.log("getPosts.fulfilled - payload:", action.payload);
                state.isLoading = false
                state.posts = action.payload
            })

            .addCase(getPosts.rejected, (state) => {
                state.isLoading = false
                state.error = "Impossibile ricevere il post"
            })
    },
})

export const postResponse = (state) => state.postsState.response;
export const postsLoading = (state) => state.postsState.isLoading;
export const postsArray = (state) => state.postsState.posts;

export default postsSlice.reducer;