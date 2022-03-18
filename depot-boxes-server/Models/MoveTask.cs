using Newtonsoft.Json;

namespace depot_boxes_server.Models
{
    public class MoveTask
    {

        [JsonProperty("description")]
        public string Description { get; set; }

        [JsonProperty("id")]
        public int Id { get; set; }

        [JsonProperty("type")]
        public string Type { get; set; }

        [JsonProperty("boxId")]
        public int BoxId { get; set; }

        [JsonProperty("targetTime")]
        public DateTime TargetTime { get; set; }

        [JsonProperty("priority")]
        public int Priority { get; set; }

        [JsonProperty("isBlocked")]
        public bool IsBlocked { get; set; }

        [JsonProperty("IsComplete")]
        public bool IsComplete { get; set; }

        [JsonProperty("isActive")]
        public bool IsActive { get; set; }

        /*
        public int CompareTo(MoveTask compare)
        {
            int retval = 1;
            if(Priority < compare.Priority)
            {
                retval = -1;
            }
            else if(Priority > compare.Priority)
            {
                retval = 1;
            }
            return retval;
        }
        */

    }
}
