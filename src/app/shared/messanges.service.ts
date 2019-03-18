import {Injectable} from '@angular/core';
import {Messages} from '../model/messanges.model';
import {BehaviorSubject} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class MessagesService {
  amount: number = 0;

  constructor() {
  }

  messages = {
  };
  dialogId = new BehaviorSubject(null);

  getMessages(id) {
    console.log('get msg');
    this.amount = 0;
    return this.messages[id].slice(-10);
  }

  addMessages(id) {
    console.log('add msg');
    this.amount += 10;
    return this.messages[id].slice(-10 - this.amount);
  }

}
