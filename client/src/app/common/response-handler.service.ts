import { Injectable } from '@angular/core';
import { ToastOptions, ToastyService } from 'ng2-toasty';

@Injectable()
export class ResponseHandlerService {
  public toastOptions: ToastOptions = {
    title: 'Error',
    msg: '',
    showClose: true,
    timeout: 5000,
    theme: 'bootstrap'
  };

  constructor(private toastyService: ToastyService) {
  }

  public parseResponse(): any {
    return (res: Response) => {
      return res.json();
    }
  }

  public parseError(): any {
    return (error) => {
      this.toastyService.error(this.toastOptions);
    }
  }
}
