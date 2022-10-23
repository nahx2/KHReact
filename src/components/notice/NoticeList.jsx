import React, { useState } from "react"
import { getDatabase, ref, onValue, set } from "firebase/database"
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-app.js"
import HackerHeader from "../page/HackerHeader"
import HackerFooter from "../page/HackerFooter"
import { Button, Form, Modal, Table } from "react-bootstrap"
import NoticeRow from "./NoticeRow"
import "./notice.css"
import { useNavigate } from "react-router-dom"

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FS_APIKEY,
  authDomain: process.env.REACT_APP_FS_AUTHDOMAIN,
  projectId: process.env.REACT_APP_FS_PROJECTID,
  databaseURL: process.env.REACT_APP_FS_DATABASEURL,
  storageBucket: process.env.REACT_APP_FS_STORAGEBUCKET,
  messagingSenderId: process.env.REACT_APP_FS_MESSAGINGSENDERID,
  appId: process.env.REACT_APP_FS_APPID,
  measurementId: process.env.REACT_APP_FS_MEASUREMENTID,
}

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig)
const database = getDatabase()

const NoticeList = (props) => {
  const navigate = useNavigate()
  const [show, setShow] = useState(false)
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)
  const [notice, setNotice] = useState({
    n_no: 0,
    n_title: "",
    n_writer: "",
    n_content: "",
    n_date: "",
  })
  // useState(""), useState({}) - Object.keys(), useState([]) - map처리 가능
  // 파이어베이스에서는 라벨에 객체포맷으로 데이터 관리함
  // realdatabase에서는 라벨을 붙인 객체형태로 제공함
  // useState({}) -> useState([])
  // let arr =[];  arr.push(object) -> [{},{},{}]
  const [notices, setNotices] = useState({
    1: {
      n_no: 3,
      n_title: "공휴일 공지",
      n_writer: "관리자",
      n_content: "내용1",
      n_date: "2022-10-11",
    },
    2: {
      n_no: 2,
      n_title: "썸머이벤트",
      n_writer: "관리자",
      n_content: "내용2",
      n_date: "2022-10-10",
    },
    3: {
      n_no: 1,
      n_title: "그랜드오픈",
      n_writer: "관리자",
      n_content: "내용3",
      n_date: "2022-10-09",
    },
  })
  const noticeSearch = () => {
    const gubun = document.querySelector("#gubun").value
    const keyword = document.querySelector("#keyword").value
    console.log(gubun + ", " + keyword)
    let result = []
    // {n_title:, n_writer:, n_date:},{},{}
    if (gubun === "n_title") {
      Object.keys(notices).map((key) =>
        notices[key].n_title && notices[key].n_title === keyword
          ? result.push(notices[key])
          : null
      )
    } else if (gubun === "n_writer") {
      Object.keys(notices).map((key) =>
        notices[key].n_writer && notices[key].n_writer === keyword
          ? result.push(notices[key])
          : null
      )
    } else if (gubun === "n_content") {
      Object.keys(notices).map((key) =>
        notices[key].n_content && notices[key].n_content === keyword
          ? result.push(notices[key])
          : null
      )
    }
    //배열 result에는 조건 검색 결과가 담김
    setNotices(result)
  } // end of noticeSearch
  const noticeInsert = (event) => {
    //submit사용시 페이지 새로고침 처리 방어코드 삽입 - 주의
    event.preventDefault() // 이벤트 버블링 방어코드 삽입할것
    console.log(notice.n_no)
    set(ref(database, "notice/" + notice.n_no), notice)
    handleClose()
  }
  const handleChangeForm = (event) => {
    if (event.currentTarget == null) return
    console.log("폼 내용 변경 발생 name : " + event.target.name)
    console.log("폼 내용 변경 발생 value : " + event.target.value)

    setNotice({
      ...notice, // 처음에 초기화된 정보에 얕은 복사 처리- spread연산자
      n_no: Date.now(),
      [event.target.name]: event.target.value,
    })
  }
  const noticeList = () => {
    console.log("noticeList")
    window.location.reload()
  }
  return (
    <>
      <HackerHeader />
      <div className="container">
        {/* 헤더 영역 */}
        <div className="page-header">
          <h2>
            공지사항&nbsp;<i className="fa-solid fa-angles-right"></i>&nbsp;
            <small>글목록</small>
          </h2>
          <hr />
        </div>
        {/* 검색기 추가 영역 */}
        <div className="row">
          <div className="col-3">
            <select id="gubun" className="form-select" aria-label="분류선택">
              <option defaultValue>분류선택</option>
              <option value="n_title">제목</option>
              <option value="n_writer">작성자</option>
              <option value="n_content">내용</option>
            </select>
          </div>
          <div className="col-6">
            <input
              type="text"
              id="keyword"
              className="form-control"
              placeholder="검색어를 입력하세요"
            />
          </div>
          <div className="col-3">
            <Button id="btn_search" variant="danger" onClick={noticeSearch}>
              검색
            </Button>
          </div>
        </div>

        <div className="notice-list">
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>제목</th>
                <th>작성자</th>
                <th>작성일</th>
              </tr>
            </thead>
            <tbody>
              {notices &&
                Object.keys(notices).map((key) => (
                  <NoticeRow key={key} notice={notices[key]} />
                ))}
            </tbody>
          </Table>
          <hr />
          <div className="noticelist-footer">
            <Button variant="warning" onClick={noticeList}>
              전체조회
            </Button>
            &nbsp;
            <Button variant="success" onClick={handleShow}>
              공지등록
            </Button>
          </div>
        </div>
      </div>

      {/* ===========================[[ 등록 모달 시작 ]] =========================== */}
      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>공지 등록</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form id="f_dept" method="get">
            <Form.Group className="mb-3" controlId="formBasicDeptno">
              <Form.Label>제목</Form.Label>
              <Form.Control
                type="text"
                name="n_title"
                placeholder="Enter 공지제목"
                onChange={handleChangeForm}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicDname">
              <Form.Label>작성자</Form.Label>
              <Form.Control
                type="text"
                name="n_writer"
                placeholder="Enter 작성자"
                onChange={handleChangeForm}
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>내용</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="n_content"
                onChange={handleChangeForm}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={noticeInsert}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
      {/* ===========================[[ 등록 모달  끝  ]] =========================== */}

      <HackerFooter />
    </>
  )
}

export default NoticeList
