import { Link } from 'react-router-dom'

const SearchResults = ({result}) => {
    return (
        <div>
            <Link to={`/admin/${result.id}`}>{result.name}</Link>
        </div>
    )
}

export default SearchResults