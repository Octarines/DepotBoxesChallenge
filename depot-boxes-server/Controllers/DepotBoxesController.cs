using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace depot_boxes_server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DepotBoxesController : ControllerBase
    {

        // GET: api/<DepotBoxesController>
        [HttpGet]
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET api/<DepotBoxesController>/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST api/<DepotBoxesController>
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT api/<DepotBoxesController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<DepotBoxesController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
