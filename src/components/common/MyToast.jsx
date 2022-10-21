import React from "react"
import styled from "styled-components"

const ToastDiv = styled`

`
const MyToast = (props) => {
  useEffext(() => {
    if (true) {
      let snackbar = document.getElementById("snackbar")
    }
  })
  return <ToastDiv id="snackbar">토스트메시지출력</ToastDiv>
}

export default MyToast
