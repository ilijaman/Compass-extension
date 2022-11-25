import { useEffect, useReducer, useState } from "react"
import { useNavigate } from 'react-router-dom'
import '../App.css'

import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import Dropdown from 'react-bootstrap/Dropdown';
import { Form } from 'react-bootstrap'


const AddTodo = ({ student, todos, setTodos, user }) => {
  const navigate = useNavigate()
  const [title, setTitle] = useState(null)
  const [subject, setSubject] = useState(null)
  const [text, setText] = useState(null)
  const [show, setShow] = useState(false)
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)


  
  const handleSubmit = async (event) => {
    event.preventDefault()
    const data = {
        "title": title,
        "subject": subject,
        "text": text,
        "student_id": student.id,
        "admin_id": user.id
    }
    const res = await fetch('/api/admin/todo/', {
      method: "POST",
      headers: { "Content-Type": "application/json"},
      body: JSON.stringify(data)
    })
    const newTodo = await res.json()
    setTodos([newTodo, ...todos])
    handleClose()
    navigate(`/admin/${student.id}`)
  }
  
    return (
    <>
        <Button variant="primary" onClick={handleShow}>
          Add a Todo for {student.name}
        </Button>
  
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Todo details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label></Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter title"
                  autoFocus
                  onChange={(e) => setTitle(e.target.value)}
                />
            <Dropdown onSelect={(e) => setSubject(e)}>
                <Dropdown.Toggle variant="success" id="dropdown-basic" >
                    Declare subject
                </Dropdown.Toggle>
            <br/>
            <br/>
                <Dropdown.Menu >
                    <Dropdown.Item eventKey="English">English</Dropdown.Item>
                    <Dropdown.Item eventKey="Math">Math</Dropdown.Item>
                    <Dropdown.Item eventKey="Science">Science</Dropdown.Item>
                    <Dropdown.Item eventKey="Elective">Elective</Dropdown.Item>
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
                placeholder="Add task description"
                onChange={(e) => setText(e.target.value)}/>
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleSubmit}>
              Assign task
            </Button>
          </Modal.Footer>
        </Modal>
    </>
    )
}
export default AddTodo