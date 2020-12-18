import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

/**
 * @title Filter autocomplete
 */
@Component({
  selector: 'app-search-bar',
  templateUrl: './profile-admin-search-bar.component.html',
  styleUrls: ['./profile-admin-search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {

  myControl = new FormControl(null, [Validators.required]);
  options: User[];
  filteredOptions: Observable<any>;

  constructor(public userService: UserService) { }

  ngOnInit(): void {
    this.userService.getAllUsers().subscribe((response) => {
      this.options = response;
    });
    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );
  }

  private _filter(value: string): any {
    if (value === null) { return null; }
    const filterValue = value.toLowerCase();
    return this.options.filter(option => {
      return option.firstname.toLowerCase().includes(filterValue);
    });
  }

  grantPrivileges(): void {
    const data = {
      email: this.myControl.value
    };
    this.userService.grantPrivileges(data).subscribe((response) => {
      this.myControl.reset();
    });
  }
}
