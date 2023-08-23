import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  CanMatchFn,
  Route, Router,
  RouterStateSnapshot,
  UrlSegment
} from "@angular/router";
import {inject} from "@angular/core";
import {AuthService} from "../services/auth.service";
import {Observable, tap} from "rxjs";


const authCheckStatus = (): boolean | Observable<boolean> => {
  const authService = inject(AuthService);
  const router: Router = inject(Router);

  return authService.checkAuth().pipe(
    tap(isAuthenticated => {
      if (!isAuthenticated) router.navigate(["./auth/login"])
    })
  )
}
const CanActivate: CanActivateFn = (
  next: ActivatedRouteSnapshot,
  state: RouterStateSnapshot) => {
  return authCheckStatus();
}

export const CanMatch: CanMatchFn = (route: Route, segments: UrlSegment[]) => {
  return authCheckStatus();
}

export const AuthGuard = {
  CanActivate, CanMatch
}
