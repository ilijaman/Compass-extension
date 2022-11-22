import { link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Noticeboard from './Noticeboard'
import SearchBar from './SearchBar'
import SearchResults from './SearchResults'

const AdminHome = () => {
    const [notices, setNotices] = useState([])
    const [students, setStudents] = useState([])

    //RETRIEVE NOTICEBOARD DATA

    useEffect(() => {
        const getData = async () => {
            const res = await fetch("/api/admin/")
            const data = await res.json()
            setNotices(data.noticeboard)
            setStudents(data.students)
        }
        getData()
    }, [])

    return (
        <div className="container">
            <div className="noticeboard">
                {notices.map((notice) => <Noticeboard notice={notice} />)}
            </div>
            <div className="searchbar">
                <SearchBar />
                {/* <SearchResults /> */}
            </div>
        </div>
    )
}

export default AdminHome