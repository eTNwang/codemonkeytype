import React, { useState } from "react"
import useKeyPress from "./hooks/useKeyPress"

// Each solution is stored as an array of strings, with each string representing one line of the solution
const lineList = ["prevMap = {}", "for i, n in enumerate(nums):", "if diff in prevMap:", "return [prevMap[diff], i]", "prevMap[n] = i"]
const problemTitle = "TwoSum"

const initialState = []

for (let i = 0; i < lineList.length; i++) {
  initialState.push([])
}

let totalChars = 0

for (let i = 0; i < lineList.length; i++) {
  for (let j = 0; j < lineList[i].length; j++) {
    totalChars++
  }
}

const Home = () => {
  // Store an array of booleans depending on if the character was typed correctly
  const [isCharacterCorrect, setIsCharacterCorrect] = useState(initialState)
  const [mistakes, setMistakes] = useState(0)
  const [victory, setVictory] = useState("")
  const [currLineIndex, setCurrLineIndex] = useState(0)
  const [currCharIndex, setCurrCharIndex] = useState(0)

  // To access characters, use lineList[line #][character #]

  useKeyPress(key => {

    if (currLineIndex >= lineList.length) {
      return
    }

    // Backspace handler
    if (key === "Backspace") {
      setIsCharacterCorrect(isCharacterCorrect.map(
        (line, index) => index === currLineIndex ? line.slice(0, -1) : line)
      )
      if (currCharIndex === 0 && currLineIndex === 0) {
        return
      }
      // Decrement line if first char
      if (currCharIndex === 0) {
        setCurrLineIndex(currLineIndex - 1)
        setCurrCharIndex(lineList[currLineIndex - 1].length - 1)
        setIsCharacterCorrect(isCharacterCorrect.map(
          (line, index) => index === currLineIndex - 1 ? line.slice(0, -1) : line))
      } else {
        setCurrCharIndex(currCharIndex - 1)
      }

      // Valid key handler
    } else {
      if (key === lineList[currLineIndex][currCharIndex]) {
        setIsCharacterCorrect(isCharacterCorrect.map(
          (line, index) => index === currLineIndex ? line.concat(true) : line)
        )
      } else {
        setIsCharacterCorrect(isCharacterCorrect.map(
          (line, index) => index === currLineIndex ? line.concat(false) : line)
        )
        setMistakes(mistakes + 1)
      }

      // Increment line if last char
      if (currCharIndex === lineList[currLineIndex].length - 1) {

        // Win condition
        if (currLineIndex >= lineList.length - 1) {
          setVictory("Victory!")
          setCurrLineIndex(999)

          // Haven't won yet condition
        } else {
          setCurrLineIndex(currLineIndex + 1)
          setCurrCharIndex(0)
        }
      } else {
        setCurrCharIndex(currCharIndex + 1)
      }
    }
  })

  return (
    <>
      <h1>MonkeyCode</h1>

      <h2>{problemTitle}</h2>

      {/* Map list of lines out to individual characters */}

      <div className="test">
        {lineList.map((line, lineIndex) => {
          return (
            <div key={lineIndex}>
              {line.split("").map((char, charIndex) => {
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
      <h2>{victory}</h2>
      {victory ? <h3>Accuracy: {(totalChars - mistakes) / totalChars}</h3> : null}
    </>
  )
}

export default Home