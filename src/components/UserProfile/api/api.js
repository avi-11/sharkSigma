import axios from "axios";

export const changeUserPassword = async (
  userName,
  oldPassword,
  newPassword,
  confirmPassword
) => {
  const res = await axios({
    method: "post",
    url: "https://ly40ny26tj.execute-api.us-east-2.amazonaws.com/ver-01/change-password",
    data: {
      username: userName,
      password: oldPassword,
      new_password: newPassword,
      reenter_new_password: confirmPassword,
    },
  });
  const resData = res.data.message;
  return resData;
};

export const getUserData = async (userId) => {
  const res = await axios.get(
    `https://ly40ny26tj.execute-api.us-east-2.amazonaws.com/ver-01/profile?user-id=${userId}`
  );
  const resData = res.data["user-data"];
  return resData;
};
