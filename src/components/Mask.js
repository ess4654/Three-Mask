import React, { useRef } from 'react'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'
import { useLoader } from '@react-three/fiber'
import { useFrame } from '@react-three/fiber'

const mask = require('../3D/OBJ MASK.obj')
const mat = require('../3D/OBJ MASK.mtl')

function Mask(props)
{
    const obj = useLoader(OBJLoader, mask)
    const ref = useRef()

    useFrame((state, delta) => (ref.current.rotation.x += delta));
   
    return (
        <primitive 
            ref={ref}
            scale={1}
            object={obj}>

                <meshStandardMaterial mate />
        </primitive>
        // <mesh
        //     {...props}
        //     ref={ref}
        //     scale={1}>
        //     <boxGeometry args={[1, 1, 1]} />
        //     <meshStandardMaterial color={'hotpink'} />
        // </mesh>
    );
}

export default Mask;