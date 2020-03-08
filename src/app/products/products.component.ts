import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ProductsService } from '../products.service';
import { concatMap } from 'rxjs/operators';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  @Input() companyName: string;
  @Output() recentProductData = new EventEmitter();

  // productsList = [
  //   { name: 'Moto G5', quantity: 2 },
  //   { name: 'Racold Geyser', quantity: 3 }
  // ];

  productsList = [];

  productEntryForm: FormGroup;

  constructor(private productsService: ProductsService) { }

  ngOnInit() {
    this.productEntryForm = new FormGroup({
      name: new FormControl('', Validators.required),
      quantity: new FormControl('', Validators.required)
    });

    this.productsService.getProducts().subscribe(data => {
      // console.log(data);
      this.productsList = data;
    });
  }

  addProduct() {
    const { value } = this.productEntryForm;

    // this.productsList.add(value);
    // this.recentProductData.emit(value);

    this.productsService.addProduct(value).pipe(
      concatMap(item => this.productsService.getProducts())
    ).subscribe(response => {
      // console.log(response);
      this.productsList = response;
      this.recentProductData.emit(value);
    }, err => {
      console.log(err);
      this.productsList = [];
    });
  }

}
