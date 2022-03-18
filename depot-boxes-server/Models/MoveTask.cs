namespace depot_boxes_server.Models
{
    public class MoveTask
    {

        public string Description { get; set; }

        public int id { get; set; }

        //public TaskType {get;set;}

        public int BoxId { get; set; }

        public DateTime CompleteBy { get; set; }

        public int priority { get; set; }

        public bool IsBlocked { get; set; }

        public bool IsComplete { get; set; }

        public bool IsActive { get; set; }

    }
}
