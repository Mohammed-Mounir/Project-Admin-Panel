import { Injectable } from '@angular/core';
import { Category } from '../_model/categories';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  category: Category[];
  // baseUrl = 'https://iti-amzon-backend.herokuapp.com/';
  baseUrl = 'http://localhost:3000/';
  constructor(private httpClient: HttpClient) {}

  getAllCategories() {
    return this.httpClient.get(this.baseUrl + 'api/categories');
  }

  geCategoryById(id: string) {
    return this.httpClient.get(this.baseUrl + 'api/categories/id/' + id);
  }

  getAllSubCategoriesOfACategryById(categoryId: string) {
    return this.httpClient.get(
      this.baseUrl + 'api/subCategories/id/' + categoryId
    );
  }

  addCategory(CatName: String, CatSub: string[]) {
    return this.httpClient.post(this.baseUrl + 'api/addCategory', {
      name: CatName,
      sub: CatSub,
    });
  }

  editCategory(categoryId: string, catName, subCat: string[]) {
    return this.httpClient.post(this.baseUrl + 'api/categories', {
      _id: categoryId,
      name: catName,
      sub: subCat,
    });
  }

  removeSubCategory(categoryId: string, SubCategoryName: string) {
    this.geCategoryById(categoryId).subscribe((res) => {
      let subArr = res['sub'];
      const index = subArr.indexOf(SubCategoryName);

      subArr.splice(index, 1);
      return this.httpClient.put(this.baseUrl + '/api/categories', {
        sub: subArr,
      });
    });
  }

  removeCategory(categoryId: string) {
    return this.httpClient.delete(
      this.baseUrl + 'api/categories/' + categoryId
    );
  }
}
