import {Component, OnInit, ChangeDetectorRef, DoCheck, OnDestroy} from '@angular/core';

import {ListDialogsService} from '../shared/list-dialogs.service';
import {MessagesService} from '../shared/messanges.service';
import {ResizeWindowService} from '../shared/resize-window.service';

@Component({
  selector: 'app-all-dialogs',
  templateUrl: './all-dialogs.component.html',
  styleUrls: ['./all-dialogs.component.css']
})
export class AllDialogsComponent implements OnInit, OnDestroy {


  constructor(private dialogService: ListDialogsService,
              private msgService: MessagesService,
              private  resizeService: ResizeWindowService,
              private  change: ChangeDetectorRef) {
  }

  listDialog;
  dialogData;

  onSelectDialog(id, nick) {
    const person = {id, nick};
    this.msgService.setPersonData(person);
    this.resizeService.showAllDialogs.emit(false);
  }

  ngOnInit() {
    this.dialogData = this.dialogService.dialogData.subscribe(
      (res) => {
        this.listDialog = res;
        this.change.detectChanges();
      }
    );
  }

  ngOnDestroy() {
    this.dialogData.unsubscribe();
  }


}
