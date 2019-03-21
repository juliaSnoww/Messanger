import {Injectable} from '@angular/core';
import {ListDialogsModel} from '../model/list-dialogs.model';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ListDialogsService {
  constructor() {
  }

  newDialogs: {} = {};
  dialog = new BehaviorSubject(this.newDialogs);
  dialogData = this.dialog.asObservable();

  clearDialog() {
    this.newDialogs = {};
    this.dialog.next(this.newDialogs);
  }
}
