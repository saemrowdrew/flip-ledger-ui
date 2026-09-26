import { Component, inject, signal } from '@angular/core';
import { AuthService } from '../service/auth';
import { Router } from '@angular/router';
import { AuthUser } from '../types/user-types';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { InventoryAddService } from '../resale-services/inventory-add-service';
import { CurrencyPipe, AsyncPipe } from '@angular/common';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon'; 

@Component({
  selector: 'app-user-profile',
  imports: [CommonModule, RouterOutlet, MatSidenavModule, MatListModule, MatListModule, MatButtonModule, MatIconModule],
  templateUrl: './user-profile.html',
  styleUrl: './user-profile.css',
})
export class UserProfile {

  user: any | null = null
  newestItems = signal<any | null>(null);
  newTenItems = signal<any | null>(null);
  inventoryValue = signal<any | null>(null); 
  errorMessage = 'There was a problem gathering your data';
  inventoryTotalValue = signal<any | null>(null)
  flipSourceLogo = 'flip-ledger-logo.png';


  private authService = inject(AuthService);
  private router = inject(Router);
  private inventoryAddService = inject(InventoryAddService);


  constructor() {
    //this.sellItem = false; 
  }

  async ngOnInit() {
    await this.fetchUser(); 
    await this.getNewestItemsFromInventory();
    await this.getInventoryValue(); 
    
  }


  async fetchUser() {
    const { data } = await this.authService.getUser(); 

    if (data.user) {
      this.user = data.user;
      console.log('USER', this.user)
    }
    else {
      this.router.navigate(['/login']); 
    }
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

  async getNewestItemsFromInventory(): Promise<any> {
    const items = await this.inventoryAddService.getNewestItemsFromInventory();
    const getNames = items.map(i => i.item_name)
    this.newTenItems.set(getNames)
  }

  async getInventoryValue() {
    const value = await this.inventoryAddService.getInventoryValue();
    value?.map(v => {
      v.inventory_value
      this.inventoryValue.set(v)
      console.log('VALUE', this.inventoryValue())
    })
  }

  async signOut() {
    this.authService.signOut();
    this.router.navigate(['/login']);
  }


}
