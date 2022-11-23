const Todos = ({ todo, student }) => {
    return (
        <div>
            <h4>{todo.title} for {student.name}</h4>
            <p>{todo.text}, {todo.date}</p>
        </div>
    )
}

export default Todos