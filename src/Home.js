import React, { useState } from "react"
import useKeyPress from "./hooks/useKeyPress"

// Each solution is stored as an array of strings, with each string representing one line of the solution
const lineList = ["ab cde", "fgh", "i jklm"]

const Home = () => {
  // Store an array of booleans depending on if the character was typed correctly
  const [isCharacterCorrect, setIsCharacterCorrect] = useState([])
  const [currLineIndex, setCurrLineIndex] = useState(0)
  const [currCharIndex, setCurrCharIndex] = useState(0)

  // To access characters, use lineList[line #][character #]

  useKeyPress(key => {
    if (key === lineList[currLineIndex][currCharIndex]) {
      setIsCharacterCorrect(isCharacterCorrect.concat(true))
    } else {
      setIsCharacterCorrect(isCharacterCorrect.concat(false))
    }

    // Increment line if last character
    if (currCharIndex === lineList[currLineIndex].length - 1) {
      // setIsCharacterCorrect(isCharacterCorrect.concat([]))
      setCurrLineIndex(currLineIndex + 1)
      setCurrCharIndex(0)
    } else {
      setCurrCharIndex(currCharIndex + 1)
    }
    
  }
  )

  return (
    <>
      <h1>Code Monkey Type</h1>

      {/* Map list of lines out to individual characters */}

      <div className="test">
        {lineList.map((line, lineIndex) => {
          return (
            <div key={lineIndex}>
              {line.split("").map((char, charIndex) => {
                return (
                  <span
                    className={lineIndex === currLineIndex && charIndex === currCharIndex ? "active" : "inactive"}
                    key={[lineIndex, charIndex]}
                  >
                    {char}
                  </span>
                )
              })}
            </div>
          )
        })}
      </div>
    </>
  )
}

export default Home