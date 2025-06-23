import React from 'react';
import { useCookies } from 'react-cookie';
import { Button } from 'react-bootstrap';

const CookieConsent = () => {
    const [cookies, setCookie] = useCookies(["cookieConsent"])
    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + 30);
    const giveCookieConsent = () => {
        setCookie("cookieConsent", true, {path: "/", expires: expirationDate})
    }

    return (
        <>
        <div style={{background: "yellow", padding: "20px", position: "fixed", width:"100%", textAlign: "center"}}>
            <h3>Cookie Consent</h3>
            <p>In order to run this application we are using cookies. This cookie consent is set to expire 30 days after acceptance whereafter it needs to be confirmed again.</p>
            <p>Other cookies we use are session based and these are stored until either browser or computer is closed, here we save user name, role and a encrypted Jwt token.</p>
            <Button style={{marginRight: "50px"}} onClick={giveCookieConsent}>Accept</Button>
            <Button variant='danger' onClick={() => {location.href = 'https://www.google.com/'}}>Go somewhere else</Button>
        </div>
        </>
    );
};

export default CookieConsent;