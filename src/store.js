import { GoogleAuthProvider } from "firebase/auth"
//액션
export const initAuth = (auth, googleProvider) => ({
  type: "INIT_AUTH",
  auth: auth,
  googleProvider: googleProvider,
})
export const setToastMsg = (msg) => {
  return {
    type: "SET_MSG",
    msg: msg,
    bool: true,
  }
}
export const setToastFalse = () => {
  return {
    type: "SET_FALSE",
    msg: "",
    bool: false,
  }
}
//초기상태만들기
const initstate = {
  auth: "",
  googleProvider: "",
  status: false,
  msg: "",
}

//리듀서 추가
//액션 결과를 필터 처리
const reducer = (state = initstate, action) => {
  switch (action.type) {
    case "INIT_AUTH":
      return {
        ...state,
        auth: action.auth,
        googleProvider: action.googleProvider,
      }
    case "SET_MSG":
      return {
        ...state,
        status: action.bool,
        msg: action.msg,
      }
    case "SET_FALSE":
      return {
        ...state,
        status: action.bool,
        msg: action.msg,
      }
    default:
      return { ...state }
  }
}
export default reducer
