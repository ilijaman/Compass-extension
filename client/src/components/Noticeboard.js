import Card from "react-bootstrap/Card"

const Noticeboard = ({ notice, user }) => {
  const importanceOfCard = () => {
    console.log(notice, user)
    if (notice.importance_tier === "general") {
      return (
        <Card>
          <h3>{notice.title}</h3>
          <p>{notice.text} </p>
          {notice.admin_id === user.id && <button>Delete</button>}
        </Card>
      )
    } else if (notice.importance_tier === "Important") {
      return (
        <Card bg="warning">
          <h3>{notice.title}</h3>
          <p>{notice.text} </p>
          <p>{new Date(notice.date).toLocaleString()}</p>
          {notice.admin_id === user.id && <button>Delete</button>}
        </Card>
      )
    } else {
      return (
        <Card bg="danger">
          <h3>{notice.title}</h3>
          <p>{notice.text} </p>
          {notice.admin_id === user.id && <button>Delete</button>}
        </Card>
      )
    }
  }
  return <div>{importanceOfCard()}</div>
}

export default Noticeboard
