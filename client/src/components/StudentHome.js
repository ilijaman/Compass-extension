import { useEffect, useState } from "react"
import '../App.css'
import ProgressBar from "./ProgressBar"


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
      <h1>{user && user.username}</h1>
        {todos && todos.map((todo) => (
        <StudentTodo todo={todo} />
        ))}
        <ProgressBar todos={todos}/>
    </div>
)
}

export default StudentHome

