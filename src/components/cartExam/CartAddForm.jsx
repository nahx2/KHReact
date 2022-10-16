import React from "react"

const CartAddForm = (props) => {
  const formRef = React.createRef()
  const inputRef = React.createRef()
  const onSubmit = (event) => {
    event.preventDefault()
    const title = inputRef.current.value
    title && props.inputCartAdd(title)
    formRef.current.reset()
  }
  return (
    <div ref={formRef} onSubmit={onSubmit}>
      <input ref={inputRef} type="text" placeholder="상품추가" />
      <button>Add</button>
    </div>
  )
}

export default CartAddForm
