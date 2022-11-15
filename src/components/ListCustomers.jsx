import React, { useState, useEffect } from "react";
import { Container, Row } from "react-bootstrap";
import CardUsers from "./CardUsers";

const ListCustomers = () => {
  const url = "http://localhost:3004/users";
  const [list, setUsers] = useState();
  const fetchApi = async () => {
    const response = await fetch(url);
    console.log(response.status);
    const responseJSON = await response.json();
    setUsers(responseJSON);
  };
  useEffect(() => {
    fetchApi();
  }, []);

  return (
    <Container className = "mb-5">
       <Row>
        {!list
          ? "Cargando..."
          : list.map((users, index) => (
                <CardUsers
                    key={index}
                    users= {users}
                />
            ))}
      </Row>
    </Container>
  );
};

export default ListCustomers;
