import { NgForOf, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'app-user-list',
  imports: [NgForOf, NgIf],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent implements OnInit {
  users: any[] = [];
  constructor(private userService: UserService) { }
  ngOnInit(): void {
    this.userService.getAllUsers().subscribe({
      next:(data) =>{
        this.users = data;

      },
      error: (error) => console.error('Error fetching users', error)
    })
  }

}
