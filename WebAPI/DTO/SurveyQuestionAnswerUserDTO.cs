using System;
using System.Collections.Generic;
using System.Drawing;
using System.Linq;
using System.Web;

namespace ExplainableAIWebApi.DTO
{
    public class SurveyQuestionAnswerUserDTO
    {
        public int SurveryID { get; set; }
        public int QuestionID { get; set; }
        public int OfferedAnswerID { get; set; }
        public string imagePath { get; set; }
        public int PersonID { get; set; }
        public string Remarks { get; set; }
        public Nullable<int> TimeTaken { get; set; }
        public string ModifiedImage { get; set; }

    }
}