import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Observable, forkJoin} from 'rxjs';
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
              private dialogService: ListDialogsService) {
  }

  url = 'http://www.appsmail.ru/platform/api?method=';
  appId = '763898';
  privateKey = '0625d80a4886ba6d8fea34c8152e0a72';
  sessionKey;
  uid;
  requare: any;

  loadClient() {
    mailru.loader.require('api', () => {
      mailru.connect.init(this.appId, this.privateKey);

      mailru.events.listen(mailru.connect.events.login, (session) => {
        window.location.reload();
      });

      mailru.events.listen(mailru.connect.events.logout, () => {
        window.location.reload();
      });

      mailru.connect.getLoginStatus((result) => {
        if (result.is_app_user != 1) {
          console.log('not sign in');
          // не менять на !==

          // let body = document.querySelector('body');
          // let a = document.createElement('a');
          // a.classList = 'mrc__connectButton';
          // a.innerText = 'вход@mail.ru';
          // body.appendChild(a);
          // mailru.connect.initButton();

        } else {
          this.start().subscribe(
            () => this.dialogService.upDateDialog()
          );
        }
      });
    });
  }

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
      this.requare = [];
      for (let i = 0; i < dialogList.length; i++) {
        const dialog = dialogList[i];
        const uidSender = dialog.user.uid;
        const method = 'messages.getThread';
        const params = 'app_id=' + this.appId + 'limit=50method=' + method + 'session_key=' + this.sessionKey + 'uid=' + uidSender;
        const signature = md5(this.uid + params + this.privateKey);

        this.requare.push(this.http.get(this.url + method + '&app_id=' + this.appId + '&session_key=' + this.sessionKey + '&uid=' +
          uidSender + '&sig=' + signature + '&limit=50'));
      }

      forkJoin(this.requare).subscribe(
        (res) => {
          for (let i = 0; i < res.length; i++) {
            const messages = JSON.parse(res[i]._body);
            const dialog = dialogList[i];
            const uidSender = dialog.user.uid;
            this.messagesService.messages[uidSender] = [];

            for (const msg of messages) {
              this.messagesService.messages[uidSender].push(new Messages(msg.type, msg.message[0].content));
            }
            const dialogModel = new ListDialogsModel
            (dialog.user.nick, dialog.user.pic, this.messagesService.messages[uidSender], uidSender);

            this.dialogService.addDialog(uidSender, dialogModel);
          }

          observer.next(null);
        }
      );
    }

  }


  postMsg(uidSender, message) {
    const method = 'messages.post';
    const params = 'app_id=' + this.appId + 'message=' + message + 'method=' + method +
      'session_key=' + this.sessionKey + 'uid=' + uidSender;
    const signature = md5(this.uid + params + this.privateKey);

    this.http.get(this.url + method + '&app_id=' + this.appId + '&session_key=' + this.sessionKey + '&uid=' +
      uidSender + '&sig=' + signature + '&message=' + message).subscribe();

  }
}
