import React, { useState } from "react"

const wordList = ["array", "word", "state", "type", "tester"]

const Home = () => {
  const [typed, setTyped] = useState("")

  return (
    <>
      <h1>Code Monkey Type</h1>

      {/* Map list of words out to individual characters */}
      <div className="test">
        {wordList.map((word) => {
          return (
            <div>
              {word.split("").map((char) => {
                return (
                  <span>{char}</span>
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