import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SideBarService {
  isToggledClick = new EventEmitter<boolean>();

  constructor() {}
}
