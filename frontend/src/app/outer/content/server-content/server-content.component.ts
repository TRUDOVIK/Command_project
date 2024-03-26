import { CommonModule, DatePipe, formatDate } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { BehaviorSubject, first, interval } from 'rxjs';
import { AxiosService } from 'src/app/axios.service';

const headerDict = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Headers': 'X-Requested-With,Accept,Content-Type, Origin',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, DELETE'
}

const requestOptions = {
  headers: new Headers(headerDict),
};

@Component({
  selector: 'server-content',
  standalone: true,
  templateUrl: './server-content.component.html',
  styleUrls: ['./server-content.component.css'],
  imports: [CommonModule]
})
export class ServerContentComponent {
  @Input() server!: any;
  @Input() serverCreateModalOpen!: boolean;
  status: string = 'WAITING';
  myDate: Date = new Date();
  currentDate: string | undefined;

  public connected$ = new BehaviorSubject<boolean>(false);
  public connState: boolean | undefined;
  private source = interval(10000);
  subscription!: any;

  constructor(private _http: HttpClient, private axiosService: AxiosService, private datePipe: DatePipe) { }

  ngOnInit() {
    this.currentDate = formatDate(this.myDate, 'yyyy-MM-dd', 'en-US');
    this.pinger()
    this.subscription = this.source.subscribe(() => this.pinger());

    this.connected$.subscribe(connected => {
      console.log("Connected: ", connected);
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['serverCreateModalOpen'].currentValue){
      console.log("modal opened");
      this.subscription.unsubscribe();
    } else {
      console.log("modal closed");
      this.ngOnInit();
    }
  }

  connected(data: boolean) {
    this.connState = data;
    this.connected$.next(this.connState);
  }

  pinger() {
    this._http.get(this.server.serverAddress, { headers: headerDict, observe: 'response' })
      .pipe(first())
      .subscribe(resp => {
        if (resp.status === 200) {
          this.status = "WORK";
          this.connected(true);
          this.server.creationDate = formatDate(this.server.creationDate, 'yyyy-MM-dd', 'en-US');
          this.server.updateDate = formatDate(this.myDate, 'yyyy-MM-dd', 'en-US');
          this.server.lastWorkDate = formatDate(this.myDate, 'yyyy-MM-dd', 'en-US');
          this.server.pollingInterval = 10;
          this.server.status = "WORK";

          this.axiosService.request(
            "PUT",
            "/2.0/server", {
            id: this.server.id,
            name: this.server.name,
            creationDate: this.server.creationDate,
            type: this.server.type,
            status: this.server.status,
            lastWorkDate: this.server.lastWorkDate,
            description: this.server.description,
            serverAddress: this.server.serverAddress,
            serverComment: this.server.serverComment,
            pollingInterval: this.server.pollingInterval,
            updateDate: this.server.updateDate,
            additionalIndicators: this.server.additionalIndicators
          })
            .then(
              response => { })
            .catch(
              error => { }
            );
        } else {
          this.status = "ERROR";
          this.connected(false);
          this.server.creationDate = formatDate(this.server.creationDate, 'yyyy-MM-dd', 'en-US');
          this.server.updateDate = formatDate(this.myDate, 'yyyy-MM-dd', 'en-US');
          this.server.lastWorkDate = formatDate(this.server.lastWorkDate, 'yyyy-MM-dd', 'en-US');
          this.server.pollingInterval = 10;
          this.server.status = "UNKNOWN";

          this.axiosService.request(
            "PUT",
            "/2.0/server", {
            id: this.server.id,
            name: this.server.name,
            creationDate: this.server.creationDate,
            type: this.server.type,
            status: this.server.status,
            lastWorkDate: this.server.lastWorkDate,
            description: this.server.description,
            serverAddress: this.server.serverAddress,
            serverComment: this.server.serverComment,
            pollingInterval: this.server.pollingInterval,
            updateDate: this.server.updateDate,
            additionalIndicators: this.server.additionalIndicators
          })
            .then(
              response => { })
            .catch(
              error => { }
            );
        }
      }), (err: any) => {
        this.connected(false);
        this.status = "ERROR";
      };
  }
}
