import {ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild} from '@angular/core';

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
export class DialogComponent implements OnInit {
  constructor(private resizeService: ResizeWindowService,
              private messagesService: MessagesService,
              private change: ChangeDetectorRef,
              private mailruService: ServerMailruService,
              private dialogService: ListDialogsService) {
  }

  @ViewChild('textMessage') textMessage: ElementRef;
  id: number;
  messages: Array<Message>;
  nickName;
  showButton = !this.resizeService.isSmall();

  showAllDialogs() {
    this.resizeService.showDialog.emit(true);
  }

  onAddMess() {
    this.messages = this.messagesService.addMessages();
  }

  onPostMessage() {
    const msg = this.textMessage.nativeElement.value;
    this.mailruService.postMsg(this.id, msg);
    this.id = 0;
    this.dialogService.clearDialog();
    this.mailruService.loadClient();
  }

  ngOnInit() {
    this.messagesService.personData.subscribe(
      (params) => {
        if (params) {
          console.log(params);
          this.id = params.id;
          this.messages = this.messagesService.getMessages(this.id);
          this.nickName = params.nick;
        }
        this.change.detectChanges();
      }
    );
  }


}
