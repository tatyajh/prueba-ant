import React from "react";
import { Card, ListGroup, ListGroupItem } from "react-bootstrap";

const CardUsers = ({ users }) => {
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
          <button className="btn btn-danger me-2">DELETE</button>
          <button className="btn btn-primary me-2">EDIT</button>
        </Card.Body>
      </Card>
    </div>
  );
};

export default CardUsers;
