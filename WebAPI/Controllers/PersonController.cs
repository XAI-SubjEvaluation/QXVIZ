using ExplainableAIWebApi.Filters;
using ExplainableAIWebApi.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Mvc;
using ExplainableAIWebApi.DTO;
using System.Transactions;
using HttpPostAttribute = System.Web.Http.HttpPostAttribute;
using RouteAttribute = System.Web.Http.RouteAttribute;
using HttpPutAttribute = System.Web.Http.HttpPutAttribute;
using System.Web.Http.Cors;
using Newtonsoft.Json;
//added to add some logging features 
using System.Diagnostics;

namespace ExplainableAIWebApi.Controllers
{
    //[EnableCors(origins: "*", headers: "*", methods: "*")]
    //adding this for basic authentication
    [BasicAuthentication]
    [RequireHttps]
    public class PersonController : ApiController
    {

        //Connect to the database
        private explainableaidbEntities2 db = new explainableaidbEntities2();

        // GET api/person
        public IHttpActionResult Get()
        {
            var query = from p in db.people.ToList<person>()
                        orderby p.PersonID
                        select new PersonDTO
                        {
                            FirstName = p.FirstName,
                            LastName = p.LastName,
                            Email = p.Email,
                            Password = p.Password,
                            PersonID = p.PersonID

                        };
            return Json(query);
        }

        // GET api/<controller>/5
        public string Get(int id)
        {
            return "value";
        }

        //Create an account for a person
        // POST api/person
        [Route("api/person")]
        [HttpPost]
        public IHttpActionResult Post([FromBody] PersonDTO personObjectDTO)
        {
            try
            {
                person createdPerson;
                //check if the sent object has already been registered in the DB and return its user id
                var currentPerson = db.people.SingleOrDefault(p => p.Email == personObjectDTO.Email);
                if (currentPerson != null)
                {
                    //return the person id in the database to be used later by front end 
                    return Content(HttpStatusCode.Found, currentPerson.PersonID);
                }
                else
                {
                    // encode the password -- to be done
                    var keyNew = Helpers.Helpers.GeneratePassword(10);
                    var password = Helpers.Helpers.EncodePassword(personObjectDTO.Password, keyNew);
                    personObjectDTO.Vcode = keyNew;
                    personObjectDTO.Password = password;

                    using (TransactionScope scope = new TransactionScope())
                    {
                        using (var ctx = new explainableaidbEntities2())
                        {
                            createdPerson = new person()
                            {
                                FirstName = personObjectDTO.FirstName,
                                LastName = personObjectDTO.LastName,
                                Email = personObjectDTO.Email,
                                Password = personObjectDTO.Password,
                                Vcode = personObjectDTO.Vcode

                            };
                            ctx.people.Add(createdPerson);
                            ctx.SaveChanges();
                        }
                        scope.Complete();
                    }

                }

                return Content(HttpStatusCode.Created, createdPerson.PersonID);
            }
            catch (Exception ex)
            {
                string source;
                string log;
                string eventname;
                source = "Post Method in PersonController";
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


        [Route("api/person/userlogin")]
        [HttpPost]
        public IHttpActionResult UserLogin([FromBody] PersonDTO personCreds)
        {
            try
            {

                using (explainableaidbEntities2 ctx = new explainableaidbEntities2())
                {
                    //Check if the user exists 
                    var isUserExisted = ctx.people.SingleOrDefault(a => a.Email == personCreds.Email);
                    if (isUserExisted != null)
                    {
                        //decode the password stored in DB 
                        //Encode the artist password 
                        var hashCode = isUserExisted.Vcode;
                        //Password Hashing Process Call Helper Class Method    
                        var encodingPasswordString = Helpers.Helpers.EncodePassword(personCreds.Password, hashCode);

                        if (isUserExisted.Password == encodingPasswordString)
                        {

                            //return Ok();
                            return Content(HttpStatusCode.OK, JsonConvert.SerializeObject(new { PersonID = isUserExisted.PersonID }));
                        }
                        else
                            return Content(HttpStatusCode.BadRequest, "Wrong user credentials.");

                    }
                    else
                    { return NotFound(); }
                }
            }
            catch (Exception ex)
            {
                string source;
                string log;
                string eventname;
                source = "UserLogin Method in PersonController";
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

        [Route("api/person/changepassword")]
        [HttpPut]
        public IHttpActionResult UserChangePassword([FromBody] PersonDTO personCred)
        {
            try
            {
                //get artist object from db
                using (explainableaidbEntities2 ctx = new explainableaidbEntities2())
                {
                    //check if the user exists in DB 
                    var isUserExist = ctx.people.SingleOrDefault(p => p.Email == personCred.Email);
                    if (isUserExist != null)
                    {
                        // change old vcode and password to new ones
                        var keyNew = Helpers.Helpers.GeneratePassword(10);
                        var password = Helpers.Helpers.EncodePassword(personCred.Password, keyNew);
                        isUserExist.Vcode = keyNew;
                        isUserExist.Password = password;
                        ctx.SaveChanges();
                        return Content(HttpStatusCode.OK, "New password has been updated successfully.");

                    }

                    else
                        return Content(HttpStatusCode.BadRequest, "Wrong user email address.");
                }
            }
            catch (Exception ex)
            {
                string source;
                string log;
                string eventname;
                source = "UserChangePassword Method in PersonController";
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

        // DELETE api/<controller>/5
        public void Delete(int id)
        {
        }
    }
}