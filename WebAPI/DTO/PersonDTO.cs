using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ExplainableAIWebApi.DTO
{
    public class PersonDTO
    {
        public int PersonID { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string Vcode { get; set; }
    }
}