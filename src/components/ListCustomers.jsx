import React, { useState, useEffect } from "react";
import { Container, Row, Modal, Form } from "react-bootstrap";
import CardUsers from "./CardUsers";
import axios from "axios";
import Swal from "sweetalert2";

const ListCustomers = () => {
  const url = "http://localhost:3004/users";

  const getData = async () => {
    const response = axios.get(url);
    return response;
  };

  const [list, setUsers] = useState([]);
  const [updateList, setUpdateList] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [dataModal, setDataModal] = useState({
    name: "",
    username: "",
    email: "",
    address: {
      street: "",
      suite: "",
      city: "",
      zipcode: "",
      geo: { lat: "", lng: "" },
    },
    phone: "",
    website: "",
    company: { name: "", catchPhrase: "", bs: "" },
  });
  const handleCloseModal = () => {
    setShowModal(false);
  };
  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleChangeModal = ({ target }) => {
    setDataModal({
      ...dataModal,
      [target.name]: target.value,
    });
  };

  const handleChangeModalAddress = ({ target }) => {
    setDataModal({
      ...dataModal,
      address: {
        ...dataModal.address,
        [target.name]: target.value,
      },
    });
  };

  const handleChangeModalGeoAddress = ({ target }) => {
    setDataModal({
      ...dataModal,
      address: {
        ...dataModal.address,
        geo: {
          ...dataModal.address.geo,
          [target.name]: target.value,
        },
      },
    });
  };

  const handleChangeModalCompany = ({ target }) => {
    setDataModal({
      ...dataModal,
      company: {
        ...dataModal.company,
        [target.name]: target.value,
      },
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await axios.put(`${url}/${dataModal.id}`, dataModal);
    if (response.status === 200) {
      Swal.fire("Saved", "User updated succesfully.", "success");
      handleCloseModal();
      setUpdateList(!updateList);
    } else {
      Swal.fire("Error", "User no updated", "error");
    }
  };

  useEffect(() => {
    getData().then((response) => {
      setUsers(response.data);
    });
  }, [updateList]);

  console.log(dataModal);

  return (
    <Container className="mb-5">
      <Row>
        {!list
          ? "Cargando..."
          : list.map((users, index) => (
              <CardUsers
                key={index}
                users={users}
                setUpdateList={setUpdateList}
                updateList={updateList}
                handleCloseModal={handleCloseModal}
                handleOpenModal={handleOpenModal}
                setDataModal={setDataModal}
              />
            ))}
      </Row>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title> Update </Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                name="name"
                placeholder="Name"
                value={dataModal.name}
                onChange={handleChangeModal}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                name="username"
                placeholder="Username"
                value={dataModal.username}
                onChange={handleChangeModal}
              />
            </Form.Group>

            <Form.Group className="mb-5">
              <Form.Control
                type="email"
                name="email"
                placeholder="Email"
                value={dataModal.email}
                onChange={handleChangeModal}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <div className="text-center">Address</div>
              <Form.Control
                type="text"
                name="street"
                placeholder="Street"
                value={dataModal.address.street}
                onChange={handleChangeModalAddress}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                name="suite"
                placeholder="Suite"
                value={dataModal.address.suite}
                onChange={handleChangeModalAddress}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                name="city"
                placeholder="City"
                value={dataModal.address.city}
                onChange={handleChangeModalAddress}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Control
                type="number"
                name="zipcode"
                placeholder="Zipcode"
                value={dataModal.address.zipcode}
                onChange={handleChangeModalAddress}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                name="lat"
                placeholder="Latitude"
                value={dataModal.address.geo.lat}
                onChange={handleChangeModalGeoAddress}
              />
            </Form.Group>

            <Form.Group className="mb-5">
              <Form.Control
                type="text"
                name="lng"
                placeholder="Longitude"
                value={dataModal.address.geo.lng}
                onChange={handleChangeModalGeoAddress}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Control
                type="number"
                name="phone"
                placeholder="Phone"
                value={dataModal.phone}
                onChange={handleChangeModal}
              />
            </Form.Group>

            <Form.Group className="mb-5">
              <Form.Control
                type="text"
                name="website"
                placeholder="Website"
                value={dataModal.website}
                onChange={handleChangeModal}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <div className="text-center">Company</div>
              <Form.Control
                type="text"
                name="name"
                placeholder="Company Name"
                value={dataModal.company.name}
                onChange={handleChangeModalCompany}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                name="catchPhrase"
                placeholder="Catch Pharse"
                value={dataModal.company.catchPhrase}
                onChange={handleChangeModalCompany}
              />
            </Form.Group>

            <Form.Group className="mb-5">
              <Form.Control
                type="text"
                name="bs"
                placeholder="Bs"
                value={dataModal.company.bs}
                onChange={handleChangeModalCompany}
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <button
              className="btn btn-secondary"
              type="reset"
              onClick={handleCloseModal}
            >
              Close
            </button>
            <button className="btn btn-success" type="submit">
              Save Changes
            </button>
          </Modal.Footer>
        </Form>
      </Modal>
    </Container>
  );
};

export default ListCustomers;
