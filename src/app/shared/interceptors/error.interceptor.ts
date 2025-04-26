import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { ToastService } from '../components/toast/toast.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

    constructor(
        private router: Router,
        private toast: ToastService
    ) { }

    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        return next.handle(request).pipe(
            catchError((error: HttpErrorResponse) => {
                let toastMessage: string;
                let toastClass: 'success' | 'error' | 'warning';

                if (error.status === 401) {
                    this.router.navigate(['/login']);
                    toastMessage = 'Sessão expirada. Faça login novamente.';
                    toastClass = 'error';
                } else if (error.status === 403) {
                    toastMessage = 'Acesso não autorizado';
                    toastClass = 'error';
                } else if (error.status >= 500) {
                    toastMessage = 'Erro no servidor. Tente novamente mais tarde.';
                    toastClass = 'error';
                } else {
                    toastMessage = 'Erro desconhecido';
                    toastClass = 'error';
                }
                this.toast.show({
                    textOrTpl: toastMessage,
                    classname: toastClass
                });

                return throwError(() => error);
            })
        );
    }
}
