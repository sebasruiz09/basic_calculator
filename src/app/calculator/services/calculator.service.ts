import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CalculatorService {
  public result = signal('0');
  public subResult = signal('0');
  public lastOperator = signal('+');

  private readonly numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
  private readonly operators = ['+', '-', '*', '/'];
  private readonly specialOperators = ['+/-', '%', '.', '=', 'C', 'Backspace'];

  public validateOperations(value: string): void {
    if (value == '0' && (this.result() == '0' || this.result() == '-0')) {
      return;
    }

    if (this.operators.includes(value)) this.validateOperators(value);

    if (this.specialOperators.includes(value))
      this.validateSpecialOperators(value);

    if (this.numbers.includes(value)) this.validateNumbers(value);
  }

  private validateSpecialOperators(value: string): void {
    if (value == '+/-') {
      this.result().includes('-')
        ? this.result.update((x) => x.slice(1))
        : this.result.update((x) => '-' + x);

      return;
    }

    if (value == '=') {
      this.calculateResult();
      return;
    }

    if (value == 'C') {
      this.result.set('0'), this.subResult.set('0'), this.lastOperator.set('+');
      return;
    }

    if (value == 'Backspace') {
      if (this.result() == '0') return;

      if (this.result().length == 1) {
        this.result.set('0');
        return;
      }

      this.result.update((current) => current.slice(0, -1));
      return;
    }

    if (this.operators.includes(value)) this.validateOperators(value);

    if (value === '.' && !this.result().includes('.')) {
      if (this.result() == '0' || this.result() == '') {
        this.result.set('0.');
        return;
      }

      this.result.update((text) => text + '.');
      return;
    }
  }

  private validateOperators(value: string): void {
    this.lastOperator.set(value);
    this.subResult.set(this.result());
    this.result.set('0');
    return;
  }

  private validateNumbers(value: string): void {
    if (this.result() == '0' || this.result() == '-0') {
      this.result.set(this.result().includes('-') ? `-${value}` : value);
      return;
    }

    this.result.update((text) => text + value);
    return;
  }

  public calculateResult(): void {
    const firstNum = parseFloat(this.subResult());
    const secondNum = parseFloat(this.result());

    let result = 0;

    switch (this.lastOperator()) {
      case '+':
        result = firstNum + secondNum;
        break;
      case '-':
        result = firstNum - secondNum;
        break;
      case '*':
        result = firstNum * secondNum;
        break;
      case '/':
        result = firstNum / secondNum;
        break;
    }

    this.result.set(result.toString());
    this.subResult.set('0');
  }
}
