import StrategyLayout from "../components/Strategies/Layout/StrategyLayout";
import StrategyVault from "../components/Strategies/StrategyVault/StrategyVault";

import { Route } from "react-router-dom";

const Scanner = () => {
  return (
    <div>
      <Route path="/strategies/strategyVault">
        <StrategyVault />
      </Route>

      <Route exact path="/strategies">
        <StrategyLayout />
      </Route>
    </div>
  );
};

export default Scanner;
