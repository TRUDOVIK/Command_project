import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AxiosService } from '../../../axios.service';
import { ServerModalEditorComponent } from '../server-modal-editor/server-modal-editor.component';

interface Server {
  id: number;
  name: string;
  creationDate: string;
  type: string;
  status: string;
  lastWorkDate: string;
  description: string;
  serverAddress: string;
  serverComment: string;
  pollingInterval: number;
  updateDate: string;
  additionalIndicators: string;
}

@Component({
  selector: 'server-observer',
  standalone: true,
  templateUrl: './server-observer.component.html',
  styleUrls: ['./server-observer.component.css'],
  imports: [ServerModalEditorComponent]
})
export class ServerObserverComponent {
  @Input() item!: Server;
  @Output() onObserverExit = new EventEmitter();

  constructor(private axiosService: AxiosService) { }

  updateServerInfo(editedItem: Server){
    this.item = editedItem;
  }
}
