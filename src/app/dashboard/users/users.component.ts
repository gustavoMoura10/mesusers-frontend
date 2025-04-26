import { Component, OnInit } from '@angular/core';
import { User } from '../../shared/models/user.model';
import { UserService } from './users.service';
import { ToastService } from '../../shared/components/toast/toast.service';
import { CommonModule } from '@angular/common';
import { UserListComponent } from '../../shared/components/user-list/user-list.component';
import { UserFormComponent } from '../../shared/components/user-form/user-form.component';
import { RouterLink } from '@angular/router';
import { PaginationComponent } from "../../shared/components/pagination/pagination.component";

@Component({
    selector: 'app-users',
    standalone: true,
    imports: [CommonModule, UserListComponent, UserFormComponent, RouterLink, PaginationComponent],
    templateUrl: './users.component.html'
})
export class UsersComponent implements OnInit {
    users: User[] = [];
    selectedUser: User | null = null;
    isFormOpen = false;
    currentPage: number = 1;
    pageSize: number = 10;
    totalItems: number = 0;
    totalPages: number = 0;
    constructor(
        private userService: UserService,
        private toast: ToastService
    ) { }

    ngOnInit(): void {
        this.loadUsers(1);
    }

    loadUsers(page: number = 1): void {
        this.currentPage = page;
        this.userService.getAll(page, this.pageSize).subscribe((response: any) => {
            this.users = response.data.items;
            this.totalItems = response.data.totalCount;
            this.totalPages = response.data.totalPages;
        });
    }

    onPageSizeChange(newSize: number): void {
        this.pageSize = newSize;
        this.loadUsers();
    }

    onEdit(user: User) {
        this.selectedUser = { ...user };
        this.isFormOpen = true;
    }

    onFormSubmit(event: any) {
        if (event instanceof Event) {
            return
        }
        const user: User = event;
        if (!user) return;
        this.selectedUser = null;

        if (user.id) {
            this.userService.update(user.id, user).subscribe({
                next: () => this.handleSuccess('atualizado', user),
                error: () => this.handleError('atualizar')
            });
        } else {
            this.userService.create(user).subscribe({
                next: () => this.handleSuccess('criado', user),
                error: () => this.handleError('criar')
            });
        }
    }

    private handleSuccess(action: string, user: User) {
        this.toast.showSuccess(`Usuário ${action} com sucesso`);
        this.isFormOpen = false;
        this.loadUsers();
    }

    private handleError(action: string) {
        this.toast.showError(`Erro ao ${action} usuário`);
        this.isFormOpen = false;
    }

    onFormCancel() {
        this.isFormOpen = false;
        this.selectedUser = null;
    }

    onDelete(userId: number) {
        if (confirm('Tem certeza que deseja excluir este usuário?')) {
            this.userService.delete(userId).subscribe({
                next: () => {
                    this.toast.showSuccess('Usuário excluído com sucesso');
                    this.loadUsers();
                },
                error: () => this.toast.showError('Erro ao excluir usuário')
            });
        }
    }
}