import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  RouterStateSnapshot,
  Routes,
} from "@angular/router";
import { of } from "rxjs";
import { ConfigPageComponent } from "./config-page/config-page.component";
import { runGuardsInSequence } from "./run-guards-in-sequence";

function flagGuard(flag: string): CanActivateFn {
  return (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
    console.log("Running flag guard");
    if (flag === "production") {
      return of(true);
    } else {
      return of(false);
    }
  };
}

function roleGuard(role: string): CanActivateFn {
  return (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
    console.log("Running role guard");
    if (role === "admin") {
      return of(true);
    } else {
      return of(false);
    }
  };
}

const authGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  console.log("running auth guard");
  return Promise.resolve(true);
};

export const routes: Routes = [
  {
    path: "config",
    component: ConfigPageComponent,
    canActivate: [
      runGuardsInSequence(
        flagGuard("production"),
        authGuard,
        roleGuard("admin")
      ),
    ],
  },
];
