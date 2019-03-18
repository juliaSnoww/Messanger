import {Component, OnInit} from '@angular/core';

import {ResizeWindowService} from '../shared/resize-window.service';
import {MessagesService} from '../shared/messanges.service';
import {Message} from '@angular/compiler/src/i18n/i18n_ast';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {
  constructor(private resizeService: ResizeWindowService,
              private messagesService: MessagesService) {
  }

  id: number;
  messages: Array<Message>;
  nickName = 'Vasia';
  showButton = !this.resizeService.onResizeWindow();

  showAllDialogs() {
    this.resizeService.showDialog.emit(true);
  }

  onAddMess() {
    this.messages = this.messagesService.addMessages(this.id);
  }

  ngOnInit() {
    this.messagesService.dialogId.subscribe(
      (id) => {
        this.id = id;
        if (this.id) {
          this.messages = this.messagesService.getMessages(this.id);
        }
      }
    );
  }


}
