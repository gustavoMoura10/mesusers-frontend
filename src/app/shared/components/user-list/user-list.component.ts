import { Component, EventEmitter, Input, Output } from '@angular/core';
import { User } from '../../models/user.model';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../auth/auth.service';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-list.component.html'
})
export class UserListComponent {
  @Input() users: User[] = [];
  @Output() editUser = new EventEmitter<User>();
  @Output() deleteUser = new EventEmitter<number>();
  isAdmin: boolean = false;
  userId: number | null = null;
  constructor(private authService: AuthService){
    this.isAdmin = this.authService.getIsAdmin();
    this.userId = this.authService.getIdUser();
  }
  onEdit(user: User) {
    this.editUser.emit(user);
  }

  onDelete(userId: number) {
    if (confirm('Tem certeza que deseja excluir este usuário?')) {
      this.deleteUser.emit(userId);
    }
  }
}