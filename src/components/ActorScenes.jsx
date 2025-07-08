import { Button, Table, Form, Alert, Row, Col } from "react-bootstrap";
import { useCookies } from "react-cookie";
import { useEffect, useState } from "react";
import axios from "axios";
import { useGlobalContext } from "./context";
import Select from "react-select";
import { useNavigate } from "react-router-dom";

const ActorScenes = () => {
  const { bgColor, setBgColor } = useGlobalContext();
  const { dark, setDark } = useGlobalContext();
  const [productionData, setProductionData] = useState([]);
  const [microphoneSchedule, setMicrophoneSchedule] = useState([]);
  const [cookies, setCookie] = useCookies(["jwtToken", "userName", "userRole"]);
  const [showMicrophoneSchedule, setShowMicrophoneSchedule] = useState(false);
  const [showOther, setShowOther] = useState(false);
  const [users, setUsers] = useState([]);
  const [productionName, setProductionName] = useState("");
  const [userId, setUserId] = useState("");
  const [selectedOption, setSelectedOption] = useState(null);
  const [showOtherSchedule, setShowOtherSchedule] = useState(false);
  const [otherMicrophoneData, setOtherMicrophoneData] = useState([]);
  const navigate = useNavigate();
  const [showComment, setShowComment] = useState(false);
  const [comment, setComment] = useState("");
  const [sceneCharacterId, setSceneCharacterId] = useState();


  const handleChoise = (selectedOption) => {
    setSelectedOption(selectedOption);
    setUserId(selectedOption.userId);
  };

  useEffect(() => {
    fetchData();
    //if(productionName != ""){
    //    fetchActorData(productionName)
    //}
  }, []);

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
      console.log("Error fetching productiondata: " + error);
    }
  };

  function fetchActorData(playName) {
    setProductionName(playName);
    try {
      axios
        .get(
          `http://localhost:8080/api/v1/actor/actorScenes?playName=${playName}`,
          {
            headers: { Authorization: `Bearer ${cookies.jwtToken}` },
          }
        )
        .then((res) => {
          setMicrophoneSchedule(res.data.actorScenes);
          setShowMicrophoneSchedule(true);
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
      console.log("Error fetching actor data: " + error);
    }
  }

  function fetchUsers() {
    try {
      axios
        .get(`http://localhost:8080/api/v1/actor/getUsers`, {
          headers: { Authorization: `Bearer ${cookies.jwtToken}` },
        })
        .then((res) => {
          setUsers(res.data);
          setShowOther(!showOther);
        })
        .catch((error) => {
          if (error.response.status === 401) {
            setCookie("jwtToken", "", { path: "/" });
            setCookie("userName", "", { path: "/" });
            setCookie("userRole", "", { path: "/" });
            navigate("/");
          }
          console.log("error fetching actors: " + error);
        });
    } catch (error) {
      console.log("Error fetching actors: " + error);
    }
  }

  function handleShow(event) {
    event.preventDefault();
    console.log("userId: " + userId + ", production name: " + productionName);
    try {
      axios
        .post(
          "http://localhost:8080/api/v1/actor/otherActorScenes",
          {
            userId: userId,
            playName: productionName,
          },
          {
            headers: {
              //'Content-Type': 'multipart/form-data',
              "Content-Type": "application/json",
              //headers: { Authorization: `Bearer ${cookies.jwtToken}` },
              Authorization: `Bearer ${cookies.jwtToken}`,
            },
          }
        )
        .then((res) => {
          setOtherMicrophoneData(res.data.actorScenes);
          setShowOtherSchedule(true);
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
      console.log("Error fetching actor data: " + error);
    }
  }

  function viewComment(comment, sceneCharacterId) {
    setComment(comment);
    setSceneCharacterId(sceneCharacterId);
    setShowComment(true);
  }

  function handleSubmitComment(event) {
    event.preventDefault();
    const playN = productionName;
    try {
      axios
        .put(
          "http://localhost:8080/api/v1/actor/comment",
          {
            id: sceneCharacterId,
            comment: event.currentTarget.elements.formComment.value,
          },
          {
            headers: {
              Authorization: `Bearer ${cookies.jwtToken}`,
            },
          }
        )
        .then((response) => {
          if (!showOtherSchedule){
            setShowComment(false)
            fetchActorData(productionName)
          }
          if (showOtherSchedule){
            setShowComment(false)
            handleShowEdited()
          }
        })
        .catch((error) => {
          console.log("id: " + sceneCharacterId);
        });
    } catch (error) {
      console.log("Error editing comment: " + error);
    }
  }


  function handleShowEdited() {
    console.log("userId: " + userId + ", production name: " + productionName);
    try {
      axios
        .post(
          "http://localhost:8080/api/v1/actor/otherActorScenes",
          {
            userId: userId,
            playName: productionName,
          },
          {
            headers: {
              //'Content-Type': 'multipart/form-data',
              "Content-Type": "application/json",
              //headers: { Authorization: `Bearer ${cookies.jwtToken}` },
              Authorization: `Bearer ${cookies.jwtToken}`,
            },
          }
        )
        .then((res) => {
          setOtherMicrophoneData(res.data.actorScenes);
          if(showOther){
            setShowOtherSchedule(true);
          }
          
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
      console.log("Error fetching actor data: " + error);
    }
  }

  return (
    <>
      <div
        style={{
          backgroundImage: bgColor,
          width: "100vw",
          height: "100%",
          overflow: "hidden",
          paddingBottom: "120px"
        }}
      >
        <div
          style={{
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
          }}
        >
          <br />
          <h1>Microphone Schedule</h1>
          <br />
          <br />
          <h3>Productions</h3>
          <Table striped bordered hover variant={dark}>
            <thead>
              <tr>
                <th>Theater Production</th>
                <th>Premiere Date</th>
                <th>Description</th>
                <th></th>
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
                      style={{ width: "70px", marginRight: "10px" }}
                      onClick={() => fetchActorData(item.playName)}
                    >
                      Select
                    </Button>
                  </td>
                </tr>
              </tbody>
            ))}
          </Table>
          {showMicrophoneSchedule ? (
            <Table striped bordered hover variant={dark}>
              <thead>
                <tr>
                  <th>Scene</th>
                  <th>Character</th>
                  <th>Microphone</th>
                  <th></th>
                </tr>
              </thead>

              {microphoneSchedule.map((item) => (
                <tbody key={item.sceneId}>
                  <tr>
                    <td>{item.sceneName}</td>
                    <td>{item.personageName}</td>
                    <td>{item.microphoneName}</td>
                    <td>
                        {item.comment != null && item.comment != "" ?
                        <Button
                        variant="success"
                        onClick={() =>
                          {setSceneCharacterId(item.sceneCharacterId), setUserId(item.userId), viewComment(item.comment, item.sceneCharacterId)}
                        }
                      >
                        Comment
                      </Button>
                        :
                        <Button
                        onClick={() =>
                          {setSceneCharacterId(item.sceneCharacterId), setUserId(item.userId), viewComment(item.comment, item.sceneCharacterId)}
                        }
                      >
                        Comment
                      </Button>
                    }
                      
                    </td>
                  </tr>
                </tbody>
              ))}
            </Table>
          ) : (
            ""
          )}
          {showComment ? <i>Comments are visible for you, admins and directors</i> : ""}
          {showComment ? (
            <Form onSubmit={handleSubmitComment}>
              <Form.Group className="mb-3" controlId="formComment">
                <Form.Label>
                  <b>Comment</b>
                </Form.Label>
                <Form.Control
                  type="text"
                  as="textarea"
                  rows={3}
                  defaultValue={comment}
                />
              </Form.Group>
              <Button variant="primary" type="submit" className="extButton">
                Save
              </Button>
              <Button variant="danger" className="extButton" onClick={() => setShowComment(false)}>
                Hide
              </Button>
            </Form>
          ) : (
            ""
          )}
          <br />
          {showMicrophoneSchedule ? (
            <Button
              style={{ width: "220px" }}
              onClick={() => {
                setShowOther(false),
                  setShowMicrophoneSchedule(!showMicrophoneSchedule),
                  setShowOtherSchedule(false),
                  setShowComment(false);
              }}
            >
              Hide MicrophoneSchedule
            </Button>
          ) : (
            ""
          )}
          <br />
          <br />
          {showMicrophoneSchedule && !showOther ? (
            <Button style={{ width: "220px" }} onClick={() => {setShowComment(false), fetchUsers()}}>
              Other Actors Schedule
            </Button>
          ) : (
            ""
          )}
          <br />
          <br />
          <br />
          {showOther ? (
            <Form onSubmit={handleShow}>
              <Form.Group
                style={{ marginLeft: "25%" }}
                className="mb-3 w-50 align-items-center justify-content-center"
                as={Row}
              >
                <Form.Label column sm={2}>
                  <b>Actor</b>
                </Form.Label>
                <Col sm={10}>
                  <Select
                    id="search"
                    isMulti={false}
                    options={users}
                    getOptionLabel={(options) => options["userName"]}
                    getOptionValue={(options) => options["userId"]}
                    onChange={handleChoise}
                  />
                </Col>
              </Form.Group>
              <Button
                style={{ width: "140px", marginRight: "10px" }}
                variant="primary"
                type="submit"
                className="extButton"
              >
                Show Schedule
              </Button>
              <Button
                style={{ width: "140px" }}
                variant="danger"
                type="cancel"
                className="extButton"
                onClick={() => {
                  setShowOtherSchedule(false), setShowOther(false);
                }}
              >
                Hide
              </Button>
            </Form>
          ) : (
            ""
          )}
          <br />
          <br />
          {showOtherSchedule && cookies.userRole == "ROLE_ACTOR" ? (
            <Table striped bordered hover variant={dark}>
              <thead>
                <tr>
                  <th>Scene</th>
                  <th>Character</th>
                  <th>Microphone</th>
                </tr>
              </thead>

              {otherMicrophoneData.map((item) => (
                <tbody key={item.sceneId}>
                  <tr>
                    <td>{item.sceneName}</td>
                    <td>{item.personageName}</td>
                    <td>{item.microphoneName}</td>
                  </tr>
                </tbody>
              ))}
            </Table>
          ) : (
            ""
          )}
          {showOtherSchedule && (cookies.userRole == "ROLE_DIRECTOR" || cookies.userRole == "ROLE_ADMINISTRATOR") ? (
            <Table striped bordered hover variant={dark}>
              <thead>
                <tr>
                  <th>Scene</th>
                  <th>Character</th>
                  <th>Microphone</th>
                  <th>Comment</th>
                </tr>
              </thead>

              {otherMicrophoneData.map((item) => (
                <tbody key={item.sceneId}>
                  <tr>
                    <td>{item.sceneName}</td>
                    <td>{item.personageName}</td>
                    <td>{item.microphoneName}</td>
                    <td>
                        {item.comment !== null && item.comment !== "" ?
                        <Button
                        variant="success"
                        onClick={() =>
                          viewComment(item.comment, item.sceneCharacterId)
                        }
                      >
                        Comment
                      </Button>
                        :
                        <Button
                        onClick={() =>
                          viewComment(item.comment, item.sceneCharacterId)
                        }
                      >
                        Comment
                      </Button>
                    }
                    </td>
                  </tr>
                </tbody>
              ))}
            </Table>
          ) : (
            ""
          )}
        </div>
      </div>
    </>
  );
};

export default ActorScenes;
