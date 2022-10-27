import React, { useState } from 'react'
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import RestaurantService from '../services/RestaurantService'

const AddRestaurant = () => {
    const [restaurant, setRestaurant] = useState({
      id: "",
      name: "",
      emailId: "",
      license: ""
    })

const handleChange = (e) => {
  const value = e.target.value;
  setRestaurant({ ...restaurant, [e.target.name]: value });
};

const saveRestaurant = (e) => {
  e.preventDefault();
  RestaurantService.saveRestaurant(restaurant).then((response) => {
      console.log(response)
  }).catch((error) => {
      console.log(error)
  })
}

  return (
<Container className="d-grid h-100">
      <Form className="text-center w-25">
        <h1 className="mb-3 fs-3 fw-normal">
          Submit New Restaurant Here
        </h1>
        <Form.Group className="mb-1"
          controlId="newRestaurantName">
          <Form.Control type="text" placeholder="Restaurant Name" name='name' value={restaurant.name} autoComplete="Restaurant Name" className="position-relative"
          onChange={(e) => handleChange(e)}/>
        </Form.Group>
        <Form.Group className="mb-1"
        controlId="email-id">
          <Form.Control type="text" placeholder="Restaurant Email" name='emailId' value={restaurant.emailId} className="position-relative"
          onChange={(e) => handleChange(e)}/>
        </Form.Group>
        <h4>Upload Safety Lisence Here</h4>
        <Form.Group>
            <Form.Control type='file' placeholder='Uploud Safety Lisence' name='license' value={restaurant.license} className='position-relative'
            onChange={(e) => handleChange(e)}/>
        </Form.Group>
        {/* <p className="mt-5">&copy; 2022-2023</p> */}
        <Button type='submit' onClick={saveRestaurant}>Submit</Button>
      </Form>
    </Container>
  )
}

export default AddRestaurant