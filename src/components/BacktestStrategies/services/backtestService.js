import axios from "axios";

export const getStrategyData = async (id, thunkAPI) => {
  const res = await axios.get(
    `https://psgiupykxa.us-east-2.awsapprunner.com/strategy/view-strategy?strategy_id=${id}`
  );
  const resData = res.data;

  if (res.status === 200) {
    let codeObj = {};

    codeObj.fileName = resData.strategy_name;
    codeObj.language = "python";
    codeObj.content = decodeURIComponent(escape(atob(resData.strategy_link)));
    codeObj.settingId = resData.strategy_setting_id;
    codeObj.strategyId = id;

    return codeObj;
  } else {
    return thunkAPI.rejectWithValue("Unable to fetch Strategy Data");
  }
};
