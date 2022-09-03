import React, { useState, useEffect } from "react"
import Select, { NonceProvider } from "react-select"

import useKeyPress from "./hooks/useKeyPress"

const { readFileSync, promises: fsPromises } = require('fs');

function syncReadFile(filename) {

  const contents = readFileSync(filename, 'utf-8');

  var problems = []

  const arr = contents.split("####");
  function addtoproblems(input) {
    var inputarr = input.split(/\r?\n/)
    let title = inputarr.shift();
    title = title.replace("-", " ")
    title = title.replace(".py", "")

    let probobj = { name: title, text: inputarr }
    problems.push(probobj)

  }
  arr.forEach((x, i) => addtoproblems(x));
  return problems;
}


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
  const [currTime, setTime] = useState(0)
  const [ticking, setTicking] = useState(false)
  const [currLanguage, setCurrLanguage] = useState({ value: 'Python', label: 'Python' })



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
          setTicking(false)
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
  });

  const languageOptions = [
    { value: 'Python', label: 'Python' },
    { value: 'C++', label: 'C++'},
    { value: 'Java', label: 'Java' },
  ]

  const customStyles = {
    option: (provided, state) => ({
      ...provided,
      background: '#323437',
      color: state.isSelected ? '#e2b714' : '#d1d0c5',
      padding: 20,
    }),
    menu: (provided, state) => ({
      ...provided,
      background: '#323437',
    }),
    control: (provided, state) => ({
      ...provided,
      background: '#323437',
      width: "200px",
      boxShadow: 0,
      borderColor: state.isFocused
        ? '#e2b714' : '#d1d0c5',
      '&:hover': {
        borderColor: state.isFocused
          ? '#e2b714' : '#d1d0c5',
      }
    }),
    singleValue: (provided, state) => {
      const opacity = state.isDisabled ? 0.5 : 1;
      const transition = 'opacity 300ms';
  
      return { ...provided, opacity, transition, color: '#e2b714' };
    }
  }

  return (
    <>
      <h1>MonkeyCode 🍌</h1>

      <h2>{problemTitle}</h2>

      <Select 
        value = { currLanguage }
        options = { languageOptions }
        onChange = { setCurrLanguage }
        isSearchable = { false }
        styles = { customStyles }
      />

      {/* Map list of lines out to individual characters */}

      <p className="timer">{currTime}</p>
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
      {victory ?
        <>
          <div className="results-cover" />
          <div className="results">
            <h2>{victory}</h2>
            <h3>Speed: {Math.round(totalChars / 5 / currTime * 60)} WPM</h3>
            <h3>Accuracy: {Math.round((totalChars - mistakes) / totalChars * 10000) / 100} %</h3>
          </div>
        </>
        : null}
    </>
  )
}

export default Home