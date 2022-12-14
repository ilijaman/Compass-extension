import { useEffect, useState } from "react"
import { useNavigate } from 'react-router-dom'
import '../App.css'

import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import Dropdown from 'react-bootstrap/Dropdown';
import { Form } from 'react-bootstrap'


const AddStudent = () => {
  const navigate = useNavigate()
  const [name, setName] = useState(null)
  const [grade, setGrade] = useState(null)
  const [bio, setBio] = useState(null)
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
    const res = await fetch(`/api/admin/`, {
      method: "POST",
      headers: { "Content-Type": "application/json"},
      body: JSON.stringify(data)
    })
    const studentData = await res.json()
    navigate("/")
  }
  
    return (
    <>
        <Button variant="primary" onClick={handleShow}>
          Add a student
        </Button>
  
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Student details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label></Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter name"
                  autoFocus
                  onChange={(e) => setName(e.target.value)}
                />
            <Dropdown onChange={(e) => setGrade(e)}>
                <Dropdown.Toggle variant="success" id="dropdown-basic" >
                    Declare grade
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
                <Form.Label></Form.Label>
                <Form.Control 
                as="textarea" 
                rows={5} 
                placeholder="Add a bio"
                onChange={(e) => setBio(e.target.value)}/>
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleSubmit}>
              Add
            </Button>
          </Modal.Footer>
        </Modal>
    </>
    )
}
export default AddStudent