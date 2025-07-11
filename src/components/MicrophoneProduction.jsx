import React, { useState, useEffect, Fragment } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { Button, Table, Form, FormCheck } from "react-bootstrap";
import axios from "axios";
import { useCookies } from "react-cookie";
import Select from "react-select";
import { useGlobalContext } from "./context";
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";
//import ReactPDF from '@react-pdf/renderer';
import { PDFViewer } from "@react-pdf/renderer";

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
  const { dark, setDark } = useGlobalContext();
  const [showPDF, setShowPDF] = useState(false);
  const navigate = useNavigate();

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

  // For pdf
  const styles = StyleSheet.create({
    heading: {
      padding: "40px",
      textAlign: "center",
      color: "black",
      fontWeight: "1000",
      fontSize: "26"
    },
    table: {
      width: "100%",
    },
    row: {
      display: "flex",
      flexDirection: "row",
      borderTop: "1px solid #EEE",
      paddingTop: 8,
      paddingBottom: 8,
    },
    header: {
      borderTop: "none",
    },
    bold: {
      fontWeight: "bold",
    },
    col1: {
      width: "25%",
    },
    col2: {
      width: "25%",
    },
    col3: {
      width: "25%",
    },
    col4: {
      width: "25%",
    },
  });

  const fetchData = async () => {
    try {
      const response = await axios
        .get("http://localhost:8080/api/v1/admin/listAllPlay", {
          headers: { Authorization: `Bearer ${cookies.jwtToken}` },
        })
        .then((res) => {
          setProductionData(res.data);
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
        })
        .catch((error) => {
          if (error.response.status === 401) {
            setCookie("jwtToken", "", { path: "/" });
            setCookie("userName", "", { path: "/" });
            setCookie("userRole", "", { path: "/" });
            navigate("/");
          }
          console.log("error fetching microphonedata: " + error);
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
      console.log("Error fetching data: " + error);
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
        .then(fetchMicrophoneData)
        .catch((error) => {
          if (error.response.status === 401) {
            setCookie("jwtToken", "", { path: "/" });
            setCookie("userName", "", { path: "/" });
            setCookie("userRole", "", { path: "/" });
            navigate("/");
          }
          console.log("error removing microphone: " + error);
        });
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
        )
        .catch((error) => {
          if (error.response.status === 401) {
            setCookie("jwtToken", "", { path: "/" });
            setCookie("userName", "", { path: "/" });
            setCookie("userRole", "", { path: "/" });
            navigate("/");
          }
          console.log("error adding character: " + error);
        });
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

  function addSuggested(){
    try {
      const response = axios
        .put(
          "http://localhost:8080/api/v1/admin/addSuggestedMicrophones",
          {
            microphoneList: suggestedMicrophones,
          },
          {
            headers: { Authorization: `Bearer ${cookies.jwtToken}` },
          }
        )
        .then(
          fetchMicrophoneData,
          setSceneCharacterId(""),
          setAddMicrophone(false),
          setShowSuggested(false)
        )
        .catch((error) => {
          if (error.response.status === 495){
            alert("Not enough microphones in database, please add more in order to assign these.")
          }
          if (error.response.status === 401) {
            setCookie("jwtToken", "", { path: "/" });
            setCookie("userName", "", { path: "/" });
            setCookie("userRole", "", { path: "/" });
            navigate("/");
          }
          console.log("error adding character: " + error);
        });
    } catch (error) {
      console.log("eror adding character: " + error);
    }
  }

  return (
    <>
      <h1>Manage Microphone in production</h1>
      <br />
      <h2>Select Production</h2>
      <Table striped bordered hover variant={dark} size="sm">
        <thead>
          <tr>
            <th>Theater Production</th>
            <th>Premiere Date</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>

        {productionData.map((item) => (
          <tbody key={item.playName}>
            <tr>
              <td>{item.playName}</td>
              <td>{item.premiereDate}</td>
              <td>{item.description}</td>
              <td>
                <Button
                size="sm"
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
        <Table striped bordered hover variant={dark} size="sm">
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
                  size="sm"
                    style={{ width: "80px", marginRight: "10px" }}
                    onClick={() => {
                      setSceneCharacterId(item.scene_characterId),
                        setAddMicrophone(true);
                    }}
                  >
                    Add
                  </Button>
                  {item.microphoneId != null ? (
                    <Button
                    size="sm"
                      style={{ width: "80px" }}
                      variant="danger"
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
          <Button
            style={{ width: "70px", marginRight: "10px" }}
            variant="primary"
            type="submit"
            className="extButton"
          >
            Add
          </Button>
          <Button
            style={{ width: "70px" }}
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
      <br />
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
      {showSuggested ? (
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
                <td>{item.microphoneId}</td>
              </tr>
            </tbody>
          ))}
        </Table>
      ) : (
        ""
      )}
      {showSuggested ? (
        <Button style={{marginRight:"20px"}} onClick={() => addSuggested()}>Add suggested</Button>
      ) : (
        ""
      )}
      {showSuggested ? (
        <Button onClick={() => setShowSuggested(false)}>Hide suggested</Button>
      ) : (
        ""
      )}
      <br />
      <br />
      {!showPDF && playName != "" ? (
        <Button onClick={() => setShowPDF(true)}>Load PDF</Button>
      ) : (
        ""
      )}
      {showPDF && playName != "" ? (
        <Button onClick={() => setShowPDF(false)}>Hide PDF</Button>
      ) : (
        ""
      )}
      <br />
      <br />
      {showPDF && playName != "" ? (
        <PDFViewer style={{ width: "100%", height: "30%" }}>
          <Document>
            <Page size="A4" style={styles.page}>
              <Text style={styles.heading}>{playName}</Text>
              <View style={styles.table}>
                <View style={[styles.row, styles.bold, styles.header]}>
                  <Text style={styles.col1}>Scene</Text>
                  <Text style={styles.col2}>Character</Text>
                  <Text style={styles.col3}>User</Text>
                  <Text style={styles.col4}>Microphone</Text>
                </View>
                {microphoneData.map((row, i) => (
                  <View key={i} style={styles.row} wrap={false}>
                    <Text style={styles.col1}>{row.sceneName}</Text>
                    <Text style={styles.col2}>{row.personageName}</Text>
                    <Text style={styles.col3}>{row.userName}</Text>
                    <Text style={styles.col4}>{row.microphoneName}</Text>
                  </View>
                ))}
              </View>
            </Page>
          </Document>
        </PDFViewer>
      ) : (
        ""
      )}

      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
    </>
  );
};

export default MicrophoneProduction;
