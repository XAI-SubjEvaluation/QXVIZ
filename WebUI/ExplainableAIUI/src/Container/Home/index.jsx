import React, { Component } from "react";
import { Stack, Row, Col, Button, Image, Modal,Container } from "react-bootstrap";
import NavBar from "@components/NavBar";
import backgroundHomePage from "@images/background-home-page.png";
import deepFakeComparision from "@images/deepFakeComparision.png";
import deepfakesProcess from "@images/deepfakesProcess.png";
import SignUp from "@components/SignUp";
import SignIn from "@components/SignIn";

import "./index.scss";

export default class HomePage extends Component {
  constructor(props) {
    super(props);
    this.aboutUs = React.createRef();
    this.deepFake = React.createRef();
    this.meetUs = React.createRef();
    this.home = React.createRef();
    this.state = {
      modalVisible: false,
    };
  }

  clickedReady = (e) => {
    e.preventDefault();
    if (!!localStorage.getItem("PersonID")) {
      window.history.pushState({}, undefined, "/survey");
      window.location.reload();
    } else {
      this.setState({ modalVisible: true });
    }
  };

  render() {
    return (
      <React.Fragment>
        <NavBar navRef={this} clickedReady={this.clickedReady}/>
        <Stack gap={0} className="homepageStack">
          <div
            className="homepageLayer1"
            ref={this.home}
            style={{ backgroundImage: "url(" + backgroundHomePage + ")" }}
          >
            <Row>
              <Col xs={0} md={7}></Col>
              <Col xs={12} md={4}>
                <h1> Explainable DeepFake Detection Challenge</h1>
                <h6>
                  {" "}
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce
                  convallis pellentesque metus id lacinia. Lorem ipsum dolor sit
                  amet, consectetur adipiscing elit. Fusce convallis
                  pellentesque metus id lacinia.
                </h6>

                <div className="mb-2">
                  <Button
                    variant="primary"
                    size="lg"
                    onClick={this.clickedReady}
                  >
                    Get Started
                  </Button>{" "}
                </div>
              </Col>
            </Row>
          </div>
          <div className="homepageLayer2" ref={this.deepFake}>
            <Row>
              <Col>
                <h1> DeepFake History</h1>
                <h6>
                  {" "}
                  The term “deepfake” refers to an image, video, or audio clip
                  that is doctored using deep learning to depict something that
                  did not really happen. The first appearance of these
                  convincingly-fake videos was in December of 2017, when an
                  anonymous user on reddit under the pseudonym, “Deepfakes,”
                  superimposed celebrity faces onto pornographic videos.
                </h6>
              </Col>
              <Col>
                <Image
                  alt=""
                  src={deepFakeComparision}
                  width={465}
                  height={255}
                  className="d-inline-block align-top"
                />{" "}
              </Col>
            </Row>
            <Row>
              <Col>
                <Image
                  alt=""
                  src={deepfakesProcess}
                  width={465}
                  height={255}
                  className="d-inline-block align-top"
                />{" "}
              </Col>
              <Col>
                <h1> How DeepFake works?</h1>
                <h6>
                  {" "}
                  Deepfakes rely on a particular form of deep learning called
                  generative adversarial networks (GANS), which were introduced
                  in 2014 by researchers at the University of Montreal. GANS
                  distinguish themselves from other deep learning algorithms
                  because they utilize two neural net architectures which
                  compete against each other. This competition occurs during the
                  data training process, where one algorithm generates data (the
                  generator) and the other simultaneously discriminates or
                  classifies the generated data (the discriminator).
                </h6>
              </Col>
            </Row>
          </div>
          {/*TODO - Add this when content is given*/}
          {/* <div className='homepageLayer3' ref={this.aboutUs} >
                        <Row>
                            <Col md="8">
                                <h1>   About Us</h1>
                                <h6>  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce convallis pellentesque metus id lacinia. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce convallis pellentesque metus id lacinia.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce convallis pellentesque metus id lacinia. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce convallis pellentesque metus id lacinia.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce convallis pellentesque metus id lacinia. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce convallis pellentesque metus id lacinia.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce convallis pellentesque metus id lacinia. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce convallis pellentesque metus id lacinia.
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce convallis pellentesque metus id lacinia. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce convallis pellentesque metus id lacinia.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce convallis pellentesque metus id lacinia. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce convallis pellentesque metus id lacinia.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce convallis pellentesque metus id lacinia. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce convallis pellentesque metus id lacinia.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce convallis pellentesque metus id lacinia. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce convallis pellentesque metus id lacinia.
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce convallis pellentesque metus id lacinia. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce convallis pellentesque metus id lacinia.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce convallis pellentesque metus id lacinia. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce convallis pellentesque metus id lacinia.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce convallis pellentesque metus id lacinia. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce convallis pellentesque metus id lacinia.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce convallis pellentesque metus id lacinia. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce convallis pellentesque metus id lacinia.
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce convallis pellentesque metus id lacinia. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce convallis pellentesque metus id lacinia.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce convallis pellentesque metus id lacinia. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce convallis pellentesque metus id lacinia.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce convallis pellentesque metus id lacinia. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce convallis pellentesque metus id lacinia.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce convallis pellentesque metus id lacinia. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce convallis pellentesque metus id lacinia.
                                </h6>
                            </Col>
                        </Row>
                    </div>
                    <div className='homepageLayer4' ref={this.meetUs}>
                        <Row>
                            <Col md="9">
                                <h1> Meet the Team</h1>
                                <ListGroup horizontal variant="flush">
                                    <ListGroup.Item as="div" className="d-flex justify-content-between align-items-start">
                                        <div className="ms-2 me-auto">
                                            <div className="fw-bold"><Image src={tkaur} width={220} height={200} roundedCircle={true} /></div>
                                            Tripat Kaur
                                        </div>
                                    </ListGroup.Item>
                                    <ListGroup.Item as="div" className="d-flex justify-content-between align-items-start">
                                        <div className="ms-2 me-auto">
                                            <div className="fw-bold"><Image src={tkaur} width={220} height={200} roundedCircle={true} /></div>
                                            Tripat Kaur
                                        </div>
                                    </ListGroup.Item>
                                    <ListGroup.Item as="div" className="d-flex justify-content-between align-items-start">
                                        <div className="ms-2 me-auto">
                                            <div className="fw-bold"><Image src={tkaur} width={220} height={200} roundedCircle={true} /></div>
                                            Tripat Kaur
                                        </div>
                                    </ListGroup.Item>
                                    <ListGroup.Item as="div" className="d-flex justify-content-between align-items-start">
                                        <div className="ms-2 me-auto">
                                            <div className="fw-bold"><Image src={tkaur} width={220} height={200} roundedCircle={true} /></div>
                                            Tripat Kaur
                                        </div>
                                    </ListGroup.Item>
                                </ListGroup>
                            </Col>
                        </Row>
                    </div> */}
          <Modal
            show={this.state.modalVisible}
            onClose={() => {}}
            onHide={()=>{this.setState({modalVisible:false})}}
            aria-labelledby="Login or Signup"
            aria-describedby="Login or Signup"
            size="xl"
            centered
          >
            <Container className="loginGrid" >
              
                <Modal.Header closeButton>
                        
                </Modal.Header>
                <Row>
                <Col xs={5} md={5} sm={5}>
                  <SignUp />
                  
                </Col>
                <Col
                 
                  xs={2}
                  md={2}
                  sm={2}
                  alignItems="center"
                  justifyContent="center"
                >
                  {/* <Divider
                    orientation="vertical"
                    variant="middle"
                    sx={{ width: "1px" }}
                    style={{ height: "100%", backgroundColor: "white" }}
                  ></Divider> */}
                </Col>
                <Col xs={5} md={5} sm={5}>
                  <SignIn />
                  
                </Col>
                </Row>
                
               

               
          
            </Container>
          </Modal>
        </Stack>
      </React.Fragment>
    );
  }
}
