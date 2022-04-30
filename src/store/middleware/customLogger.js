export const customLogger = (store) => (next) => (action) => {
  if (!action.type) return next(action);
  console.log(
    `%c middleware - call next() `,
    "color:yellow;border:2px solid yellow"
  );
  console.log("type:", action.type);
  console.log("payload:", action.payload);
  console.log("current state:", store.getState());
  next(action);
  console.log("next state:", store.getState());
};
