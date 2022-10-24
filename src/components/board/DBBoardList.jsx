import React from "react"
import { useEffect } from "react"
import { useState } from "react"
import { jsonBoardList } from "./../service/dbLogic"

const DBBoardList = ({ authLogic }) => {
  const [boards, setBoards] = useState([])

  useEffect(() => {
    console.log("useEffect 호출")
    const boardsDB = async () => {
      console.log("oracleDB 호출")
      //const result = await jsonDeptList({ DEPTNO: 30 }) -> 스프링콘솔에 com.example.demo.dao.DeptDao  : pMap : {DEPTNO=30}
      const result = await jsonBoardList() // pMap : {}
      console.log(result)
      console.log(result.data)
      setBoards(result.data)
      console.log(boards)
    }
    boardsDB()
  }, [])

  return (
    <>
      <span>여기에 반영해줘</span>
    </>
  )
}

export default DBBoardList
