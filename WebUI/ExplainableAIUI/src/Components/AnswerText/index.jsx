import React,{useState,useEffect} from "react";
import { Row, Col, Card } from "react-bootstrap";
import "./index.scss";
import {TextField} from "@mui/material";

export default function AnswerText({
  answerOptions,
  setSelectedAnswer,
  defaultAnswerSelection,
  isTextBoxRequired = false,
  onTextBoxChange = () => {},
}) {

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

  const [answerCard,setAnswerCard] = useState([])

  useEffect(()=>{
    let answerCard = {}
    answerOptions.forEach(item=>{
      
      answerCard[item.OfferedAnswerID] = {...item}
      if(item.OfferedAnswerID===defaultAnswerSelection){
        answerCard[item.OfferedAnswerID]["isActive"] = true
      }
      else{
        answerCard[item.OfferedAnswerID]["isActive"] = false
      }
      
      
    })
    setAnswerCard(answerCard)
  },[])

  return (
    <React.Fragment>
      <Row className="answerOptionContainer">
        {answerCard !== undefined &&
          Object.keys(answerCard).length &&
          Object.keys(answerCard).map((item,index) => {
            return (
              <Col key={answerCard?.[item]?.OfferedAnswerId}>
                <Card  className={answerCard?.[item]?.isActive ? 'answerOptionCard selected' : 'answerOptionCard'} onClick={()=>clickAnswerCard(answerCard?.[item]?.OfferedAnswerID ?? "")}>
                  <Card.Body>
                    <Card.Title className="answerOptionTitle">
                      {answerCard?.[item]?.AnswerText?.split(":")?.[0]}
                    </Card.Title>
                    <Card.Text className="answerOptionBody">
                    {answerCard?.[item]?.AnswerText?.split(":")?.[1]}
                    {index===(Object.keys(answerCard).length-1) && isTextBoxRequired ?<TextField  onChange={(e)=>{onTextBoxChange(e.target.value)}} multiline={true} id="outlined-basic" placeholder="Please enter your reasons here" variant="standard" minRows={2} />  :null}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
      </Row>
    </React.Fragment>
  );
}
