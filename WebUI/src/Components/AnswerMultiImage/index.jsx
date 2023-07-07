import React, { useState, useEffect } from "react";
import { Row, Col, Button } from "react-bootstrap";
import ReactImageMagnify from "react-image-magnify";
import "./index.scss";

const AnswerMultiImage = ({
  imagePath,
  answerOptions,
  setSelectedAnswer,
  defaultAnswerSelection,
}) => {
  const [answerCard, setAnswerCard] = useState([]);

  const clickAnswerCard = (answerId,imageSelected="") => {
    setSelectedAnswer(answerId,imageSelected)
    let obj = {...answerCard}
    Object.keys(obj).forEach(item=>{
      if(item!=answerId){
        obj[item]["isActive"]=false
      }
    })
    obj[answerId]["isActive"]=true
    setAnswerCard(obj)
  }


  useEffect(() => {
    //Case 1 -> When there is an extra option of I dont understand anything
    if (imagePath.length === answerOptions.length) {
      let answerCard = {};
      answerOptions.forEach((item, index) => {
        answerCard[item.OfferedAnswerID] = { ...item };
        answerCard[item.OfferedAnswerID]["imagePath"] = imagePath[index + 1];
        if (item.OfferedAnswerID === defaultAnswerSelection) {
          answerCard[item.OfferedAnswerID]["isActive"] = true;
        } else {
          answerCard[item.OfferedAnswerID]["isActive"] = false;
        }
      });
      setAnswerCard(answerCard);
    }
    //Case 2 -> When there is no extra options. offered answer id = image paths
    else if (imagePath.length > answerOptions.length) {
      let answerCard = {};
      answerOptions.forEach((item, index) => {
        answerCard[item.OfferedAnswerID] = { ...item };
        answerCard[item.OfferedAnswerID]["imagePath"] = imagePath[index + 1];
        if (item.OfferedAnswerID === defaultAnswerSelection) {
          answerCard[item.OfferedAnswerID]["isActive"] = true;
        } else {
          answerCard[item.OfferedAnswerID]["isActive"] = false;
        }
      });
      setAnswerCard(answerCard);
    }
  }, [answerOptions]);

  return (
    <React.Fragment>
      <Row className="answerOptionMultiImageContainer">
        <Col md={12}>
          <Row className="justify-content-md-center multiImageRowContainer">
           
                <Col md={2}>
                  <ReactImageMagnify
                    {...{
                      smallImage: {
                        alt: "Image could not be loaded",
                        // isFluidWidth: true,
                        src: imagePath[0],
                        height: 240,
                        width: 240,
                      },
                      largeImage: {
                        src: imagePath[0],
                        width: 1000,
                        height: 1000,
                        isFluidWidth: true,
                      },

                      enlargedImagePosition: "over",
                      hintTextMouse: "Hover to zoom",
                      isHintEnabled: false,
                      shouldHideHintAfterFirstActivation: false,
                    }}
                  />
                </Col>
             
            {answerCard !== undefined &&
              Object.keys(answerCard).length &&
              Object.keys(answerCard).map((item) => {
                if (answerCard?.[item]?.["imagePath"] !== undefined) {
                  return (
                    <Col md={2} >
                      <Row>
                        <Col >
                          <ReactImageMagnify
                            {...{
                              smallImage: {
                                alt: "Image could not be loaded",
                                // isFluidWidth: true,
                                src: answerCard?.[item]?.["imagePath"],
                                height: 240,
                                width: 240,
                              },
                              largeImage: {
                                src: answerCard?.[item]?.["imagePath"],
                                width: 1000,
                                height: 1000,
                                isFluidWidth: true,
                              },

                              enlargedImagePosition: "over",
                              hintTextMouse: "Hover to zoom",
                              isHintEnabled: false,
                              shouldHideHintAfterFirstActivation: false,
                            }}
                          />
                        </Col>
                      </Row>
                      <Row>
                        <Col className="multiImageOptionCol">
                          <Button
                            variant="outline-primary"
                            size="lg"
                            onClick={()=>clickAnswerCard(answerCard?.[item]?.OfferedAnswerID ?? "",answerCard?.[item]?.["imagePath"] ?? "")}
                            className={
                              answerCard?.[item]?.isActive
                                ? "optionButton selectedButton"
                                : "optionButton"
                            }
                          >
                            {answerCard?.[item]?.AnswerText}
                          </Button>
                        </Col>
                      </Row>
                    </Col>
                  );
                } else {
                  return (
                    <Row>
                      <Col className="multiImageOptionCol">
                        <Button
                          variant="outline-primary"
                          size="lg"
                          onClick={()=>clickAnswerCard(answerCard?.[item]?.OfferedAnswerID ?? "")}
                          className={
                            answerCard?.[item]?.isActive
                              ? "optionButton extraOptionButton selectedButton"
                              : "optionButton extraOptionButton"
                          }
                        >
                          {answerCard?.[item]?.AnswerText}
                        </Button>
                      </Col>
                    </Row>
                  );
                }
              })}
          </Row>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default AnswerMultiImage;
