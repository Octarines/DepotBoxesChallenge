namespace depot_boxes_server.Models
{

    public class Location
    {

        public int Id { get; set; }

        public string Name { get; set; }

        public string Type { get; set; }

        public int X { get; set; }

        public int Y { get; set; } 

        public int Width { get; set; }

        public int Height { get; set; }


        // not today
        //public AcceptedContentType AcceptedContentType { get; set; }

        //public Gateway Gateway { get; set; }

    }

}
