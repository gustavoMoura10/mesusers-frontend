import { Component, OnInit } from '@angular/core';
import { Address } from '../../shared/models/address.model';
import { AddressService } from './addresses.service';
import { ToastService } from '../../shared/components/toast/toast.service';
import { CommonModule } from '@angular/common';
import { AddressListComponent } from '../../shared/components/address-list/address-list.component';
import { AddressFormComponent } from '../../shared/components/address-form/address-form.component';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { PaginationComponent } from "../../shared/components/pagination/pagination.component";

@Component({
    selector: 'app-addresses',
    standalone: true,
    imports: [CommonModule, AddressListComponent, AddressFormComponent, FormsModule, RouterLink, PaginationComponent],
    templateUrl: './addresses.component.html'
})
export class AddressesComponent implements OnInit {
    addresses: Address[] = [];
    selectedAddress: Address | null = null;
    isFormOpen = false;
    currentPage = 1;
    pageSize = 10;
    totalItems = 0;
    totalPages = 0;


    constructor(
        private addressService: AddressService,
        private toast: ToastService
    ) { }

    ngOnInit(): void {
        this.loadAddresses();
    }

    loadAddresses(page: number = 1) {
        this.currentPage = page;
        this.addressService.getAll(page, this.pageSize).subscribe({
            next: (res: any) => {
                this.addresses = res.data.items;
                this.totalItems = res.data.totalCount;
                this.totalPages = res.data.totalPages;
            },
            error: () => this.toast.showError('Erro ao carregar endereços')
        });
    }
    onPageSizeChange(newSize: number): void {
        this.pageSize = newSize;
        this.loadAddresses();
    }

    onEdit(address: Address) {
        this.selectedAddress = { ...address };
        this.isFormOpen = true;
    }

    onAddNew() {
        this.selectedAddress = null;
        this.isFormOpen = true;
    }

    onFormSubmit(event: any) {
        if (event instanceof Event) {
            return;
        }

        const address: Address = event;
        if (!address) return;

        this.selectedAddress = null;
        if (address.user) {
            delete address.user;
        }
        if (address.id) {
            this.addressService.update(Number(address.id), address).subscribe({
                next: () => this.handleSuccess('atualizado'),
                error: () => this.handleError('atualizar')
            });
        } else {
            this.addressService.create(address).subscribe({
                next: () => this.handleSuccess('criado'),
                error: () => this.handleError('criar')
            });
        }
        this.loadAddresses(this.currentPage);
    }

    getPages(): number[] {
        const pages = [];
        const startPage = Math.max(1, this.currentPage - 2);
        const endPage = Math.min(this.totalPages, this.currentPage + 2);

        for (let i = startPage; i <= endPage; i++) {
            pages.push(i);
        }
        return pages;
    }
    private handleSuccess(action: string) {
        this.toast.showSuccess(`Endereço ${action} com sucesso`);
        this.isFormOpen = false;
        this.loadAddresses();
    }

    private handleError(action: string) {
        this.toast.showError(`Erro ao ${action} endereço`);
        this.isFormOpen = false;
    }

    onFormCancel() {
        this.isFormOpen = false;
        this.selectedAddress = null;
    }

    onDelete(addressId: any) {
        if (addressId instanceof Event) {
            return;
        }
        if (confirm('Tem certeza que deseja excluir este endereço?')) {
            this.addressService.delete(addressId).subscribe({
                next: () => {
                    this.toast.showSuccess('Endereço excluído com sucesso');
                    this.loadAddresses();
                },
                error: () => this.toast.showError('Erro ao excluir endereço')
            });
        }
        const newPage = this.addresses.length === 1 && this.currentPage > 1
            ? this.currentPage - 1
            : this.currentPage;
        this.loadAddresses(newPage);
    }
}