import React from "react"

const DBBoardRow = ({ board }) => {
  return (
    <>
      <tr>
        <td>{board.B_NO}</td>
        <td>{board.B_TITLE}</td>
        <td>{board.B_WRITER}</td>
        <td>{board.BS_FILE}</td>
        <td>{board.B_HIT}</td>
      </tr>
    </>
  )
}

export default DBBoardRow
