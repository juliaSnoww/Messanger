import {Component, DoCheck, OnInit} from '@angular/core';

import {Dialogs} from '../model/list-dialogs.model';
import {ListDialogsService} from '../shared/list-dialogs.service';
import {MessagesService} from '../shared/messanges.service';
import {ResizeWindowService} from '../shared/resize-window.service';
import {BehaviorSubject} from 'rxjs';

@Component({
  selector: 'app-all-dialogs',
  templateUrl: './all-dialogs.component.html',
  styleUrls: ['./all-dialogs.component.css']
})
export class AllDialogsComponent implements OnInit, DoCheck {

  constructor(private dialogService: ListDialogsService,
              private msgService: MessagesService,
              private  resizeService: ResizeWindowService) {
  }

  listDialog;

  onSelectDialog(id) {
    this.msgService.dialogId.next(id);
    this.resizeService.showDialog.emit(false);
  }

  ngOnInit() {
    this.dialogService.dialogData.subscribe(
      (res) => {
        console.log(this.listDialog);
        this.listDialog = res;
      }
    );
  }

  ngDoCheck() {

  }
}
