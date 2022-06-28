import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms'
import { Itask } from '../model/task';




@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {

  tasks : Itask [] = [];
  fazendo : Itask [] = [];
  feito : Itask [] = [];
  updateId!:any;
  isEditEnabled: boolean = false;


  todoForm !: FormGroup;


  constructor( private fb : FormBuilder) { }

  ngOnInit(): void {
    this.todoForm = this.fb.group({
      item: [ '', Validators.required]

    })
  }

  addTask(){
    this.tasks.push({
      description:this.todoForm.value.item,
      done: false
    });
    this.todoForm.reset();
    

  }

  deleteTask(i: number){
    this.tasks.splice(i,1)
  }

  deleteInProgressTask(i: number){
    this.fazendo.splice(i,1)
  }

  deleteDoneTask (i: number){
    this.feito.splice(i,1)
  }

  onEdit( item: Itask, i :number){
    this.todoForm.controls['item'].setValue(item.description);
    this.updateId = i;
    this.isEditEnabled = true;

  }

  updateTask(){
    this.tasks[this.updateId].description = this.todoForm.value.item;
    this.tasks[this.updateId].done = false;
    this.todoForm.reset();
    this.updateId = undefined;
    this.isEditEnabled = false;

  }



  drop(event: CdkDragDrop<Itask[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }

}
