import React from "react";
import { Button, Table, Form } from "react-bootstrap";
import { useCookies } from "react-cookie";
import { useEffect, useState } from "react";
import axios from "axios";

const ManageProductionHome = () => {
  const [cookies, setCookie] = useCookies(["jwtToken", "userName", "userRole"]);
  const [productionData, setProductionData] = useState([]);
  const [formVisible, setFormVisible] = useState(false);
  const [formEditVisible, setFormEditVisible] = useState(false);
  const [editName, setEditName] = useState("");
  const [editDate, setEditDate] = useState("");
  const [editDescription, setEditDescription] = useState("");

  useEffect(() => {
    fetchData();
  }, [formVisible]);

  const fetchData = async () => {
    try {
      const response = await axios
        .get("http://localhost:8080/api/v1/admin/listAllPlay", {
          headers: { Authorization: `Bearer ${cookies.jwtToken}` },
        })
        .then((res) => {
          setProductionData(res.data);
          console.log(res.data);
        });
    } catch (error) {
      console.log("Error fetching userdata: " + error);
    }
  };

  function showForm() {
    setFormVisible(!formVisible);
  }

  function handleSubmitNewProduction(event) {
    event.preventDefault();
    try {
      axios
        .post(
          "http://localhost:8080/api/v1/admin/createPlay",
          {
            playName: event.currentTarget.elements.formPlayName.value,
            dateCreated: event.currentTarget.elements.dateCreated.value,
            description: event.currentTarget.elements.description.value,
          },
          {
            headers: { Authorization: `Bearer ${cookies.jwtToken}` },
          }
        )
        .then((response) => {
          console.log("Play created");
          setFormVisible(!formVisible);
        });
    } catch (error) {
      console.log("Error creating play: " + error);
    }
  }

  function handleEditSubmitNewProduction(event) {
     event.preventDefault();
    try {
      axios
        .put(
          "http://localhost:8080/api/v1/admin/updatePlay",
          {
            playName: event.currentTarget.elements.formEditPlayName.value,
            dateCreated: event.currentTarget.elements.dateEditCreated.value,
            description: event.currentTarget.elements.editDescription.value,
          },
          {
            headers: { Authorization: `Bearer ${cookies.jwtToken}` },
          }
        )
        .then((response) => {
          console.log("Play edited");
          setFormEditVisible(!formEditVisible);
        });
    } catch (error) {
      console.log("Error editing play: " + error);
    }
  }

  function editProduction(name, date, description) {
    setEditName(name)
    setEditDate(date)
    setEditDescription(description)
    setFormEditVisible(true)
  }

  function deleteProduction(playName) {
    try {
      const response = axios
        .delete(
          `http://localhost:8080/api/v1/admin/deletePlay?playName=${playName}`,
          {
            headers: { Authorization: `Bearer ${cookies.jwtToken}` },
          }
        )
        .then(fetchData, console.log("mmmm"));
    } catch (error) {
      console.log("error deleting: " + error);
    }
  }

  return (
    <div>
      <h1>Manage Theater Productions</h1>
      <br />
      <h2>Theatre plays in database</h2>
      <br />
      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>Theater Production</th>
            <th>Date Created</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>

        {productionData.map((item) => (
          <tbody key={item.playName}>
            <tr>
              <td>{item.playName}</td>
              <td>{item.dateCreated}</td>
              <td>{item.description}</td>
              <td>
                { cookies.userRole == "ROLE_ADMINISTRATOR" ? 
                <Button onClick={() => editProduction(item.playName, item.dateCreated, item.description)}>
                  Edit
                </Button>
                : ""}
                { cookies.userRole == "ROLE_ADMINISTRATOR" ? 
                <Button onClick={() => deleteProduction(item.playName)}>
                  Delete
                </Button>
                : ""}
              </td>
            </tr>
          </tbody>
        ))}
      </Table>
      {formEditVisible ? (
        <Form onSubmit={handleEditSubmitNewProduction}>
          <Form.Group className="mb-3" controlId="formEditPlayName">
            <Form.Label>
              <b>Production Name</b>
            </Form.Label>
            <Form.Control type="text" defaultValue={editName} disabled/>
          </Form.Group>
          <Form.Group className="mb-3" controlId="dateEditCreated">
            <Form.Label>
              <b>Date Created</b>
            </Form.Label>
            <Form.Control type="date" defaultValue={editDate} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="editDescription">
            <Form.Label>
              <b>Description</b>
            </Form.Label>
            <Form.Control type="text" placeholder={editDescription} />
          </Form.Group>
          <Button variant="primary" type="submit" className="extButton">
            Save Production
          </Button>
          <Button variant="danger" onClick={() => setFormEditVisible(false)} className="extButton">
                              Cancel edit
                          </Button>
        </Form>
      ) : (
        ""
      )}
      { cookies.userRole == "ROLE_ADMINISTRATOR" ?
      <p>Select a play or create a new</p>
      : ""}
      { cookies.userRole == "ROLE_ADMINISTRATOR" ?
      <Button onClick={() => showForm()}>+ New Production</Button>
      : ""}
      {formVisible ? (
        <Form onSubmit={handleSubmitNewProduction}>
          <Form.Group className="mb-3" controlId="formPlayName">
            <Form.Label>
              <b>Production Name</b>
            </Form.Label>
            <Form.Control type="text" placeholder="Enter production name" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="dateCreated">
            <Form.Label>
              <b>Date Created</b>
            </Form.Label>
            <Form.Control type="date" placeholder="Enter date" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="description">
            <Form.Label>
              <b>Description</b>
            </Form.Label>
            <Form.Control type="text" placeholder="Describe production" />
          </Form.Group>
          <Button variant="primary" type="submit" className="extButton">
            Add Production
          </Button>
        </Form>
      ) : (
        ""
      )}
    </div>
  );
};

export default ManageProductionHome;
