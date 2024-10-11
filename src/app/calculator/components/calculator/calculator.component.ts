import { Component, computed, inject, viewChildren } from '@angular/core';
import { CalculatorButtonComponent } from '../calculator-button/calculator-button.component';
import { CalculatorService } from '@/calculator/services/calculator.service';

@Component({
  selector: 'calculator',
  standalone: true,
  imports: [CalculatorButtonComponent],
  templateUrl: './calculator.component.html',
  styleUrl: './calculator.component.css',
  host: {
    '(keydown)': 'handleKeyboardEvent($event)',
  },
})
export class CalculatorComponent {
  private calculatorService = inject(CalculatorService);

  private calculatorButton = viewChildren(CalculatorButtonComponent);

  public readonly result = computed(() => this.calculatorService.result());
  public readonly subResult = computed(() =>
    this.calculatorService.subResult(),
  );
  public readonly lastOperator = computed(() =>
    this.calculatorService.lastOperator(),
  );

  handleClick = (key: string) => this.calculatorService.validateOperations(key);

  //! host replaces @HostListener
  //@HostListener('document:keyup', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent): void {
    this.handleClick(event.key);

    const keyEquival: Record<string, string> = {
      Escape: 'C',
      Clear: 'C',
      Enter: '=',
    };

    this.calculatorButton().forEach((button) => {
      button.keyboardPressed(keyEquival[event.key] ?? event.key);
    });
  }
}
