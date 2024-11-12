import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { catchError, map, Observable } from 'rxjs';
import { AuthenticationService } from '../auth/authentication.service';

@Injectable({
  providedIn: 'root',
})

export class UserGaurd implements CanActivate {
  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.authService.checkUserAuthentication().pipe(
      map((isAuthenticated: boolean) => {
        if (isAuthenticated) {
          sessionStorage.setItem("isAuthentication","true");
          return true; 
        } else {
          this.router.navigate(['/user/auth/login']); 
          return false;
        }
      }),
      catchError((error) => {
        console.error(error);
        this.router.navigate(['/user/auth/login']); 
        return [false];
      })
    );
  }
}