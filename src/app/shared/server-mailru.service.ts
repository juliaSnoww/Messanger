import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Observable} from 'rxjs';
import 'rxjs/Rx';

import '../../assets/loader.js';
import * as md5 from '../../../node_modules/js-md5/src/md5.js';

import {Messages} from '../model/messanges.model';
import {ListDialogsModel} from '../model/list-dialogs.model';
import {ListDialogsService} from './list-dialogs.service';
import {MessagesService} from './messanges.service';

declare let mailru: any;

@Injectable({
  providedIn: 'root'
})
export class ServerMailruService {

  constructor(private http: Http,
              private messagesService: MessagesService,
              private  dialogService: ListDialogsService) {
  }

  url = 'http://www.appsmail.ru/platform/api?method=';
  appId = '763898';
  privateKey = '0625d80a4886ba6d8fea34c8152e0a72';
  sessionKey;
  uid;

  start(): Observable<any> {
    return new Observable(observer => {
      mailru.common.users.getInfo((session) => {
        this.sessionKey = mailru.session.session_key;
        this.uid = session[0].uid;
        this.getDialogList(observer);
      });
    });
  }

  getDialogList(observer) {
    const method = 'messages.getThreadsList';
    const params = 'app_id=' + this.appId + 'method=' + method + 'session_key=' + this.sessionKey + 'uid=' + this.uid;
    const signature = md5(this.uid + params + this.privateKey);

    this.http.get(this.url + method + '&app_id=' + this.appId + '&session_key=' +
      this.sessionKey + '&uid=' + this.uid + '&sig=' + signature).map(
      response => {
        this.createMessagesArray(response.json(), observer);
      }
    ).subscribe();
  }

  createMessagesArray(dialogList, observer) {
    if (dialogList.length) {
      const dialog = dialogList.shift();
      const uidSender = dialog.user.uid;
      const method = 'messages.getThread';
      const params = 'app_id=' + this.appId + 'limit=50method=' + method + 'session_key=' + this.sessionKey + 'uid=' + uidSender;
      const signature = md5(this.uid + params + this.privateKey);

      this.http.get(this.url + method + '&app_id=' + this.appId + '&session_key=' + this.sessionKey + '&uid=' +
        uidSender + '&sig=' + signature + '&limit=50').map(
        response => {
          const messages = response.json();
          this.messagesService.messages[uidSender] = [];

          for (const msg of messages) {
            this.messagesService.messages[uidSender].push(new Messages(msg.type, msg.message[0].content));
          }

          this.dialogService.newDialogs[uidSender] = new ListDialogsModel
          (dialog.user.nick, dialog.user.pic, this.messagesService.messages[uidSender], uidSender);

          this.createMessagesArray(dialogList, observer);
          observer.next(response.json());
        }
      ).subscribe();
    }
  }

  postMsg(uidSender, message) {
    const method = 'messages.post';
    const params = 'app_id=' + this.appId + 'message=' + message + 'method=' + method +
      'session_key=' + this.sessionKey + 'uid=' + uidSender;
    const signature = md5(this.uid + params + this.privateKey);

    fetch(this.url + method + '&app_id=' + this.appId + '&session_key=' + this.sessionKey + '&uid=' +
      uidSender + '&sig=' + signature + '&message=' + message)
      .then((response) => {
      });
  }
}
