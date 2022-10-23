import React, { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getDatabase, ref, onValue, set, remove } from "firebase/database"
import HackerHeader from "../page/HackerHeader"
import HackerFooter from "../page/HackerFooter"
import { Button, Card, Form, ListGroup, Modal } from "react-bootstrap"
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-app.js"

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
const db = getDatabase()

const NoticeDetail = (props) => {
  // 목록 버튼 클릭시 목록으로 돌아가기
  const navigate = useNavigate()
  const [show, setShow] = useState(false)
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)
  // 해시값 가져오기
  let { n_no } = useParams()
  // 상태를 관리하는 state 훅은 비동기 처리
  const [notice, setNotice] = useState({
    n_no: 0,
    n_title: "",
    n_writer: "",
    n_content: "",
  })
  // realtimedatebase 가져오기
  useEffect(() => {
    const starCountRef = ref(db, "notice/" + n_no)
    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val()
      setNotice(data)
    })
  }, [n_no])
  // 수정하기 구현
  const noticeUpdate = (e) => {
    // submit 사용시 페이지 새로고침 처리 방어 코드
    e.preventDefault() // 이벤트 버블링 방어코드
    console.log(
      "수정할 정보 : " + n_no + ", " + notice.n_title + ", " + notice.n_writer
    )
    set(ref(db, "notice/" + n_no), notice)
    // 업데이트 처리 후 모달 창 닫기
    handleClose()
  }
  // 삭제하기 구현
  const noticeDelete = () => {
    remove(ref(db, `notice/${n_no}`))
    navigate("/notice")
  }
  // 목록 이동 구현
  const noticeList = () => {
    navigate("/notice") // NoticeList.jsx 출력
  }
  const handleChangeForm = (e) => {
    if (e.currentTarget == null) return
    // console.log("폼 내용 변경 발생 name : " + e.target.name);
    // console.log("폼 내용 변경 발생 value : " + e.target.value);
    e.preventDefault()
    setNotice({
      ...notice, // 처음에 초기화된 정보에 얕은 복사 처리
      n_no: n_no,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <>
      <HackerHeader />
      <div className="container">
        {/* 헤더 영역 */}
        <div className="page-header">
          <h2>
            공지사항&nbsp;
            <i className="fa-solid fa-angles-right"></i>&nbsp;
            <small>상세보기</small>
          </h2>
          <hr />
        </div>
        <Card style={{ width: "18rem" }}>
          <ListGroup variant="flush">
            <ListGroup.Item>{notice.n_title}</ListGroup.Item>
            <ListGroup.Item>{notice.n_writer}</ListGroup.Item>
            <ListGroup.Item>{notice.n_content}</ListGroup.Item>
          </ListGroup>
          <div className="detail-link">
            <Button variant="second" onClick={handleShow}>
              수정
            </Button>
            &nbsp;
            <Button variant="second" onClick={noticeDelete}>
              삭제
            </Button>
            &nbsp;
            <Button variant="second" onClick={noticeList}>
              목록
            </Button>
          </div>
        </Card>
      </div>
      <HackerFooter />
      {/* ========[[[부서 등록 모달 시작]]]======= */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>공지 등록</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form id="f_notice" method="get">
            <Form.Group className="mb-3" controlId="formBasicTitle">
              <Form.Label>글 제목</Form.Label>
              <Form.Control
                type="text"
                name="n_title"
                value={notice.n_title}
                placeholder="Enter 글 제목"
                onChange={handleChangeForm}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicWriter">
              <Form.Label>작성자</Form.Label>
              <Form.Control
                type="text"
                name="n_writer"
                value={notice.n_writer}
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
                value={notice.n_content}
                onChange={handleChangeForm}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            닫기
          </Button>
          <Button variant="primary" onClick={noticeUpdate}>
            수정
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default NoticeDetail
