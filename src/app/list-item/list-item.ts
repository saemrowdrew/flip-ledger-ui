import { Component, signal, inject } from '@angular/core';
import { InventoryAddService } from '../resale-services/inventory-add-service';
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
import { Router } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../service/auth';

@Component({
  selector: 'app-list-item',
  imports: [MatTableModule, MatPaginatorModule, MatInputModule, MatSortModule, MatProgressSpinnerModule, MatFormFieldModule, CommonModule, FormsModule, MatSelectModule, MatDatepickerModule, MatNativeDateModule, MatSidenavModule, MatListModule, MatListModule, MatButtonModule, MatIconModule],
  templateUrl: './list-item.html',
  styleUrl: './list-item.css',
})
export class ListItem {
  flipLedgerLogo = 'flip-ledger-logo.png';

  router = inject(Router);
  private authService = inject(AuthService);
  inventoryAddService = inject(InventoryAddService); 
  displayedColumns: string[] = ['item', 'listed-platform', 'listed-price', 'listed-date', 'mark-as-listed']
  allActiveInventory = signal<any | null>([])
  platforms = signal<any | null>(null); 

  async ngOnInit() {
    await this.getAllActiveInventory();
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

  async getAllActiveInventory() {
    const items = await this.inventoryAddService.getAllActiveInventory();
    this.allActiveInventory.set(items);
  }

  async getPlatforms() {
    const platforms = await this.inventoryAddService.getPlatforms();
    this.platforms.set(platforms);
  }

  async markAsListed(item: any) {
    this.inventoryAddService.markAsListed(item); 
  }

  async signOut() {
    this.authService.signOut();
    this.router.navigate(['/login']);
  }
}
