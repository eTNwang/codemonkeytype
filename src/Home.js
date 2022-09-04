import React, { useState, useEffect } from "react"
import useKeyPress from "./hooks/useKeyPress"
import text from "./text.js";

function syncReadFile() {

  var problems = []


  const arr = text.split("####");
  function addtoproblems(input){
    var inputarr = input.split(/\r?\n/)
    let title = inputarr.shift();
    title  = title.replace("-", " ")
    title = title.replace(".py","")

    let probobj = {name: title, text: inputarr }
    problems.push(probobj)

  }
  arr.forEach((x, i) => addtoproblems(x));
  console.log(problems)
  
  return problems;
}


// Each solution is stored as an array of strings, with each string representing one line of the solution


const Home = () => {

  let initialState = []
  const [isCharacterCorrect, setIsCharacterCorrect] = useState(initialState)
  const [mistakes, setMistakes] = useState(0)
  const [victory, setVictory] = useState("")
  const [currLineIndex, setCurrLineIndex] = useState(0)
  const [currCharIndex, setCurrCharIndex] = useState(0)
  const [currTime, setTime] = useState(0)
  const [ticking, setTicking] = useState(false)
  const [currProblem, setProblem] = useState(syncReadFile())
  const [currTitle, setTitle] = useState(currProblem[0].name)
  const [currText, setText] = useState(currProblem[0].text)


for (let i = 0; i < currProblem.length; i++) {
  initialState.push([])
}

let totalChars = 0

for (let i = 0; i < currProblem.length; i++) {
  for (let j = 0; j < currProblem[i].length; j++) {
    totalChars++
  }
}
  

  useEffect(() => {
    const timer = setTimeout(() => ticking && setTime(currTime + 1), 1000)
    return () => clearTimeout(timer)
  }, [currTime, ticking])


  // To access characters, use lineList[line #][character #]

  useKeyPress(key => {

    if (currLineIndex === 999) {
      setTicking(false)
      return
    }

    setTicking(true)

    if (currLineIndex >= currText.length) {
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
        setCurrCharIndex(currText[currLineIndex - 1].length - 1)
        setIsCharacterCorrect(isCharacterCorrect.map(
          (line, index) => index === currLineIndex - 1 ? line.slice(0, -1) : line))
      } else {
        setCurrCharIndex(currCharIndex - 1)
      }

      // Valid key handler
    } else {
      if (key === currText[currLineIndex][currCharIndex]) {
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
      if (currCharIndex === currText[currLineIndex].length - 1) {

        // Win condition
        if (currLineIndex >= currText.length - 1) {
          setVictory("Victory!")
          setCurrLineIndex(999)
          
          setProblem(currProblem.shift())

          setTimeout(function() {
            setText(currProblem[0].text)
            setTitle(currProblem[0].name)
          }, 2000);

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

      <h2>{currTitle}</h2>

      {/* Map list of lines out to individual characters */}

      <p className="timer">{currTime}</p>
      <div className="test">
        {currText.map((line, lineIndex) => {
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
      {victory
        ? <div>
          <h3>Speed: {totalChars / 5 / currTime * 60} WPM</h3>
          <h3>Accuracy: {Math.round((totalChars - mistakes) / totalChars * 10000) / 100} %</h3></div>
        : null}
    </>
  )
}

export default Home