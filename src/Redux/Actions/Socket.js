import TYPE from "./../Types/Socket";

export const setSocketData = (data) => (dispatch) =>
  dispatch({ type: TYPE.SET_SOCKET_DATA, payload: data });

export const resetSocketData = () => (dispatch) =>
  dispatch({ type: TYPE.RESET_SOCKET_DATA });