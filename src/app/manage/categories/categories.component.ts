import { elementEventFullName } from '@angular/compiler/src/view_compiler/view_compiler';
import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/_services/category.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
})
export class CategoriesComponent implements OnInit {
  categories = [];
  Search_categories = [];
  CatEdit = false;
  CatId = '';
  subText = '';
  idSearch = '';
  nameSearch = '';
  subSearch = '';
  constructor(private categoryService: CategoryService) {}

  ngOnInit(): void {
    this.categoryService.getAllCategories().subscribe(
      (res: any) => {
        this.categories = res;
        this.Search_categories = this.categories.slice();
      },
      (err) => {
        console.error(err);
      }
    );
  }
  editCat(id, name) {
    this.CatEdit = !this.CatEdit;
    this.CatId != '' ? (this.CatId = '') : (this.CatId = id);

    console.log(name);
    console.log(id);
  }

  AddSubCat(CatName: String, CatSub: string[]) {
    var newSub = CatSub;
    console.log(CatName);
    console.log(CatSub);

    newSub.push(this.subText);
    this.subText = '';
    this.categoryService
      .editCategory(this.CatId, CatName, newSub)
      .subscribe((res) => {
        console.log('added');

        console.log(res);
      });
  }

  DeleteSubCat(CatName: String, CatSub: string[], subToRemove) {
    console.log(CatName);
    console.log(CatSub);
    console.log(subToRemove);
    var newSub = CatSub;
    const index = newSub.indexOf(subToRemove);
    console.log(index);

    newSub.splice(index, 1);

    this.categoryService
      .editCategory(this.CatId, CatName, newSub)
      .subscribe((res) => {
        console.log('removed');

        console.log(res);
      });
  }

  RemoveCat(id, RowHtmlElement: HTMLElement) {
    this.categoryService.removeCategory(id).subscribe((res) => {
      console.log('removed');
    });
    RowHtmlElement.style.display = 'none';
  }
  AddCAtegory(Catname, sub) {
    this.categoryService
      .addCategory(Catname.value, [sub.value])
      .subscribe((res) => {
        console.log(res);

        var newCat = { _id: res['_id'], name: res['name'], sub: res['sub'] };
        this.categories.push(newCat);
      });
    Catname.value = '';
    sub.value = '';
  }

  search(field) {
    if (field == 'id') {
      if (this.idSearch == '') {
        this.categories = this.Search_categories.slice();
        return 0;
      }
      this.categories = this.Search_categories.filter((p) => {
        return p._id.toLowerCase().includes(this.idSearch.toLowerCase());
      });
    } else if (field == 'name') {
      if (this.nameSearch == '') {
        this.categories = this.Search_categories.slice();

        return 0;
      }
      this.categories = this.Search_categories.filter((p) => {
        return p.name.toLowerCase().includes(this.nameSearch.toLowerCase());
      });
    } else if (field == 'sub') {
      if (this.subSearch == '') {
        this.categories = this.Search_categories.slice();
        return 0;
      }
      this.categories = this.Search_categories.filter((p) => {
        var t = p.sub.map((e) => {
          return e.toLowerCase().includes(this.subSearch.toLowerCase());
        });

        return t.includes(true);
      });
    }
  }

  Editaall() {
    console.log('enter');

    var images = [];
    console.log(this.categories);

    this.categories.forEach((element) => {
      var catName = element.name;
      var catSub = element.sub;
      var catId = element._id;
      catSub.forEach((sub) => {
        var obj = {
          name: sub,
          URL: '',
        };
        images.push(obj);
      });
      console.log(images);

      this.categoryService
        .editCategory2(catId, catName, catSub, images)
        .subscribe(
          (res) => {
            console.log('done');
          },
          (err) => {
            console.log(err);
          }
        );
    });
  }
}
