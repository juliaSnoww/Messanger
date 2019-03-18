import {Component, OnInit} from '@angular/core';

import '../../assets/loader.js';
import {ServerMailruService} from '../shared/server-mailru.service';
import {ListDialogsService} from '../shared/list-dialogs.service';

declare let mailru: any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private serverMailru: ServerMailruService,
              private dialogService: ListDialogsService,) {
  }

  ngOnInit() {
  }

  getMessagesMailru() {
    mailru.loader.require('api', () => {
        mailru.connect.init(this.serverMailru.appId, this.serverMailru.privateKey);

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
            this.serverMailru.start().subscribe(
              (res) => {
                this.dialogService.dialog.next(this.dialogService.newDialogs);
              }
            );
          }
        });
      }
    );
  }
}
