import { Component } from "@angular/core";
import { DefaultStrategyRootComponent } from "./default-strategy/default-strategy-root/default-strategy-root.component";
import { OnPushRootComponent } from "./on-push/on-push-root/on-push-root.component";
import { Message } from "./shared/message.type";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [OnPushRootComponent, DefaultStrategyRootComponent],
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.scss",
})
export class AppComponent {
  static nextId = 1;
  messages: Message[] = [];

  createMessage(text: string): void {
    if (!text) {
      return;
    }
    const newMessage: Message = { id: AppComponent.nextId.toString(), text };
    AppComponent.nextId++;
    this.messages = [...this.messages, newMessage];
  }

  triggerChangeDetection(): void {
    // An event listener to trigger change detection on every keyup
  }
}
