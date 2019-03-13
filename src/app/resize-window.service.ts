import {EventEmitter, Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ResizeWindowService {
  constructor() {
  }

  showDialog = new EventEmitter();

  onResizeWindow() {
    return (window.innerWidth > 860);
  }

}
