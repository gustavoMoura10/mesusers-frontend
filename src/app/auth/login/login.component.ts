import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../auth.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule, NgIf } from '@angular/common';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    imports: [ReactiveFormsModule, CommonModule, NgIf, RouterModule]
})
export class LoginComponent implements OnInit {
    loginForm!: FormGroup;
    isLoading: boolean = false;
    errorMessage: string = '';

    constructor(
        private fb: FormBuilder,
        private authService: AuthService,
        private router: Router
    ) { }

    ngOnInit(): void {
        this.loginForm = this.fb.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required]]
        });
    }

    onSubmit(): void {
        if (this.loginForm.invalid) return;

        this.isLoading = true;
        const { email, password } = this.loginForm.value;

        this.authService.login(email, password).subscribe({
            next: () => {
                this.isLoading = false;
                
                this.router.navigate(['/dashboard']);
            },
            error: (err) => {
                this.isLoading = false;
                this.errorMessage = 'Erro ao fazer login. Verifique suas credenciais.';
            }
        });
    }
}
