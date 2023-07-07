using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ExplainableAIWebApi.DTO
{
    public class QuestionDTO 
    {
        public int? QuestionOrderNumber { get; set; }
        public int? NextQuestionOrderNumber { get; set; }
        public Nullable<bool> SkipOnRepeat { get; set; }
        public int QuestionID { get; set; }
        public string QuestionText { get; set; }
        public IList<AnswerDTO> AnswerList { get; set; }
        public IList<String> imagePaths { get; set; }

       


    }
}