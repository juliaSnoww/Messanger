import {AfterContentChecked, Component, OnDestroy, OnInit} from '@angular/core';

import {ResizeWindowService} from '../shared/resize-window.service';
import {MessagesService} from '../shared/messanges.service';
import {Message} from '@angular/compiler/src/i18n/i18n_ast';
import {ServerMailruService} from '../shared/server-mailru.service';
import {ListDialogsService} from '../shared/list-dialogs.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit, AfterContentChecked, OnDestroy {

  constructor(private resizeService: ResizeWindowService,
              private messagesService: MessagesService,
              private mailruService: ServerMailruService,
              private dialogService: ListDialogsService) {
  }

  textMessage;
  id: number;
  messages: Array<Message>;
  nickName;
  personData;
  showButton: boolean;

  showAllDialogs() {
    this.resizeService.showAllDialogs.emit(true);
  }

  onAddMess() {
    this.messages = this.messagesService.addMessages();
  }

  onPostMessage(msg) {
    this.mailruService.postMsg(this.id, msg);
    this.id = 0;
    this.dialogService.clearDialog();
    this.resizeService.showAllDialogs.emit(true);
    this.mailruService.loadClient();
  }

  ngOnInit() {
    this.personData = this.messagesService.personData.subscribe(
      (params) => {
        if (params) {
          console.log(params);
          this.id = params.id;
          this.messages = this.messagesService.getMessages(this.id);
          this.nickName = params.nick;
        }
      }
    );
  }

  ngAfterContentChecked() {
    this.showButton = !this.resizeService.isBig();
  }

  ngOnDestroy() {
    this.personData.unsubscribe();
  }
}
