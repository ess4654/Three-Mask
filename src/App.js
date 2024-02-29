import { useState, Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { Mask, Loader } from "./components"
import { Euler } from 'three';

function App() {
  const [rotation, setRotation] = useState(new Euler(0,0,0))

  return (
    <Canvas style={{background: "grey"}}>
      <ambientLight intensity={Math.PI / 2} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} decay={0} intensity={Math.PI} />
      <pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI} />
      <Suspense fallback={<Loader />}>
        <Mask scale={1.5} rot={rotation} />
      </Suspense>
  </Canvas>
  );
}

export default App;