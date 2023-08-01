export const addStrategyFileSync = (state, action) => {
  state.backtestData = [
    ...state.backtestData,
    {
      id: action.payload.id,
      fileName: action.payload.fileName,
      language: "python",
      content: "# Start Scripting...",
      settingId: null,
      settings: null,
    },
  ];
  state.currentStrategy = {
    id: action.payload.id,
    fileName: action.payload.fileName,
    language: "python",
    content: "# Start Scripting...",
    settingId: null,
    settings: null,
  };
};

export const deleteStrategyFile = (state, action) => {
  state.backtestData = state.backtestData.filter(
    (strategy) => strategy.id !== action.payload
  );
};

export const updateStrategySync = (state, action) => {
  if (action.payload.type === "UPDATE_CODE") {
    state.backtestData = state.backtestData.map((strategy) => {
      if (strategy.id === action.payload.data.id) {
        return {
          ...strategy,
          content: action.payload.data.value,
        };
      }
      return strategy;
    });
    state.currentStrategy = {
      ...state.currentStrategy,
      content: action.payload.data.value,
    };
  } else if (action.payload.type === "UPDATE_FILENAME") {
    state.backtestData = state.backtestData.map((strategy) => {
      if (strategy.id === action.payload.data.id) {
        return {
          ...strategy,
          fileName: action.payload.data.fileName,
        };
      }
      return strategy;
    });
    state.currentStrategy = {
      ...state.currentStrategy,
      fileName: action.payload.data.fileName,
    };
  }
};

export const openFile = (state, action) => {
  state.currentStrategy =
    state.backtestData.find((strategy) => strategy.id === action.payload) ||
    state.backtestData[0];
};

export const setStrategySettings = (state, action) => {
  console.log(action.payload);
  state.backtestData = state.backtestData.map((strategy) => {
    if (strategy.id === action.payload.id) {
      return {
        ...strategy,
        settings: action.payload.settings,
        settingId: action.payload.settingId,
      };
    }
    return strategy;
  });
  state.currentStrategy = {
    ...state.currentStrategy,
    settings: action.payload.settings,
    settingId: action.payload.settingId,
  };
};
