import { useState, useEffect } from "react"
import Todos from './Todos'
import { useParams } from "react-router-dom"
import StudentDetails from './StudentDetails'
import EditStudent from './EditStudent'
import AssignTodo from './AssignTodo'

const StudentProfile = ({ user }) => {
    const [student, setStudent] = useState(null)
    const [todos, setTodos] = useState(null)
    const  { studentID } = useParams()


    useEffect(() => {
        const getStudent= async () => {
            const res = await fetch(`/api/admin/${studentID}/`)
            const data = await res.json()
            setStudent(data.student)
            setTodos(data.todos)
        }
        getStudent()
    }, [])


return (
    <>
    <div className="container1">
        <div className="noticeboard">
            {todos && todos.map((todo) => <Todos todo={todo} user={user} todos={todos} setTodos={setTodos} />)}
        </div> 
    </div>
        <div className="container2">
            {todos && <StudentDetails student={student}/>}
            {todos && <EditStudent student={student} />}
            {todos && <AssignTodo student={student} todos={todos} setTodos={setTodos} user={user}/> }
        </div>
    </>
    )
}


export default StudentProfile