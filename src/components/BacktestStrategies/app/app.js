import axios from "axios";

function getMarketInfo(resData, marketIds) {
  for (let i in marketIds) {
    if (marketIds[i] === resData.market_id) {
      return { marketName: i, marketId: resData.market_id };
    }
  }
  return { marketName: undefined, marketId: undefined };
}

async function fetchInstrumentList(item, setInstrumentList) {
  const res = await axios(
    "https://ly40ny26tj.execute-api.us-east-2.amazonaws.com/ver-01/basket/instrument_list?market-type=" +
      item
  );
  const resData = res.data.message;
  if (
    resData ===
    'give valid market type ! ["India", "US Largecap", "US Midcap", "US Smallcap"]'
  )
    setInstrumentList([]);
  else {
    setInstrumentList(resData);
  }
}

function addInstruments(instrumentsPresent, instrumentList) {
  instrumentsPresent = instrumentsPresent
    .split("[")[1]
    .split("]")[0]
    .split(", ");

  let ins = [];
  for (let i in instrumentsPresent) {
    ins.push(instrumentsPresent[i].split("'")[1]);
  }

  const instrumentDetails = [];
  const instrumentID = [];

  for (let i in instrumentList) {
    if (ins?.includes(instrumentList[i][0])) {
      instrumentDetails.push({
        label: instrumentList[i][0],
        value: instrumentList[i][0],
      });
      instrumentID.push(instrumentList[i][0]);
    }
  }

  return { instrument: instrumentDetails, instrument_ids: instrumentID };
}

function changeTimeFormat(time) {
  var tim = new Date(time);
  var t2 = tim.getHours();
  var t3 = tim.getMinutes();
  if (t2 >= 0 && t2 <= 9) {
    t2 = `0${t2}`;
  }
  if (t3 >= 0 && t3 <= 9) {
    t2 = `0${t2}`;
  }

  return `${t2}:${t3}`;

  // return t2;
}

export async function populateExistingStrategyDetails(
  data,
  setData,
  settingId,
  marketList,
  marketIds,
  instrumentList,
  setInstrumentList
) {
  const res = await axios(
    `https://psgiupykxa.us-east-2.awsapprunner.com/strategy/view-strategy-settings?strategy_settings_id=${settingId}`
  );
  const resData = res.data;

  const { marketName, marketId } = getMarketInfo(resData, marketIds);

  await fetchInstrumentList(marketName, setInstrumentList);
  const { instrument, instrument_ids } = addInstruments(
    resData.strategy_instrument_,
    instrumentList
  );

  return {
    market: marketName,
    market_id: marketId,
    instrument: instrument,
    instrument_ids: instrument_ids,
    start_date: resData.signal_start_date,
    end_date: resData.signal_end_date,
    start_time: changeTimeFormat(resData.trade_start_time),
    end_time: changeTimeFormat(resData.trade_end_time),
    exchange: marketName === "India" ? "NSE" : "NYSE",
    initial_capital: resData.initial_capitial,
    max_capital: resData.max_capital,
    time_period: resData.time_period,
    long_only: resData.long_only,
  };
}
