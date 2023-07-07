import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import {LinearProgress} from '@mui/material';
import { styled } from '@mui/system';
function CompletionTimeLine(props) {
  const { steps, current, progress,className } = props;
  
  function StepContent({ done, index }) {
    return done ? "✓" : index + 1;
  }

  const ProgressBar = ({ current, step, progress }) => {
    let value = 0;
    if(current+1 === step) {
      value = progress
    } else if(current >= step) {
      value = 100
    }
     
    return <LinearProgress variant="determinate" value={value} classes={{root: 'linearProgress', bar: 'bar'}} />
  }
  
  function renderStep(label, key) {
    const { current, progress } = this;
    const done = key < current;
    const currentStep = key === current;
    const stepClasses = classNames({
      'stepper__step__index': true,
      'currentStep': currentStep,
      'done': done
    });
  
    return (
      <li className={'stepper__step'} key={key}>
        <div className={'labelContainer'}>
          <p className={'stepper__step__label'}>{label}</p>
          <span className={stepClasses}>
              <StepContent done={done} index={key} />
          </span>
          
        </div>
        {!!key && <ProgressBar current={current} step={key} progress={progress} />}
      </li>
    )
  }

  return (
    <ul className={className+' stepper'}>
      {steps.map(renderStep, { current, progress })}
    </ul>
  )
}

CompletionTimeLine.propTypes = {
  steps: PropTypes.array.isRequired,
  current: PropTypes.number.isRequired,
  progress: PropTypes.number
};

export default styled(CompletionTimeLine)(()=>({
  [`&.stepper`]: {
    "display": "flex",
    "flexFlow": "row nowrap",
    "justifyContent": "space-around",
    "padding": 0,
    margin:0,
    "width": "100%",
  },
  [`.stepper__step`]: {
    position: "relative",
    "display": "flex",
    "flexFlow": "row nowrap",
    "justifyContent": "space-around",
    alignItems: "center",
    "width": "100%"
  },
  
  [`.stepper__step__index`]: {
    transform: "translate(-50%, -50%)",
    borderRadius: "100px 100px 0 0",
    height: "30px",
    width: "50px",
    lineHeight: "35px",
    background: "#dedede",
    color: "#999",
    textAlign: "center",
    margin: 0,
    fontSize:"25px"
  },
  
  [`.stepper__step__label`]: {
    color: "#656565",
    marginLeft: -50,
    fontSize:"12px",
  },

  [`.labelContainer`]: {
    "display": "flex",
    "flexFlow": "column nowrap",
    alignItems: "center",
    height: 50
  },

  [`.linearProgress`]: {
    flex: "1 1 auto",
    position: 'absolute',
    top: 45,
    left: 'calc(-50% + 0px)',
    right: 'calc(50% + 50px)',
    backgroundColor: "#1776d11a!important"
  },

  [`.bar`]: {
    backgroundColor: "#1776d1!important"
  },

  [`.currentStep`]: {
    backgroundColor: "#1776d1!important",
    color: "#fff",
    fontWeight: "500"
  },

  [`.done`]: {
    backgroundColor: "#1776d1!important",
    color: "#fff",
    fontWeight: "500"
  }
}));