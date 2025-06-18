import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { Button, Table, Form, FormCheck } from "react-bootstrap";
import axios from "axios";
import { useCookies } from "react-cookie";

const Microphone = () => {
  const [microphoneData, setMicrophoneData] = useState([]);
  const [cookies, setCookie] = useCookies(["jwtToken", "userName", "userRole"]);
  const [addMicrophone, setAddMicrophone] = useState(false);
  const [showRenameMicrophone, setShowRenameMicrophone] = useState(false);
  const [microphoneId, setMicrophoneId] = useState("");
  const [microphoneName, setMicrophoneName] = useState("");

  useEffect(() => {
    fetchMicrophones();
  }, []);

  const fetchMicrophones = async () => {
    try {
      const response = await axios
        .get("http://localhost:8080/api/v1/microphone/getMicrophones", {
          headers: { Authorization: `Bearer ${cookies.jwtToken}` },
        })
        .then((res) => {
          setMicrophoneData(res.data);
          console.log(res.data);
        });
    } catch (error) {
      console.log("Error fetching microphonedata: " + error);
    }
  };

  function handleAddMicrophone(event) {
    event.preventDefault();
    try {
      axios
        .post(
          "http://localhost:8080/api/v1/microphone/createMicrophone",
          {
            microphoneName: event.currentTarget.elements.formMicrophone.value,
          },
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${cookies.jwtToken}`,
            },
          }
        )
        .then(() => {
          setAddMicrophone(!addMicrophone);
          fetchMicrophones();
        });
    } catch (error) {
      console.log("Error creating microphone: " + error);
    }
  }

  function deleteMicrophone(microphoneName) {
    try {
      const response = axios
        .delete(
          `http://localhost:8080/api/v1/microphone/deleteMicrophone?microphoneName=${microphoneName}`,
          {
            headers: { Authorization: `Bearer ${cookies.jwtToken}` },
          }
        )
        .then(fetchMicrophones);
    } catch (error) {
      console.log("error deleting microphone: " + error);
    }
  }

  function renameMicrophone(event) {
    event.preventDefault();
    try {
      axios
        .put(
          "http://localhost:8080/api/v1/microphone/updateMicrophone",
          {
            microphoneId: microphoneId,
            microphoneName: event.currentTarget.elements.formMicrophoneName.value,
          },
          {
            headers: {
              //"Content-Type": "multipart/form-data",
              Authorization: `Bearer ${cookies.jwtToken}`,
            },
          }
        )
        .then(() => {
          setShowRenameMicrophone(!showRenameMicrophone);
          fetchMicrophones();
        });
    } catch (error) {
      console.log("Error creating microphone: " + error);
    }
  }

  return (
    <>
      <h1>Microphones</h1>
      <br />
      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Actions</th>
          </tr>
        </thead>

        {microphoneData.map((item) => (
          <tbody key={item.microphoneId}>
            <tr>
              <td>{item.microphoneId}</td>
              <td>{item.microphoneName}</td>
              <td>
                <Button
                  onClick={() => {
                    setMicrophoneId(item.microphoneId),
                      setMicrophoneName(
                        item.microphoneName,
                        setShowRenameMicrophone(true)
                      );
                  }}
                >
                  Rename
                </Button>
                <Button onClick={() => deleteMicrophone(item.microphoneName)}>
                  Delete
                </Button>
              </td>
            </tr>
          </tbody>
        ))}
      </Table>
      <Button onClick={() => setAddMicrophone(!addMicrophone)}>
        + Microphone
      </Button>
      {addMicrophone ? (
        <Form onSubmit={handleAddMicrophone}>
          <Form.Group className="mb-3" controlId="formMicrophone">
            <Form.Label>
              <b>Add Microphone</b>
            </Form.Label>
            <Form.Control type="text" placeholder="Enter username" />
          </Form.Group>
          <Button variant="primary" className="extButton" type="submit">
            Create
          </Button>
          <Button
            variant="danger"
            type="cancel"
            className="extButton"
            onClick={() => setAddMicrophone(!addMicrophone)}
          >
            Cancel
          </Button>
        </Form>
      ) : (
        ""
      )}
      {showRenameMicrophone ? (
        <Form onSubmit={renameMicrophone}>
          <Form.Group className="mb-3" controlId="formMicrophoneName">
            <Form.Label>
              <b>Add Microphone</b>
            </Form.Label>
            <Form.Control type="text" placeholder={microphoneName} />
          </Form.Group>
          <Button variant="primary" className="extButton" type="submit">
            Rename
          </Button>
          <Button
            variant="danger"
            type="cancel"
            className="extButton"
            onClick={() => setShowRenameMicrophone(!showRenameMicrophone)}
          >
            Cancel
          </Button>
        </Form>
      ) : (
        ""
      )}
    </>
  );
};

export default Microphone;
