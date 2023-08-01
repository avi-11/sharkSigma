import axios from "axios";

export const activateUserStrategy = async (id) => {
  const res = await axios.post(
    `https://ly40ny26tj.execute-api.us-east-2.amazonaws.com/ver-01/strategy/activate?strategy_id`,
    {
      strategy_id: id,
    }
  );
  const resData = res.data;
  return resData;
};

export const deactivateUserStrategy = async (id) => {
  const res = await axios.post(
    "https://ly40ny26tj.execute-api.us-east-2.amazonaws.com/ver-01/strategy/deactivate",
    { strategy_id: id }
  );
  const resData = res.data;
  return resData;
};
