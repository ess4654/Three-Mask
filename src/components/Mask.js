import React, { useRef } from 'react'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader'
import { useLoader } from '@react-three/fiber'
import { useFrame } from '@react-three/fiber'
import { Euler } from 'three'

import { withNextTickLoading } from './loaders/withNextTickLoading'

require("../3D/textures/Substance_AIR PIPE_BaseColor.png")
require("../3D/textures/Substance_AIR PIPE_Roughness.png")
require("../3D/textures/Substance_AIR PIPE_Metallic.png")
require("../3D/textures/Substance_AIR PIPE_Normal.png")

require("../3D/textures/Substance_BELT_BaseColor.png")
require("../3D/textures/Substance_BELT_Roughness.png")
require("../3D/textures/Substance_BELT_Metallic.png")
require("../3D/textures/Substance_BELT_Normal.png")

require("../3D/textures/Substance_BOMB_BaseColor.png")
require("../3D/textures/Substance_BOMB_Roughness.png")
require("../3D/textures/Substance_BOMB_Metallic.png")
require("../3D/textures/Substance_BOMB_Normal.png")

require("../3D/textures/Substance_EYES ONE_BaseColor.png")
require("../3D/textures/Substance_EYES ONE_Roughness.png")
require("../3D/textures/Substance_EYES ONE_Metallic.png")
require("../3D/textures/Substance_EYES ONE_Normal.png")

require("../3D/textures/Substance_HOLDER_BaseColor.png")
require("../3D/textures/Substance_HOLDER_Roughness.png")
require("../3D/textures/Substance_HOLDER_Metallic.png")
require("../3D/textures/Substance_HOLDER_Normal.png")

require("../3D/textures/Substance_MASK ONE_BaseColor.png")
require("../3D/textures/Substance_MASK ONE_Roughness.png")
require("../3D/textures/Substance_MASK ONE_Metallic.png")
require("../3D/textures/Substance_MASK ONE_Normal.png")

require("../3D/textures/Substance_TUBE_BaseColor.png")
require("../3D/textures/Substance_TUBE_Roughness.png")
require("../3D/textures/Substance_TUBE_Metallic.png")
require("../3D/textures/Substance_TUBE_Normal.png")

require("../3D/textures/Substance_TUBE CON_BaseColor.png")
require("../3D/textures/Substance_TUBE CON_Roughness.png")
require("../3D/textures/Substance_TUBE CON_Metallic.png")
require("../3D/textures/Substance_TUBE CON_Normal.png")

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