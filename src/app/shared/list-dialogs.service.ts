import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ListDialogsService {
  constructor() {
  }

  private newDialogs: {} = {};
  private dialog = new BehaviorSubject(this.newDialogs);

  dialogData = this.dialog.asObservable();

  clearDialog() {
    this.newDialogs = {};
    this.dialog.next(this.newDialogs);
  }

  addDialog(uid, dialog) {
    this.newDialogs[uid] = dialog;
  }

  upDateDialog() {
    this.dialog.next({...this.newDialogs});
  }
}


// 2) list-dialogs.service.ts
// - не правильно что у тебя есть паблик dialog проперти которое ты используешь извне сервиса.
// - не правильно что у тебя есть паблик newDialogs проперти которое ты используешь извне сервиса.
//   по идее этой проперти вообще быть не должно. текущие данные можно получить из dialog.
//   а у тебя можно одно изменить независимо от другого, это источник ошибок (то что у тебя вчера было)
// - в сервисе должны быть методы которые тебе нужны (добавить, обновить, прочитать, очистить)
//
// аналогично с personIdAndName в messanges.service.ts
