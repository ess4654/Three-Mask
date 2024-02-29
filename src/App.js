import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { Mask, Loader } from "./components"

function App() {
  return (
    <Canvas style={{background: "grey"}}>
      <ambientLight intensity={Math.PI / 2} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} decay={0} intensity={Math.PI} />
      <pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI} />
      <Suspense fallback={<Loader />}>
        <Mask position={[-1.2, 0, 0]} />
      </Suspense>
  </Canvas>
  );
}

export default App;