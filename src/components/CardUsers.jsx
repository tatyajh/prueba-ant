import axios from "axios";
import React from "react";
import { Card, ListGroup, ListGroupItem } from "react-bootstrap";
import Swal from "sweetalert2";
import './styles/styles.css';

const CardUsers = ({ users, setUpdateList, updateList, handleCloseModal, handleOpenModal, setDataModal }) => {

  const url = "http://localhost:3004/users";

  const handleDelete = async () => {
    console.log ('Eliminando')

    Swal.fire({
        title: `Do you want to delete ${users.name} register ?`,
        text: "You can not turn back",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        cancelButtonText: 'Cancel',
        confirmButtonText: 'Delete anyway!'
      }).then((result) => {
        if (result.isConfirmed) {
            
           
            axios.delete(`${url}/${users.id}`).then((response) => {
             console.log(response)
              if (response.data === "User registered succesfully.") {                   Swal.fire(
                        'Deleted!',
                        `${users.name} register deleted!`,
                        'success'
                    )
                    setUpdateList(!updateList)
                }else {
                    Swal.fire(
                        'Error!',
                        'We are in trouble',
                        'error'
                    )
                }
            })
        }
      })
}

const handleEdit = () => {
    handleOpenModal();
    setDataModal(users)
}

 
  return (
    <div className="col-4 mb-3">
      <Card>
        <Card.Title className="text-center">
          <strong>{users.name}</strong>
        </Card.Title>
        <Card.Body>
          <ListGroup className="mb-3">
            <ListGroupItem>
              <strong>E-MAIL: </strong>
              {users.email}
            </ListGroupItem>
            <ListGroupItem>
              <strong>CITY: </strong>
              {users.address.city}
            </ListGroupItem>
            <ListGroupItem>
              <strong>COMPANY: </strong>
              {users.company.name}
            </ListGroupItem>
          </ListGroup>
          <button className="btn btn-danger me-2" onClick={handleDelete}>DELETE</button>
          <button className="btn btn-primary me-2"  onClick={handleEdit}>EDIT</button>
        </Card.Body>
      </Card>
    </div>
  );
};

export default CardUsers;
