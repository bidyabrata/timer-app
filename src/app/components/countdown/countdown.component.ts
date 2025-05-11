import { Component, inject } from '@angular/core';
import { catchError, interval, of, retry, Subscription } from 'rxjs';
import { DeadlineService } from '../../services/deadline.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-countdown',
  imports: [CommonModule],
  templateUrl: './countdown.component.html',
  styleUrl: './countdown.component.css',
  standalone: true,
})
export class CountdownComponent {
  secondsLeft: number | null = null;
  error = false;
  private timerSub?: Subscription;
  private readonly deadlineService = inject(DeadlineService);

  constructor() {}

  ngOnInit(): void {
    this.deadlineService.getSecondsLeftToDeadline()
    .pipe(
      retry(2), // Try 3 times total: 1 original + 2 retries
      catchError(err => {
        this.error = true;
        return of({ secondsLeft: null });
      })
    ).subscribe(response => {
      if (response.secondsLeft !== null) {
        this.secondsLeft = response.secondsLeft;
        this.timerSub = interval(1000).subscribe(() => {
          if (this.secondsLeft! > 0) this.secondsLeft!--;
        });
      }
    });
  }

  ngOnDestroy(): void {
    this.timerSub?.unsubscribe();
  }

}
