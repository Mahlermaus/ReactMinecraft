import { useStore } from "../hooks/useStore.js";
import * as images from '../assets/images/images.js'
import { useEffect, useState } from "react";
import { useKeyboard } from "../hooks/useKeyboard.js";

export const TextureSelector = () => {
    const [visible, setVisible] = useState(false)
    const [texture,setTexture] = useStore((state) => [state.texture, state.setTexture])

    const {
        dirt, 
        grass,
        glass,
        wood,
        log,
    } = useKeyboard()

    useEffect(() => {
        const visibilityTime = setTimeout(() => {
            setVisible(false)
        }, 1200)

        setVisible(true)

        return () => {
            clearTimeout(visibilityTime)
        }
    }, [texture])

    useEffect(() => {
        const options = {
            dirt,
            grass,
            glass,
            wood,
            log
        }
        const selectedTexture = Object
            .entries(options)
            .find(([k,v]) => v )

        if(selectedTexture){
            setTexture(selectedTexture[0])
        }
       
    }, [setTexture, dirt,grass,glass,wood,log])
    return(
        <div className= {`texture-selector ${visible ? '': 'hidden'} `}>
        {            
            Object
                .entries(images)
                .map(([imgKey,img]) => {
                    return(
                        <img /*className= {texture === imgKey.replace('Img', '')? 'selected': ''}*/
                            key={imgKey}
                            src={img}
                            alt={imgKey}
                            className = {`${imgKey === texture ? 'active' : ''}`}
                        />
                    )
                })
        }
        </div>
    )
 
}