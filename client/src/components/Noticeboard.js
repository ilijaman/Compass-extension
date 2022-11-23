import Card from 'react-bootstrap/Card';

const Noticeboard = ({ notice }) => {
    return ( 
        <Card>
            <h3>{notice.title}</h3>
            <p>{notice.text} </p>
        </Card>
    )
}

export default Noticeboard
