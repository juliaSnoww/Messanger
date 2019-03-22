import {Component, OnInit, ChangeDetectorRef} from '@angular/core';

import {ResizeWindowService} from './shared/resize-window.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {

  constructor(private resizeService: ResizeWindowService,
              private change: ChangeDetectorRef) {
  }

  largeWindow: boolean;
  showAllDialogs: boolean = true;

  onResize() {
    this.largeWindow = this.resizeService.isBig();
  }

  ngOnInit() {
    this.largeWindow = this.resizeService.isBig();
    this.resizeService.showAllDialogs.subscribe(
      (params) => {
        this.showAllDialogs = params;
        this.change.detectChanges();
      });
  }
}
