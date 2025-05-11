import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DeadlineService {

  private readonly http = inject(HttpClient);
  constructor() { }

  getSecondsLeftToDeadline(): Observable<{ secondsLeft: number }> {
    return new Observable<{ secondsLeft: number }>(observer => {
      observer.next({ secondsLeft: 20 }); 
      observer.complete();
    });
    //return this.http.get<{ secondsLeft: number }>('/api/deadline');
  }
}
