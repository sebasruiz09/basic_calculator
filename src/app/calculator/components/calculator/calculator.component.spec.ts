import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CalculatorComponent } from './calculator.component';
import { CalculatorService } from '@/calculator/services/calculator.service';
import { By } from '@angular/platform-browser';
import { CalculatorButtonComponent } from '../calculator-button/calculator-button.component';

class MockCalculatorService {
  public result = jasmine.createSpy('result').and.returnValue('100');
  public subResult = jasmine.createSpy('subResult').and.returnValue('100');
  public lastOperator = jasmine.createSpy('lastOperator').and.returnValue('+');

  public readonly numbers = jasmine.createSpy('numbers');

  public readonly operators = jasmine.createSpy('operators');

  public readonly specialOperators = jasmine.createSpy('specialOperators');

  public validateOperations = jasmine.createSpy('validateOperations');
  public validateSpecialOperators = jasmine.createSpy(
    'validateSpecialOperators',
  );
  public validateOperators = jasmine.createSpy('validateOperators');
  public validateNumbers = jasmine.createSpy('validateNumbers');
  public calculateResult = jasmine.createSpy('calculateResult');
}

describe('CalculatorComponent', () => {
  let fixture: ComponentFixture<CalculatorComponent>;
  let compiled: HTMLElement;
  let app: CalculatorComponent;
  let MockCalculatorService: MockCalculatorService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CalculatorComponent],
      providers: [
        {
          provide: CalculatorService,
          useClass: MockCalculatorService,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CalculatorComponent);
    compiled = fixture.nativeElement as HTMLElement;
    app = fixture.componentInstance;
    //MockCalculatorService = TestBed.inject(
    //CalculatorService,
    //) as unknown as MockCalculatorService;
  });

  it('should created the app', () => {
    expect(app).toBeTruthy();
  });

  it('should have 19 calculator-buttons component', () => {
    const buttons = compiled.querySelectorAll('calculator-button');
    //its a same
    const buttonsByDirective = fixture.debugElement.queryAll(
      By.directive(CalculatorButtonComponent),
    );

    expect(buttons.length).toBe(19);
    expect(buttonsByDirective.length).toBe(19);

    expect(buttonsByDirective[0].nativeElement.innerText.trim()).toBe('C');
    //its a same
    expect(buttons[0].textContent?.trim()).toBe('C');
  });

  it('should handleKeyboardEvent its works', () => {
    const eventEnter = new KeyboardEvent('keyup', { key: 'Enter' });
    document.dispatchEvent(eventEnter);
  });
});
