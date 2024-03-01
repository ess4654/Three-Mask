import { useState, Suspense, useRef } from 'react'
import { Canvas } from '@react-three/fiber'
import { Euler } from 'three'
import Webcam from 'react-webcam'
import '@tensorflow/tfjs'
import '@tensorflow/tfjs-backend-webgl'
import '@mediapipe/face_mesh'

import { Mask, Loader } from "./components"
import { useWindowSize } from "./utils/useWindowSize"
import { runDetector } from "./utils/detector"

const inputResolution = {
  width: 730 / 4,
  height: 640 / 4,
}
const videoConstraints = {
  width: inputResolution.width,
  height: inputResolution.height,
  facingMode: "user",
}
const videoStyle = {
  position: "fixed",
  zIndex: 2,
  top: 0,
  left: 0
}

function App() {
  const [rotation, setRotation] = useState(new Euler(0,0,0))
  const [videoOn, setVideoOn] = useState(true)
  const [loaded, setLoaded] = useState(false)
  const [width, height] = useWindowSize();
  const canvasRef = useRef();

  const handleVideoLoad = async (videoNode) => {
    const video = videoNode.target;
    if (video.readyState !== 4) return;
    if (loaded) return;
    await runDetector(video, canvasRef.current, (data) => {
      if(!data) return;
      //console.log(data.xDistance / data.zDistance - data.zDistance);
      let x = (data.yaw / 360) * 1.0 * Math.PI - Math.PI / 4;
      let y = (data.turn / 360) * 1.0 * Math.PI - Math.PI / 4;
      let z = 0;
      setRotation(new Euler(x, y, z))
    });
    setLoaded(true);
  }
  
  function toggleVideo(e) {
    setVideoOn(!videoOn)
  }

  return (<>
    <Webcam
      width={inputResolution.width}
      height={inputResolution.height}
      style={{...videoStyle, visibility: !videoOn ? "hidden" : "visible"}}
      videoConstraints={videoConstraints}
      onLoadedData={handleVideoLoad}
    />

    <Canvas style={{background: "linear-gradient(#0094FF, #51B6FF)"}}>
      <ambientLight intensity={Math.PI / 2} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} decay={0} intensity={Math.PI} />
      <pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI} />
      <Suspense fallback={<Loader />}>
        <Mask scale={width < 600 ? 1 : 1.5} rot={rotation} />
      </Suspense>
    </Canvas>

    <h2 onClick={toggleVideo} style={{position: "fixed", bottom: 0, left: 10, color: 'white'}}>
      Show Camera <input type='checkbox' onChange={toggleVideo} checked={videoOn} style={{width: 15, height: 15, marginTop: 15}} />
      <span style={{display: "none"}}>Window size: {width} x {height}</span>
    </h2>

    {/* <canvas
      ref={canvasRef}
      width={inputResolution.width}
      height={inputResolution.height}
      style={{ position: "absolute", border: "1px solid black" }}
    /> */}
  </>);
}

export default App;