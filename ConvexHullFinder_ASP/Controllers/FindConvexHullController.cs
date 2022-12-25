using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.AspNetCore.Http;
using System.Text;
using System.IO;


namespace ConvexHullFinder_ASP.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class FindConvexHullController : ControllerBase
    {

        [HttpPost]
        public string Post()
        {
            Task<string> requestReadTask = new StreamReader(Request.Body).ReadToEndAsync();
            string result = requestReadTask.Result;
            return result;
        }
    }
}
