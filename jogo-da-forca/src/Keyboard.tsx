import styles from "./Keyboard.module.css"

const KEYS = 
[
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z"
]

type KeyboardProps = {
    activeLetters: string[],
    inactiveLetters: string[],
    disabled: boolean,
    addLetters: (key: string) => void
}

export function Keyboard ( {activeLetters, inactiveLetters, disabled, addLetters} : KeyboardProps )
{
    return ( 
    <div style = {{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(75px, 1fr))",
        gap: ".5rem",
    }}>
        {KEYS.map(key => {
            const isActive = activeLetters.includes(key)
            const isInactive = inactiveLetters.includes(key)

            return <button 
                onClick={() => addLetters(key)}
                className = {`${styles.btn} ${isActive ? styles.active : "" } ${isInactive ? styles.inactive : "" }`} 
                disabled={isInactive || isActive || disabled}
                key={key}>
                {key}
            </button>
        })}
    </div>
    )
}