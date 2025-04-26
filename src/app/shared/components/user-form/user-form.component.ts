import { Component, EventEmitter, Input, Output } from '@angular/core';
import { User } from '../../models/user.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [CommonModule, FormsModule, ],
  templateUrl: './user-form.component.html'
})
export class UserFormComponent {
  @Input() user: User | any;
  @Output() submit = new EventEmitter<User>();
  @Output() cancel = new EventEmitter<void>();



  ngOnChanges() {
    if (!this.user) {
      this.user = {
        id: 0,
        username: '',
        email: '',
        password: '',
        admin: false
      };
    }
  }

  onSubmit() {
    if (!this.user) return;
    this.submit.emit(this.user);
  }

  onCancel() {
    this.cancel.emit();
  }
}