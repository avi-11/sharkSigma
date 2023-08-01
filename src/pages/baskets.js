import React, { Suspense } from "react";
import { Route } from "react-router-dom";

import BasketLayout from "../components/Baskets/Layout/BasketLayout";
import PredefinedBasket from "../components/Baskets/PredefinedBaskets/PredefinedBasket";

const Basket = () => {
  return (
    <div>
      <Route path="/baskets/predefinedBaskets">
        <Suspense fallback={<h3>Loading</h3>}>
          <PredefinedBasket />
        </Suspense>
      </Route>

      <Route exact path="/baskets">
        <Suspense fallback={<h3>Loading</h3>}>
          <BasketLayout />
        </Suspense>
      </Route>
    </div>
  );
};

export default Basket;
