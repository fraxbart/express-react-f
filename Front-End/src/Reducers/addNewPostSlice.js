import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

const initialState = {
    response: null,
    error: null,
    isLoading: false
}

export const addNewPost = createAsyncThunk(
    "posts/addNewPostSlice",

    async (postData, { rejectWithValue }) => {
        try {
            const response = await fetch(`${process.env.REACT_APP_BASE_URL}/posts`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(postData),
            });
            return await response.json()
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)

const addNewPostSlice = createSlice({
    name: "newPost",
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(addNewPost.pending, (state) => {
                state.isLoading = true
            })
            .addCase(addNewPost.fulfilled, (state, action) => {
                state.isLoading = false
                state.response = action.payload
            })
            .addCase(addNewPost.rejected, (state) => {
                state.isLoading = false
                state.error = "Salvataggio fallito"
            })
    }
})

export const newPostResponse = (state) => state.createPostState.response
export const newPostsLoading = (state) => state.createPostState.isLoading
export const newPostsArray = (state) => state.createPostState.posts

export default addNewPostSlice.reducer