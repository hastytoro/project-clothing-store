import { compose, createStore, applyMiddleware } from "redux";
import logger from "redux-logger";

import { rootReducer } from "./root-reducer";

// const customLogger = (store) => (next) => (action) => {
//   // function signature
//   if (!action.type) return next(action);
//   console.log(
//     `%c middleware - call next() `,
//     "color:yellow;border:2px solid yellow"
//   );
//   console.log("type:", action.type);
//   console.log("payload:", action.payload);
//   console.log("current state:", store.getState());
//   next(action);
//   console.log("next state:", store.getState());
// };

const middleWares = [logger];

const composedEnhancers = compose(applyMiddleware(...middleWares));

export const store = createStore(rootReducer, undefined, composedEnhancers);
