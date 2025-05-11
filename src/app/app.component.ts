import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CountdownComponent } from './components/countdown/countdown.component';

@Component({
  selector: 'app-root',
  imports: [CommonModule,CountdownComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  standalone: true
})
export class AppComponent {
  title = 'timer-app';
}
