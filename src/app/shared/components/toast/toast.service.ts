import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Toast {
    textOrTpl: string;
    classname: 'success' | 'error' | 'warning';
    delay?: number;
    hidden?: boolean;
}

@Injectable({
    providedIn: 'root'
})
export class ToastService {
    private toastsSubject = new BehaviorSubject<Toast[]>([]);
    toasts$ = this.toastsSubject.asObservable();

    public toasts: Toast[] = [];

    show(toast: Toast) {
        this.toasts.push(toast);
        this.toastsSubject.next(this.toasts);

        if (toast.delay) {
            setTimeout(() => this.remove(toast), toast.delay);
        } else {
            setTimeout(() => this.remove(toast), 5000);
        }
    }

    remove(toast: Toast) {
        this.toasts = this.toasts.filter(t => t !== toast);
        this.toastsSubject.next(this.toasts);
    }
    showError(message: string, delay: number = 5000) {
        this.show({
            textOrTpl: message,
            classname: 'error',
            delay: delay
        });
    }
    showSuccess(message: string, delay: number = 5000) {
        this.show({
            textOrTpl: message,
            classname: 'success',
            delay: delay
        });
    }
}
