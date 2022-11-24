import { link } from "react-router-dom"
import { useEffect, useState } from "react"
import Noticeboard from "./Noticeboard"
import SearchBar from "./SearchBar"
import AddStudent from "./AddStudent"
import AddNotice from "./AddNotice"

const AdminHome = ({ user }) => {
  const [notices, setNotices] = useState([])
  const [students, setStudents] = useState([])
  const [admins, setAdmins] = useState([])

  //RETRIEVE ADMIN/STUDENT & NOTICEBOARD DATA

  useEffect(() => {
    const getData = async () => {
      const res = await fetch("/api/admin/")
      const data = await res.json()
      setNotices(data.noticeboard)
      setStudents(data.students)
      setAdmins(data.admins)
    }
    getData()
  }, [])

  return (
    <div className="container">
      <div className="noticeboard">
        {notices.map((notice) => (
          <Noticeboard notice={notice} user={user}/>
        ))}
        <AddNotice notices={notices} setNotices={setNotices} />
      </div>
      <div className="searchbar">
        <SearchBar />
      </div>
      <div className="add-student-btn">
        <AddStudent students={students} />
      </div>
    </div>
  )
}

export default AdminHome
