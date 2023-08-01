import axios from "axios";

export const fetchSignals = async (strategyId) => {
  try {
    const res = await axios.get(
      `https://psgiupykxa.us-east-2.awsapprunner.com/strategy/view-signals?strategy_id=${strategyId}`
    );
    console.log(res);
    return res;
  } catch (error) {
    return error;
  }
};
