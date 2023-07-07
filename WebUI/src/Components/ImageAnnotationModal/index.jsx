import React, { useState,useEffect } from "react";
import { ReactPictureAnnotation } from "react-picture-annotation";
import { Row, Col, Button } from "react-bootstrap";
import {Trash3} from 'react-bootstrap-icons'
const ImageAnnotationModal = ({
  imagePath,defaultAnswerSelection,
  annotationList,
  setAnnotation,
  setModifiedImage,
  
  
}) => {
 

  
  const [activeAnntotaion, setActiveAnnotation] = useState({});
  const handleDeletion = () => {
    let restAnnotations = annotationList.filter(
      (item) => item.id !== activeAnntotaion
    );

    setAnnotation(restAnnotations);
  };

 
 

  return (
    <>
     
          <Row className="justify-content-md-center answerOptionContainer">
             <Col md={3} className="imageAnnotationBox">
              <ReactPictureAnnotation
                inputElement={(inputProps) => (
                   <Trash3
                    color="white"
                    onClick={handleDeletion}
                  >
                    
                  </Trash3>
                )}
                image={imagePath}
                onSelect={(selectedId) => setActiveAnnotation(selectedId)}
                onChange={(data) => {setAnnotation(data)}}
                height={300}
                width={300}
                annotationData={annotationList}
              />
            </Col>
              <canvas style={{display:"none"}} id="canvasForAnnotation"></canvas>
          </Row>
        
   
    </>
  );
};

export default ImageAnnotationModal;