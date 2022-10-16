import styled from "styled-components"

export const VRLI = styled.li`
  width: 50%;
  padding: 2em;
  list-style: none;
`
export const VRLIMG = styled.img`
  width: 40%;
  height: 90%;
`
export const VLUL = styled.ul`
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  padding-left: 0;
  margin: 0;
`
export const VRVIDEODIV = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  border: 1px solid lightgrey;
  cursor: pointer;
  transition: transform 250ms;
  &:hover {
    transform: scale(1.02);
  }
`
export const VRCONTENTDIV = styled.div`
  margin-left: 0.2em;
`
export const VRPTITLE = styled.p`
  margin: 10;
  font-size: 1.2rem;
`
export const VRPCHANNELTITLE = styled.p`
  margin: 0;
  font-size: 1rem;
`
export const PreDescription = styled.pre`
  white-space=pre-wrap; /* 코드 줄바꿈 없이도 자동줄바꿈 */
`
