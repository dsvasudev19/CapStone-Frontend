import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { catchError, map, Observable } from 'rxjs';
import { AuthenticationService } from '../auth/authentication.service';

@Injectable({
  providedIn: 'root',
})

export class adminAuthGuard implements CanActivate {
  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.authService.checkAuthentication().pipe(
      map((isAuthenticated: boolean) => {
        if (isAuthenticated) {
          return true; 
        } else {
          this.router.navigate(['/auth/login']); 
          return false;
        }
      }),
      catchError((error) => {
        console.error(error);
        this.router.navigate(['/auth/login']); 
        return [false];
      })
    );
  }
}