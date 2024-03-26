import { CommonModule, JsonPipe, formatDate } from '@angular/common';
import { Component, EventEmitter, Input, Output, TemplateRef, ViewEncapsulation, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbDropdownModule, NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { AxiosService } from 'src/app/axios.service';

@Component({
  selector: 'ngbd-modal-options',
  standalone: true,
  templateUrl: './server-modal.component.html',
  encapsulation: ViewEncapsulation.None,
  imports: [ReactiveFormsModule, JsonPipe, CommonModule, NgbDropdownModule]
})
export class ServerModalComponent {
  @Output() onSubmitEvent = new EventEmitter();
  @Output() onOpenEvent = new EventEmitter();

  myDate: Date = new Date();
  currentDate: string | undefined;

  serverType: string = 'TYPE';

  constructor(config: NgbModalConfig, private formBuilder: FormBuilder, private axiosService: AxiosService, private router: Router) {
    config.backdrop = 'static';
    config.keyboard = false;
  }

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
      "POST",
      "/2.0/server", {
      name: this.serverForm.value.name,
      creationDate: this.currentDate,
      type: this.serverType,
      status: 'UNKNOWN',
      lastWorkDate: this.currentDate,
      description: this.serverForm.value.description,
      serverAddress: this.serverForm.value.address,
      serverComment: this.serverForm.value.comment,
      pollingInterval: 10,
      updateDate: this.currentDate,
      additionalIndicators: this.serverForm.value.additionalIndicators
    })
      .then(
        response => { this.onSubmitEvent.emit() })
      .catch(
        error => { }
      );
  }

  ngOnInit() {
    this.currentDate = formatDate(this.myDate, 'yyyy-MM-dd', 'en-US');
  }

  setType(type: string) {
    this.serverType = type;
  }

  isTypeValid() {
    switch (this.serverType) {
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
    this.onOpenEvent.emit();
    this.modalService.open(content, { size: 'lg' });
  }
}