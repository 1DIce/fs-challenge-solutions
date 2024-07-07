import { AfterViewChecked, Component, Input } from "@angular/core";
import { Message } from "../message.type";
import { SnakeCasePipe } from "../snake-case.pipe";

@Component({
  selector: "app-message",
  standalone: true,
  imports: [SnakeCasePipe],
  templateUrl: "./message.component.html",
  styleUrl: "./message.component.scss",
})
export class MessageComponent implements AfterViewChecked {
  @Input({ required: true })
  message!: Message;

  @Input({ required: true })
  parentType!: "ON_PUSH" | "DEFAULT";

  ngAfterViewChecked(): void {
    console.log(this.parentType + " message checked");
  }
}
