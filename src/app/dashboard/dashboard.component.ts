import { Component, OnInit } from '@angular/core';
import { UserService } from './users/users.service';
import { AddressService } from './addresses/addresses.service';
import { ToastService } from '../shared/components/toast/toast.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth/auth.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  standalone: true,
  imports: [CommonModule, RouterModule]
})
export class DashboardComponent implements OnInit {
  userCount: number = 0;
  addressCount: number = 0;

  constructor(
    private userService: UserService,
    private addressService: AddressService,
    private authService: AuthService,
    private router: Router,
    private toast: ToastService
  ) { }

  ngOnInit(): void {
    this.loadUserCount();
    this.loadAddressCount();
  }

  loadUserCount() {
    this.userService.getAll().subscribe({
      next: (res: any) => {
        this.userCount = res.data?.totalCount;
      },
      error: () => {
        this.toast.showError('Erro ao carregar usuários');
      }
    });
  }
  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
  loadAddressCount() {
    this.addressService.getAll().subscribe({
      next: (res: any) => {
        this.addressCount = res.data?.totalCount;
      },
      error: () => {
        this.toast.showError('Erro ao carregar endereços');
      }
    });
  }
}
