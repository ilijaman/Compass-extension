import { useNavigate } from "react-router-dom"
import { useState } from "react"
import SearchResults from "./SearchResults"
import Button from 'react-bootstrap/Button'

const Search = () => {
  const navigate = useNavigate()
  const [query, setQuery] = useState("")
  const [results, setResults] = useState([])

  const handleSearchSubmit = async (event) => {
    event.preventDefault()
    const res = await fetch('/api/search/', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(query)
    })
    const data = await res.json()
    console.log(data)
    setResults(data)
  }

  return (
    <>
    <div className="content-body">
      <form onSubmit={handleSearchSubmit}>
        <input
          type="text"
          name="Search"
          id="Search"
          placeholder="Search for student"
          required
          minLength="3"
          onChange={(event) => {
            setQuery(event.target.value)
          }}
          value={query}
        />
        <br />
        <Button variant="primary" as="input" type="submit" value="search">
        </Button>
      </form>
      {results.map((result) => (
        <SearchResults result={result} />
      ))}
      </div>
    </>
  )
}

export default Search
