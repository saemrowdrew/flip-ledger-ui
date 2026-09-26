import { Component, signal, computed } from '@angular/core';
import { InventoryAddService } from '../resale-services/inventory-add-service';
import { KeyValuePipe } from '@angular/common';
import { ChartModule } from 'primeng/chart';
import { Router } from '@angular/router'; 

interface roiData {
  item_source: string;
  sell_thru: number; 
}

@Component({
  selector: 'app-performance-metrics',
  imports: [KeyValuePipe, ChartModule],
  templateUrl: './performance-metrics.html',
  styleUrl: './performance-metrics.css',
})
export class PerformanceMetrics {

  sourceROI = signal<any>([]);
  platformROI = signal<any>([]);
  categoryROI = signal<any>([]);
  sellThruRate = signal<any[]>([]);
  flipLedgerLogo = 'flip-ledger-logo.png';


  constructor(private inventoryAddService: InventoryAddService, private router: Router) { }

  backToUserProfile() {
    this.router.navigate(['/profile'])
  }
  async ngOnInit() {
    await this.getSourceROI();
    await this.getCatROI(); 
  }

  async getSourceROI() {
    const source = await this.inventoryAddService.getSourceROI();
    this.sourceROI.set(source);
  }

  async getCatROI() {
    const category = await this.inventoryAddService.getCatROI();
    this.categoryROI.set(category); 
  }

  async getPlatformROI() {
    const platform = await this.inventoryAddService.getPlatformROI();
    this.platformROI.set(platform); 

  }

  chartOptionsSourceROI = {
    plugins: {
      title: {
        display: true,
        text: "Three Month Source ROI",
        font: {
          size: 15
        }
      },
      legend: {
        position: 'bottom',
        labels: {
          boxWidth: 12,
          boxHeight: 12,
          font: {
            size: 10
          }
        }
      }
    }
  }

  sourceROIData = computed(() => {
    const items = this.sourceROI();
    const item = items.map(({ item_source, sell_thru }: { item_source: string, sell_thru: number }) => ({ item_source, sell_thru }));
    const labels = item.map((i: any) => i.item_source);
    const data = item.map((i: any) => i.sell_thru);

    return {
      labels: labels, 
      datasets: [
        {
          data: data
        }
      ]
    }
  })
 

  chartOptionsPlatformROI = {
    plugins: {
      title: {
        display: true,
        text: "3 Month Selling Platform ROI Metrics",
        font: {
          size: 15
        }
      },
      legend: {
        position: 'bottom',
        labels: {
          boxWidth: 12,
          boxHeight: 12,
          font: {
            size: 10
          }
        }
      }
    }
  }

  platformROIChartData = computed(() => {
    const items = this.platformROI();
    const item = items.map(({ platform_name, sell_thru }: { platform_name: string, sell_thru: number }) => ({ platform_name, sell_thru }));
    const labels = item.map((i: any) => i.platform_name);
    const data = item.map((i: any) => i.sell_thru); 

    return {
      labels: labels,
      datasets: [
        {
          data: data
        }
      ],
    };
  })

  categoryROIChartData = computed(() => {
    const roi = this.categoryROI();

    return {
      labels: Object.keys(roi),
      datasets: [
        {
          data: Object.values(roi)
        }
      ]
    }

  })

  chartOptionsCategoryROI = {
    plugins: {
      title: {
        display: true,
        text: "Three Month Category ROI",
        font: {
          size: 15
        }
      },
      legend: {
        position: 'bottom',
        labels: {
          boxWidth: 12,
          boxHeight: 12,
          font: {
            size: 10
          }
        }
      }
    }
  }

  categoryROIData = computed(() => {
    const items = this.categoryROI();
    console.log('CATEGORY', items)
    const item = items.map(({ item_category, sell_thru }: { item_category: string, sell_thru: number }) => ({ item_category, sell_thru }));
    const labels = item.map((i: any) => i.item_category);
    const data = item.map((i: any) => i.sell_thru);
    console.log('LABELS', labels)
    console.log('DATA', data)


    return {
      labels: labels, 
      datasets: [
        {
          data: data
        }
      ]
    }
  })

  chartOptionsSellThru = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      },
      title: {
        display: true,
        text: "Last Month's Sell Thru",
        font: {
          size: 15
        }
      }
    }
  }

}
