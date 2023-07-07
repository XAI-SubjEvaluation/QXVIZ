using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using ExplainableAIWebApi.DTO;
using ExplainableAIWebApi.Models;
using System.IO;
using System.Configuration;
using System.Security.Cryptography;
using System.Text;

namespace ExplainableAIWebApi.Helpers
{
    public class Helpers
    {
        //settings 
        private static Random rng = new Random();
        public enum heatmapsTypes { Bilateral =1 , Original=2 };
        public enum fakeORreal { fake = 1, real = 2 };
        public enum heatmaps { GradCAM = 1, LRP = 2 , SelfAttention=3 , TransformerAttribution=4 , FaceImagesWeb=5 };

        public enum iterationsNames  { FixedQuestions=0 , Fake_Fake=1, Fake_Real=2, Real_Fake=3, Real_Real=4, TwoDataSets=5 };


        // Instantiate random number generator.  
        private static readonly Random _random = new Random();
        private explainableaidbEntities2 db = new explainableaidbEntities2();
        
        // Generates a random number within a range.      
        public static int RandomNumber(int min, int max)
        {
            return _random.Next(min, max);
        }

        public static string getTheoppositPathOfTheSelectedHeatMap(string heatMapPath)
        {
              heatMapPath = heatMapPath.ToLower().Replace('\\','/');


            if (heatMapPath.Contains(heatmaps.LRP.ToString().ToLower()) && heatMapPath.Contains(heatmapsTypes.Original.ToString().ToLower()))
                return heatMapPath.Replace(heatmapsTypes.Original.ToString().ToLower(), heatmapsTypes.Bilateral.ToString().ToLower()).Split('/').Last().Replace("_","_bilafilt") ;
            else if (heatMapPath.Contains(heatmaps.LRP.ToString().ToLower()) && heatMapPath.Contains(heatmapsTypes.Bilateral.ToString().ToLower()))
                return heatMapPath.Replace(heatmapsTypes.Original.ToString().ToLower(), heatmapsTypes.Original.ToString().ToLower()).Split('/').Last().Replace( "_bilafilt", "_"); 
            else if (heatMapPath.Contains(heatmaps.GradCAM.ToString().ToLower()) && heatMapPath.Contains(heatmapsTypes.Original.ToString().ToLower()))
                return heatMapPath.Replace(heatmapsTypes.Original.ToString().ToLower(), heatmapsTypes.Bilateral.ToString().ToLower()).Split('/').Last().Replace("_", "_bilafilt");
            else if (heatMapPath.Contains(heatmaps.GradCAM.ToString().ToLower()) && heatMapPath.Contains(heatmapsTypes.Bilateral.ToString().ToLower()))
                return heatMapPath.Replace(heatmapsTypes.Original.ToString().ToLower(), heatmapsTypes.Original.ToString().ToLower()).Split('/').Last().Replace("_bilafilt", "_");
            else if (heatMapPath.Contains(heatmaps.SelfAttention.ToString().ToLower()) && heatMapPath.Contains(heatmapsTypes.Original.ToString().ToLower()))
                return heatMapPath.Replace(heatmapsTypes.Original.ToString().ToLower(), heatmapsTypes.Bilateral.ToString().ToLower()).Split('/').Last().Replace("_", "_bilafilt");
            else if (heatMapPath.Contains(heatmaps.SelfAttention.ToString().ToLower()) && heatMapPath.Contains(heatmapsTypes.Bilateral.ToString().ToLower()))
                return heatMapPath.Replace(heatmapsTypes.Original.ToString().ToLower(), heatmapsTypes.Original.ToString().ToLower()).Split('/').Last().Replace("_bilafilt", "_");
            else if (heatMapPath.Contains(heatmaps.TransformerAttribution.ToString().ToLower()) && heatMapPath.Contains(heatmapsTypes.Original.ToString().ToLower()))
                return heatMapPath.Replace(heatmapsTypes.Original.ToString().ToLower(), heatmapsTypes.Bilateral.ToString().ToLower()).Split('/').Last().Replace("_", "_bilafilt"); 
            else if (heatMapPath.Contains(heatmaps.TransformerAttribution.ToString().ToLower()) && heatMapPath.Contains(heatmapsTypes.Bilateral.ToString().ToLower()))
                return heatMapPath.Replace(heatmapsTypes.Original.ToString().ToLower(), heatmapsTypes.Original.ToString().ToLower()).Split('/').Last().Replace("_bilafilt", "_"); 
            else
                return heatMapPath;


        }
        public static IList<string> getImagePathsByQuestionId(string imagePath)
        {
            // get the photo
            Random rnd = new Random();
            IList<string> Files = Directory.GetFiles(AppDomain.CurrentDomain.BaseDirectory + @imagePath +"\\");
            IList<string> filesRelativePaths = new List<string>();
            string domainName = HttpContext.Current.Request.Url.GetLeftPart(UriPartial.Authority);
            if (Files.Count != 0)
            {
                int randomIndex = rnd.Next(0, Files.Count);
                string fileItem = Files[randomIndex];

                string relativePath;
                    Uri file = new Uri(@fileItem);
                    // Must end in a slash to indicate folder
                    Uri folder = new Uri(AppDomain.CurrentDomain.BaseDirectory);
                    relativePath =
                    Uri.UnescapeDataString(
                       folder.MakeRelativeUri(file)
                           .ToString()
                           .Replace('/', Path.DirectorySeparatorChar)
                       );
                    filesRelativePaths.Add(domainName + ConfigurationManager.AppSettings["ServerPrefix"].ToString() + "\\"+relativePath);
            }
                
            return filesRelativePaths;

        }

        public static IList<string> getImage(string imagePath)
        {
            // get the photo
            //Random rnd = new Random();
            //IList<string> Files = Directory.GetFiles(AppDomain.CurrentDomain.BaseDirectory + @imagePath );
            IList<string> filesRelativePaths = new List<string>();
            string domainName = HttpContext.Current.Request.Url.GetLeftPart(UriPartial.Authority);
            //if (Files.Count != 0)
           //{
                //int randomIndex = rnd.Next(0, Files.Count);
                /*string fileItem = imagePath;

                string relativePath;
                Uri file = new Uri(@fileItem);
                // Must end in a slash to indicate folder
                Uri folder = new Uri(AppDomain.CurrentDomain.BaseDirectory);
                relativePath =
                Uri.UnescapeDataString(
                   folder.MakeRelativeUri(file)
                       .ToString()
                       .Replace('/', Path.DirectorySeparatorChar)
                   );*/
                filesRelativePaths.Add(domainName + ConfigurationManager.AppSettings["ServerPrefix"].ToString() + "\\" + imagePath);
           // }

            return filesRelativePaths;

        }

        public static string GeneratePassword(int length) //length of salt    
        {
            const string allowedChars = "abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNOPQRSTUVWXYZ0123456789";
            var randNum = new Random();
            var chars = new char[length];
            var allowedCharCount = allowedChars.Length;
            for (var i = 0; i <= length - 1; i++)
            {
                chars[i] = allowedChars[Convert.ToInt32((allowedChars.Length) * randNum.NextDouble())];
            }
            return new string(chars);
        }
        public static string EncodePassword(string pass, string salt) //encrypt password    
        {
            byte[] bytes = Encoding.Unicode.GetBytes(pass);
            byte[] src = Encoding.Unicode.GetBytes(salt);
            byte[] dst = new byte[src.Length + bytes.Length];
            System.Buffer.BlockCopy(src, 0, dst, 0, src.Length);
            System.Buffer.BlockCopy(bytes, 0, dst, src.Length, bytes.Length);
            HashAlgorithm algorithm = HashAlgorithm.Create("SHA1");
            byte[] inArray = algorithm.ComputeHash(dst);
            //return Convert.ToBase64String(inArray);    
            return EncodePasswordMd5(Convert.ToBase64String(inArray));
        }
        public static string EncodePasswordMd5(string pass) //Encrypt using MD5    
        {
            Byte[] originalBytes;
            Byte[] encodedBytes;
            MD5 md5;
            //Instantiate MD5CryptoServiceProvider, get bytes for original password and compute hash (encoded password)    
            md5 = new MD5CryptoServiceProvider();
            originalBytes = ASCIIEncoding.Default.GetBytes(pass);
            encodedBytes = md5.ComputeHash(originalBytes);
            //Convert encoded bytes back to a 'readable' string    
            return BitConverter.ToString(encodedBytes);
        }
        public static string getHeatMapEX(string heatMapFolderName)
        {
            return (heatMapFolderName.ToLower().Contains(Helpers.heatmaps.GradCAM.ToString().ToLower()) ? "GradCAM" : (heatMapFolderName.ToLower().Contains(Helpers.heatmaps.LRP.ToString().ToLower()) ? heatmaps.LRP.ToString() : (heatMapFolderName.ToLower().Contains(Helpers.heatmaps.SelfAttention.ToString().ToLower()) ? "attention" : (heatMapFolderName.ToLower().Contains(Helpers.heatmaps.TransformerAttribution.ToString().ToLower()) ? "TA":"" ))));

        }
        public static string getHeaMapFolderName(string heatMapFolderName)
        {
            return (heatMapFolderName.ToLower().Contains(Helpers.heatmaps.GradCAM.ToString().ToLower()) ? "GradCAM" : (heatMapFolderName.ToLower().Contains(Helpers.heatmaps.LRP.ToString().ToLower()) ? heatmaps.LRP.ToString() : (heatMapFolderName.ToLower().Contains(Helpers.heatmaps.SelfAttention.ToString().ToLower()) ? "SelfAttention" : (heatMapFolderName.ToLower().Contains(Helpers.heatmaps.TransformerAttribution.ToString().ToLower()) ? "TransformerAttribution" : ""))));

        }
        public static string base64Decode(string sData) //Decode    
        {
            try
            {
                var encoder = new System.Text.UTF8Encoding();
                System.Text.Decoder utf8Decode = encoder.GetDecoder();
                byte[] todecodeByte = Convert.FromBase64String(sData);
                int charCount = utf8Decode.GetCharCount(todecodeByte, 0, todecodeByte.Length);
                char[] decodedChar = new char[charCount];
                utf8Decode.GetChars(todecodeByte, 0, todecodeByte.Length, decodedChar, 0);
                string result = new String(decodedChar);
                return result;
            }
            catch (Exception ex)
            {
                throw new Exception("Error in base64Decode" + ex.Message);
            }
        }

        public static void downloadImageModifiedByUser(string imageContent,int userId , int answerID)
        {
            try
            {
                var relativePath = "~\\Content\\UsersAnswers\\" + userId + "\\";
                //var relativePath = Environment.GetEnvironmentVariable("HOME") + "\\site\\wwwroot\\" + "Content\\UsersAnswers\\" + userId + "\\q" + questionId + "\\";
                var filename = answerID+".jpg";
                //string data 
                string cleandata = imageContent.Replace("data:image/png;base64,", "");
                byte[] data = System.Convert.FromBase64String(cleandata);
                MemoryStream ms = new MemoryStream(data);
                System.Drawing.Image img = System.Drawing.Image.FromStream(ms);
                //if not exists create one
                if (!Directory.Exists(HttpContext.Current.Server.MapPath(relativePath)))
                {
                    Directory.CreateDirectory(HttpContext.Current.Server.MapPath(relativePath));
                }
                var fullPath = Path.Combine( HttpContext.Current.Server.MapPath(relativePath) , filename);
                img.Save(fullPath , System.Drawing.Imaging.ImageFormat.Jpeg);
            }
            catch (Exception ex)
            {
                var x = ex.InnerException;
                Console.WriteLine(x);
                
            }
        }

        //shuffle the order of heatmaps in deepfake detection 
        public static IList<string> Shuffle( IList<string> list)
        {
            int n = list.Count;
            while (n > 1)
            {
                n--;
                int k = rng.Next(n + 1);
                if (k != 0)
                {
                    string value = list[k];
                    list[k] = list[n];
                    list[n] = value;
                }
            }
            return list;
        }
    }
}