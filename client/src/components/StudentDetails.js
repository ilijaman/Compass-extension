const StudentDetails = ({ student }) => {
    return (
        <div>
            <h4>{student.name}'s Snapshot</h4>
            <p>{student.bio}</p>
        </div>
    )
}

export default StudentDetails