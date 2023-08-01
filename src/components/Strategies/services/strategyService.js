import axios from "axios";

export const fetchUserStrategyList = async (id, thunkAPI) => {
  const res = await axios.get(
    `https://psgiupykxa.us-east-2.awsapprunner.com/strategy/view-strategy-list?user_id=${id}`
  );
  const resData = res.data;

  if (resData.strategy_list) {
    return resData.strategy_list.reverse();
  } else {
    return thunkAPI.rejectWithValue("Failed to fetch strategy list");
  }
};

export const activateUserStrategy = async (id, thunkAPI) => {
  const res = await axios.post(
    `https://ly40ny26tj.execute-api.us-east-2.amazonaws.com/ver-01/strategy/activate?strategy_id`,
    {
      strategy_id: id,
    }
  );
  const resData = res.data;
  const successMessage = resData.message;
  const errorMessage = resData["Error message"];
  const strategyId = resData["strategy-id"];

  if (errorMessage) {
    return thunkAPI.rejectWithValue(errorMessage);
  } else {
    return { successMessage, strategyId };
  }
};

export const deactivateUserStrategy = async (id, thunkAPI) => {
  const res = await axios.post(
    "https://ly40ny26tj.execute-api.us-east-2.amazonaws.com/ver-01/strategy/deactivate",
    { strategy_id: id }
  );
  const resData = res.data;
  const errorMessage = resData.error_msg;
  const message = resData.message;

  console.log(errorMessage);

  if (errorMessage) {
    return thunkAPI.rejectWithValue(message);
  } else {
    return { successMessage: resData, strategyId: id };
  }
};
