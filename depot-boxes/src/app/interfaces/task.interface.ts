export interface ITask {
  id: number,
  type: string,
  boxId: number,
  targetTime: Date,
  priority: number,
  isBlocked: boolean,
  isComplete: boolean,
  isActive: boolean
}
