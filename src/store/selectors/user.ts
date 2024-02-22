import { RootState } from "store/store";

export const selectCurrentUser = (state: RootState) => state.user.currentUser;
