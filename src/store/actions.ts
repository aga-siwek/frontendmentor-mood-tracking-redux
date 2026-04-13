import { createAction } from "@reduxjs/toolkit";

// Shared action — handled by multiple slices via extraReducers
export const logout = createAction("auth/logout");
