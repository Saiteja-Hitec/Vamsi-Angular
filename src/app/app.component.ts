import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  companyName = 'Amazon';
  productData: any;

  getProductData(data) {
    this.productData = data;
  }
}
