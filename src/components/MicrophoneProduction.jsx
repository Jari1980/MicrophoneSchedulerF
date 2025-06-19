import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { Button, Table, Form, FormCheck } from "react-bootstrap";
import axios from "axios";
import { useCookies } from "react-cookie";
import Select from "react-select";

const MicrophoneProduction = () => {
  const [productionData, setProductionData] = useState([]);
  const [microphoneData, setMicrophoneData] = useState([]);
  const [suggestedMicrophones, setSuggestedMicrophones] = useState([]);
  const [showSuggested, setShowSuggested] = useState(false);
  const [microphones, setMicrophones] = useState([]);
  const [cookies, setCookie] = useCookies(["jwtToken", "userName", "userRole"]);
  const [playName, setPlayName] = useState("");
  const [addMicrophone, setAddMicrophone] = useState(false);
  const [scene_characterId, setSceneCharacterId] = useState();
  const [microphoneId, setMicrophoneId] = useState("");
  const [selectedOption, setSelectedOption] = useState(null);
  const handleChoise = (selectedOption) => {
    setSelectedOption(selectedOption);
    setMicrophoneId(selectedOption.microphoneId);
  };

  useEffect(() => {
    fetchData();
    fetchMicrophones();
    if (playName != "") {
      fetchMicrophoneData();
    }
  }, [playName]);

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
      console.log("Error fetching data: " + error);
    }
  };

  const fetchMicrophones = async () => {
    try {
      const response = await axios
        .get("http://localhost:8080/api/v1/microphone/getMicrophones", {
          headers: { Authorization: `Bearer ${cookies.jwtToken}` },
        })
        .then((res) => {
          setMicrophones(res.data);
        });
    } catch (error) {
      console.log("Error fetching microphonedata: " + error);
    }
  };

  const fetchMicrophoneData = async () => {
    try {
      const response = await axios
        .get(
          `http://localhost:8080/api/v1/admin/getCustomMicrophoneList?playName=${playName}`,
          {
            headers: { Authorization: `Bearer ${cookies.jwtToken}` },
          }
        )
        .then((res) => {
          console.log("Data fetched");
          setMicrophoneData(res.data);
        });
    } catch (error) {
      console.log("Error fetching scenedata: " + error);
    }
  };

  const removeMicrophone = async (id) => {
    console.log("id: " + id);
    try {
      const response = await axios
        .put(
          `http://localhost:8080/api/v1/admin/removeMicrophone?scene_characterId=${id}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${cookies.jwtToken}`,
            },
          }
        )
        .then(fetchMicrophoneData);
    } catch (error) {
      console.log("error removing microphone: " + error);
    }
  };

  function handleAddMicrophone(event) {
    event.preventDefault();
    try {
      const response = axios
        .put(
          "http://localhost:8080/api/v1/admin/addMicrophone",
          {
            scene_characterId: scene_characterId,
            microphoneId: microphoneId,
          },
          {
            headers: { Authorization: `Bearer ${cookies.jwtToken}` },
          }
        )
        .then(
          fetchMicrophoneData,
          setSceneCharacterId(""),
          setAddMicrophone(false)
        );
    } catch (error) {
      console.log("eror adding character: " + error);
    }
  }

  const suggestMicrophones = async () => {
    try {
      const response = await axios
        .get(
          `http://localhost:8080/api/v1/admin/suggestMicrophoneSchedule?playName=${playName}`,
          {
            headers: { Authorization: `Bearer ${cookies.jwtToken}` },
          }
        )
        .then((res) => {
          console.log("Data fetched");
          setSuggestedMicrophones(res.data.microphoneList);
          setShowSuggested(!showSuggested);
        });
    } catch (error) {
      console.log("Error suggesting microfones: " + error);
    }
  };

  return (
    <>
      <h1>Manage Microphone in production</h1>
      <br />
      <h2>Select Production to work from</h2>
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
                <Button
                  onClick={() => {
                    setPlayName(item.playName), fetchMicrophoneData;
                  }}
                >
                  Select
                </Button>
              </td>
            </tr>
          </tbody>
        ))}
      </Table>
      {playName != "" ? (
        <h2>{playName}, scenes with assigned characters</h2>
      ) : (
        ""
      )}
      {playName != "" ? (
        <Table striped bordered hover variant="dark">
          <thead>
            <tr>
              <th>Scene</th>
              <th>Character</th>
              <th>User</th>
              <th>Microphone</th>
              <th>Microphone Action</th>
            </tr>
          </thead>

          {microphoneData.map((item, index) => (
            <tbody key={index}>
              <tr>
                <td>{item.sceneName}</td>
                <td>{item.personageName}</td>
                <td>{item.userName}</td>
                <td>{item.microphoneName}</td>
                <td>
                  <Button
                    onClick={() => {
                      setSceneCharacterId(item.scene_characterId),
                        setAddMicrophone(true);
                    }}
                  >
                    Add
                  </Button>
                  {item.microphoneId != null ? (
                    <Button
                      onClick={() => removeMicrophone(item.scene_characterId)}
                    >
                      Remove
                    </Button>
                  ) : (
                    ""
                  )}
                </td>
              </tr>
            </tbody>
          ))}
        </Table>
      ) : (
        ""
      )}
      {addMicrophone ? (
        <Form onSubmit={handleAddMicrophone}>
          <Form.Group className="mb-3">
            <Form.Label>
              <b>Add Microphone</b>
            </Form.Label>
            <Select
              id="search"
              isMulti={false}
              options={microphones}
              getOptionLabel={(options) => options["microphoneName"]}
              getOptionValue={(options) => options["microphoneId"]}
              onChange={handleChoise}
            />
          </Form.Group>
          <Button variant="primary" type="submit" className="extButton">
            Add
          </Button>
          <Button
            variant="danger"
            type="cancel"
            className="extButton"
            onClick={() => setAddMicrophone(false)}
          >
            Cancel
          </Button>
        </Form>
      ) : (
        ""
      )}
      {playName != "" ? (
        <Button onClick={() => suggestMicrophones()}>
          Suggest MicrophoneSchedule
        </Button>
      ) : (
        ""
      )}
      <br />
      <br />
      {showSuggested ? <b>Suggested Schedule</b> : ""}
      {showSuggested ?
      <Table striped bordered hover variant="dark">
          <thead>
            <tr>
              <th>Scene</th>
              <th>Character</th>
              <th>User</th>
              <th>Microphone</th>
            </tr>
          </thead>

          {suggestedMicrophones.map((item, index) => (
            <tbody key={index}>
              <tr>
                <td>{item.sceneName}</td>
                <td>{item.personageName}</td>
                <td>{item.userName}</td>
                <td>{item.microphoneId}</td> {/* this is fictional id from backend */}
              </tr>
            </tbody>
          ))}
        </Table>
       : ""}
       {showSuggested ?
      <Button onClick={() => setShowSuggested(false)}>Hide suggest</Button>
      : "" 
      }
      <br />
      <br />
      <br />
      <br />
    </>
  );
};

export default MicrophoneProduction;
