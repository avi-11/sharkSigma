import axios from "axios";

export const getUserBasketList = async (userId) => {
  const res = await axios.get(
    `https://ly40ny26tj.execute-api.us-east-2.amazonaws.com/ver-01/basket/all?user_id=${userId}`
  );
  const resData = res.data.data;

  return resData;
};

export const postUserBasket = async (userId, data) => {
  const res = await axios.post(
    `https://ly40ny26tj.execute-api.us-east-2.amazonaws.com/ver-01/basket/add?user_id=${userId}`,
    data
  );
  const resData = res.data.message;
  return resData;
};

export const deleteUserBasket = async (basketId) => {
  const res = await axios.post(
    `https://ly40ny26tj.execute-api.us-east-2.amazonaws.com/ver-01/basket/delete?basket_id=${basketId}`
  );
  const resData = res.data.message;
  return resData;
};

export const updateUserBasket = async (userId, data) => {
  const res = await axios.post(
    `https://ly40ny26tj.execute-api.us-east-2.amazonaws.com/ver-01/basket/edit?user_id=${userId}`,
    data
  );
  const resData = res.data.message;
  return resData;
};

// Predefined Baskets API
export const getTickerList = async () => {
  const res = await axios.get(
    "https://ly40ny26tj.execute-api.us-east-2.amazonaws.com/ver-01/basket/predefined/instruments?basket_name=nifty_50_flag"
  );
  const resData = res.data["basket-list"];
  return resData;
};
