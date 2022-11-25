import Card from "react-bootstrap/Card"

const Noticeboard = ({ notice, user, notices, setNotices }) => {

    const handleDelete = async () => {
        const res = await fetch(`/api/admin/notice/${notice.id}/`, { method: 'DELETE' })
        const data = await res.json()
        setNotices(notices.filter((n)=> {
            return n.id != notice.id
        })
    )}

    const importanceOfCard = () => {
    console.log(notice, user)
        if (notice.importance_tier === "General") {
        return (
            <Card className="notice">
            <h3 className="notice-title">{notice.title}</h3>
            <p className="notice-text">{notice.text} </p>
            <p>{new Date(notice.date).toLocaleString()}</p>
            {notice.admin_id === user.id && <button onClick={handleDelete}>Delete</button>}
            </Card>
        )
        } else if (notice.importance_tier === "Important") {
        return (
            <Card 
            className="notice"
            bg="warning">
            <h3 className="notice-title">{notice.title}</h3>
            <p className="notice-text">{notice.text} </p>
            <p>{new Date(notice.date).toLocaleString()}</p>
            {notice.admin_id === user.id && <button onClick={handleDelete}>Delete</button>}
            </Card>
        )
        } else {
        return (
            <Card 
            className="notice"
            bg="danger">
            <h3 className="notice-title">{notice.title}</h3>
            <p className="notice-text">{notice.text} </p>
            <p>{new Date(notice.date).toLocaleString()}</p>
            {notice.admin_id === user.id && <button onClick={handleDelete}>Delete</button>}
            </Card>
        )
        }
    }
  return <div>{importanceOfCard()}</div>
}

export default Noticeboard
