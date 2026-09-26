import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NewItem } from '../inventory-form-add/inventory-form-add';
import { environment } from '../../environments/environments';
import { SupabaseClient, createClient } from '@supabase/supabase-js';
import { AuthService } from '../service/auth';
import { AuthUser } from '../types/user-types';


@Injectable({
  providedIn: 'root'
})
export class InventoryAddRepo {
  private apiUrl = 'https://nbynuiepwxoebjwxvcry.supabase.co/rest/v1/add_inventory';
  private supabase: SupabaseClient;
  today = new Date();
  firstDayLastMonth = new Date(this.today.getFullYear(), this.today.getMonth() - 1, 1).toISOString();
  lastDayLastMonth = new Date(this.today.getFullYear(), this.today.getMonth(), 0, 23, 59,).toISOString(); 

  constructor(private http: HttpClient) {
    this.supabase = createClient(
      environment.supabaseUrl,
      environment.supabaseKey
    );
  };

  async addItemToInventory(payload: NewItem) {
    const { data: authData, error: authError } = await this.supabase.auth.getUser(); 

    const { data: insertData, error: insertError } = await this.supabase.from('user_inventory').insert({
      user_id: authData.user?.id,
      item_id: payload.itemId,
      item_name: payload.itemName,
      item_brand: payload.itemBrand,
      item_category: payload.itemCategory,
      item_source: payload.itemSource,
      purchase_date: payload.purchaseDate, 
      purchase_price: payload.purchasePrice,
      expected_resale_price: payload.expectedResalePrice,
      expected_profit: payload.expectedProfit,
      is_item_sold: Boolean, 
      additional_notes: payload.additionalNotes
    })
      .select();
    if (insertError) {
      console.error('Error uploading item', insertError.message)
      return; 
    }
    console.log('Item added successfully', insertData)
  }

  async markAsSold(item: any) {
    const { data, error } = await this.supabase.rpc('sell_item',
      {
        p_item_id: item.item_id, 
        p_sold_platform_id: item.sold_platform_id,
        p_sold_date: item.sold_date,
        p_sold_price: item.sold_price
      })
    if (error) {
      console.error('There was an error updating your item');
    } 
    return data; 
  }

  async markAsListed(item: any) {
    const { data, error } = await this.supabase.rpc('list_item',
      {
        p_item_id: item.item_id,
        p_listing_date: item.listing_date,
        p_listing_price: item.listing_price,
        p_platform_id: item.platform_id
      })
    if (error) {
      console.error('There was an error listing your item'); 
    }
    return data; 
  }

  async getPlatforms(): Promise<any> {
    const { data, error } = await this.supabase.from('selling_platforms').select('platform_name, platform_id');
    if (error) {
      console.error('There was an issue retrieving your data');
      return;
    }
    return data;
  }

  async getItemsFromInventory() {
    const { data, error } = await this.supabase.from('user_inventory').select('*')
    if (error) {
      console.error('There was a problem gathering your inventory', error.message);
      return [];
    }
    return data; 
  }

  async getNewestItemsFromInventory(): Promise<any[]>{ 
    const { data, error } = await this.supabase.from('user_inventory')
      .select('*')
      .order('purchase_date', { ascending: false })
      .limit(10)
    if (error) {
      console.error('There was a problem gathering your data', error.message)
      return [];
    }
    return data; 
  }

  async getActiveListingsTotalValue(): Promise<any> {
    const { data, error } = await this.supabase.from('item_listings')
      .select('expected_profit')
    if (error) {
      console.error('There was a problem gathering your data')
      return [];
    }
    return data 
  }

  async getAllActiveInventory(): Promise<any[]> {
    const { data, error } = await this.supabase.from('get_active_inventory')
    .select('*')
    if (error) {
      console.error('There was an issue retrieving your inventory')
      return [];
    }
    return data; 
  }

  async listItem(item: any) {
    const { data, error } = await this.supabase.rpc('list_inventory_item',
      {
        p_item_id: item.item_id,
        p_listing_platform_id: item.listing_platform_id,
        p_listing_date: item.listing_date,
        p_listing_price: item.listing_price
      })
    if (error) {
      console.error('There was an issue listing your item')
    }
    return data
  }

  async getAllActiveListings(): Promise<any> {
    const { data, error } = await this.supabase.from('get_active_listings').select('*');
    if (error) {
      console.error('There was an issue retrieving your data');
    }
    return data
  }

  async getPlatformROI(): Promise<any> {
    const { data, error } = await this.supabase.from('platform_sell_thru').select('*');
    if (error) {
      console.error('There was an issue retrieving your data'); 
    }
    return data; 
  }

  async getCatROI(): Promise<any> {
    const { data, error } = await this.supabase.from('cat_sell_thru').select('*');
    if (error) {
      console.error('There was an issue retrieving your data');
    }
    return data; 
  }

  async getSourceROI(): Promise<any> {
    const { data, error } = await this.supabase.from('source_sell_thru').select('*');
    if (error) {
      console.error('There was an issue retrieving your data');
    }
    return data; 
  }

  async getInventoryValue() {
    const { data, error } = await this.supabase.from('active_inventory_value').select('*');
    if (error) {
      console.error('There was an issue retrieving your data');
    }

    return data; 
  }



}
