import { Component, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {Observable, Subject} from 'rxjs';

@Component({
  selector: 'app-confirm-modal',
  templateUrl: './update-dialog.component.html',
  styleUrls: ['./update-dialog.component.scss']
})
export class UpdateDialogComponent implements OnInit {
  private modalSubject = new Subject<string>();
  public modalObservable: Observable<string> = this.modalSubject.asObservable();

  constructor(public modal: NgbActiveModal) {}

  ngOnInit() {}

  onConfirmClick() {
    this.modalSubject.next('Confirm');
    this.modal.close('Closed');
  }

  onCancelClick() {
    this.modalSubject.next('Cancel');
    this.modal.dismiss('Cancel');
  }


}
