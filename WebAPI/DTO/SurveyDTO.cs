using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using ExplainableAIWebApi.Models;
namespace ExplainableAIWebApi.DTO
{
    public class SurveyDTO
    {
        public int SurveyID { get; set; }
        public string Description { get; set; }
        public IList<QuestionDTO> QuestionsList { get; set; }
        public string[] questionIds  ;
           
       
    }
    
}