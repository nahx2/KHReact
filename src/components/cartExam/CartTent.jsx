import React from "react"

const CartTent = (props) => {
  console.log(props.tent)
  const cartPlus = () => {
    props.cartPlus(props.tent)
  }
  const cartMinus = () => {
    props.cartMinus(props.tent)
  }
  const cartDelete = () => {
    props.cartDelete(props.tent)
  }
  return (
    <div>
      <li>
        <span className="span-title">{props.tent.title}</span>
        <span className="span-count">{props.tent.count}</span>
        <button className="tent-button" onClick={cartPlus}>
          <i className="fas fa-plus-square"></i>
        </button>
        <button className="tent-button" onClick={cartMinus}>
          <i className="fas fa-minus-square"></i>
        </button>
        <button className="tent-button" onClick={cartDelete}>
          <i className="fas fa-delete-square"></i>
        </button>
      </li>
    </div>
  )
}

export default CartTent
