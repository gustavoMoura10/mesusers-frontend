import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { Address } from '../../shared/models/address.model';
import { environment } from '../../enviroments/enviroment';

@Injectable({
    providedIn: 'root'
})
export class AddressService {
    private apiUrl = `${environment.apiUrl}/addresses`;

    constructor(private http: HttpClient) { }

    getByUser(userId: number): Observable<Address[]> {
        return this.http.get<Address[]>(`${this.apiUrl}?userId=${userId}`);
    }

    getById(id: number): Observable<Address> {
        return this.http.get<Address>(`${this.apiUrl}/${id}`);
    }

    create(address: Address): Observable<Address> {
        return this.http.post<Address>(this.apiUrl, address);
    }

    getAll(page = 1, pageSize = 10): Observable<{ data: Address[], total: number }> {
        return this.http.get<{ data: Address[], total: number }>(
            `${this.apiUrl}?page=${page}&pageSize=${pageSize}`
        );
    }

    update(id: number, address: Address): Observable<Address> {
        return this.http.put<Address>(`${this.apiUrl}/${id}`, address);
    }

    delete(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }
}
