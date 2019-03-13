import {AfterContentInit, Component, DoCheck, OnChanges, OnInit} from '@angular/core';

import {ResizeWindowService} from '../resize-window.service';
import {MessangesService} from '../messanges.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {
  constructor(private resizeService: ResizeWindowService,
              private messagesService: MessangesService) {
  }

  id: number;
  messages: Array;
  nickName = 'Vasia';
  showButton = !this.resizeService.onResizeWindow();

  showAllDialogs() {
    this.resizeService.showDialog.emit(true);
  }

  onAddMess() {
    this.messages = this.messagesService.addMessages(this.id);
  }

  ngOnInit() {
    console.log(this.messagesService)
    this.messagesService.dialogId.subscribe(
      (id) => {
        console.log(id)
        this.id = id;
        this.messages = this.messagesService.getMessages(this.id);
      }
    );
   }



}
