import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  addData,
  authenticateUser,
  deleteItem,
  fetchItems,
  findIndItem,
  registerUser,
  updateItem,
} from "./authAPI";

const initialState = {
  loggedInUser: null,
  fetchedTask: [],
  myTasks: [],
  individualTask: [],
  status: "idle",
  value: 0,
};

export const registerUserAsync = createAsyncThunk(
  "auth/registerUser",
  async (userData) => {
    const response = await registerUser(userData);
    return response.data;
  }
);

export const authenticateUserAsync = createAsyncThunk(
  "auth/authenticateUser",
  async (authDetail) => {
    const response = await authenticateUser(authDetail);
    return response.data;
  }
);

export const addDataAsync = createAsyncThunk("auth/addData", async (tasks) => {
  // console.log(tasks);
  const response = await addData(tasks);
  return response.data;
});

export const fetchItemsAsync = createAsyncThunk("auth/fetchItems", async () => {
  // console.log(tasks);
  const response = await fetchItems();
  return response.data;
});

export const deleteItemAsync = createAsyncThunk(
  "auth/deleteItem",
  async (itemId) => {
    const response = await deleteItem(itemId);
    return response.data;
  }
);

export const findIndItemAsync = createAsyncThunk(
  "auth/findIndItem",
  async (itemId) => {
    const response = await findIndItem(itemId);
    return response.data;
  }
);

export const updateItemAsync = createAsyncThunk(
  "auth/updateItem",
  async (updatedItem) => {
    const response = await updateItem(updatedItem);
    return response.data;
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(registerUserAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.loggedInUser = action.payload;
      })
      .addCase(addDataAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addDataAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.myTasks.push(action.payload);
      })
      .addCase(fetchItemsAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchItemsAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.fetchedTask.push(action.payload);
      })
      .addCase(deleteItemAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteItemAsync.fulfilled, (state, action) => {
        state.status = "idle";
        const index = state.fetchedTask.findIndex(
          (item) => item._id === action.payload._id
        );
        state.fetchedTask.slice(index, 1);
      })
      .addCase(findIndItemAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(findIndItemAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.individualTask = action.payload;
      })
      .addCase(updateItemAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateItemAsync.fulfilled, (state, action) => {
        state.status = "idle";
        const updatedItem = action.payload;
        state.fetchedTask = state.fetchedTask.map((item) =>
          item._id === updatedItem._id ? updatedItem : item
        );
      });
  },
});

export const { increment, decrement, incrementByAmount } = authSlice.actions;

export const selectLoggedInUser = (state) => state.auth.loggedInUser;
export const selectedTaskData = (state) => state.auth.myTasks;
export const selectedFetchedTask = (state) => state.auth.fetchedTask;
export const selectedIndividualTask = (state) => state.auth.individualTask;

export default authSlice.reducer;
