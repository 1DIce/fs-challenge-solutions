import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  GuardResult,
  RouterStateSnapshot,
} from "@angular/router";
import { Observable } from "rxjs";
import { TestScheduler } from "rxjs/testing";
import { runGuardsInSequence } from "./run-guards-in-sequence";

describe(runGuardsInSequence.name, () => {
  it("should should execute all guards in order", () => {
    const testScheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
    testScheduler.run(({ cold, expectObservable, flush }) => {
      const guard1 = createGuard(cold("-a|", { a: true }));
      const guard2 = createGuard(cold("--a|", { a: true }));
      const guard3 = createGuard(cold("-a|", { a: true }));

      const result$: Observable<GuardResult> = runGuardsInSequence(
        guard1,
        guard2,
        guard3
      )(
        new ActivatedRouteSnapshot(),
        undefined as unknown as RouterStateSnapshot
      ) as Observable<GuardResult>;
      expectObservable(result$).toBe("----(a|)", { a: true });

      flush();

      expect(guard1).toHaveBeenCalledTimes(1);
      expect(guard2).toHaveBeenCalledTimes(1);
      expect(guard3).toHaveBeenCalledTimes(1);
    });
  });

  it("should should not execute remaining guards if a guard condition was not met", () => {
    const testScheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
    testScheduler.run(({ cold, expectObservable, flush }) => {
      const guard1 = createGuard(cold("-a|", { a: true }));
      const guard2 = createGuard(cold("--a|", { a: false }));
      const guard3 = createGuard(cold("-a|", { a: true }));

      const result$: Observable<GuardResult> = runGuardsInSequence(
        guard1,
        guard2,
        guard3
      )(
        new ActivatedRouteSnapshot(),
        undefined as unknown as RouterStateSnapshot
      ) as Observable<GuardResult>;
      expectObservable(result$).toBe("---(a|)", { a: false });

      flush();

      expect(guard1).toHaveBeenCalledTimes(1);
      expect(guard2).toHaveBeenCalledTimes(1);
      expect(guard3).not.toHaveBeenCalled();
    });
  });
});

function createGuard(result: Observable<GuardResult>): CanActivateFn {
  const mockGuard = jest.fn();
  mockGuard.mockImplementation(() => result);
  return mockGuard;
}
