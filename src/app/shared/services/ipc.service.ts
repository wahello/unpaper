import { Injectable } from '@angular/core';
import { ElectronService } from 'ngx-electron';
import { Observable, Observer } from 'rxjs';

@Injectable()
export class IpcService {
  constructor(private electron: ElectronService) {}

  public sendMessage<T>(channel: string, data?: any): Observable<T> {
    return Observable.create((observer: Observer<T>) => {
      this.electron.ipcRenderer.on(`${channel}:reply`, handler.bind(this));
      this.electron.ipcRenderer.send(channel, data);

      function handler(_, data: { value: any; done: boolean }) {
        if (data.done) {
          observer.complete();
          this.electron.ipcRenderer.removeListener(channel, handler);
        }
        observer.next(data.value);
      }
    });
  }
}
