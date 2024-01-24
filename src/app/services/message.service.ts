import { Injectable } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { Subject, timer } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  private alertSubject = new Subject<{ message: string; type: string }>();
  alert$ = this.alertSubject.asObservable();
  private destroy$ = new Subject<void>();

  constructor(private router: Router) {
    this.router.events.pipe(takeUntil(this.destroy$)).subscribe((event) => {
      if (event instanceof NavigationStart) {
        timer(4000)
          .pipe(takeUntil(this.destroy$))
          .subscribe(() => {
            this.clearAlert();
          });
      }
    });
  }

  showAlert(message: string, type: string) {
    this.alertSubject.next({ message, type });
  }

  clearAlert() {
    this.alertSubject.next({ message: '', type: '' });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
