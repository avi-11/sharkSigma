export const filterActivatedStrategy = (strategies, payload) => {
  return strategies.map((strategy) => {
    if (strategy.strategy_id === payload.strategyId) {
      return {
        ...strategy,
        strategy_setting: {
          ...strategy.strategy_setting,
          is_active: true,
        },
      };
    }
    return strategy;
  });
};

export const filterDeactivatedStrategy = (strategies, payload) => {
  return strategies.map((strategy) => {
    if (strategy.strategy_id === payload.strategyId) {
      return {
        ...strategy,
        strategy_setting: { ...strategy.strategy_setting, is_active: false },
      };
    }
    return strategy;
  });
};
