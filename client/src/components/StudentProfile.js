import { useState, useEffect } from "react"
import Todos from './Todos'
import { useParams } from "react-router-dom"
import StudentDetails from './StudentDetails'
import EditStudent from './EditStudent'

const StudentProfile = () => {
    const [student, setStudent] = useState(null)
    const [todos, setTodos] = useState(null)
    const  { studentID } = useParams()



    useEffect(() => {
        const getStudent= async () => {
            const res = await fetch(`/api/admin/${studentID}/`)
            const data = await res.json()
            console.log('hey', data)
            setStudent(data.student)
            setTodos(data.todos)
        }
        getStudent()
    }, [])


return (
    <div>
        {todos && todos.map((todo) => <Todos todo={todo} student={student}/>)}
        {todos && <StudentDetails student={student}/>}
        {todos && <EditStudent student={student} />}
    </div>  
)
}

export default StudentProfile