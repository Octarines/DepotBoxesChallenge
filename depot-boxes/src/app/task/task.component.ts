import { Component, Input, OnInit } from '@angular/core';
import { ITask } from '../interfaces/task.interface';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {

  @Input()
  task: ITask;

  constructor() { }

  ngOnInit(): void {
  }

}
