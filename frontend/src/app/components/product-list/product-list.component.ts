import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { AuthService } from '../../services/auth.service';
import { Product } from '../../models/product';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products: Product[] = [];

  // pagination
  currentPage = 1;
  pageSize = 10;
  totalCount = 0;
  totalPages = 0;

  // search
  searchText = '';

  // admin form
  isEditMode = false;
  formProduct: Product = {
    id: 0,
    name: '',
    price: 0,
    imageUrl: ''
  };

  constructor(
    private productService: ProductService,
    private auth: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts() {
    this.productService
      .getProducts(this.currentPage, this.pageSize, this.searchText)
      .subscribe(res => {
        this.products = res.items;
        this.totalCount = res.totalCount;
        this.totalPages = Math.ceil(this.totalCount / this.pageSize);
      });
  }

  // 🔍 search
  onSearch() {
    this.currentPage = 1;
    this.loadProducts();
  }

  // 📄 pagination
  goToPage(page: number) {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
    this.loadProducts();
  }

  // 📦 product details
  openDetails(id: number) {
    this.router.navigate(['/products', id]);
  }

  // ➕ add
  addProduct() {
    this.productService.addProduct(this.formProduct).subscribe(() => {
      this.resetForm();
      this.loadProducts();
    });
  }

  // ✏️ edit
  editProduct(p: Product) {
    this.formProduct = { ...p };
    this.isEditMode = true;
  }

  updateProduct() {
    this.productService.updateProduct(this.formProduct).subscribe(() => {
      this.resetForm();
      this.loadProducts();
    });
  }

  // ❌ delete
  deleteProduct(id: number) {
    if (!confirm('Delete this product?')) return;

    this.productService.deleteProduct(id).subscribe(() => {
      this.loadProducts();
    });
  }

  resetForm() {
    this.formProduct = { id: 0, name: '', price: 0, imageUrl: '' };
    this.isEditMode = false;
  }

  // 🔓 logout
  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
