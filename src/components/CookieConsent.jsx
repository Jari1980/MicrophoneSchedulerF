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
        <div>
            <h3>Cookie Consent</h3>
            <p>In order to run this application we are using cookies.</p>
            <Button onClick={giveCookieConsent}>Accept</Button>
            <Button onClick={() => {location.href = 'https://www.google.com/'}}>Go somewhere else</Button>
        </div>
        </>
    );
};

export default CookieConsent;