import { CommonModule } from "@angular/common";
import { AfterViewChecked, Component, Input } from "@angular/core";
import { Message } from "../../shared/message.type";
import { MessageComponent } from "../../shared/message/message.component";

@Component({
  selector: "app-default-strategy-root",
  standalone: true,
  imports: [CommonModule, MessageComponent],
  templateUrl: "./default-strategy-root.component.html",
  styleUrl: "./default-strategy-root.component.scss",
})
export class DefaultStrategyRootComponent implements AfterViewChecked {
  @Input({ required: true })
  messages: Message[] = [];

  ngAfterViewChecked() {
    //console.log("default-strategy-root checked");
  }

  trackById(_index: number, message: Message): string {
    return message.id;
  }
}
