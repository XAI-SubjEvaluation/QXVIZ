import React, { useState, useEffect } from "react";
import { Row, Col, Button } from "react-bootstrap";
import ReactImageMagnify from "react-image-magnify";
import "./index.scss";

const EvaluationImage = ({
  imagePath,
  
}) => {
 return (
    <React.Fragment>
      <Row className="justify-content-md-center answerOptionContainer">
        <Col md={12}>
          <Row>
            <Col>
              <ReactImageMagnify
                className="singleImage"
                {...{
                  smallImage: {
                    alt: "Image could not be loaded",
                    // isFluidWidth: true,
                    src: imagePath,
                    height: 240,
                    width: 240,
                  },
                  largeImage: {
                    src: imagePath,
                    width: 1000,
                    height: 1000,
                    isFluidWidth: true,
                  },

                  // hintTextMouse: "Hover to zoom",
                  // isHintEnabled: true,
                  shouldHideHintAfterFirstActivation: false,
                  // enlargedImagePortalId:"zoomImageContainer2"
                }}
              />
            </Col>
          </Row>
          
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default EvaluationImage;
