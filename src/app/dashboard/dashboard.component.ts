import { Component,OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import {HeaderComponent} from '../header/header.component'

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule,HeaderComponent,HeaderComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})

export class DashboardComponent {


  constructor(private authService: AuthService,private router: Router) {}






}