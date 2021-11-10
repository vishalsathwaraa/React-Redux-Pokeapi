const pokeReducers = (state = [], action) => {
  switch (action.type) {
    case "GET_DATA":
      return [...action.result];
    case "PUSH_DATA":
      return [...state, ...action.result];
    case "REMOVE_DATA":
      return state.slice(0, 10);
    default:
      return state;
  }
};

export default pokeReducers;
