using ExplainableAIWebApi.Filters;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;
using System.Web.Http.Cors;

namespace ExplainableAIWebApi
{
    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {
            // Web API configuration and services
            // New code for enabling cors
            var cors = new EnableCorsAttribute("*", "*", "*");
           /* {
                SupportsCredentials = true
            };*/
            config.EnableCors();
            // Web API routes
            config.MapHttpAttributeRoutes();

            
            config.Routes.MapHttpRoute(
              name: "ControllerAndActionOnly",
              routeTemplate: "api/{controller}/{action}",
              defaults: new { },
              constraints: new { action = @"^[a-zA-Z]+([\s][a-zA-Z]+)*$" });

            config.Routes.MapHttpRoute(
              name: "DefaultActionApi",
              routeTemplate: "api/{controller}/{action}/{id}",
              defaults: new { id = RouteParameter.Optional }
            );


            //add this for basic authentication filter for the web api 
            config.Filters.Add(new BasicAuthenticationAttribute());
        }
    }
}
