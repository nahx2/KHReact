import React from "react"
import { useEffect } from "react"
import { useState } from "react"
import { Button, Table } from "react-bootstrap"
import HackerFooter from "../page/HackerFooter"
import HackerHeader from "../page/HackerHeader"
import { jsonBoardList } from "./../service/dbLogic"
import DBBoardRow from "./DBBoardRow"

const DBBoardList = ({ authLogic }) => {
  const [show, setShow] = useState(false)
  const [boards, setBoards] = useState([])
  const handleShow = () => setShow(true)
  useEffect(() => {
    console.log("useEffect 호출")
    const boardsDB = async () => {
      console.log("oracleDB 호출")
      //const result = await jsonBoardList({ DEPTNO: 30 }) //-> 스프링콘솔에 com.example.demo.dao.DeptDao  : pMap : {DEPTNO=30}
      const result = await jsonBoardList() // pMap : {}
      console.log(result)
      console.log(result.data)
      if (result.data) {
        setBoards(result.data)
        return
      }
    }
    boardsDB()
  }, [])
  const boardSearch = () => {
    //deptno, dname, loc 컬럼명을 저장함
    const gubun = document.querySelector("#gubun").value
    const keyword = document.querySelector("#keyword").value
    console.log(gubun + "," + keyword)
    const asyncDB = async () => {
      const res = await jsonBoardList({ gubun: gubun, keyword: keyword })
      if (res.data) {
        console.log(res.data)
      }
    }
    asyncDB()
  }
  return (
    <>
      <HackerHeader />
      <div className="container">
        <div className="page-header">
          <h2>
            부서관리 <i className="fa-solid fa-angles-right"></i>&nbsp;
            <small>부서목록</small>
          </h2>
          <hr />
        </div>
        <div className="row">
          <div className="col-3">
            <div className="form-floating">
              <select id="gubun" className="form-select" aria-label="분류선택">
                <option defaultValue>분류선택</option>
                <option value="deptno">부서번호</option>
                <option value="dname">부서명</option>
                <option value="loc">지역</option>
              </select>
            </div>
          </div>
        </div>
        <div className="col-6">
          <input
            id="keyword"
            type="text"
            className="form-control"
            placeholder="검색어를 입력하세요"
          />
        </div>
        <div className="col-3">
          <Button className="btn_search" variant="danger" onClick={boardSearch}>
            검색
          </Button>
        </div>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>제목</th>
              <th>작성자</th>
              <th>첨부파일</th>
              <th>조회수</th>
            </tr>
          </thead>
          <tbody>
            {boards &&
              Object.keys(boards).map((key) => (
                <DBBoardRow key={key} dept={boards[key]} />
              ))}
          </tbody>
        </Table>
        <hr />
        <div className="deptlist-footer">
          <Button variant="warning">전체조회</Button>&nbsp;
          <Button variant="success" onClick={handleShow}>
            부서등록
          </Button>
        </div>
      </div>
      <HackerFooter />
    </>
  )
}

export default DBBoardList
