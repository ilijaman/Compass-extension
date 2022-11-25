import Card from "react-bootstrap/Card"

const Todo = ({ todo }) => {


    const StudentTodo = () => {
        if (todo.subject === "English") {
        return (
            <Card 
            bg="info"
            className="notice">
            <h3 className="notice-title">{todo.title}</h3>
            <p className="notice-text">{todo.text} </p>
            <p>{new Date(todo.date).toLocaleString()}</p>
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
            </Card>
            )
        }
    }
  return <div>{StudentTodo()}</div>
}

export default Todo