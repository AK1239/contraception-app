import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { UserRole } from "../../constants/userRole";

interface UserRoleState {
  role: UserRole | null;
}

const initialState: UserRoleState = {
  role: null,
};

const userRoleSlice = createSlice({
  name: "userRole",
  initialState,
  reducers: {
    setUserRole: (state, action: PayloadAction<UserRole>) => {
      state.role = action.payload;
    },
    clearUserRole: (state) => {
      state.role = null;
    },
  },
});

export const { setUserRole, clearUserRole } = userRoleSlice.actions;
export default userRoleSlice.reducer;
