import axios from "axios";

export const postLensData = async () => {
  const res = await axios.post(
    "https://psgiupykxa.us-east-2.awsapprunner.com/lens_api",
    {},
    {
      headers: {
        country: "INDIA",
        basket: "NIFTY50",
        timeframe: "1D",
      },
    }
  );
  let resData = JSON.parse(JSON.parse(res.data));
  return resData;
};
