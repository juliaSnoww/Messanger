import {Injectable} from '@angular/core';
import {Dialogs} from './list-dialogs.module';

@Injectable({
  providedIn: 'root'
})
export class ListDialogsService {
  dialogs: Dialogs[] = [
    new Dialogs('Pizza', 'flour and meat', '../../assets/pizza.jpg', 10),
    new Dialogs('Chicken', 'cute and chichken', '../../assets/chicken.jpg', 20),
    new Dialogs('Bread', 'wheat and white', '../../assets/bread.jpg', 30),
    new Dialogs('Tea', 'warm and perfect', '../../assets/tea.jpg', 40)

  ];

  constructor() {
  }
}
