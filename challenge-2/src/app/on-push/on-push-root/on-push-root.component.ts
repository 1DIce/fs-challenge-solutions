import { CommonModule } from "@angular/common";
import {
  AfterViewChecked,
  ChangeDetectionStrategy,
  Component,
  Input,
} from "@angular/core";
import { Message } from "../../shared/message.type";
import { MessageComponent } from "../../shared/message/message.component";

@Component({
  selector: "app-on-push-root",
  standalone: true,
  imports: [CommonModule, MessageComponent],
  templateUrl: "./on-push-root.component.html",
  styleUrl: "./on-push-root.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OnPushRootComponent implements AfterViewChecked {
  @Input({ required: true })
  messages: Message[] = [];

  ngAfterViewChecked() {
    //console.log("on-push-root checked");
  }

  trackById(_index: number, message: Message): string {
    return message.id;
  }
}
