var surveyResponse = {
  SurveyID: 1,
  Description: "detecting\r\nartificially-generated images",
  QuestionsList: [
    {
      QuestionID: 1,
     
      QuestionText: "To begin the survey, please tell us who you are. This will help us in understanding wehether our users have an academic background in a field relevant to this experiment, which may have an impact on our experimental analysis.",
      
          AnswerList: [
            {
              OfferedAnswerID: 1,
              AnswerText:
                "Novice user: people has no experience in generic field of computer science",
            },
            {
              OfferedAnswerID: 2,
              AnswerText:
                "Intermediate user: people without training in computer vision, image processing or computer science in general but with self interest in the field ",
            },
            {
              OfferedAnswerID: 3,
              AnswerText:
                "Practice users: people without training in computer vision, image processing, but with working experience in related field",
            },
            {
              OfferedAnswerID: 4,
              AnswerText:
                "Skilled user: people with training in computer vision, image processing or computer science but without or with limited working or research experience (e.g., master students or starting PhD students) ",
            },
            {
              OfferedAnswerID: 5,
              AnswerText:
                "Expert professional: people with training in computer vision or image processing and with ample working or research experience in the field (experience PhD students, postdocs, academics, professionals) ",
            },
          ],
          imagePaths: [],
        
    },
    {
      QuestionID: 2,
      LayoutType: "SingleImageOption",
      QuestionText:
        "Please observe the face image carefully. From your judgement, do you think this is a real image or a fake image? You CAN ZOOM IN to look close to the samll details. \r\n",
      
          AnswerList: [
            {
              OfferedAnswerID: 6,
              AnswerText: "Fake",
            },
            {
              OfferedAnswerID: 7,
              AnswerText: "Real",
            },
          ],
          imagePaths: [
            "https://localhost:44372\\Content\\QuestionPhotos\\1\\q2\\1.PNG",
          ],
       
    },
    {
      QuestionID: 3,
      QuestionText:
        "Why do you think this picture is fake/real. In this image, what inspires your judgment? Could you circle it with the pen? You CAN ZOOM IN to look close to the small details.  \r\n",
      AnswerList: [],
      imagePaths: [
        "https://localhost:44372\\Content\\QuestionPhotos\\1\\q3\\1.PNG",
      ],
    },
    {
      QuestionID: 4,
      QuestionText:
        '\r\nThere are 4 Explanation Heatimaps on the right side. For the Heatmap, the warmer color region (closer to RED) means this Heatmap indicates this region is more FAKE if this is a fake image, more REAL if this is a Foal irgage. The colder color region (closer to DARK BLUE) means this Heatmap indicates this region is more REAL if this is a fake image, more FAKE if this is a real image . \r\nIn this step, the question is, Which Explanation Heatmap is Closer to Your Judgement in the sense that the highlighted regions look FAKE or REAL to you? \r\nHere we show one example, the first one being the original image, the other four being Heatmaps ("Explanations of why the image is fake or real"). If the highlight area of one explanation heatmap is in th your perception, the explanation heatmap is goci , vice versa. Your goal is to find the best one. \r\n \r\n',
      AnswerList: [],
      imagePaths: [
        "https://localhost:44372\\Content\\QuestionPhotos\\1\\q4\\1.PNG",
        "https://localhost:44372\\Content\\QuestionPhotos\\1\\q4\\2.PNG",
        "https://localhost:44372\\Content\\QuestionPhotos\\1\\q4\\3.PNG",
        "https://localhost:44372\\Content\\QuestionPhotos\\1\\q4\\4.PNG",
        "https://localhost:44372\\Content\\QuestionPhotos\\1\\q4\\5.PNG",
      ],
    },
    {
      QuestionID: 5,
      QuestionText:
        "\r\nWhich Explanation Heatmap is Closer to Your Judgement in the sense that the highlighted regions look FAKE or REAL to you? You CAN ZOOM IN to look close to the small details. \r\n",
      AnswerList: [
        {
          OfferedAnswerID: 8,
          AnswerText: "1",
        },
        {
          OfferedAnswerID: 9,
          AnswerText: "2",
        },
        {
          OfferedAnswerID: 10,
          AnswerText: "3",
        },
        {
          OfferedAnswerID: 11,
          AnswerText: "4",
        },
      ],
      imagePaths: [
        "https://localhost:44372\\Content\\QuestionPhotos\\1\\q5\\1.PNG",
        "https://localhost:44372\\Content\\QuestionPhotos\\1\\q5\\2.PNG",
        "https://localhost:44372\\Content\\QuestionPhotos\\1\\q5\\3.PNG",
        "https://localhost:44372\\Content\\QuestionPhotos\\1\\q5\\4.PNG",
        "https://localhost:44372\\Content\\QuestionPhotos\\1\\q5\\5.PNG",
      ],
    },
    {
      QuestionID: 6,
      QuestionText:
        "\r\nWhich Explanation Heatmap is Closer to Your Judgement in the sense that the highlighted regions look FAKE or REAL to you? You CAN ZOO IN to look close to the small details. s. \r\n",
      AnswerList: [
        {
          OfferedAnswerID: 12,
          AnswerText: "1",
        },
        {
          OfferedAnswerID: 13,
          AnswerText: "2",
        },
      ],
      imagePaths: [
        "https://localhost:44372\\Content\\QuestionPhotos\\1\\q6\\1.PNG",
        "https://localhost:44372\\Content\\QuestionPhotos\\1\\q6\\2.PNG",
        "https://localhost:44372\\Content\\QuestionPhotos\\1\\q6\\3.PNG",
      ],
    },
  ],
};

export default surveyResponse;
