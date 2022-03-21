using Microsoft.AspNetCore.Mvc;
using depot_boxes_server.Models;
using System.Net.WebSockets;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using depot_boxes_server.Queues;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace depot_boxes_server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DepotBoxesController : ControllerBase
    {

        private readonly IConfiguration _configuration;
        private TaskQueue _queue = new TaskQueue();

        public DepotBoxesController(IConfiguration configuration)
        {
            _configuration = configuration;
        }
        
        [HttpGet]
        [Route("InitialTasks")]
        public async Task<IEnumerable<MoveTask>> InitialTasks()
        {
            IList<MoveTask> tasks;
            using(HttpClient client = new HttpClient())
            {
                HttpResponseMessage response = await client.GetAsync(_configuration.GetValue<string>("WebSockets:InitialBoxUrl"));
                var contents = await response.Content.ReadAsStringAsync();
                JObject jobject = JObject.Parse(contents);
                tasks = jobject["tasks"].Value<JArray>().ToObject<List<MoveTask>>();
                IList<Box> boxes = jobject["boxes"].Value<JArray>().ToObject<List<Box>>();

                tasks.ElementAt(100).Priority = 1;
                tasks.ElementAt(100).Description = "bob";

                _queue.AddTasks(tasks);

                var t = _queue.GetNextTask();
            }
            return tasks;
        }
        

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
