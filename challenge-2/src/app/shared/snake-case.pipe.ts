import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "snakeCase",
  standalone: true,
})
export class SnakeCasePipe implements PipeTransform {
  transform(value: string): string {
    console.log("executing snake pipe");
    return value.split(" ").join("_");
  }
}
