import {Component, OnInit} from '@angular/core';

import {Dialogs} from '../list-dialogs.module';
import {ListDialogsService} from '../list-dialogs.service';
import {MessangesService} from '../messanges.service';
import {ResizeWindowService} from '../resize-window.service';

@Component({
  selector: 'app-all-dialogs',
  templateUrl: './all-dialogs.component.html',
  styleUrls: ['./all-dialogs.component.css']
})
export class AllDialogsComponent implements OnInit {

  constructor(private dialogService: ListDialogsService,
              private messService: MessangesService,
              private  resizeService: ResizeWindowService) {
  }

  listDialog: Dialogs[] = this.dialogService.dialogs;

  onSelectDialog(id) {
    this.messService.dialogId.emit(id);
    console.log(id);
    this.resizeService.showDialog.emit(false);
  }

  ngOnInit() {
  }

}
