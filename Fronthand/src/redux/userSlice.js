import { createSlice } from "@reduxjs/toolkit";



export const userSlice = createSlice({
  name: "user",
  initialState: {
    users: [],
    currentUserIndex: -1,
    currentUser: null,
  },
  reducers: {
    addUserList: (state, action) => {
      state.users = action.payload;
    },
    addUser: (state, action) => {
      state.users.push(action.payload);
    },
    logOut: (state) => {
      state.currentUserIndex = -1;
      state.currentUser = null;
    },
    update: (state, action) => {
      const updatedUsers = state.users.map((user, index) => {
        if (index === state.currentUserIndex) {
          return {
            ...user,
            ...action.payload,
          };
        }
        return user;
      });

      state.users = updatedUsers;
      state.currentUser = { ...state.currentUser, ...action.payload };
    },
    logIn: (state, action) => {
      const userIndex = state.users.findIndex(
        (user) => user.email === action.payload.email
      );

      if (userIndex !== -1) {
        if (state.users[userIndex].password === action.payload.password) {
          state.currentUserIndex = userIndex;
          state.currentUser = state.users[userIndex];
        } else {
          console.error("Yanlış şifre!");
        }
      } else {
        console.error("Geçerli bir kullanıcı girin.");
      }
    },

  
    
  },
});

export const { addUserList, addUser, logOut, update, logIn, fetchUsers } = userSlice.actions;
export const selectUsers = (state) => state.user.users;
export const selectCurrentUser = (state) => state.user.currentUser;
export default userSlice.reducer;
