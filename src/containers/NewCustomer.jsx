import React, { useState } from "react";
import { Container, Form } from "react-bootstrap";

const NewCustomer = () => {
  const [data, setData] = useState({
    name: "",
    username: "",
    email: "",
    address: {street:"", suite: "", city: "", zipcode: ""},
    geo: {lat: "", lng: ""},
    phone: "",
    website: "",
    company: {name: "", catchPhrase: "", bs: ""},
  });

  const handleChange = ({ target }) => {
     setData({
        ...data,
        [target.name]: target.value
     })
  }

  return (
    <div>
      <Container>
        <h1 className="text-center">NEW USER</h1>
        <Form>
        <Form.Group className= "mb-3">
            <Form.Control type="text" name= "name" placeholder="Name" value={data.name} onChange={handleChange}/>
          </Form.Group>

          <Form.Group className= "mb-3">
            <Form.Control type="text" name= "username" placeholder="Username" value={data.username} onChange={handleChange}/>
          </Form.Group>

          <Form.Group className= "mb-5">
            <Form.Control type="email" name= "email" placeholder="Email" value={data.email} onChange={handleChange}/>
          </Form.Group>

          <Form.Group className= "mb-3"><div className="text-center">Address</div>
            <Form.Control type="text" name= "street" placeholder="Street" value={data.address.street} onChange={handleChange}/>
          </Form.Group>

          <Form.Group className= "mb-3">
            <Form.Control type="text" name= "suite" placeholder="Suite" value={data.address.suite} onChange={handleChange}/>
          </Form.Group>

          <Form.Group className= "mb-3">
            <Form.Control type="text" name= "city" placeholder="City" value={data.address.city} onChange={handleChange}/>
          </Form.Group>

          <Form.Group className= "mb-5">
            <Form.Control type="number" name= "zipcode" placeholder="Zipcode" value={data.address.zipcode} onChange={handleChange}/>
          </Form.Group>

          <Form.Group className= "mb-3"><div className="text-center">Geo</div>
            <Form.Control type="text" name= "lat" placeholder="Latitude" value={data.geo.lat} onChange={handleChange}/>
          </Form.Group>

          <Form.Group className= "mb-5">
            <Form.Control type="text" name= "lng" placeholder="Longitude" value={data.geo.lng} onChange={handleChange}/>
          </Form.Group>

          <Form.Group className= "mb-3">
            <Form.Control type="number" name= "phone" placeholder="Phone" value={data.phone} onChange={handleChange}/>
          </Form.Group>

          <Form.Group className= "mb-5">
            <Form.Control type="text" name= "website" placeholder="Website" value={data.website} onChange={handleChange}/>
          </Form.Group>

          <Form.Group className= "mb-3"><div className="text-center">Company</div>
            <Form.Control type="text" name= "name" placeholder="Company Name" value={data.company.name} onChange={handleChange}/>
          </Form.Group>

          <Form.Group className= "mb-3">
            <Form.Control type="text" name= "catchPhrase" placeholder="Catch Pharse" value={data.company.catchPhrase} onChange={handleChange}/>
          </Form.Group>

          <Form.Group className= "mb-3">
            <Form.Control type="text" name= "bs" placeholder="Bs" value={data.company.bs} onChange={handleChange}/>
          </Form.Group>

        </Form>
      </Container>
    </div>
  );
};

export default NewCustomer;
