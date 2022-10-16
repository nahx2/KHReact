import React from "react"
import CartAddForm from "./CartAddForm"
import CartTent from "./CartTent"

// CartTent.jsx 파일에서 items 받아옴
const CartTents = (props) => {
  console.log(props.items)
  const cartPlus = (tent) => {
    props.cartPlus(tent)
  }
  const cartMinus = (tent) => {
    props.cartMinus(tent)
  }
  const cartDelete = (tent) => {
    props.cartDelete(tent)
  }
  const inputCartAdd = (title) => {
    props.inputCartAdd(title)
  }
  return (
    <>
      <CartAddForm inputCartAdd={inputCartAdd} />
      <h2>상품목록(CartTents)</h2>

      <ul>
        {props.items.map((tent) => (
          <CartTent
            key={tent.id}
            tent={tent}
            cartPlus={cartPlus}
            cartMinus={cartMinus}
            cartDelete={cartDelete}
            inputCartAdd={inputCartAdd}
          />
        ))}
      </ul>
    </>
  )
}

export default CartTents
