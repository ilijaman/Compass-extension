import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import "../App.css"

import Button from "react-bootstrap/Button"
import Modal from "react-bootstrap/Modal"
import Dropdown from "react-bootstrap/Dropdown"
import { Form } from "react-bootstrap"

const AddNotice = ({ notices, setNotices }) => {
  const navigate = useNavigate()
  const [title, setTitle] = useState(null)
  const [text, setText] = useState(null)
  const [importance, setImportance] = useState(null)
  const [show, setShow] = useState(false)
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  const handleSubmit = async (event) => {
    event.preventDefault()
    const data = {
      title: title,
      text: text,
      importance_tier: importance,
    }
    const res = await fetch(`/api/admin/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
    const newNotice = await res.json()
    setNotices([newNotice, ...notices])
    navigate("/")
  }

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Add to noticeboard
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create Notice</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label></Form.Label>
              <Form.Control
                type="text"
                placeholder="Name your post"
                autoFocus
                onChange={(e) => setTitle(e.target.value)}
              />
              <Dropdown
                onSelect={(e) => {
                  setImportance(e)
                }}
              >
                <Dropdown.Toggle
                  variant="outline-secondary"
                  id="dropdown-basic"
                >
                  Declare importance
                </Dropdown.Toggle>
                <br />
                <Dropdown.Menu>
                  <Dropdown.Item eventKey="General">General</Dropdown.Item>
                  <Dropdown.Item eventKey="Important">Important</Dropdown.Item>
                  <Dropdown.Item eventKey="High Importance">
                    High Importance
                  </Dropdown.Item>
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
                placeholder="Notice details"
                onChange={(e) => setText(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Post
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}
export default AddNotice
