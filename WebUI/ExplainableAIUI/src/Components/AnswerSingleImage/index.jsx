import React, { useState, useEffect } from "react";
import { Row, Col, Button } from "react-bootstrap";
import ReactImageMagnify from "react-image-magnify";
import "./index.scss";

const AnswerSingleImage = ({
  imagePath,
  answerOptions,
  setSelectedAnswer,
  defaultAnswerSelection,
}) => {
  const clickAnswerCard = (answerId) => {
    setSelectedAnswer(answerId)
    let obj = {...answerCard}
    Object.keys(obj).forEach(item=>{
      if(item!=answerId){
        obj[item]["isActive"]=false
      }
    })
    obj[answerId]["isActive"]=true
    setAnswerCard(obj)
  }


  const [answerCard, setAnswerCard] = useState([]);

  useEffect(() => {
    let answerCard = {};
    answerOptions.forEach((item) => {
      answerCard[item.OfferedAnswerID] = { ...item };
      if (item.OfferedAnswerID === defaultAnswerSelection) {
        answerCard[item.OfferedAnswerID]["isActive"] = true;
      } else {
        answerCard[item.OfferedAnswerID]["isActive"] = false;
      }
    });
    setAnswerCard(answerCard);
  }, []);

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
          <Row className="justify-content-md-center cta">
            {answerCard !== undefined &&
              Object.keys(answerCard).length &&
              Object.keys(answerCard).map((item) => {
                return (
                  <Col md={1}>
                    <Button
                      variant="outline-primary"
                      size="lg"
                      className={answerCard?.[item]?.isActive ? 'optionButton selectedButton' : 'optionButton'}
                      onClick={()=>clickAnswerCard(answerCard?.[item]?.OfferedAnswerID ?? "")}
                    >
                      {answerCard[item]?.AnswerText}
                    </Button>
                  </Col>
                );
              })}
          </Row>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default AnswerSingleImage;
