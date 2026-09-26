import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { InventoryAddService } from '../resale-services/inventory-add-service';
import { Router } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../service/auth';

export interface NewItem {
  itemId: string;
  itemName: string; 
  itemBrand: string;
  itemCategory: string;
  itemSource: string;
  purchaseDate: Date; 
  purchasePrice: number;
  expectedResalePrice: number;
  expectedProfit: number;
  isItemSold: Boolean; 
  additionalNotes: string; 
};

@Component({
  selector: 'app-inventory-form-add',
  imports: [ReactiveFormsModule, MatInputModule, MatFormFieldModule, MatDatepickerModule, MatNativeDateModule, MatSelectModule, MatSidenavModule, MatListModule, MatListModule, MatButtonModule, MatIconModule],
  templateUrl: './inventory-form-add.html',
  styleUrl: './inventory-form-add.css',
})
export class InventoryFormAdd {

  private authService = inject(AuthService);

  private destroy$ = new Subject<void>(); 
  addInventoryForm!: FormGroup;
  flipLedgerLogo = 'flip-ledger-logo.png';

  sourcingOption = [
    'Craigslist',
    'Estate Sale',
    'Facebook Marketplace',
    'Garage Sale',
    'Goodwill',
    'Savers'
  ];
  resaleListingOptions = [
    'Amazon',
    'CraigsList',
    'Depop',
    'ebay',
    'Facebook Marketplace',
    'OfferUp',
    'Poshmark'
  ];
  addedItemCategory = [
    'Bags & Accessories',
    'Beauty & Health',
    'Clothing',
    'Collectibles',
    'Electronics',
    'Home & Kitchen',
    'Jewerly & Watches',
    'Media', 
    'Sporting Goods',
    'Tools & Hardware'
  ];

  constructor(
    private formBuilder: FormBuilder,
    private inventoryAddService: InventoryAddService, 
    private router: Router,
  ) { };

  ngOnInit() {
    this.addInventoryForm = this.formBuilder.group({
      itemName: ['', [Validators.required, Validators.maxLength(100)]],
      itemBrand: ['', [Validators.required, Validators.maxLength(100)]],
      itemCategory: ['', Validators.required],
      itemSource: ['', Validators.required],
      purchaseDate: ['', Validators.required],
      purchasePrice: ['', [Validators.required, Validators.maxLength(5)]],
      expectedResalePrice: ['', [Validators.required, Validators.maxLength(5)]],
      expectedProfit: ['', Validators.required, Validators.maxLength(5)],
      isItemSold: ['', Validators.required],
      additionalNotes: ['', Validators.maxLength(300)]
    });

    this.addInventoryForm.valueChanges.pipe(takeUntil(this.destroy$))
      .subscribe(value => {
        const originalPrice = Number(value.purchasePrice) || 0;
        const expectedPrice = Number(value.expectedResalePrice) || 0;
        const potentialProfit = expectedPrice - originalPrice;

        this.addInventoryForm.get('expectedProfit')?.patchValue(potentialProfit,
          { emitEvent: false }
        )
      })

 
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

  onSubmit(): void {
    if (this.addInventoryForm.invalid) return;
    this.inventoryAddService.addItemToInventory(this.addInventoryForm.getRawValue());
    this.router.navigate(['/profile']);
  }

  async signOut() {
    this.authService.signOut();
    this.router.navigate(['/login']);
  }
}


