import React from "react"

const NoticeDetail = (props) => {
  const { n_no } = useParams()
  const [isOk, setIsOk] = useState(false)
  const [noticeVO, setDeptVO] = useState({
    DEPTNO: 0,
    DNAME: "",
    LOC: "",
    FILENAME: "",
    FILEURL: "",
  })
  useEffect(() => {
    // 서버를 왔다갔다 하기 때문에 비동기처리가 필요함
    const asyncDB = async () => {
      // 처리될 때까지 기다려야하기 때문에 반드시 await을 사용!
      const res = await jsonDeptList({ deptno: deptno })
      // 여기서 호출하게 되면 fetch 함수와의 차이점을 발견할 수 있다
      // JSON.stringify, JSON.parse
      console.log(res)
      setDeptVO(res.data[0])
    }
    asyncDB()
  }, [deptno]) // 의존배열의 존재 유무는 useState의 순서에는 영향이 없음.
  return (
    <>
      <Card style={{ width: "58rem" }}>
        <Card.Body>
          <div className="dept-detail">
            <Card.Img
              variant="top"
              style={{ width: "250px" }}
              src={`${deptVO.FILEURL}`}
            />
            <div className="dept-header">
              <Card.Title>{deptVO.DNAME}</Card.Title>
              <Card.Text>{deptVO.LOC}</Card.Text>
              <Card.Text>{deptVO.FILENAME}</Card.Text>
            </div>
          </div>
        </Card.Body>
        <div>
          <Button variant="primary">삭제</Button>
          <Link to="/dept" className="nav-link">
            목록
          </Link>
        </div>
      </Card>
    </>
  )
}

export default NoticeDetail
