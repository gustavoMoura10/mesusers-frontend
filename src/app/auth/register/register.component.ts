import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ToastService } from '../../shared/components/toast/toast.service';
import { AuthService } from '../auth.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
    selector: 'app-register',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, RouterModule],
    templateUrl: './register.component.html',
})
export class RegisterComponent {
    registerForm: FormGroup;
    isLoading = false;

    constructor(
        private fb: FormBuilder,
        private authService: AuthService,
        private router: Router,
        private toast: ToastService
    ) {
        this.registerForm = this.fb.group({
            username: ['', [Validators.required, Validators.minLength(3)]],
            email: ['', [Validators.required, Validators.email]],
            password: ['', [
                Validators.required,
                Validators.minLength(8),
                Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/)
            ]],
        });
    }

    onSubmit() {
        if (this.registerForm.invalid) return;

        this.isLoading = true;
        const { username, email, password } = this.registerForm.value;

        this.authService.register(username, email, password).subscribe({
            next: () => {
                this.toast.showSuccess('Registro realizado com sucesso!');
                this.router.navigate(['/login']);
            },
            error: (err) => {
                this.isLoading = false;
                this.toast.showError(err.error?.message || 'Erro ao registrar usuário');
            }
        });
    }

    get passwordErrors() {
        const password = this.registerForm.get('password');
        if (!password?.errors) return '';

        if (password.errors['required']) return 'Senha é obrigatória';
        if (password.errors['minlength']) return 'Mínimo 8 caracteres';
        if (password.errors['pattern']) return 'Deve conter letras maiúsculas, minúsculas, números e símbolos';

        return 'Senha inválida';
    }
}
