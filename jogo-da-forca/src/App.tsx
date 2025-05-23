import { isValidElement, useCallback, useEffect, useState } from "react"
import words from "./WordList.json"
import { HangmanDrawing } from "./HangmanDrawing"
import { HangmanWord } from "./HangmanWord"
import { Keyboard } from "./Keyboard"

function App() {

  const [guessWord, setGuessWord] = useState(() => 
  {
    return words[Math.floor(Math.random() * words.length)]
  })

  const [letters, setLetters] = useState<string[]>([])

  const wrongGuess = letters.filter(letter => !guessWord.includes(letter))

  const isLoser = wrongGuess.length >= 6;

  const isWinner = guessWord.split("").every(letter => letters.includes(letter))

  const addLetter = useCallback((key: string) => {
    if (letters.includes(key) || isWinner || isLoser) return
    setLetters(currentLetters => [...currentLetters, key])
  }, [letters, isLoser, isWinner])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const key = e.key

      if (!key.match(/^[a-z]$/)) return

      e.preventDefault()
      addLetter(key)
    }

    document.addEventListener("keypress", handler)

    return () => {
      document.removeEventListener("keypress", handler)
    }
  }, [letters])

  return (
    <div style = {{
      maxWidth: "800px",
      display: "flex",
      flexDirection: "column",
      gap: "2rem",
      margin: "0 auto",
      alignItems: "center",
    }}>
      <div style = {{
        fontSize: "2rem",
        textAlign: "center"
      }}>
          {isWinner && "Venceu! F5 para tentar de novo!"}
          {isLoser && "Perdeu! F5 para tentar de novo!"}
      </div>
      <HangmanDrawing guessCount = {wrongGuess.length} />
      <HangmanWord guessedLetters={letters} wordToGuess={guessWord}/>
      <div style = {{
        alignSelf: "stretch"
      }}>
        <Keyboard 
          disabled={isWinner || isLoser}
          activeLetters = {letters.filter(letter => 
            guessWord.includes(letter)
          )}
          inactiveLetters = {wrongGuess}
          addLetters = {addLetter}
        />
      </div>
    </div>
  )
}

export default App
