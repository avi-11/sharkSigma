export const ADD_STRATEGY = "ADD_STRATEGY";
export const REMOVE_STRATEGY = "REMOVE_STRATEGY";
export const UPDATE_STRATEGY = "UPDATE_STRATEGY";

export const addStrategy = (strategy) => ({
  type: ADD_STRATEGY,
  payload: {
    name: strategy.name,
    language: "python",
    code: "# Enter your code here",
    settings: {},
  },
});

export const removeStrategy = (strategy) => ({
  type: REMOVE_STRATEGY,
  payload: {
    name: strategy.name,
  },
});

export const updateStrategy = (strategy) => ({
  type: UPDATE_STRATEGY,
  payload: {
    name: strategy.name,
    code: strategy.code,
    settings: strategy.settings,
  },
});
