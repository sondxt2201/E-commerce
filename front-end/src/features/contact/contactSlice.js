import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import { toast } from 'react-toastify';
import { contactService } from "./contactService";

export const createQuery = createAsyncThunk(
    "contact/post",
    async (contactData, thunkAPI) => {
        try {
            return await contactService.postQuery(contactData);
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);

export const resetState = createAction("Reset_all");

const initialState = {
    contact: {},
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: "",
};

export const contactSlice = createSlice({
    name: "contact",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(createQuery.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createQuery.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.contact = action.payload;
                if (state.isSuccess === true) {
                    toast.success("Contact Form Submitted Successfully")
                }
            })
            .addCase(createQuery.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
                if (state.isError === true) {
                    toast.error("Something Went Wrong!");
                }
            })
            .addCase(resetState, () => initialState);
    },
});
export default contactSlice.reducer;
