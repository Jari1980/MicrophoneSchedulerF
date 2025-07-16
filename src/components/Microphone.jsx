import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { Button, Table, Form, FormCheck } from "react-bootstrap";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useGlobalContext } from "./context";

const Microphone = () => {
  const [microphoneData, setMicrophoneData] = useState([]);
  const [cookies, setCookie] = useCookies(["jwtToken", "userName", "userRole"]);
  const [addMicrophone, setAddMicrophone] = useState(false);
  const [showRenameMicrophone, setShowRenameMicrophone] = useState(false);
  const [microphoneId, setMicrophoneId] = useState("");
  const [microphoneName, setMicrophoneName] = useState("");
  const {dark, setDark} = useGlobalContext();
  const navigate = useNavigate();

  //Translations
  const {microphonesTranslation, setMicrophonesTranslation} = useGlobalContext();
  const {nameTranslation, setNameTranslation} = useGlobalContext();
  const {renameTranslation, setRenameTranslation} = useGlobalContext();
  const { actions, setActions } = useGlobalContext();
  const { deleteTranslation, setDeleteTranslation } = useGlobalContext();
  const { microphone, setMicrophone } = useGlobalContext();
  const { save, setSave } = useGlobalContext();
  const {cancelTranslation, setCancelTranslation} = useGlobalContext();
  const {enterMicrophoneName, setEnterMicrophoneName} = useGlobalContext();

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
        })
        .catch((error) => {
          if (error.response.status === 401) {
            setCookie("jwtToken", "", { path: "/" });
            setCookie("userName", "", { path: "/" });
            setCookie("userRole", "", { path: "/" });
            navigate("/");
          }
          console.log("error fetching data: " + error);
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
        })
        .catch((error) => {
          if (error.response.status === 401) {
            setCookie("jwtToken", "", { path: "/" });
            setCookie("userName", "", { path: "/" });
            setCookie("userRole", "", { path: "/" });
            navigate("/");
          }
          console.log("error creating microphone: " + error);
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
        .then(fetchMicrophones)
        .catch((error) => {
          if (error.response.status === 401) {
            setCookie("jwtToken", "", { path: "/" });
            setCookie("userName", "", { path: "/" });
            setCookie("userRole", "", { path: "/" });
            navigate("/");
          }
          console.log("error deleting microphone: " + error);
        });
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
        })
        .catch((error) => {
          if (error.response.status === 401) {
            setCookie("jwtToken", "", { path: "/" });
            setCookie("userName", "", { path: "/" });
            setCookie("userRole", "", { path: "/" });
            navigate("/");
          }
          console.log("error renaming microphone: " + error);
        });
    } catch (error) {
      console.log("Error renaming microphone: " + error);
    }
  }

  return (
    <>
      <h1>{microphonesTranslation}</h1>
      <br />
      <Table striped bordered hover variant={dark} size="sm">
        <thead>
          <tr>
            <th>Id</th>
            <th>{nameTranslation}</th>
            <th>{actions}</th>
          </tr>
        </thead>

        {microphoneData.map((item) => (
          <tbody key={item.microphoneId}>
            <tr>
              <td>{item.microphoneId}</td>
              <td>{item.microphoneName}</td>
              <td>
                <Button
                size="sm"
                style={{width: "80px", marginRight: "10px"}}
                  onClick={() => {
                    setMicrophoneId(item.microphoneId),
                      setMicrophoneName(
                        item.microphoneName,
                        setShowRenameMicrophone(true)
                      );
                  }}
                >
                  {renameTranslation}
                </Button>
                <Button
                size="sm"
                style={{width: "80px"}}
                variant="danger" 
                onClick={() => deleteMicrophone(item.microphoneName)}>
                  {deleteTranslation}
                </Button>
              </td>
            </tr>
          </tbody>
        ))}
      </Table>
      <Button onClick={() => setAddMicrophone(!addMicrophone)}>
        + {microphone}
      </Button>
      {addMicrophone ? (
        <Form onSubmit={handleAddMicrophone}>
          <Form.Group className="mb-3" controlId="formMicrophone">
            <Form.Label>
              <b>{addMicrophone}</b>
            </Form.Label>
            <Form.Control type="text" placeholder={enterMicrophoneName} />
          </Form.Group>
          <Button
          style={{width: "70px", marginRight: "10px"}} 
          variant="primary" className="extButton" type="submit">
            {save}
          </Button>
          <Button
          style={{width: "70px"}}
            variant="danger"
            type="cancel"
            className="extButton"
            onClick={() => setAddMicrophone(!addMicrophone)}
          >
            {cancelTranslation}
          </Button>
        </Form>
      ) : (
        ""
      )}
      {showRenameMicrophone ? (
        <Form onSubmit={renameMicrophone}>
          <Form.Group className="mb-3" controlId="formMicrophoneName">
            <Form.Label>
              <br />
            </Form.Label>
            <Form.Control type="text" placeholder={microphoneName} />
          </Form.Group>
          <Button variant="primary" className="extButton" type="submit">
            {renameTranslation}
          </Button>
          <Button
            variant="danger"
            type="cancel"
            className="extButton"
            onClick={() => setShowRenameMicrophone(!showRenameMicrophone)}
          >
            {cancelTranslation}
          </Button>
        </Form>
      ) : (
        ""
      )}
    </>
  );
};

export default Microphone;
