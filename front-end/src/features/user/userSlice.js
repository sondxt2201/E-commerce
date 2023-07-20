import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { authService } from "./userService";
import { toast } from 'react-toastify';

const getUserfromLocalStorage = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null;

export const registerUser = createAsyncThunk(
    "auth/register",
    async (userData, thunkAPI) => {
        try {
            return await authService.register(userData);
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);

export const login = createAsyncThunk(
    "auth/login",
    async (user, thunkAPI) => {
        try {
            return await authService.login(user);
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);

export const getWishlist = createAsyncThunk(
    "user/wishlist",
    async (thunkAPI) => {
        try {
            return await authService.getWishlist();
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
)

export const addProd2Cart = createAsyncThunk(
    "user/cart/add",
    async (cartData, thunkAPI) => {
        try {
            return await authService.add2Cart(cartData);
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
)

export const getUserCart = createAsyncThunk(
    "user/cart/get",
    async (thunkAPI) => {
        try {
            return await authService.getCart();
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
)

const initialState = {
    user: getUserfromLocalStorage,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "",
    wishlist: [],
    cartProduct: {},
    cartProducts: [],
    createdUser: {},
};

export const authSlice = createSlice({
    name: "auth",
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.isError = false;
                state.isLoading = false;
                state.isSuccess = true;
                state.message = "success";
                state.user = action.payload;
                localStorage.setItem("token", action.payload.token)
                if (state.isSuccess) {
                    toast.success("Logged in Successfully!");
                }
            })
            .addCase(login.rejected, (state, action) => {
                state.isError = true;
                state.isSuccess = false;
                state.isLoading = false;
                state.message = action.error;
                if (state.isError) {
                    toast.error("Something Went Wrong!");
                }
            })
            .addCase(registerUser.pending, (state) => {
                state.isLoading = true
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.createdUser = action.payload;
                if (state.isSuccess) {
                    toast.success("Registered Successfully!");
                }
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.message = action.error;
                if (state.isError) {
                    toast.error("Something Went Wrong!");
                }
            })
            .addCase(getWishlist.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getWishlist.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.wishlist = action.payload;
            })
            .addCase(getWishlist.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.message = action.error;
                if (state.isError) {
                    toast.error("Something Went Wrong!");
                }
            })
            .addCase(addProd2Cart.pending, (state) => {
                state.isLoading = true
            })
            .addCase(addProd2Cart.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.cartProduct = action.payload;
                if (state.isSuccess) {
                    toast.success("Add Product To Cart Successfully!");
                }
            })
            .addCase(addProd2Cart.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.message = action.error;
                if (state.isError) {
                    toast.error("Something Went Wrong!");
                }
            })
            .addCase(getUserCart.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getUserCart.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.cartProducts = action.payload;
            })
            .addCase(getUserCart.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.message = action.error;
                if (state.isError) {
                    toast.error("Something Went Wrong!");
                }
            })
    },
});

export default authSlice.reducer;