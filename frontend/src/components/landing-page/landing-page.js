import React from "react";
import { Row, Col } from "react-bootstrap";
import logo from "../../shared/assets/icons/logo.svg";
import ButtonLink from "../../shared/components/button-link/index";

const LandingPage = () => {
  return (
    <>
      <div className="container justify-content-center text-center">
        <div className="mb-5">
          <img
            src={logo}
            alt="logo"
            style={{
              marginBottom: "40px",
              width: "90%",
            }}
          />
        </div>
        <Row>
          <Col className="mt-3">
            <ButtonLink name="Login" link="/login" />
          </Col>
        </Row>
        <Row>
          <Col>
            <ButtonLink name="Register" link="/register" />
          </Col>
        </Row>
      </div>
    </>
  );
};

export default LandingPage;
//                                       <a href="mailto:mailadress@gmail.com"
// a href={"mailto:" + this.props.email}>email</a>
