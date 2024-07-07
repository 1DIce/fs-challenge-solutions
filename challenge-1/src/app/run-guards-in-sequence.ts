import {
  ActivatedRouteSnapshot,
  CanActivateChildFn,
  CanActivateFn,
  GuardResult,
  MaybeAsync,
  RouterStateSnapshot,
} from "@angular/router";
import {
  Observable,
  concat,
  defer,
  from,
  isObservable,
  of,
  take,
  takeLast,
  takeWhile,
} from "rxjs";
import { isPromise } from "rxjs/internal/util/isPromise";

export function runGuardsInSequence(
  ...guards: CanActivateFn[] | CanActivateChildFn[]
): CanActivateFn | CanActivateChildFn {
  return (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): MaybeAsync<GuardResult> => {
    if (guards.length === 0) {
      return true;
    }

    const guards$ = guards.map((guard) => {
      return defer(() => {
        return toObservable(guard(route, state)).pipe(
          take(1) // assumption: a guard that emits multiple values does not make sense
        );
      });
    });

    return concat(...guards$).pipe(
      takeWhile((guardResult) => !!guardResult, true),
      takeLast(1)
    );
  };
}

function toObservable(
  result: MaybeAsync<GuardResult>
): Observable<GuardResult> {
  if (isObservable(result)) {
    return result;
  } else if (isPromise(result)) {
    return from(result);
  } else {
    return of(result);
  }
}
