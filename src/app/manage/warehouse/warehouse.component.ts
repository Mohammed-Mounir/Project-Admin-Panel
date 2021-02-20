import { Component, OnInit } from '@angular/core';
import { WarehouseService } from 'src/app/_services/warehouse.service';

@Component({
  selector: 'app-warehouse',
  templateUrl: './warehouse.component.html',
  styleUrls: ['./warehouse.component.scss'],
})
export class WarehouseComponent implements OnInit {
  warehouses;
  constructor(private warehiuseService: WarehouseService) {}

  ngOnInit(): void {
    this.warehouses = this.warehiuseService.getAllWareHouses();
  }
}
