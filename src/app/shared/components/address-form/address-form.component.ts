import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Address } from '../../models/address.model';
import { User } from '../../models/user.model';
import { UserService } from '../../../dashboard/users/users.service';
import { AuthService } from '../../../auth/auth.service';

@Component({
    selector: 'app-address-form',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './address-form.component.html'
})
export class AddressFormComponent {
    @Input() address: Address | any;
    @Output() submit = new EventEmitter<Address>();
    @Output() cancel = new EventEmitter<void>();
    users: User[] = [];
    constructor(private userService: UserService, private authService: AuthService) { }
    loadUsers() {
        this.userService.getAll().subscribe({
            next: (response: any) => {
                if (this.authService.getIsAdmin()) {
                    this.users = response.data.items;

                } else {
                    this.users = response.data.items.filter((user: User) => user.id === Number(this.authService.getIdUser()));
                }
            },
            error: (err) => console.error('Failed to load users', err)
        });
    }

    ngOnChanges() {
        if (!this.address) {
            this.address = {
                id: 0,
                street: '',
                number: '',
                neighborhood: '',
                city: '',
                state: '',
                cep: '',
                complement: ''
            };
        }
    }


    ngOnInit() {
        this.loadUsers();
    }
    onSubmit() {
        if (this.address) {
            this.submit.emit({ ...this.address });
        }
    }

    onCancel() {
        this.cancel.emit();
    }
}