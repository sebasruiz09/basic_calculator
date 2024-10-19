import { ComponentFixture, TestBed } from '@angular/core/testing';
import CalculatorViewComponent from './calculator-view.component';

describe('CalculatorViewComponent', () => {
  let fixture: ComponentFixture<CalculatorViewComponent>;
  let compiled: HTMLElement;
  let app: CalculatorViewComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CalculatorViewComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CalculatorViewComponent);
    compiled = fixture.nativeElement as HTMLElement;
    app = fixture.componentInstance;
  });

  it('should create the app', () => {
    expect(app).toBeTruthy();
  });

  it('should contain calculator component', () => {
    expect(compiled.querySelector('calculator')).not.toBeNull();
  });

  it('should contain basic calculator - css', () => {
    const div = compiled.querySelector('div');
    const calculatorStyles =
      'w-full mx-auto bg-gray-100 shadow-xl text-gray-800 relative overflow-hidden'.split(
        ' ',
      );

    const divClass = div?.classList.value.split(' ');

    calculatorStyles.forEach((className: string) => {
      expect(divClass).toContain(className);
    });
  });
});
