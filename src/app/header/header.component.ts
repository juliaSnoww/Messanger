import {Component} from '@angular/core';

import '../../assets/loader.js';
import {ServerMailruService} from '../shared/server-mailru.service';
import {ListDialogsService} from '../shared/list-dialogs.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  constructor(private serverMailru: ServerMailruService,
              private dialogService: ListDialogsService) {
  }

  clearComponent() {
    this.dialogService.clearDialog();
    this.serverMailru.loadClient();
  }

  getMessagesMailru() {
    this.serverMailru.loadClient();
  }

}
