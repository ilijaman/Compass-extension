import { useEffect, useState } from "react"
import { useNavigate, useParams } from 'react-router-dom'
import '../App.css'

import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import Dropdown from 'react-bootstrap/Dropdown';
import { Form } from 'react-bootstrap'


const EditStudent = ({ student }) => {
  const navigate = useNavigate()
  const [name, setName] = useState(null)
  const [grade, setGrade] = useState(null)
  const [bio, setBio] = useState(null)
  const { studentID } = useParams()
  const [show, setShow] = useState(false)
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)
  
  const handleSubmit = async (event) => {
    event.preventDefault()
    const data = {
        "name": name,
        "grade": grade,
        "bio": bio

    }
    const res = await fetch(`/api/admin/${studentID}/`, {
      method: "PUT",
      headers: { "Content-Type": "application/json"},
      body: JSON.stringify(data)
    })
    const studentData = await res.json()
    navigate("/")
  }
  
  const handleDelete = async () => {
    const res = await fetch(`/api/admin/${studentID}`, { method: 'DELETE' })
    const data = await res.json()
    navigate("/")
  }
    return (
    <>
        <Button variant="primary" onClick={handleShow}>
          Edit {student.name}'s profile
        </Button>
  
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Editing {student.name}'s details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Edit name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder={student.name}
                  autoFocus
                  onChange={(e) => setName(e.target.value)}
                />
            <Dropdown onSelect={(e) => setGrade(e)}>
                <Dropdown.Toggle variant="success" id="dropdown-basic" >
                    Edit grade
                </Dropdown.Toggle>
            <br/>
            <br/>
                <Dropdown.Menu>
                    <Dropdown.Item eventKey="7">7</Dropdown.Item>
                    <Dropdown.Item eventKey="8">8</Dropdown.Item>
                    <Dropdown.Item eventKey="9">9</Dropdown.Item>
                    <Dropdown.Item eventKey="10">10</Dropdown.Item>
                    <Dropdown.Item eventKey="11">11</Dropdown.Item>
                    <Dropdown.Item eventKey="12">12</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown> 

              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextarea1"
              >
                <Form.Label>Edit bio </Form.Label>
                <Form.Control as="textarea" rows={3} onChange={(e) => setBio(e.target.value)}/>
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button id='delete-profile'variant="danger" onClick={handleDelete}>
                Delete {student.name} from database
            </Button>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleSubmit}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
    </>
    )
}
export default EditStudent
