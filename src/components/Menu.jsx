import { useStore } from "../hooks/useStore"


export const Menu = () => {
    const [saveWorld, resetWorld] = useStore((prev) => [ 
        prev.saveWorld,
        prev.resetWorld
    ])

    return( <div className="menu absolute">
        <button type="button" onClick={() => saveWorld()}>
            Save
        </button>
        <button type="button" onClick={() => resetWorld()}>
            Reset
        </button>
    </div>
        
    )

}