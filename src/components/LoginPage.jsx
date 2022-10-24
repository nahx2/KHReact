import React from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { loginGoogle } from "./service/authLogic"

const LoginPage = ({ authLogic }) => {
  const auth = useSelector((store) => store.auth)
  const googleProvider = useSelector((store) => store.googleProvider)
  console.log(googleProvider)
  const navigate = useNavigate()
  const moveHacker = (userId) => {
    window.localStorage.setItem("userId", userId)
    navigate({ pathname: "/hackernews/" + userId })
  }
  const loginG = async () => {
    try {
      const result = await loginGoogle(auth, googleProvider)
      console.log(result.uid)
      window.localStorage.setItem("userId", result.uid)
      /*     window.localStorage.reload() */
      moveHacker(result.uid)
    } catch (error) {}
  }
  const handleLogin = (e) => {
    // 로그인 성공 후 넘어온 정보 확인하기
    authLogic.login("Google").then((data) => moveHacker(data.user.uid))
  }
  return (
    <>
      <h2>로그인 페이지</h2>
      <button onClick={loginG}>Google</button>
    </>
  )
}

export default LoginPage
