import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import { blogService } from "./blogService";

export const getAllBlog = createAsyncThunk(
    "blog/all-blog",
    async (thunkAPI) => {
        try {
            return await blogService.getAllBlog();
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);

export const getABlog = createAsyncThunk(
    "blog/get-blog",
    async (id, thunkAPI) => {
        try {
            return await blogService.getABlog(id);
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);

export const resetState = createAction("Reset_all");

const initialState = {
    blogs: [],
    blog: {},
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: "",
};

export const blogSlice = createSlice({
    name: "blog",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllBlog.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getAllBlog.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.blogs = action.payload;
            })
            .addCase(getAllBlog.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            })
            .addCase(getABlog.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getABlog.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.blog = action.payload;
            })
            .addCase(getABlog.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            })
            .addCase(resetState, () => initialState);
    },
});
export default blogSlice.reducer;

