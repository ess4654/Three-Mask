import React, { useRef } from 'react'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader'
import { useLoader } from '@react-three/fiber'
import { useFrame } from '@react-three/fiber'
import { Euler } from 'three'

import { withNextTickLoading } from './loaders/withNextTickLoading'
const mask = require('../3D/OBJ MASK.obj')
const material = require('../3D/OBJ MASK.mtl')

function Mask(props)
{
    const ref = useRef()
    const mat = useLoader(withNextTickLoading(MTLLoader), material)
    const obj = useLoader(OBJLoader, mask, loader => {
        mat.preload()
        loader.setMaterials(mat)
    })

    //update
    useFrame((state, delta) => {
        let rot = props.rot ?? new Euler(0,0,0);
        ref.current.rotation.x = rot.x;
        ref.current.rotation.y = rot.y;
        ref.current.rotation.z = rot.z;
    })
   
    return (
        <primitive 
            ref={ref}
            scale={props.scale ?? 1}
            object={obj}
            position={props.position ?? [0,0,0]}
        />
    )
}

export default Mask;