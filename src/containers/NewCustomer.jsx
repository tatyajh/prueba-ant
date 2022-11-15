import React, { useState } from "react";
import { Container, Form } from "react-bootstrap";
import axios from "axios";

const NewCustomer = () => {
  const [data, setData] = useState({
    name: "",
    username: "",
    email: "",
    address: { street: "", suite: "", city: "", zipcode: "" },
    geo: { lat: "", lng: "" },
    phone: "",
    website: "",
    company: { name: "", catchPhrase: "", bs: "" },
  });

  const handleChange = ({ target }) => {
    setData({
      ...data,
      [target.name]: target.value,
    });
  };

  const handleAddressChange = ({ target }) => {
    setData({
      ...data,
      address: {
        ...data.address,
        [target.name]: target.value,
      },
    });
  };

  const handleGeoChange = ({ target }) => {
    setData({
      ...data,
      geo: {
        ...data.geo,
        [target.name]: target.value,
      },
    });
  };

  const handleCompanyChange = ({ target }) => {
    setData({
      ...data,
      company: {
        ...data.company,
        [target.name]: target.value,
      },
    });
  };

  const URL = "http://localhost:3004/users";

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await axios.post(
      URL,
      data,
      data.address,
      data.geo,
      data.company
    );
    console.log(response);
  };

  return (
    <div>
      <Container>
        <h1 className="text-center">NEW USER</h1>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Control
              type="text"
              name="name"
              placeholder="Name"
              value={data.name}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Control
              type="text"
              name="username"
              placeholder="Username"
              value={data.username}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-5">
            <Form.Control
              type="email"
              name="email"
              placeholder="Email"
              value={data.email}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <div className="text-center">Address</div>
            <Form.Control
              type="text"
              name="street"
              placeholder="Street"
              value={data.address.street}
              onChange={handleAddressChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Control
              type="text"
              name="suite"
              placeholder="Suite"
              value={data.address.suite}
              onChange={handleAddressChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Control
              type="text"
              name="city"
              placeholder="City"
              value={data.address.city}
              onChange={handleAddressChange}
            />
          </Form.Group>

          <Form.Group className="mb-5">
            <Form.Control
              type="number"
              name="zipcode"
              placeholder="Zipcode"
              value={data.address.zipcode}
              onChange={handleAddressChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <div className="text-center">Geo</div>
            <Form.Control
              type="text"
              name="lat"
              placeholder="Latitude"
              value={data.geo.lat}
              onChange={handleGeoChange}
            />
          </Form.Group>

          <Form.Group className="mb-5">
            <Form.Control
              type="text"
              name="lng"
              placeholder="Longitude"
              value={data.geo.lng}
              onChange={handleGeoChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Control
              type="number"
              name="phone"
              placeholder="Phone"
              value={data.phone}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-5">
            <Form.Control
              type="text"
              name="website"
              placeholder="Website"
              value={data.website}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <div className="text-center">Company</div>
            <Form.Control
              type="text"
              name="name"
              placeholder="Company Name"
              value={data.company.name}
              onChange={handleCompanyChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Control
              type="text"
              name="catchPhrase"
              placeholder="Catch Pharse"
              value={data.company.catchPhrase}
              onChange={handleCompanyChange}
            />
          </Form.Group>

          <Form.Group className="mb-5">
            <Form.Control
              type="text"
              name="bs"
              placeholder="Bs"
              value={data.company.bs}
              onChange={handleCompanyChange}
            />
          </Form.Group>

          <button className="btn btn-success">SAVE</button>
        </Form>
      </Container>
    </div>
  );
};

export default NewCustomer;
