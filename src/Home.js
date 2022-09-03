import React, { useState } from "react"
import useKeyPress from "./hooks/useKeyPress"

// Each solution is stored as an array of strings, with each string representing one line of the solution
const lineList = ["ab cde fffg", "fgh", "i jklm"]

const initialState = []

for (let i = 0; i < lineList.length; i++) {
  initialState.push([])
}

const Home = () => {
  // Store an array of booleans depending on if the character was typed correctly
  const [isCharacterCorrect, setIsCharacterCorrect] = useState(initialState)
  const [currLineIndex, setCurrLineIndex] = useState(0)
  const [currCharIndex, setCurrCharIndex] = useState(0)

  // To access characters, use lineList[line #][character #]

  useKeyPress(key => {
    if (key === lineList[currLineIndex][currCharIndex]) {
      setIsCharacterCorrect(isCharacterCorrect.map(
        (line, index) => index === currLineIndex ? line.concat(true) : line)
      )
    } else {
      setIsCharacterCorrect(isCharacterCorrect.map(
        (line, index) => index === currLineIndex ? line.concat(false) : line)
      )
    }

    // Increment line if last character
    if (currCharIndex === lineList[currLineIndex].length - 1) {
      setCurrLineIndex(currLineIndex + 1)
      setCurrCharIndex(0)
    } else {
      setCurrCharIndex(currCharIndex + 1)
    }
  })

  return (
    <>
      <h1>Code Monkey Type</h1>

      {/* Map list of lines out to individual characters */}

      <div className="test">
        {lineList.map((line, lineIndex) => {
          return (
            <div key={lineIndex}>
              {line.split("").map((char, charIndex) => {
                console.log(lineIndex, currLineIndex)
                return (
                  <span
                    className={
                      // Add active selector to active char
                      lineIndex === currLineIndex && charIndex === currCharIndex ? "active" : ""
                        + " " +
                        // Handle previous lines
                        (lineIndex < currLineIndex
                          ? isCharacterCorrect[lineIndex][charIndex] ? "correct" : "incorrect"
                          : ""
                        )
                        + " " +
                        // Handle current line
                        (lineIndex === currLineIndex && charIndex < currCharIndex
                          ? isCharacterCorrect[lineIndex][charIndex] ? "correct" : "incorrect"
                          : "")
                    }
                    key={lineIndex + "-" + charIndex}
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