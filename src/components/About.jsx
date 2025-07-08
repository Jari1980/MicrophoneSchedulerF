import React from "react";
import { useGlobalContext } from "../components/context";

const About = () => {
  const { bgColor, setBgColor } = useGlobalContext();

  return (
    <>
      <div
        style={{
          backgroundImage: bgColor,
          width: "100vw",
          height: "100%",
          overflow: "hidden",
          textAlign: "center",
          paddingBottom: "120px"
        }}
      >
        <br />
        <h1>About</h1>
        <br />
        <br />
        <p style={{textAlign: "left", paddingRight: "10%", paddingLeft: "10%"}}>
          This application is created for Teaterstickorna in Jönköping by
          students from Lexicon Växjö. The main goal of this application is to
          provide a easy to use microphone scheduler.
        </p>
        <p style={{textAlign: "left", paddingRight: "10%", paddingLeft: "10%"}}>
          Users can have any of three roles, <i>Admin</i> create and manage
          theater productions, users and roles. <i>Director</i> overview of
          productions and ability to make modifications. <i>Actor</i> get
          microphoneschedule for production, ability to comment any scene which
          can be seen by director and admin, also ability to check fellow actors
          schedules.
        </p>
        <p style={{textAlign: "left", paddingRight: "10%", paddingLeft: "10%"}}>
          Frontend is created with React JS as a single page application, SPA.
          Backend with Java Spring connected to MysSQL database.
        </p>
      </div>
    </>
  );
};

export default About;
