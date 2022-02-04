import { IBox } from "./box.interface";
import { ITask } from "./task.interface";

export interface IBoxData {
  tasks: ITask[]
  boxes: IBox[]
}
