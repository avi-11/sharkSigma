import axios from "axios";

export const createNewStrategy = async (data) => {
  const res = await axios.post(
    "https://psgiupykxa.us-east-2.awsapprunner.com/strategy/create",
    data
  );
  const resData = res.data;

  if (res.status === 200) return resData;
  else
    return {
      type: "error",
      message: "Unable to create new Strategy",
    };
};

export const updateUserStrategy = async (data) => {
  const res = await axios.post(
    `https://psgiupykxa.us-east-2.awsapprunner.com/strategy/update`,
    data
  );
  const resData = res.data;

  if (res.status === 200) return resData;
  else
    return {
      type: "error",
      message: "Unable to update Strategy",
    };
};

// Related to Strategy Settings
export const getMarketInfo = async () => {
  const res = await axios(
    `https://ly40ny26tj.execute-api.us-east-2.amazonaws.com/ver-01/strategy/markets`
  );
  const resData = res.data.message;
  let tempExchanges = {};
  let tempMarketIds = {};
  const tempMarkets = resData.map((item) => item["market name"]);
  for (let i in tempMarkets) {
    tempExchanges[tempMarkets[i]] = [];
    tempMarketIds[tempMarkets[i]] = "";
  }

  for (let i in resData) {
    tempExchanges[resData[i]["market name"]].push({
      label: resData[i]["exchange name"],
      value: resData[i]["exchange name"],
    });
    tempMarketIds[resData[i]["market name"]] = resData[i]["id"];
  }

  return {
    tempExchanges,
    tempMarketIds,
    tempMarkets,
  };
};

export const fetchInstrumetsInMarket = async (marketType) => {
  const res = await axios.get(
    "https://ly40ny26tj.execute-api.us-east-2.amazonaws.com/ver-01/basket/instrument_list?market-type=" +
      marketType
  );
  const resData = res.data.message;
  return resData;
};

export const postStrategySetting = async (data) => {
  const res = await axios.post(
    `https://psgiupykxa.us-east-2.awsapprunner.com/strategy/create-settings`,
    data
  );
  const resData = res.data;
  return resData;
};

export const putStrategySetting = async (data) => {
  const res = await axios.post(
    "https://psgiupykxa.us-east-2.awsapprunner.com/strategy/update-settings",
    data
  );
  const resData = res.data;
  return resData;
};
