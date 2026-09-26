import { Component, inject, signal } from '@angular/core';
import { InventoryAddService } from '../resale-services/inventory-add-service';
import { Router } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator'
import { MatInputModule } from '@angular/material/input';
import { MatSortModule } from '@angular/material/sort';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field'; 
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { AuthService } from '../service/auth';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-sell-item',
  imports: [MatTableModule, MatPaginatorModule, MatInputModule, MatSortModule, MatProgressSpinnerModule, MatFormFieldModule, CommonModule, FormsModule, MatSelectModule, MatDatepickerModule, MatNativeDateModule, MatSidenavModule, MatListModule, MatListModule, MatButtonModule, MatIconModule],
  templateUrl: './sell-item.html',
  styleUrl: './sell-item.css',
})
export class SellItem {
  inventoryAddService = inject(InventoryAddService);
  router = inject(Router);
  private authService = inject(AuthService);
  allListings = signal<any[]>([]);
  flipLedgerLogo = 'flip-ledger-logo.png';
  displayedColumns: string[] = ['item', 'sold-platform', 'sold-price', 'sold-date', 'mark-as-sold'];
  platforms = signal<any | null>(null); 

  async ngOnInit() {
    await this.getAllActiveListings();
    await this.getPlatforms();
  }

  navigateToInvAdd() {
    this.router.navigate(['/add-inventory'])
  }

  navigateToPerfMetrics() {
    this.router.navigate(['/performance-metrics'])
  }

  navigateToSellItem() {
    this.router.navigate(['/sell-item']);
  }

  navigateToListItem() {
    this.router.navigate(['/list-item']);
  }

  navigateToProfile() {
    this.router.navigate(['/profile']);
  }

  async signOut() {
    this.authService.signOut();
    this.router.navigate(['/login']);
  }

  async getPlatforms() {
    const platforms = await this.inventoryAddService.getPlatforms();
    this.platforms.set(platforms); 
  }

  async getAllActiveListings() {
    const listings = await this.inventoryAddService.getAllActiveListings();
  }

  async markAsSold(item: any) {
    await this.inventoryAddService.markAsSold(item);
  }

}
