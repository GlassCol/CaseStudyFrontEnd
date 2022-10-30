import React, { useState } from 'react'
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import ItemService from '../services/ItemService'
import { useNavigate } from 'react-router-dom'

const AddItem = () => {
  const navigate = useNavigate()
    const [item, setItem] = useState({
      id: "",
      restId: "",
      name: "",
      price: ""
    })

const handleChange = (e) => {
  const value = e.target.value;
  setItem({ ...item, [e.target.name]: value });
};

const saveItem = (e) => {
  e.preventDefault();
  ItemService.saveItem(item).then((response) => {
      console.log(response)
  }).catch((error) => {
      console.log(error)
  })
  navigate(0)
}

  return (
<Container className="d-grid h-100">
      <Form className="text-center w-25">
        <h1 className="mb-3 fs-3 fw-normal">
          Submit New Item Here
        </h1>
        <Form.Group className="mb-1"
          controlId="newItemName">
          <Form.Control type="text" placeholder="Item Name" name='name' value={item.name} autoComplete="Item Name" className="position-relative"
          onChange={(e) => handleChange(e)}/>
        </Form.Group>
        <Form.Group className="mb-1"
          controlId="restId">
          <Form.Control type="text" placeholder="Restaurant Id" name='restId' value={item.restId} autoComplete="Restaurant Id" className="position-relative"
          onChange={(e) => handleChange(e)}/>
        </Form.Group>
        <Form.Group className="mb-1"
        controlId="price">
          <Form.Control type="text" placeholder="Item Price" name='price' value={item.price} className="position-relative"
          onChange={(e) => handleChange(e)}/>
        </Form.Group>
        {/* <p className="mt-5">&copy; 2022-2023</p> */}
        <Button type='submit' onClick={saveItem}>Submit</Button>
      </Form>
    </Container>
  )
}

export default AddItem