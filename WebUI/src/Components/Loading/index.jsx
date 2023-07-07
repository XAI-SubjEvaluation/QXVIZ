import * as React from "react";
import Spinner from "react-bootstrap/Spinner";
import { Container, Row, Col, Button } from "react-bootstrap";
import "./index.scss";

const Loading = () => {
  return (
    <Row className="loadingContainer justify-content-md-center">
      <Col md={1}>
        
        <Spinner animation="border" role="status">
        </Spinner>
       
        
        
      </Col>
    </Row>
  );
}

export default Loading
