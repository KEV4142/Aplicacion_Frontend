import { Component ,OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
@Component({
  selector: 'app-header',
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  userName: string | undefined;
  userType: string | undefined;

  constructor(private authService: AuthService,private router: Router) {}

  ngOnInit(): void {
    this.loadUserDetails();
  }

  loadUserDetails(): void {
    this.authService.getUserDetails().subscribe({
      next: (response) => {
        this.userName = response.nombreCompleto;
        this.userType = response.tipo;
      },
      error: (erro) => {
        console.error('Error al Obtener Perfil de Usuario.', erro);
        this.router.navigate(['/login']);
      }
  });
  }


  isAdmin(): boolean {
    return this.authService.isAdministrador();
  }

  isOperator(): boolean {
    return this.userType === 'Operador';
  }
  optTablero():void{
    this.router.navigate(['/dashboard'])
  }
  optViajes(): void {
    this.router.navigate(['/viajes']);
  }
  optSucursales(): void {
    this.router.navigate(['/colaboradores']);
  }
  optReporte(): void {
    this.router.navigate(['/reporte']);
  }
  salir(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

}