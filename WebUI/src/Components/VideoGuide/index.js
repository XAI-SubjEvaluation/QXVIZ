import React,{useEffect} from "react";
import heatMapExplanation from "@video/HeatMapExplanation.mov"

function VideoGuide({ setSelectedAnswer }) {
  
  return (
    <video width="1235" height="500" controls>
      <source src={heatMapExplanation} type="video/mp4"/>
    </video>
  );
}

export default VideoGuide;