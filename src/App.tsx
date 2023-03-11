import { useEffect, useState } from "react"
import { fetchData, returnError } from "./assets/utils/fetchData"

function App() {
  useEffect(() => {
    returnError()
  }, [])
  return <div className="App"></div>
}

export default App
