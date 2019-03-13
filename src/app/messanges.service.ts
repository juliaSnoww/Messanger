import {EventEmitter, Injectable} from '@angular/core';
import {Messanges} from './messanges.module';

@Injectable({
  providedIn: 'root'
})
export class MessangesService {
  amount: number = 0;

  constructor() {
  }

  messages = {
    10: [
      new Messanges(1, 'Hello'),
      new Messanges(0, 'Hi'),
      new Messanges(1, 'Ky'),
      new Messanges(0, 'how'),
      new Messanges(0, 'are'),
      new Messanges(0, 'you'),
      new Messanges(0, '?'),
      new Messanges(1, 'fine'),
      new Messanges(1, 'tomato'),
      new Messanges(0, 'I noticed people were trying to find a generator like fancy letters'),
      new Messanges(1, 'like the old enlgish one, and specialise this a bit.'),
      new Messanges(0, 'Please add arabdances font style. I will be so grateful to ur good self'),
      new Messanges(1, 'Never'),
      new Messanges(0, 'So this place is connected to Gogoanime and Kissanime?'),
      new Messanges(0, 'Strange'),
      new Messanges(0, 'this'),
      new Messanges(1, 'hot'),
      new Messanges(1, 'dog'),
      new Messanges(0, 'Btw You can Delete the Words Please Fix!'),
      new Messanges(1, 'a short electronic message designed for communication between mobile phone users. Nowadays, text messages can'),
      new Messanges(0, 'The Molong Express District Advertiser is a newspaper published in Molong, New South Wales, Australia since 1876.'),
      new Messanges(1, 'Title from title screen.'),
      new Messanges(0, 'Australia New South Wales Molong'),
      new Messanges(1, 'Good'),
      new Messanges(1, 'bye'),
      new Messanges(0, 'ta ta')],
    20: [
      new Messanges(1, 'Hello'),
      new Messanges(0, 'Hi'),
      new Messanges(1, 'Ky'),
      new Messanges(0, 'how'),
      new Messanges(0, 'are'),
      new Messanges(0, 'you'),
      new Messanges(0, '?'),
      new Messanges(1, 'fine'),
      new Messanges(1, 'tomato')
    ],
    30: [
      new Messanges(0, 'Btw You can Delete the Words Please Fix!'),
      new Messanges(1, 'a short electronic message designed for communication between mobile phone users. Nowadays, text messages can'),
      new Messanges(0, 'The Molong Express District Advertiser is a newspaper published in Molong, New South Wales, Australia since 1876.'),
      new Messanges(1, 'Title from title screen.'),
      new Messanges(0, 'Australia New South Wales Molong'),
      new Messanges(1, 'Good'),
      new Messanges(1, 'bye'),
      new Messanges(0, 'ta ta')
    ],
    40: [
      new Messanges(0, 'I noticed people were trying to find a generator like fancy letters'),
      new Messanges(1, 'like the old enlgish one, and specialise this a bit.'),
      new Messanges(0, 'Please add arabdances font style. I will be so grateful to ur good self'),
      new Messanges(1, 'hot'),
      new Messanges(1, 'a short electronic message designed for communication between mobile phone users. Nowadays, text messages can'),
      new Messanges(0, 'The Molong Express District Advertiser is a newspaper published in Molong, New South Wales, Australia since 1876.'),
      new Messanges(1, 'Title from title screen.'),
      new Messanges(0, 'Australia New South Wales Molong'),
      new Messanges(1, 'dog'),
      new Messanges(1, 'Never'),
      new Messanges(0, 'So this place is connected to Gogoanime and Kissanime?'),
      new Messanges(0, 'Strange'),
      new Messanges(0, 'this'),
      new Messanges(0, 'Btw You can Delete the Words Please Fix!'),
      new Messanges(1, 'Good'),
      new Messanges(1, 'bye'),
      new Messanges(0, 'ta ta')
    ]
  };
  dialogId = new EventEmitter();

  getMessages(id) {
    console.log('get mess');
    this.amount = 0;
    return this.messages[id].slice(-10);
  }

  addMessages(id) {
    console.log('add mess');
    this.amount += 10;
    return this.messages[id].slice(-10 - this.amount);
  }

}
