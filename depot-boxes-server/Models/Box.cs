using Newtonsoft.Json;

namespace depot_boxes_server.Models
{

    public class Box
    {

        [JsonProperty("id")]
        public int Id { get; set; }

        [JsonProperty("reference")]
        public string Reference { get; set; }

        [JsonProperty("locationid")]
        public int LocationId { get; set; }

        [JsonProperty("cube")]
        public int Cube { get; set; }

        [JsonProperty("contents")]
        public string Contents { get; set; }
        //public BoxContentType Contents { get; set; }

    }

}
