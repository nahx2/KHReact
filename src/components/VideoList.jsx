import React from "react"
import { VLUL } from "./styles/YoutubeStyle"

import VideoRow from "./VideoRow"

const VideoList = (props) => {
  const { videos, videoSelect } = props
  return (
    <>
      <VLUL>
        {videos.map((video, i) => (
          <VideoRow key={video.id} video={video} />
        ))}
      </VLUL>
    </>
  )
}

export default VideoList
