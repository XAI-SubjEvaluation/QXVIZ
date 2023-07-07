import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import NavBar from "@components/NavBar";
import CompletionTimeLine from "@components/CompletionTimeLine";
import AnswerText from "@components/AnswerText";
import AnswerSingleImage from "@components/AnswerSingleImage";
import AnswerMultiImage from "@components/AnswerMultiImage";
import VideoGuide from "@components/VideoGuide";
import EvaluationImage from "@components/EvaluationImage";
import ImageAnnotationModal from "@components/ImageAnnotationModal";
import Loading from '@components/Loading'
import ThankYouPage from '@components/ThankYouPage'
import Notification from "@components/HOC/Notification";
import {
  surveyAPI,
  postAnswer,
  nextQuestionAPI,
  exitSurvey,
} from "@utils/Constant";
import "./index.scss";
import MakeRequest from "@utils/MakeRequest";
import {
  SINGLE_IMAGE,
  SINGLE_TEXT,
  MULTI_IMAGE,
  VIDEO_GUIDE,
  IMAGE_ANNOTATE,
  EVALUATION_IMAGE,
} from "@utils/Constant";

const Survey = () => {
  const [surveyId, setSurveyId] = useState(0);
  const [notification, setNotification] = useState({
    visible: false,
    message: "",
  });

  const [loadingAPIResponse, setLoadingAPIResponse] = useState(true);
  const [questionListCurrent, setQuestionListCurrent] = useState([]);
  const [questionListProcessed, setQuestionListProcessed] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState({});
  const [progressState, setProgressState] = useState(0);
  const [activeState, setActiveState] = useState(0);
  const [textBoxRemarks, setTextBoxRemarks] = useState("");

  const setQuestionType = (response) => {
    let questionListCurrent = [];
    let questionList = response?.data?.QuestionsList || response?.data;
    questionList.forEach((item, index) => {
      let componentType =
        item?.QuestionID === 3
          ? IMAGE_ANNOTATE
          : item?.QuestionID === 4
          ? VIDEO_GUIDE
          : item?.AnswerList.length !== 0 &&
            (item?.imagePaths === null || item?.imagePaths?.length === 0)
          ? SINGLE_TEXT
          : item?.imagePaths?.length === 1 &&
            item?.AnswerList.filter((answer) => answer?.AnswerText === "")
              .length > 0
          ? EVALUATION_IMAGE
          : item?.imagePaths?.length === 1
          ? SINGLE_IMAGE
          : item?.imagePaths?.length > 1
          ? MULTI_IMAGE
          : null;

      item["type"] = componentType;
      if (componentType === IMAGE_ANNOTATE) {
        item["annotationList"] = [];
      } else if (
        componentType === SINGLE_TEXT &&
        item?.NextQuestionOrderNumber === null
      ) {
        item["isTextBoxRequired"] = true;
      }
      item["isAnswerRequired"] =
        item?.AnswerList.filter((answer) => answer?.AnswerText === "").length >
        0
          ? false
          : true;
      questionListCurrent.push(item);
    });
    if (activeState !== 1 && questionListCurrent?.[0]?.type === VIDEO_GUIDE) {
      setCurrentQuestion(questionListCurrent[1]);
      setQuestionListCurrent(questionListCurrent.slice(2));
    } else {
      setCurrentQuestion(questionListCurrent[0]);
      setQuestionListCurrent(questionListCurrent.slice(1));
    }
  };

  useEffect(() => {
    MakeRequest.get(surveyAPI).then((response) => {
      setQuestionType(response);
      setSurveyId(response?.data?.SurveyID);
      setLoadingAPIResponse(false);
    });
  }, []);

  const submitAnswer = () => {
    let currentQuest = currentQuestion;
    if (
      currentQuest["isAnswerRequired"] === false &&
      currentQuest?.type !== IMAGE_ANNOTATE
    ) {
      let tempQuestionListCurrent = [...questionListCurrent];
      let tempQuestionProcessed = [...questionListProcessed];
      setProgressState((prevState) => prevState + 20);
      tempQuestionProcessed.push(currentQuestion);
      setQuestionListProcessed(tempQuestionProcessed);
      setCurrentQuestion(tempQuestionListCurrent.shift());
      setQuestionListCurrent(tempQuestionListCurrent);
    } else if (
      currentQuest.hasOwnProperty("answerSelected") ||
      currentQuest?.type === IMAGE_ANNOTATE
    ) {
      let modifiedImage;
      //TODO: Fix code here
      if (currentQuest?.type === IMAGE_ANNOTATE) {
        saveAnnotatedImage().then((image) => {
          console.log(image);
          modifiedImage = image;
        });
      } else {
        modifiedImage = "data:image/png;base64,";
      }
      setTimeout(() => {
        let obj = {
          SurveryID: surveyId,
          PersonID: parseInt(localStorage.getItem("PersonID")),
          QuestionID: parseInt(currentQuest?.QuestionID),
          OfferedAnswerID:
            currentQuest?.type === IMAGE_ANNOTATE
              ? currentQuest?.AnswerList?.[0]?.OfferedAnswerID
              : parseInt(currentQuest?.answerSelected),
          Remarks: currentQuest.hasOwnProperty("isTextBoxRequired")
            ? textBoxRemarks
            : "",
          TimeTaken: 0,
          ModifiedImage: modifiedImage,
          imagePath:
            currentQuest?.["imagePaths"]?.length === 1
              ? currentQuest?.["imagePaths"][0]
              : currentQuest?.imageSelected,
        };

        MakeRequest.postAuth(postAnswer, obj).then((response) => {
          let tempQuestionProcessed = [...questionListProcessed];
          tempQuestionProcessed.push(currentQuestion);
          setQuestionListProcessed(tempQuestionProcessed);
          if (currentQuest?.NextQuestionOrderNumber != null) {
            if (
              nextQuestionAPI.hasOwnProperty(
                currentQuestion["NextQuestionOrderNumber"]
              )
            ) {
              //API Call to next api
              nextQuestionAPICall(
                obj,
                currentQuestion["NextQuestionOrderNumber"]
              );
            } else {
              let tempQuestionListCurrent = [...questionListCurrent];
              let quest = tempQuestionListCurrent.shift();
              if (activeState !== 1 && quest?.SkipOnRepeat === true) {
                quest = tempQuestionListCurrent.shift();
              }
              setCurrentQuestion(quest);
              setQuestionListCurrent(tempQuestionListCurrent);
              // setProgressState(0)
              if (activeState === 0) {
                setActiveState((prevState) => prevState + 1);
              } else {
                setProgressState((prevState) => prevState + 20);
              }
            }
          }
          //end of survey
          else {
            setActiveState((prevState) => prevState + 1);
          }
        });
      }, 100);
    } else {
      if (componentType === VIDEO_GUIDE) {
        setNotification({
          visible: true,
          message: "Please watch the video.",
        });
      } else {
        setNotification({
          visible: true,
          message: "Please select one option to proceed.",
        });
      }
    }
  };

  const nextQuestionAPICall = (inputObj, nextQuestNumber) => {
    let apiUrl = nextQuestionAPI[nextQuestNumber];
    let { SurveryID, PersonID, QuestionID, OfferedAnswerID, imagePath } =
      inputObj;
    let apiInput = {
      SurveryID: SurveryID,
      PersonID: PersonID,
      QuestionID: QuestionID,
      OfferedAnswerID: OfferedAnswerID,
      imagePath: imagePath,
    };
    console.log(nextQuestNumber);
    switch (true) {
      case nextQuestNumber === 0 || nextQuestNumber === -1:
        setProgressState((prevState) => prevState + 20);
        if (nextQuestNumber === -1) {
          apiInput["imagePath"] =
            currentQuestion?.imagePaths[
              parseInt(
                currentQuestion?.AnswerList.filter(
                  (answer) =>
                    answer.OfferedAnswerID ===
                    parseInt(currentQuestion?.answerSelected)
                )[0]?.AnswerText
              )
            ];
        }
        MakeRequest.postAuth(apiUrl, apiInput).then((response) => {
          setQuestionType(response);
        });
        break;
      case nextQuestNumber === -2: {
        if (activeState < 4) {
          apiUrl = `${apiUrl}&userid=7&qid=2`;
          setProgressState(0);
          setActiveState((prevState) => prevState + 1);
          MakeRequest.get(apiUrl).then((response) => {
            setQuestionType(response);
          });
        } else {
          MakeRequest.get(exitSurvey).then((response) => {
            setQuestionType(response);
          });
          return;
        }
      }
      default:
        console.log("Default case");
    }
  };

  const addAnswerToResponse = (value, imageSelected = null) => {
    let currentObj = { ...currentQuestion };
    currentObj["answerSelected"] = value;
    if (imageSelected != null) {
      currentObj["imageSelected"] = imageSelected;
    }
    setCurrentQuestion(currentObj);
  };

  const goToPreviousQuestion = () => {
    let tempQuestionProcessed = [...questionListProcessed];
    let tempCurrentQuestion = currentQuestion;
    setCurrentQuestion(tempQuestionProcessed.pop());
    let tempQuestionListCurrent = [...questionListCurrent];
    tempQuestionListCurrent.push(tempCurrentQuestion);
    setQuestionListCurrent(tempQuestionListCurrent);
    setQuestionListProcessed(tempQuestionProcessed);
    if (progressState === 0) {
      setActiveState((prevState) => prevState - 1);
      //TODO Dynamically calculate
      setProgressState(80);
    } else {
      setProgressState((prevState) => prevState - 20);
    }
  };

  const prepareQuestionTitle = (questionText) => {
    let [title, subtitle] = questionText?.split(":");
    return (
      <>
        <div align="center" className="questionTitle">
          {title}
        </div>
        <div
          align="center"
          className="questionSubtitle"
          style={{ maxWidth: "90%", marginLeft: "5%" }}
        >
          {subtitle}
        </div>
      </>
    );
  };

  const saveAnnotatedImage = () => {
    return new Promise((resolve, reject) => {
      var canvas = document.getElementById("canvasForAnnotation");
      var ctx = canvas.getContext("2d");
      var image = new Image();
      image.crossOrigin = "annonymous";
      image.src = currentQuestion?.imagePaths?.[0];
      image.onload = function () {
        // console.log(image.src)
        canvas.width = image.naturalWidth;
        canvas.height = image.naturalHeight;
        ctx.drawImage(image, 0, 0, image.naturalWidth, image.naturalHeight);
        // ctx.drawImage(shapeCanvas, 0, 0,image.naturalWidth,image.naturalHeight);

        for (var i = 0; i < currentQuestion?.annotationList?.length; ++i) {
          let item = currentQuestion?.annotationList[i];
          if (item.mark.type === "RECT") {
            ctx.beginPath();
            ctx.rect(
              item.mark.x,
              item.mark.y,
              item.mark.width,
              item.mark.height
            );
            ctx.stroke();
          }
        }

        resolve(canvas.toDataURL("image/png"));
      };
    });
  };

  const componentType = currentQuestion?.["type"];

  return (
    <React.Fragment>
      <NavBar navRef={this} />

      <Container fluid className="surveyContainer">
        {loadingAPIResponse ? (
          <Loading/>
        ) : activeState !== 5 ? (
          <>
            <Row className="justify-content-md-center">
              <Col md={10}>
                <CompletionTimeLine
                  steps={[
                    "Step 1",
                    "Step 2",
                    "Step 3",
                    "Step 4",
                    "Step 5",
                    "Step 6",
                  ]}
                  current={activeState}
                  progress={progressState}
                />
              </Col>
            </Row>
            <Row className="justify-content-md-center">
              <Col
                md={10}
                className={
                  componentType === EVALUATION_IMAGE
                    ? "surveyQuestionContainer incorrectEvaluation"
                    : "surveyQuestionContainer"
                }
              >
                {componentType === VIDEO_GUIDE ? (
                  <VideoGuide />
                ) : (
                  prepareQuestionTitle(currentQuestion?.QuestionText)
                )}
                {componentType === SINGLE_TEXT ? (
                  <AnswerText
                    answerOptions={currentQuestion?.AnswerList}
                    defaultAnswerSelection={currentQuestion?.answerSelected}
                    setSelectedAnswer={(value) => {
                      addAnswerToResponse(value);
                    }}
                    isTextBoxRequired={currentQuestion?.isTextBoxRequired}
                    onTextBoxChange={(value) => setTextBoxRemarks(value)}
                  />
                ) : componentType === SINGLE_IMAGE ? (
                  <AnswerSingleImage
                    imagePath={currentQuestion?.imagePaths[0]}
                    answerOptions={currentQuestion?.AnswerList}
                    defaultAnswerSelection={currentQuestion?.answerSelected}
                    setSelectedAnswer={(value) => {
                      addAnswerToResponse(value);
                    }}
                  />
                ) : componentType === MULTI_IMAGE ? (
                  <AnswerMultiImage
                    imagePath={currentQuestion?.imagePaths}
                    answerOptions={currentQuestion?.AnswerList}
                    defaultAnswerSelection={currentQuestion?.answerSelected}
                    setSelectedAnswer={(value, imageSelected) => {
                      addAnswerToResponse(value, imageSelected);
                    }}
                  />
                ) : componentType === EVALUATION_IMAGE ? (
                  <EvaluationImage imagePath={currentQuestion?.imagePaths[0]} />
                ) : componentType === IMAGE_ANNOTATE ? (
                  <ImageAnnotationModal
                    imagePath={currentQuestion?.imagePaths[0]}
                    open={true}
                    answerOptions={currentQuestion?.AnswerList}
                    defaultAnswerSelection={currentQuestion?.answerSelected}
                    setModifiedImage={(value) =>
                      addAnswerToResponse("image annotation")
                    }
                    annotationList={currentQuestion?.annotationList}
                    setAnnotation={(annotationList) =>
                      setCurrentQuestion({ ...currentQuestion, annotationList })
                    }
                  />
                ) : null}
              </Col>
            </Row>
            <Row className="justify-content-md-center cta">
              <Col md={{ span: 8 }}>
                {/* <Button variant="outline-primary">Exit Survey</Button> */}
              </Col>
              <Col md={{ span: 1 }}>
                <Button   disabled={questionListProcessed.length === 0?true:false} variant="outline-primary" onClick={() => goToPreviousQuestion()}>
                  Previous
                </Button>
              </Col>
              <Col md={1}>
                <Button variant="primary" onClick={() => submitAnswer()}>
                  Next
                </Button>
              </Col>
            </Row>
          </>
        ) : (
          
          <ThankYouPage/>
            
        )}
          <Notification
            notification={notification}
            setNotification={setNotification}
          />
      </Container>
    </React.Fragment>
  );
};

export default Survey;
