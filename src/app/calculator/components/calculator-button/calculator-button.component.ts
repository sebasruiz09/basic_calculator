import {
  Component,
  ElementRef,
  input,
  output,
  signal,
  viewChild,
} from '@angular/core';

@Component({
  selector: 'calculator-button',
  standalone: true,
  imports: [],
  templateUrl: './calculator-button.component.html',
  styleUrl: './calculator-button.component.css',
  host: {
    class: 'border-r border-b border-indigo-400',
    '[class.w-1/4]': '!isDoubleSize()',
    '[class.w-2/4]': 'this.isDoubleSize()',
  },
  // discard encapsulaption like to ngdeep in css
  //encapsulation: ViewEncapsulation.None,
})
export class CalculatorButtonComponent {
  public isPressed = signal(false);
  public onClick = output<string>();

  public value = viewChild<ElementRef<HTMLButtonElement>>('button');

  public isCommand = input(false, {
    transform: (value: string) =>
      typeof value == 'string' ? value === '' : value,
  });

  public isDoubleSize = input(false, {
    transform: (value: string) =>
      typeof value == 'string' ? value === '' : value,
  });

  //@HostBinding('class.is-command') get comandStyle() {
  //return this.isCommand();
  //}
  //
  //@HostBinding('class.w-2/4') get comandStyle() {
  //return this.isDoubleSize();
  //}

  handleCLick(): void {
    if (!this.value()?.nativeElement) return;

    const output = this.value()!.nativeElement.innerText;

    this.onClick.emit(output.trim());
  }

  public keyboardPressed(key: string) {
    if (!this.value()) return;

    const output = this.value()!.nativeElement.innerText;

    if (output != key) return;

    this.isPressed.set(true);

    setTimeout(() => {
      this.isPressed.set(false);
    }, 150);
  }
}
