import USER_ACTION_TYPES from "./user.types";
import { createAction } from "../../utils/reducer";

export const setCurrentUser = (user) => {
  // return the action object needed for dispatching with helper function:
  return createAction(USER_ACTION_TYPES.SET_CURRENT_USER, user);
};
