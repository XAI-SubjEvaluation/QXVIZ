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
using System.Transactions;
//added to add some logging features 
using System.Diagnostics;

namespace ExplainableAIWebApi.Controllers
{
    //[EnableCors(origins: "*", headers: "*", methods: "*")]

    // added to use event viewer logging 
    public class AnswerController : ApiController
    {
        //adding this for basic authentication
        [BasicAuthentication]
        [RequireHttps]

        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET api/<controller>/5
        public string Get(int id)
        {
            return "value";
        }

        // POST api/answer
        [Route("api/answer/postanswer")]
        [HttpPost]
        public IHttpActionResult postanswer([FromBody] SurveyQuestionAnswerUserDTO surveryQuesAnswerUserObj)
        {
            try
            {
                // parse the object and update database and save images 
                using (TransactionScope scope = new TransactionScope())
                {
                    using (var conn = new explainableaidbEntities2())
                    {
                        var insertAnswer = new answer();
                        insertAnswer.SurveryID = surveryQuesAnswerUserObj.SurveryID;
                        insertAnswer.QuestionID = surveryQuesAnswerUserObj.QuestionID;
                        insertAnswer.OfferedAnswerID = surveryQuesAnswerUserObj.OfferedAnswerID;
                        insertAnswer.PersonID = surveryQuesAnswerUserObj.PersonID;
                        insertAnswer.Remarks = surveryQuesAnswerUserObj.Remarks;
                        insertAnswer.TimeTaken = surveryQuesAnswerUserObj.TimeTaken;
                        insertAnswer.SelectedImageURL = surveryQuesAnswerUserObj.imagePath;
                        insertAnswer.AnswerDateTime = DateTime.Now;
                        conn.answers.Add(insertAnswer);
                        conn.SaveChanges();
                        Helpers.Helpers.downloadImageModifiedByUser(surveryQuesAnswerUserObj.ModifiedImage, surveryQuesAnswerUserObj.PersonID, insertAnswer.AnswerID);
                    }
                    scope.Complete();
                }
                return Content(HttpStatusCode.Created, "The answer record is registered.");
            }
            catch (Exception ex)
            {
                string source;
                string log;
                string eventname;
                source = "Postanswer Method in AnswerController";
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

        // PUT api/<controller>/5
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<controller>/5
        public void Delete(int id)
        {
        }
    }
}