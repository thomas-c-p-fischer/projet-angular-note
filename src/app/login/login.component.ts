import { Component } from '@angular/core';
import {FormsModule} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  user = { login: '', pwd: ''};

  constructor(private router: Router) {
  }

  /**
   * Vérifie les informations de connexion.
   * Si elles sont correctes, redirige l'utilisateur vers la page des cartes.
   * @returns {void}
   */
  onLogin(): void {
    if (this.user.login === 'y' && this.user.pwd === 'y') {
      this.router.navigate(['/cards']);
    } else {
      alert('Identifiants incorrects');
    }
  }
}
