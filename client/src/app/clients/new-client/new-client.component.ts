import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { ToastyService } from 'ng2-toasty';
import { ClientsService } from '../clients.service';


@Component({
  selector: 'app-new-client',
  templateUrl: './new-client.component.html',
  providers: [ClientsService]
})
export class NewClientComponent implements OnInit {
  public form: FormGroup;

  constructor(private fb: FormBuilder, private toastyService: ToastyService, private clientsService: ClientsService) {
    this.form = this.fb.group({
      email: new FormControl('', [Validators.required, CustomValidators.email]),
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      phone: new FormControl('', [Validators.required, CustomValidators.phone('UA')]),
      birthday: new FormControl('', [
        Validators.required,
        CustomValidators.date,
        CustomValidators.minDate('1900-01-01'),
        CustomValidators.maxDate(new Date())
      ]),
      address: new FormControl('', [Validators.required, Validators.minLength(3)])
    });
  }

  ngOnInit() {
  }

  public async onSubmit() {
    await this.clientsService.addClient(this.form.getRawValue());
    this.toastyService.success({
      title: 'Success',
      msg: 'Client was added',
      showClose: true,
      timeout: 3000,
      theme: 'bootstrap'
    })
  }
}
