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

export const removeAProduct = createAsyncThunk(
    "user/cart/remove-product",
    async (id, thunkAPI) => {
        try {
            return await authService.removeProductFromCart(id);
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
)

export const updateAProduct = createAsyncThunk(
    "user/cart/update-product",
    async (data, thunkAPI) => {
        try {
            return await authService.updateProductFromCart(data);
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
)

export const createAnOrder = createAsyncThunk(
    "user/cart/create-order",
    async (orderDetail, thunkAPI) => {
        try {
            return await authService.createOrder(orderDetail);
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
)

export const getUserOrder = createAsyncThunk(
    "user/order/get",
    async (thunkAPI) => {
        try {
            return await authService.getUserOrder();
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
)

export const updateProfile = createAsyncThunk(
    "user/profile/update",
    async (data, thunkAPI) => {
        try {
            return await authService.updateUserProfile(data);
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
)

export const forgotPasswordToken = createAsyncThunk(
    "user/password/token",
    async (data, thunkAPI) => {
        try {
            return await authService.forgotPassToken(data);
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
)

export const resetPassword = createAsyncThunk(
    "user/password/reset",
    async (data, thunkAPI) => {
        try {
            return await authService.resetPass(data);
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
    createdUser: {},
    wishlist: [],
    cartProduct: {},
    cartProducts: [],
    deletedProduct: {},
    updatedProduct: {},
    orderedProducts: {},
    getOrderedProducts: [],
    updatedUser: {},
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
                state.isError = true;
                state.isSuccess = false;
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
                state.isError = true;
                state.isSuccess = false;
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
                state.isError = true;
                state.isSuccess = false;
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
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
                if (state.isError) {
                    toast.error("Something Went Wrong!");
                }
            })
            .addCase(removeAProduct.pending, (state) => {
                state.isLoading = true
            })
            .addCase(removeAProduct.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.deletedProduct = action.payload;
                if (state.isSuccess) {
                    toast.success("Delete Product From Cart Successfully!");
                }
            })
            .addCase(removeAProduct.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
                if (state.isError) {
                    toast.error("Something Went Wrong!");
                }
            })
            .addCase(updateAProduct.pending, (state) => {
                state.isLoading = true
            })
            .addCase(updateAProduct.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.updatedProduct = action.payload;
                if (state.isSuccess) {
                    toast.success("Update Product Successfully!");
                }
            })
            .addCase(updateAProduct.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
                if (state.isError) {
                    toast.error("Something Went Wrong!");
                }
            })
            .addCase(createAnOrder.pending, (state) => {
                state.isLoading = true
            })
            .addCase(createAnOrder.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.orderedProducts = action.payload;
                if (state.isSuccess) {
                    toast.success("Ordered Successfully!");
                }
            })
            .addCase(createAnOrder.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
                if (state.isError) {
                    toast.error("Something Went Wrong!");
                }
            })
            .addCase(getUserOrder.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getUserOrder.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.getOrderedProducts = action.payload;
            })
            .addCase(getUserOrder.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            })
            .addCase(updateProfile.pending, (state) => {
                state.isLoading = true
            })
            .addCase(updateProfile.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.updatedUser = action.payload;
                if (state.isSuccess) {
                    toast.success("Profile Updated Successfully!");
                }
            })
            .addCase(updateProfile.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
                if (state.isError) {
                    toast.error("Something Went Wrong!");
                }
            })
            .addCase(forgotPasswordToken.pending, (state) => {
                state.isLoading = true
            })
            .addCase(forgotPasswordToken.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.Token = action.payload;
                if (state.isSuccess) {
                    toast.success("Reset Password Eamil Sent Successfully!");
                }
            })
            .addCase(forgotPasswordToken.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
                if (state.isError) {
                    toast.error("Something Went Wrong!");
                }
            })
            .addCase(resetPassword.pending, (state) => {
                state.isLoading = true
            })
            .addCase(resetPassword.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.Token = action.payload;
                if (state.isSuccess) {
                    toast.success("Reset Password Successfully!");
                }
            })
            .addCase(resetPassword.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
                if (state.isError) {
                    toast.error("Something Went Wrong!");
                }
            })
    },
});

export default authSlice.reducer;
