import {Injectable} from '@angular/core';

import {BehaviorSubject} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class MessagesService {
  amount: number = 0;

  constructor() {
  }

  messages = {};
  msg;
  length: number;
  personIdAndName = new BehaviorSubject(null);

  getMessages(id) {
    this.msg = this.messages[id].slice().reverse();
    this.amount = 0;
    this.length = this.msg.length;
    return (this.length - 20 > 0) ? this.msg.slice(this.length - 20, this.length) : this.msg;
  }


  addMessages() {
    this.amount += 10;
    if (this.length - 20 - this.amount > 0) {
      return this.msg.slice(this.length - 20 - this.amount, this.length);
    } else {
      return this.msg;
    }
  }

  clearMessages() {
    this.messages = [];
  }

}
