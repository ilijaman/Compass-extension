const Noticeboard = ({ notice }) => {
    return ( 
        <div className="notices">
            <h3>{notice.title}</h3>
            <p>{notice.text}</p>
        </div>
    )
}

export default Noticeboard
