import React, { useState } from "react"

const Home = () => {
  const [textToType, setTextToType] = useState("this website is made for typing practice")
  const [typed, setTyped] = useState("")

  return (
    <>
      <h1>Code Monkey Type</h1>
      <p className="text-to-type">type a bunch of words here this is where the sentences go</p>
      <input
        placeholder="placeholder text"
        value={typed}
        onChange={({ target }) => setTyped(target.value)}
      />
    </>
  )
}

export default Home