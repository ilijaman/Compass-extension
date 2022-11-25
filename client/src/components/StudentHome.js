import { useEffect, useState } from "react"
import '../App.css'
import StripedExample from "./ProgressBar"
import StudentTodo from "./StudentTodo" 

const StudentHome = ({ user }) => {
    const [completedTasks, setCompletedTasks] = useState(null)
    const [todos, setTodos] = useState(null)
    const [student, setStudent] = useState(null)
    console.log(user)

    useEffect(() => {
        const getData = async () => {
          const res = await fetch(`/api/compassbuddy/${user.id}/`)
          const data = await res.json()
          console.log(data)
          setTodos(data.todos)
          setStudent(data.student)
        }
        if (user) {
          getData()
        } 
      }, [user])

return (
    <div>
        {user ? user.id : 'loading...'}
        {user && user.username}
        {todos && todos.length > 0 && <StripedExample />}
        {todos && todos.map((todo) => (
        <StudentTodo todo={todo} />
        ))}
    </div>
)
}

export default StudentHome

