import { Injectable, inject } from '@angular/core';
import { InventoryAddRepo } from '../resale-repos/inventory-add-repo';
import { NewItem } from '../inventory-form-add/inventory-form-add';
import { from } from 'rxjs';
import { map } from 'rxjs/operators'; 

@Injectable({
  providedIn: 'root'
})

export class InventoryAddService {
  constructor(private inventoryAddRepo: InventoryAddRepo) { }
            

  addItemToInventory(payload: NewItem) {
    return this.inventoryAddRepo.addItemToInventory(payload); 
  }

  async getItemsFromInventory(): Promise<any[]> {
    const items = await this.inventoryAddRepo.getItemsFromInventory();
    return items
  }

  async getNewestItemsFromInventory(): Promise<any[]> {
    return this.inventoryAddRepo.getNewestItemsFromInventory(); 
  }


  async showAvgTimeToSell() {
    const items = await this.inventoryAddRepo.getItemsFromInventory();
    items.map((item: any) => {
      const listedDate = item.purchase_date
    })

  }
  async getInventoryValue() {
    const value = await this.inventoryAddRepo.getInventoryValue();
    return value; 
  }

  async listItem(item: any) {
    this.inventoryAddRepo.listItem(item); 
  }

  async markAsSold(item: any) {
    this.inventoryAddRepo.markAsSold(item); 
  }

  async markAsListed(item: any) {
    this.inventoryAddRepo.markAsListed(item); 
  }

  async getAllActiveInventory() {
    const inventory = await this.inventoryAddRepo.getAllActiveInventory();
    return inventory; 
  }

  async getAllActiveListings() {
    const listings = await this.inventoryAddRepo.getAllActiveListings();
    return listings; 
  }

  async getPlatforms() {
    const platforms = await this.inventoryAddRepo.getPlatforms();
    return platforms;
  }

  async getPlatformROI() {
    const data = await this.inventoryAddRepo.getPlatformROI();
    return data; 
  }

  async getCatROI() {
    const data = await this.inventoryAddRepo.getCatROI();
    return data; 
  }

  async getSourceROI() {
    const data = await this.inventoryAddRepo.getSourceROI();
    return data; 
  }


  }
