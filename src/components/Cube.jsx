import { useStore } from "../hooks/useStore"
import { useBox } from "@react-three/cannon"
import { useState } from "react"
import * as textures from '../assets/images/textures.js'


export const Cube = ({id,position,texture}) =>{
    const [IsHovered, setIsHovered] = useState(false)
    const [removeCube] = useStore(state => [state.removeCube])
    const [addCube] = useStore(state => [state.addCube])
    const [ref] = useBox(() => ({
        type: 'Static',
        position
    }))

    const activeTexture = textures[texture + 'Texture']

    return (
        <mesh 
            onPointerMove= {(e) => {
                e.stopPropagation()
                setIsHovered(true)
            }}
            onPointerOut= {(e) => {
                e.stopPropagation()
                setIsHovered(false)
            }}
            
            ref={ref}
            onClick = {(e) => {
                e.stopPropagation()
                const clickedFace = Math.floor(e.faceIndex /2)
                const {x,y,z} = ref.current.position
                if(e.altKey)  {           
                    removeCube(x,y,z)
                    return
                }

                
                switch(clickedFace){
                    case 0:
                        addCube(x +1 , y ,z)
                        return
                    case 1:
                        addCube(x - 1, y, z)
                        return
                    break
                    case 2:
                        addCube(x,y+1,z)
                        return
                    break
                    case 3:
                        addCube(x,y-1,z)
                        return
                    break
                    case 4:
                        addCube(x,y,z + 1)
                        return
                    break
                    case 5:
                        addCube(x,y,z- 1)
                        return
                    break;
                }
                
            }}
            >
                <boxBufferGeometry attach='geometry'/>
                <meshStandardMaterial 
                color ={IsHovered? 'gray' :'white'}
                transparent            
                map={activeTexture}
                attach='material'/>

        </mesh>
    )
}