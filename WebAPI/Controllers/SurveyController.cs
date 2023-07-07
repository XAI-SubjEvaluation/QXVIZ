using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using ExplainableAIWebApi.DTO;
using ExplainableAIWebApi.Models;
using ExplainableAIWebApi.Helpers;
using System.Configuration;
using ExplainableAIWebApi.Filters;
using System.Web.Mvc;
using System.Web.Http.Cors;
using static ExplainableAIWebApi.Helpers.Helpers;
using HttpPostAttribute = System.Web.Mvc.HttpPostAttribute;
using ActionNameAttribute = System.Web.Mvc.ActionNameAttribute;
using RouteAttribute = System.Web.Mvc.RouteAttribute;
using HttpGetAttribute = System.Web.Mvc.HttpGetAttribute;
//added to add some logging features 
using System.Diagnostics;
namespace ExplainableAIWebApi.Controllers
{
    //[EnableCors(origins: "*", headers: "*", methods: "*")]
    //adding this for basic authentication 
    [BasicAuthentication]
    [RequireHttps]

    public class SurveyController : ApiController
    {
        //Connect to the database 
        private explainableaidbEntities2 db = new explainableaidbEntities2();
        // GET api/survey
        public IHttpActionResult Get()
        {
            var query = from survey in db.surveys.ToList<survey>()
                        orderby survey.SurveyID
                        select new survey
                        {
                            SurveyID = survey.SurveyID,
                            Description = survey.Description

                        };

            return Json(query);
        }

        // GET api/survey/1
        [HttpGet]
        public IHttpActionResult GetSurvery(int id, int userId, int? qid = null) // qid =2 if the 2nd loop
        {
            try
            {
                int questionsModule = new Random().Next(0, 2);
                //check if the user exists in person_survey table that has before this survey
                var userSurObj = db.person_survey.SingleOrDefault(user => user.PersonID == userId && user.SurveyID == id);
                if (userSurObj == null) // it means it is his first time to take this survey
                {
                    //make it fake first // update survey taken counter and iteration count number
                    db.person_survey.Add(new person_survey() { SurveyID = id, PersonID = userId, HasFakeLast = true, IterationsCountLast = 1, DateLastSurveyTaken = DateTime.Now, SuveryTakenCount = 1 });
                    db.SaveChanges();
                    questionsModule = 0; // pick fake as a last method .
                }
                else
                {
                    //update the user settings
                    userSurObj.SuveryTakenCount = userSurObj.SuveryTakenCount + 1;

                    // he can have a fake or real 
                    userSurObj.HasFakeLast = false;

                    userSurObj.IterationsCountLast = userSurObj.IterationsCountLast + 1;
                    db.SaveChanges();

                }
                // the dto will have a list of questions and its answers 
                var neededSurvey = db.surveys.SingleOrDefault(sur => sur.SurveyID == id);


                //the start of creating the json object to be returned to the front end 
                if (neededSurvey != null)
                {
                    SurveyDTO surveyDTO = new SurveyDTO()
                    {
                        SurveyID = neededSurvey.SurveyID,
                        Description = neededSurvey.Description,
                        questionIds = neededSurvey.FixedQuestionsIDs.Split(',') // question ids which are fixed
                    };

                    //get list of questions for the requested survey 
                    var questions = db.surveys.Include(s => s.survey_question).FirstOrDefault(su => su.SurveyID == surveyDTO.SurveyID);
                    surveyDTO.QuestionsList = new List<QuestionDTO>();
                    if ((qid == 2))
                    {
                        //skip question order number 1 
                        var filtered = surveyDTO.questionIds.Where(q => Convert.ToInt32(q) != 1).ToArray();
                        surveyDTO.questionIds = filtered;

                    }
                    // loop over fixed questions only 
                    foreach (var fixedQuestionId in surveyDTO.questionIds)
                    {


                        //loop and load the question list first
                        foreach (var existingChild in questions.survey_question.ToList().Where(p => p.QuestionID == Convert.ToInt32(fixedQuestionId)))
                        {
                            QuestionDTO question = new QuestionDTO();
                            question.QuestionID = existingChild.QuestionID;
                            question.SkipOnRepeat = existingChild.SkipOnRepeat;
                            question.NextQuestionOrderNumber = db.survery_iterations.SingleOrDefault(s => (s.SurveyID == neededSurvey.SurveyID && s.QuestionID == existingChild.QuestionID && s.IterationID == (int)Helpers.Helpers.iterationsNames.FixedQuestions)).NextOrderNumber;
                            question.QuestionOrderNumber = db.survery_iterations.SingleOrDefault(s => (s.SurveyID == neededSurvey.SurveyID && s.QuestionID == existingChild.QuestionID && s.IterationID == (int)Helpers.Helpers.iterationsNames.FixedQuestions)).OrderNumber;
                            question.QuestionText = db.questions.FirstOrDefault(q => q.QuestionID == existingChild.QuestionID).QuestionText;
                            // randomly select fake or real as first question
                            if (existingChild.PhotoFolderName != null && existingChild.PhotoFolderName.Split(',')[questionsModule] != null)
                            {
                                IList<string> imageListPaths = Helpers.Helpers.getImagePathsByQuestionId(existingChild.PhotoFolderName.Split(',')[questionsModule]);
                                question.imagePaths = imageListPaths;
                            }
                            surveyDTO.QuestionsList.Add(question);
                        }
                    }

                    //loop through the answers and load all answers available for each question 
                    foreach (var question in surveyDTO.QuestionsList.ToList())
                    {
                        question.AnswerList = new List<AnswerDTO>();
                        var query = (from item in db.survery_question_answer
                                     where item.SurveryID == id
                                     where item.QuestionID == question.QuestionID
                                     select new AnswerDTO()
                                     {
                                         OfferedAnswerID = item.OfferedAnswerID,


                                     });
                        foreach (var offeredAns in query.ToList())
                        {
                            AnswerDTO answer = new AnswerDTO();
                            answer.OfferedAnswerID = offeredAns.OfferedAnswerID;
                            answer.AnswerText = db.offeredanswers.SingleOrDefault(s => s.OfferedAnswerID == offeredAns.OfferedAnswerID).AnswerText;

                            question.AnswerList.Add(answer);
                        }

                    }

                    return Content(HttpStatusCode.OK, surveyDTO);
                }
                else
                    return NotFound();
            }
            catch (Exception ex)
            {
                string source;
                string log;
                string eventname;
                source = "GetSurvery Method in SurveyController";
                log = "Application";
                eventname = string.Empty;
                eventname = ex.Message;
                if (!EventLog.SourceExists(source))
                    EventLog.CreateEventSource(source, log);
                EventLog.WriteEntry(source, eventname);
                EventLog.WriteEntry(source, eventname, EventLogEntryType.Error);


                return Content(HttpStatusCode.BadRequest, ex.Message);
            }
        }

        // POST api/survey  // post the useranswer in stage 2 to select next sequence {selectedimagePath , selected userAnswer}
        [HttpPost]
        public IHttpActionResult DeepFakeDetection([FromBody] SurveyQuestionAnswerUserDTO answerDeepFakeDetection)
        {
            try
            {
                using (explainableaidbEntities2 dbFake = new explainableaidbEntities2())
                {
                    int questionsModule = new Random().Next(0, 3);
                    int iterationId = 0;
                    var neededSurvey = dbFake.surveys.SingleOrDefault(sur => sur.SurveyID == answerDeepFakeDetection.SurveryID);
                    //here we will check 4 cases fake fake , fake real , real fake , real real and send the right sequence 
                    if (answerDeepFakeDetection != null)
                    {
                        // fake fake 
                        if ((answerDeepFakeDetection.imagePath.ToLower().Contains("fake")) && (dbFake.offeredanswers.SingleOrDefault(a => a.OfferedAnswerID == answerDeepFakeDetection.OfferedAnswerID).AnswerText.ToLower().Equals("fake")))
                        {
                            iterationId = dbFake.iterations.SingleOrDefault(iter => iter.IterationName.ToLower().Equals("fake_fake")).IterationID;
                        }
                        else if ((answerDeepFakeDetection.imagePath.ToLower().Contains("fake")) && (dbFake.offeredanswers.SingleOrDefault(a => a.OfferedAnswerID == answerDeepFakeDetection.OfferedAnswerID).AnswerText.ToLower().Equals("real")))
                        {
                            iterationId = dbFake.iterations.SingleOrDefault(iter => iter.IterationName.ToLower().Equals("Fake_Real")).IterationID;

                        }
                        else if ((answerDeepFakeDetection.imagePath.ToLower().Contains("real")) && (dbFake.offeredanswers.SingleOrDefault(a => a.OfferedAnswerID == answerDeepFakeDetection.OfferedAnswerID).AnswerText.ToLower().Equals("fake")))
                        {
                            iterationId = dbFake.iterations.SingleOrDefault(iter => iter.IterationName.ToLower().Equals("Real_Fake")).IterationID;

                        }
                        else if ((answerDeepFakeDetection.imagePath.ToLower().Contains("real")) && (dbFake.offeredanswers.SingleOrDefault(a => a.OfferedAnswerID == answerDeepFakeDetection.OfferedAnswerID).AnswerText.ToLower().Equals("real")))
                        {
                            iterationId = dbFake.iterations.SingleOrDefault(iter => iter.IterationName.ToLower().Equals("Real_Real")).IterationID;

                        }
                        var nextQuestionIds = dbFake.survery_iterations.Where(sur => sur.IterationID == iterationId).ToList().OrderBy(q => q.QuestionID);
                        if (neededSurvey != null)
                        {
                            SurveyDTO surveyDTO = new SurveyDTO()
                            {
                                SurveyID = neededSurvey.SurveyID,
                                Description = neededSurvey.Description
                            };

                            //get list of questions for the requested survey 
                            var questions = (dbFake.surveys.Include(s => s.survey_question).FirstOrDefault(su => su.SurveyID == surveyDTO.SurveyID));
                            surveyDTO.QuestionsList = new List<QuestionDTO>();

                            // loop over fixed questions only 
                            foreach (var QuestionId in nextQuestionIds)
                            {
                                //loop and load the question list first
                                foreach (var existingChild in questions.survey_question.ToList().Where(p => p.QuestionID == Convert.ToInt32(QuestionId.QuestionID)).ToList())
                                {
                                    QuestionDTO question = new QuestionDTO();
                                    question.QuestionID = existingChild.QuestionID;
                                    question.SkipOnRepeat = existingChild.SkipOnRepeat;
                                    question.NextQuestionOrderNumber = db.survery_iterations.SingleOrDefault(s => (s.SurveyID == neededSurvey.SurveyID && s.QuestionID == existingChild.QuestionID && s.IterationID == iterationId)).NextOrderNumber;
                                    question.QuestionOrderNumber = db.survery_iterations.SingleOrDefault(s => (s.SurveyID == neededSurvey.SurveyID && s.QuestionID == existingChild.QuestionID && s.IterationID == iterationId)).OrderNumber;
                                    question.imagePaths = new List<string>(); // initialization
                                    question.QuestionText = dbFake.questions.FirstOrDefault(q => q.QuestionID == QuestionId.QuestionID).QuestionText;
                                    if (String.IsNullOrEmpty(existingChild.PhotoFolderName))
                                        question.imagePaths.Add(answerDeepFakeDetection.imagePath);
                                    else
                                    {
                                        int rand = new Random().Next(1, 3); // choose one heatmap type
                                        heatmapsTypes heatMapTypeName = ((heatmapsTypes)rand);
                                        question.imagePaths.Add(answerDeepFakeDetection.imagePath);
                                        IList<string> heatMapsfolders = existingChild.PhotoFolderName.Split(',');
                                        foreach (var heatMapFolderName in heatMapsfolders)
                                        {
                                            string fake_real = "real";//accoridng to the selected image choose the right folder
                                            if (answerDeepFakeDetection.imagePath.ToLower().Contains(Helpers.Helpers.fakeORreal.fake.ToString()))
                                                fake_real = "fake";
                                            //get the image number 
                                            string imageNo = answerDeepFakeDetection.imagePath.ToLower().Split('\\').Last();
                                            if (string.IsNullOrEmpty(imageNo))
                                                imageNo = answerDeepFakeDetection.imagePath.ToLower().Split('/').Last();
                                            string imageTextEx = Helpers.Helpers.getHeatMapEX(heatMapFolderName)
                                                + "_" + (heatMapTypeName.ToString().ToLower().Equals(heatmapsTypes.Bilateral.ToString().ToLower()) ? "bilafilt" : "");
                                            IList<string> imageListPaths = Helpers.Helpers.getImage(heatMapFolderName + "\\" + heatMapTypeName.ToString() + "\\" + fake_real + "\\" + imageTextEx + imageNo);

                                            foreach (var q in imageListPaths)
                                                question.imagePaths.Add(q);
                                            // shuffle the heatmaps image paths

                                        }

                                    }
                                    question.imagePaths = Helpers.Helpers.Shuffle(question.imagePaths); // shuffle order each time for the displayed heat maps
                                    surveyDTO.QuestionsList.Add(question);
                                }
                            }

                            //loop through the answers and load all answers available for each question 
                            foreach (var question in surveyDTO.QuestionsList.ToList())
                            {
                                question.AnswerList = new List<AnswerDTO>();
                                var query = (from item in db.survery_question_answer
                                             where item.SurveryID == answerDeepFakeDetection.SurveryID
                                             where item.QuestionID == question.QuestionID
                                             select new AnswerDTO()
                                             {
                                                 OfferedAnswerID = item.OfferedAnswerID,


                                             });
                                foreach (var offeredAns in query.ToList())
                                {
                                    AnswerDTO answer = new AnswerDTO();
                                    answer.OfferedAnswerID = offeredAns.OfferedAnswerID;
                                    answer.AnswerText = db.offeredanswers.SingleOrDefault(s => s.OfferedAnswerID == offeredAns.OfferedAnswerID).AnswerText;

                                    question.AnswerList.Add(answer);
                                }
                            }

                            surveyDTO.QuestionsList = (IList<QuestionDTO>)surveyDTO.QuestionsList.OrderBy(q => q.QuestionOrderNumber).ToList();
                            return Content(HttpStatusCode.OK, surveyDTO);
                        }
                        else
                            return NotFound();
                    }
                    else
                        return NotFound();
                }
            }

            catch (Exception ex)
            {
                string source;
                string log;
                string eventname;
                source = "DeepFakeDetection Method in SurveyController";
                log = "Application";
                eventname = string.Empty;
                eventname = ex.Message;
                if (!EventLog.SourceExists(source))
                    EventLog.CreateEventSource(source, log);
                EventLog.WriteEntry(source, eventname);
                EventLog.WriteEntry(source, eventname, EventLogEntryType.Error);


                return Content(HttpStatusCode.BadRequest, ex.Message);
            }

        }

        [HttpPost]
        public IHttpActionResult ComparisonXAI([FromBody] SurveyQuestionAnswerUserDTO answerComparisonXAI)
        {
            try
            {
                var neededSurvey = db.surveys.SingleOrDefault(sur => sur.SurveyID == answerComparisonXAI.SurveryID);
                int iterationId = db.iterations.SingleOrDefault(iter => iter.IterationName.ToLower().Equals(Helpers.Helpers.iterationsNames.TwoDataSets.ToString().ToLower())).IterationID;
                var nextQuestionIds = db.survery_iterations.Where(sur => sur.IterationID == iterationId).ToList().OrderBy(q => q.OrderNumber).ToList();
                //get the sekected heatmap path from post request and return the face_web images and the extra ( orginal or blerale)
                if (answerComparisonXAI != null)
                {
                    if (neededSurvey != null)
                    {
                        SurveyDTO surveyDTO = new SurveyDTO()
                        {
                            SurveyID = neededSurvey.SurveyID,
                            Description = neededSurvey.Description
                        };

                        //get list of questions for the requested survey 
                        var questions = (db.surveys.Include(s => s.survey_question).FirstOrDefault(su => su.SurveyID == surveyDTO.SurveyID));
                        surveyDTO.QuestionsList = new List<QuestionDTO>();
                        string imageNo = answerComparisonXAI.imagePath.ToLower().Split('\\').Last();
                        if (string.IsNullOrEmpty(imageNo))
                            imageNo = answerComparisonXAI.imagePath.ToLower().Split('/').Last();
                        //loop and load the question list first
                        foreach (var QuestionId in nextQuestionIds)
                        {
                            foreach (var existingChild in questions.survey_question.ToList().Where(p => p.QuestionID == Convert.ToInt32(QuestionId.QuestionID)))
                            {
                                QuestionDTO question = new QuestionDTO();
                                question.QuestionID = existingChild.QuestionID;
                                question.SkipOnRepeat = existingChild.SkipOnRepeat;
                                question.NextQuestionOrderNumber = db.survery_iterations.SingleOrDefault(s => (s.SurveyID == neededSurvey.SurveyID && s.QuestionID == existingChild.QuestionID && s.IterationID == (int)Helpers.Helpers.iterationsNames.TwoDataSets)).NextOrderNumber;
                                question.QuestionOrderNumber = db.survery_iterations.SingleOrDefault(s => (s.SurveyID == neededSurvey.SurveyID && s.QuestionID == existingChild.QuestionID && s.IterationID == (int)Helpers.Helpers.iterationsNames.TwoDataSets)).OrderNumber;
                                question.imagePaths = new List<string>();
                                question.QuestionText = db.questions.FirstOrDefault(q => q.QuestionID == existingChild.QuestionID).QuestionText;
                                if (string.IsNullOrEmpty(existingChild.PhotoFolderName))
                                    question.imagePaths.Add(answerComparisonXAI.imagePath);
                                else
                                {

                                    var fakeorreal = (answerComparisonXAI.imagePath.ToLower().Contains(Helpers.Helpers.fakeORreal.fake.ToString()) ? Helpers.Helpers.fakeORreal.fake.ToString() : Helpers.Helpers.fakeORreal.real.ToString());
                                    question.imagePaths.Add(Helpers.Helpers.getImage("Content\\QuestionPhotos\\FaceImagesWeb\\" + fakeorreal + "\\" + imageNo.Split('_').Last())[0].Replace("bilafilt", ""));
                                    IList<string> heatMapsfolders = existingChild.PhotoFolderName.Split(',');
                                    string opoositeMapathNeeded = getTheoppositPathOfTheSelectedHeatMap(answerComparisonXAI.imagePath);
                                    var orginalorbi = (answerComparisonXAI.imagePath.ToLower().Contains(Helpers.Helpers.heatmapsTypes.Bilateral.ToString().ToLower()) ? heatmapsTypes.Original.ToString() : heatmapsTypes.Bilateral.ToString());
                                    IList<string> imageListPaths = Helpers.Helpers.getImage("Content\\QuestionPhotos\\" + Helpers.Helpers.getHeaMapFolderName(answerComparisonXAI.imagePath.ToLower()) + "\\" + orginalorbi + "\\" + fakeorreal + "\\" + opoositeMapathNeeded);
                                    foreach (var q in imageListPaths)
                                        question.imagePaths.Add(q);
                                    question.imagePaths.Add(answerComparisonXAI.imagePath);


                                }

                                surveyDTO.QuestionsList.Add(question);
                            }
                        }
                        //loop through the answers and load all answers available for each question 
                        foreach (var question in surveyDTO.QuestionsList.ToList())
                        {
                            question.AnswerList = new List<AnswerDTO>();
                            var query = (from item in db.survery_question_answer
                                         where item.SurveryID == answerComparisonXAI.SurveryID
                                         where item.QuestionID == question.QuestionID
                                         select new AnswerDTO()
                                         {
                                             OfferedAnswerID = item.OfferedAnswerID,
                                             //next_QuestionID = item.next_QID

                                         });
                            foreach (var offeredAns in query.ToList())
                            {
                                AnswerDTO answer = new AnswerDTO();
                                answer.OfferedAnswerID = offeredAns.OfferedAnswerID;
                                answer.AnswerText = db.offeredanswers.SingleOrDefault(s => s.OfferedAnswerID == offeredAns.OfferedAnswerID).AnswerText;
                                //answer.next_QuestionID = offeredAns.next_QuestionID;
                                question.AnswerList.Add(answer);
                            }

                        }

                        return Content(HttpStatusCode.OK, surveyDTO);
                    }
                    else
                        return NotFound();
                }
                else
                    return NotFound();
            }
            catch (Exception ex)
            {
                string source;
                string log;
                string eventname;
                source = "ComparisonXAI Method in SurveyController";
                log = "Application";
                eventname = string.Empty;
                eventname = ex.Message;
                if (!EventLog.SourceExists(source))
                    EventLog.CreateEventSource(source, log);
                EventLog.WriteEntry(source, eventname);
                EventLog.WriteEntry(source, eventname, EventLogEntryType.Error);

                return Content(HttpStatusCode.BadRequest, ex.Message);
            }
        }
        [HttpGet]
        public IHttpActionResult GetSurveyExit(int id)
        {
            var neededSurvey = db.surveys.SingleOrDefault(sur => sur.SurveyID == id);


            if (neededSurvey != null)
            {
                SurveyDTO surveyDTO = new SurveyDTO()
                {
                    SurveyID = neededSurvey.SurveyID,
                    Description = neededSurvey.Description
                };

                //get list of questions for the requested survey 
                var questions = (db.surveys.Include(s => s.survey_question).FirstOrDefault(su => su.SurveyID == surveyDTO.SurveyID));
                surveyDTO.QuestionsList = new List<QuestionDTO>();

                foreach (var existingChild in questions.survey_question.ToList().Where(p => p.QuestionID == Convert.ToInt32(15)))
                {
                    QuestionDTO question = new QuestionDTO();
                    question.QuestionID = existingChild.QuestionID;
                    question.SkipOnRepeat = existingChild.SkipOnRepeat;
                    question.imagePaths = new List<string>();
                    question.QuestionText = db.questions.FirstOrDefault(q => q.QuestionID == existingChild.QuestionID).QuestionText;
                    surveyDTO.QuestionsList.Add(question);
                }

                //loop through the answers and load all answers available for each question 
                foreach (var question in surveyDTO.QuestionsList.ToList())
                {
                    question.AnswerList = new List<AnswerDTO>();
                    var query = (from item in db.survery_question_answer
                                 where item.SurveryID == id
                                 where item.QuestionID == question.QuestionID
                                 select new AnswerDTO()
                                 {
                                     OfferedAnswerID = item.OfferedAnswerID,
                                     //next_QuestionID = item.next_QID

                                 });
                    foreach (var offeredAns in query.ToList())
                    {
                        AnswerDTO answer = new AnswerDTO();
                        answer.OfferedAnswerID = offeredAns.OfferedAnswerID;
                        answer.AnswerText = db.offeredanswers.SingleOrDefault(s => s.OfferedAnswerID == offeredAns.OfferedAnswerID).AnswerText;
                        // answer.next_QuestionID = offeredAns.next_QuestionID;
                        question.AnswerList.Add(answer);
                    }

                }

                return Content(HttpStatusCode.OK, surveyDTO);
            }
            else
                return NotFound();



        }

        // PUT api/survey/1
        public void Put(int id, [FromBody] SurveyQuestionAnswerUserDTO surveryQuestionSAnswersUser)
        {

        }

        // DELETE api/<controller>/5
        public void Delete(int id)
        {
        }
    }
}