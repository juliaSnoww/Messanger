import {EventEmitter, Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ResizeWindowService {
  constructor() {
  }

  showDialog = new EventEmitter();

  isSmall() {
    return (window.innerWidth > 860);
  }

}
