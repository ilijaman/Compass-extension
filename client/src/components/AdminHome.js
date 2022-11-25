import { useEffect, useState } from "react"
import Noticeboard from "./Noticeboard"
import SearchBar from "./SearchBar"
import AddStudent from "./AddStudent"
import AddNotice from "./AddNotice"
import '../App.css'

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
  <>
    <div className="noticeboard">
        <div className="container1">
        {notices.map((notice) => (
          <Noticeboard notice={notice} user={user}
          notices={notices} setNotices={setNotices}/>
        ))}
      </div>
      <AddNotice notices={notices} setNotices={setNotices} />
      </div>
    
      <div className="search-bar">
        <SearchBar />
      </div>
      <div className="add-student-btn">
        <AddStudent students={students} />
      </div>
  </>
  )
}

export default AdminHome
