import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/_model/product';
import { CategoryService } from 'src/app/_services/category.service';
import { ProductService } from 'src/app/_services/product.service';
import { SellersService } from 'src/app/_services/sellers.service';
import { WarehouseService } from 'src/app/_services/warehouse.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  products:Product[]=[];
  allProducts:Product[]=[];
  message = 'Loading ...';
  input =['id' ,'name' ,'type' ,'seller' ]
  categories;
  allCategories;
  allSubCat;
  subCategories;
  constructor(
    private productService : ProductService,
    private sellerService : SellersService,
    private categoryService : CategoryService,
    private warehouseService : WarehouseService
    ) { }

  ngOnInit(): void {
    this.productService.getAllProducts().subscribe(
      (res:any)=>{
        this.products = res;
        this.allProducts = res
      },
      (err)=>{console.error(err)},
      ()=>{}
    );
    this.categories = this.categoryService.getAllCategories();
    this.allCategories = this.categoryService.getAllCategories();
  }
  sellerName(id){
    if(id){
      if(this.sellerService.SearchById(id)[0])
      {
        return this.sellerService.SearchById(id)[0].sellerName;
      }
    }
    return 'undefined'  
  }
  warehouseName(id){
    if(id){
      if(this.warehouseService.getWarehouseById(id)[0])
      {
        return this.warehouseService.getWarehouseById(id)[0].name;
      }
    }
    return 'undefined'  
  }
  productInfoSpread(infos)
  {
    let keys =[];
    for(let info in infos)
    {
      keys.push(info);
    }
    return keys;
  }
  delete(id) {
    this.productService.deleteProduct(id).subscribe(
      ()=>{
        this.productService.getAllProducts().subscribe(
          (res:any)=>{
            this.products = res;
            this.allProducts = res
            
          },
          (err)=>{console.error(err)},
          ()=>{}
        );
      },
      (err)=>{console.error(err)},
      ()=>{}
    );

  }

  clearSearch(except){

    for(let i of this.input)
    {
      if(i != except)
      {
        let inp = document.getElementById(i) as HTMLInputElement;
        inp.value = '';
      }
    }
  }
  idSearch(id) {
    this.clearSearch('id');
      if( this.productService.searchById(id,this.allProducts).length != 0)
      {
        this.products = this.productService.searchById(id,this.allProducts);
      }
      else
      {
        this.products = this.productService.searchById(id,this.allProducts);
        this.message = 'Data Not Found';
      }
  }
  categorySearch(category)
  {
    this.clearSearch('category');
    if(  this.productService.searchByCategory(category,this.allProducts).length != 0)
      {
        this.products = this.productService.searchByCategory(category,this.allProducts);
      }
      else
      {
        this.products = this.productService.searchByCategory(category,this.allProducts);
        this.message = 'Data Not Found';
      }
    this.subCategories =  this.categoryService.getAllSubCategoriesOfACategry(category);
  }
  subCategorySearch(sub){
    if(  this.productService.searchBySubCategory(sub,this.allProducts).length != 0)
    {
      this.products = this.productService.searchBySubCategory(sub,this.allProducts);
    }
    else
    {
      this.products = this.productService.searchBySubCategory(sub,this.allProducts);
      this.message = 'Data Not Found';
    }
  }
  typeSearch(type){
    if(  this.productService.searchByType(type,this.allProducts).length != 0)
    {
      this.products = this.productService.searchByType(type,this.allProducts);
    }
    else
    {
      this.products = this.productService.searchByType(type,this.allProducts);
      this.message = 'Data Not Found';
    }
  }
  stockSearch(stock){
    this.clearSearch('stock');
    if(  this.productService.searchByStock(stock,this.allProducts).length != 0)
    {
      this.products = this.productService.searchByStock(stock,this.allProducts);
    }
    else
    {
      this.products = this.productService.searchByStock(stock,this.allProducts);
      this.message = 'Data Not Found';
    }
  }
  nameSearch(name) {
    this.clearSearch('name');
    if(  this.productService.searchByName(name,this.allProducts).length != 0)
      {
        this.products = this.productService.searchByName(name,this.allProducts);
      }
      else
      {
        this.products = this.productService.searchByName(name,this.allProducts);
        this.message = 'Data Not Found';
      }
    
  }
  sellerNameSearch(sellerName) {
    this.clearSearch('seller');
    this.products = this.productService.searchBySalesName(sellerName,this.allProducts);
    if(  this.products.length === 0)
      {
        this.message = 'Data Not Found';
      }
  }
}
