using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.AspNetCore.Http;


namespace ConvexHullFinder_ASP.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class TestController : ControllerBase
    {
        [HttpGet]
        public int Get()
        {
            return 3;
        }

        [HttpPost]
        public int Post([FromBody] int number=0)
        {

            int entryNumber = 3+number;
            return entryNumber;
        }
    }
}
