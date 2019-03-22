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
  msg = [];
  length: number;
  private personIdAndName = new BehaviorSubject(null);
  personData = this.personIdAndName.asObservable();

  getMessages(id) {
    this.msg = this.messages[id].slice().reverse();
    this.amount = 0;
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

  setPersonData(data) {
    this.personIdAndName.next(data);
    this.length = this.msg.length;
  }

}
