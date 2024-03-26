import { AfterViewInit, Component, Directive, EventEmitter, Input, Output, QueryList, ViewChildren } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { AxiosService } from 'src/app/axios.service';
import { ServerObserverComponent } from '../server-observer/server-observer.component';
import { ServerContentComponent } from '../server-content/server-content.component';
import { ServerModalComponent } from '../server-modal/server-modal.component';
import { ServerDeleteModalComponent } from '../server-delete-modal/server-delete-modal.component';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

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

var SERVERS!: Server[];

export type SortColumn = keyof Server | '';
export type SortDirection = 'asc' | 'desc' | '';
const rotate: { [key: string]: SortDirection } = { asc: 'desc', desc: '', '': 'asc' };

const compare = (v1: string | number, v2: string | number) => (v1 < v2 ? -1 : v1 > v2 ? 1 : 0);

export interface SortEvent {
  column: SortColumn;
  direction: SortDirection;
}

@Directive({
  selector: 'th[sortable]',
  standalone: true,
  host: {
    '[class.asc]': 'direction === "asc"',
    '[class.desc]': 'direction === "desc"',
    '(click)': 'rotate()',
  },
})
export class NgbdSortableHeader {
  @Input() sortable: SortColumn = '';
  @Input() direction: SortDirection = '';
  @Output() sort = new EventEmitter<SortEvent>();

  rotate() {
    this.direction = rotate[this.direction];
    this.sort.emit({ column: this.sortable, direction: this.direction });
  }
}

@Component({
  selector: 'ngbd-table-sortable',
  standalone: true,
  imports: [DecimalPipe, NgbdSortableHeader, CommonModule, ServerObserverComponent, ServerContentComponent, ServerModalComponent, ServerDeleteModalComponent, NgbDropdownModule],
  templateUrl: './server-table.component.html',
  styleUrls: ['./server-table.component.css']
})
export class NgbdTableSortable {
  servers!: Server[];
  waiting!: boolean;

  obsActive: boolean = false;
  currentServer!: any;

  indicators!: any;
  currentIndicator: string = 'All';

  createModalOpen: boolean = false;

  constructor(private axiosService: AxiosService) { }

  ngOnInit(): void {
    this.waiting = true;
    this.createModalOpen = false;
    this.axiosService.request(
      "GET",
      "/2.0/servers?endDateStr=2026-02-02&startDateStr=2016-02-02", {})
      .then(
        response => {
          this.waiting = false;
          SERVERS = response.data.serverResponseDtos;
          this.servers = SERVERS;
          this.indicators = [...new Set(this.servers.map(item => item.additionalIndicators))];
        }).catch(
          error => { }
        );
  }

  ngOnDestroy() {
    SERVERS = [];
    this.servers = [];
  }

  updateTable(indicator: string) {
    this.axiosService.request(
      "GET",
      "/2.0/servers?endDateStr=2026-02-02&startDateStr=2016-02-02" + this.getIndicatorQuery(indicator), {})
      .then(
        response => {
          this.waiting = false;
          SERVERS = response.data.serverResponseDtos;
          this.servers = SERVERS;
        }).catch(
          error => { }
        );
  }

  @ViewChildren(NgbdSortableHeader)
  headers!: QueryList<NgbdSortableHeader>;

  onSort({ column, direction }: SortEvent) {
    // resetting other headers
    for (const header of this.headers) {
      if (header.sortable !== column) {
        header.direction = '';
      }
    }

    // sorting countries
    if (direction === '' || column === '') {
      this.servers = SERVERS;
    } else {
      this.servers = [...SERVERS].sort((a, b) => {
        const res = compare(a[column], b[column]);
        return direction === 'asc' ? res : -res;
      });
    }
  }

  proceedToObserver(server: any) {
    this.obsActive = true;
    this.currentServer = server;
    this.ngOnDestroy();
  }

  exitObserver() {
    this.obsActive = false;
    this.currentServer = null;
    this.ngOnInit();
  }

  selectIndicator(selectedIndicator: string) {
    this.updateTable(selectedIndicator)
    this.currentIndicator = selectedIndicator;
  }

  getIndicatorQuery(indicator: string) {
    switch (indicator) {
      case 'All': {
        return '';
      }
      default: {
        return '&indicator=' + indicator;
      }
    }
  }

  pingStop() {
    this.createModalOpen = true;
  }
}
