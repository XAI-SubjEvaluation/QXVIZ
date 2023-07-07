const username="admin"
const password = "admin"


//authorization
export const encodedAuthorization = btoa(username+": "+password)

//URLS
const userId = localStorage.getItem("PersonID") ? localStorage.getItem("PersonID") : 7

export const surveyAPI = "survey/GetSurvery?id=1&userid="+userId
export const postAnswer = "answer/postanswer"
export const signUp = "person"
export const signIn = "person/userlogin"
export const nextQuestionAPI={
    "0":"survey/DeepFakeDetection/",
    "-1":"survey/ComparisonXAI/",
    "-2":"survey/GetSurvery?id=1"
}
export const exitSurvey = "survey/GetSurveyExit/1"

//component Types in Survey
export const SINGLE_TEXT = "SINGLE_TEXT"
export const SINGLE_IMAGE = "SINGLE_IMAGE"
export const MULTI_IMAGE = "MULTI_IMAGE"
export const VIDEO_GUIDE = "VIDEO_GUIDE"
export const IMAGE_ANNOTATE = "IMAGE_ANNOTATE"
export const EVALUATION_IMAGE = "EVALUATION_IMAGE"