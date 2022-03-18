using depot_boxes_server.Models;

namespace depot_boxes_server.Queues
{

    public class MoveTaskComparer: IComparer<MoveTask>
    {

        public int Compare(MoveTask x, MoveTask y)
        {
            int retval = 0;
            if(x.Priority < y.Priority)
            {
                retval = -1;
            }
            else if(x.Priority > y.Priority)
            {
                retval = 1;
            }
            return retval;
        }

    }


    public class TaskQueue
    {

        private PriorityQueue<MoveTask, MoveTask> _priorityQueue;

        public TaskQueue()
        {
            _priorityQueue = new PriorityQueue<MoveTask, MoveTask>(new MoveTaskComparer());
        }

        public void AddTask(MoveTask task)
        {
            _priorityQueue.Enqueue(task, task);
        }

        public void AddTasks(IEnumerable<MoveTask> tasks)
        {
            foreach(MoveTask task in tasks)
            {
                AddTask(task);
            }
        }

        public void RemoveTask(int taskId)
        {

        }

        public MoveTask GetNextTask()
        {
            return _priorityQueue.Dequeue();
        }

        public void UpdateTask(MoveTask task)
        {

        }

        public IEnumerable<MoveTask> ListTasks(int startIndex = 0, int endIndex = int.MaxValue)
        {
            return null;
        }

    }
}
