import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../models/product';

@Injectable({ providedIn: 'root' })
export class ProductService {
  private apiUrl = 'http://localhost:5275/api/products';

  constructor(private http: HttpClient) {}

  getProducts(page: number, pageSize: number, search: string) {
    return this.http.get<any>(
      `${this.apiUrl}?page=${page}&pageSize=${pageSize}&search=${search}`
    );
  }

  addProduct(product: Product) {
    return this.http.post(this.apiUrl, product);
  }

  updateProduct(product: Product) {
    return this.http.put(`${this.apiUrl}/${product.id}`, product);
  }

  deleteProduct(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
  getProductById(id: number) {
  return this.http.get<Product>(`${this.apiUrl}/${id}`);
}

}
