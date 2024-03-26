import { CommonModule, JsonPipe } from '@angular/common';
import { Component, EventEmitter, Input, Output, TemplateRef, ViewEncapsulation, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgbDropdownModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AxiosService } from 'src/app/axios.service';

@Component({
  selector: 'server-delete-modal',
  standalone: true,
  templateUrl: './server-delete-modal.component.html',
  encapsulation: ViewEncapsulation.None,
  imports: [ReactiveFormsModule, JsonPipe, CommonModule, NgbDropdownModule]
})
export class ServerDeleteModalComponent {
  @Output() onSubmitEvent = new EventEmitter();
  @Output() onOpenEvent = new EventEmitter();
  @Input() serverID!: number;

  constructor(private formBuilder: FormBuilder, private axiosService: AxiosService) { }

  private modalService = inject(NgbModal);

  serverForm = this.formBuilder.group({
    id: [0, Validators.required]
  });

  onSubmit() {
    this.axiosService.request(
      "DELETE",
      "/2.0/server/" + this.serverID, {})
      .then(
        response => { this.onSubmitEvent.emit() })
      .catch(
        error => { }
      );
  }

  isIdValid() {
    if (this.serverID === this.serverForm.value.id) {
      return true;
    }
    return false;
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