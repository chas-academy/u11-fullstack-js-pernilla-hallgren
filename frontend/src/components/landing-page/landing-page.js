import React from "react";
import { Row, Col } from "react-bootstrap";

import ButtonLink from "../../shared/components/button-link/index";

const LandingPage = () => {
  return (
    <>
      <div className="container justify-content-center">
        <div>
          <h1 className="header-one mb-5">LOGO</h1>
        </div>
        <Row>
          <Col>
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
