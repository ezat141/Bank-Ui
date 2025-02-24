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
    this.loadUsers();
  }

  loadUsers(): void {
    this.userService.getAllUsers().subscribe({
      next: (data) => {
        this.users = data;
      },
      error: (error) => console.error('Error fetching users', error)
    });
  }

  deactivateUser(id: number): void {
    this.userService.deactivateUser(id).subscribe({
      next: () => {
        const user = this.users.find(user => user.id === id);
        console.log('User:', user);
        if(user) user.status = false;
      },
      error: (error) => console.error('Error deactivating user', error)
    });
  }

  activateUser(id: number): void {
    this.userService.activateUser(id).subscribe({
      next: () => {
        const user = this.users.find(user => user.id === id);
        if(user) user.status = true;
      },
      error: (error) => console.error('Error activating user', error)
    });
  }

}
