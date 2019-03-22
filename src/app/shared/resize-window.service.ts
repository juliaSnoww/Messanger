import {EventEmitter, Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ResizeWindowService {
  constructor() {
  }

  showAllDialogs = new EventEmitter();

  isBig() {
    return (window.innerWidth > 860);
  }

}
