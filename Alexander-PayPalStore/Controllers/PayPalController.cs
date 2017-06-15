using Alexander_PayPalStore.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace Alexander_PayPalStore.Controllers.WebApiController
{
    public class PayPalController : ApiController
    {
 

        [Route("SendKey")]
        [HttpGet]
        // GET api/<controller>
        public IEnumerable<string> SendKey(string bearer)
        {
            MyKeys.bearer = bearer;
            return new string[] {"Nyckeln är"+MyKeys.bearer };
            
        }


        [Route("GetKey")]
        [HttpGet]
        public IEnumerable<string> GetKey()
        {
            return new string[] { MyKeys.bearer};
        }
        // GET api/<controller>/5
        public string Get(int id)
        {
            return "value";
        }

        // POST api/<controller>
        public void Post([FromBody]string value)
        {
        }

        // PUT api/<controller>/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/<controller>/5
        public void Delete(int id)
        {
        }
    }
}