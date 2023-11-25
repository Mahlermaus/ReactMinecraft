import { usePlane } from "@react-three/cannon"
import { glassTexture, grassTexture, groundTexture } from "../assets/images/textures"
import { useStore } from "../hooks/useStore"

export function Ground(){
    const [ref] = usePlane(() =>({
        rotation: [-Math.PI / 2, 0, 0],
        position: [0,-0.5,0]
    }))

    const [addCube] = useStore(state =>[state.addCube]) 

    groundTexture.repeat.set(100,100)

    const handleClickGround = event => {
        //no deja que pase el evento
        event.stopPropagation()
        const [x,y,z] = Object.values(event.point).map(n => Math.ceil(n))        
        addCube(x,y,z)
    }

    return (
        <mesh 
            onClick={handleClickGround}
            ref={ref}>        
            <planeBufferGeometry attach='geometry' args={[1000,1000]}/>
            <meshStandardMaterial attach='material' map={groundTexture} 
            color='gold'/>            
        </mesh>
    )
}