import { CommonModule, JsonPipe, formatDate } from '@angular/common';
import { Component, EventEmitter, Input, Output, TemplateRef, ViewEncapsulation, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbDropdownModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AxiosService } from 'src/app/axios.service';

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
  selector: 'server-modal-editor',
  standalone: true,
  templateUrl: './server-modal-editor.component.html',
  encapsulation: ViewEncapsulation.None,
  imports: [ReactiveFormsModule, JsonPipe, CommonModule, NgbDropdownModule]
})
export class ServerModalEditorComponent {
  @Output() onSubmitEvent = new EventEmitter();
  @Input() item!: Server;

  myDate: Date = new Date();
  currentDate: string | undefined;

  constructor(private formBuilder: FormBuilder, private axiosService: AxiosService, private router: Router) { }

  private modalService = inject(NgbModal);
  waiting: boolean = false;

  serverForm = this.formBuilder.group({
    name: ['', Validators.required],
    description: ['', Validators.required],
    address: ['', [Validators.required, Validators.pattern('^(ht|f)tp(s?)\:\/\/[0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*(:(0-9)*)*(\/?)([a-zA-Z0-9\-\.\?\,\'\/\\\+&amp;%\$#_]*)?$')]],
    comment: [''],
    additionalIndicators: ['', Validators.required]
  });

  onSubmit() {
    this.waiting = true;
    this.axiosService.request(
      "PUT",
      "/2.0/server", {
      id: this.item.id,
      name: this.serverForm.value.name,
      creationDate: this.item.creationDate,
      type: this.item.type,
      status: 'UNKNOWN',
      lastWorkDate: this.item.lastWorkDate,
      description: this.serverForm.value.description,
      serverAddress: this.serverForm.value.address,
      serverComment: this.serverForm.value.comment,
      pollingInterval: this.item.pollingInterval,
      updateDate: this.item.updateDate,
      additionalIndicators: this.serverForm.value.additionalIndicators
    })
      .then(
        response => {
          this.onSubmitEvent.emit({
            id: this.item.id,
            name: this.serverForm.value.name,
            creationDate: this.item.creationDate,
            type: this.item.type,
            status: 'UNKNOWN',
            lastWorkDate: this.item.lastWorkDate,
            description: this.serverForm.value.description,
            serverAddress: this.serverForm.value.address,
            serverComment: this.serverForm.value.comment,
            pollingInterval: this.item.pollingInterval,
            updateDate: this.item.updateDate,
            additionalIndicators: this.serverForm.value.additionalIndicators
          });
        })
      .catch(
        error => { }
      );

  }

  ngOnInit() {
    this.currentDate = formatDate(this.myDate, 'yyyy-MM-dd', 'en-US');
    this.serverForm.patchValue({
      name: this.item.name,
      description: this.item.description,
      address: this.item.serverAddress,
      comment: this.item.serverComment,
      additionalIndicators: this.item.additionalIndicators
    })
  }

  setType(type: string) {
    this.item.type = type;
  }

  isTypeValid() {
    switch (this.item.type) {
      case 'WEB': {
        return true;
        break;
      }
      case 'VPN': {
        return true;
        break;
      }
      case 'GAME': {
        return true;
        break;
      }
      default: {
        return false;
        break;
      }
    }
  }

  padTo2Digits(num: number) {
    return num.toString().padStart(2, '0');
  }

  getDate(date: Date) {
    return (
      [
        date.getFullYear(),
        this.padTo2Digits(date.getMonth() + 1),
        this.padTo2Digits(date.getDate()),
      ].join('-')
    )
  }

  openLg(content: TemplateRef<any>) {
    this.modalService.open(content, { size: 'lg' });
  }
}