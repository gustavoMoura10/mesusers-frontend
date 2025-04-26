import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Address } from '../../models/address.model';
import { MaskPipe } from '../../pipes/mask.pipe';
import { LoaderComponent } from '../loader/loader.component';
import { AuthService } from '../../../auth/auth.service';

@Component({
  selector: 'app-address-list',
  standalone: true,
  templateUrl: './address-list.component.html',
  imports: [CommonModule, RouterModule, MaskPipe, LoaderComponent,]
})
export class AddressListComponent {
  @Input() addresses: Address[] | null = [];
  @Input() isLoading = false;
  @Output() delete = new EventEmitter<number>();
  @Output() edit = new EventEmitter<Address>();
  userId: number | null = null;
  isAdmin: boolean = false;
  constructor(private authService: AuthService) {
    this.isAdmin = this.authService.getIsAdmin();
    this.userId = this.authService.getIdUser();
  }
  ngOnInit(): void {
    console.log(this.addresses);
  }
  onDelete(id: any) {
    this.delete.emit(id);
  }

  onEdit(address: Address) {
    this.edit.emit(address);
  }
}