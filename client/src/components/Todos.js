import Card from "react-bootstrap/Card"

const Todo = ({ todo, user , todos, setTodos }) => {

    const handleDelete = async () => {
        console.log('heeello', user)
        const res = await fetch(`/api/admin/todo/${todo.id}/`, { method: 'DELETE' })
        const data = await res.json()
        setTodos(todos.filter((t)=> {
            return t.id != todo.id
        })
    )}

    const subjectOrganiser = () => {
        if (todo.subject === "English") {
        return (
            <Card 
            bg="info"
            className="notice">
            <h3 className="notice-title">{todo.title}</h3>
            <p className="notice-text">{todo.text} </p>
            <p>{new Date(todo.date).toLocaleString()}</p>
            {todo.admin_id === user.id && <button onClick={handleDelete}>Delete</button>}
            </Card>
        )
        } else if (todo.subject === "Math") {
        return (
            <Card 
            className="notice"
            bg="danger">
            <h3 className="notice-title">{todo.title}</h3>
            <p className="notice-text">{todo.text} </p>
            <p>{new Date(todo.date).toLocaleString()}</p>
            {todo.admin_id === user.id && <button onClick={handleDelete}>Delete</button>}
            </Card>
        )
        } else if (todo.subject === "Science") {
        return (
            <Card 
            className="notice"
            bg="success">
            <h3 className="notice-title">{todo.title}</h3>
            <p className="notice-text">{todo.text} </p>
            <p>{new Date(todo.date).toLocaleString()}</p>
            {todo.admin_id === user.id && <button onClick={handleDelete}>Delete</button>}
            </Card>
        )
        } else {
        return (
            <Card 
            className="notice"
            bg="secondary">
            <h3 className="notice-title">{todo.title}</h3>
            <p className="notice-text">{todo.text} </p>
            <p>{new Date(todo.date).toLocaleString()}</p>
            {todo.admin_id === user.id && <button onClick={handleDelete}>Delete</button>}
            </Card>
            )
        }
    }
  return <div>{subjectOrganiser()}</div>
}

export default Todo
