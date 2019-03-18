import {AfterViewInit, Component, OnInit} from '@angular/core';

import {ResizeWindowService} from './shared/resize-window.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, AfterViewInit {

  constructor(private resizeService: ResizeWindowService) {
  }

  largeWindow: boolean;
  showAllDialogs: boolean = true;

  onResize() {
    this.largeWindow =  this.resizeService.onResizeWindow();
  }

  ngOnInit() {
    this.largeWindow = this.resizeService.onResizeWindow();
    this.resizeService.showDialog.subscribe(
      (params) => {
        this.showAllDialogs = params;
      });
  }

  ngAfterViewInit() {
      const app = document.querySelector('app-dialog');
     // app.scrollBy(0, window.innerHeight);
  }
}
