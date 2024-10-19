import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CalculatorButtonComponent } from './calculator-button.component';
import { Component } from '@angular/core';

@Component({
  standalone: true,
  imports: [CalculatorButtonComponent],
  template: `
    <calculator-button>
      <span class="projected-content underline">Test content</span>
    </calculator-button>
  `,
})
class TestHostComponent {}

describe('CalculatorButtonComponent', () => {
  let fixture: ComponentFixture<CalculatorButtonComponent>;
  let compiled: HTMLElement;
  let app: CalculatorButtonComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CalculatorButtonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CalculatorButtonComponent);
    compiled = fixture.nativeElement as HTMLElement;
    app = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(app).toBeTruthy();
  });

  it('should apply required classes', () => {
    const hostClass: string[] = compiled.classList.value.split(' ');
    ['border-r', 'border-b', 'border-indigo-400'].forEach((classList: string) =>
      expect(hostClass).toContain(classList),
    );
  });

  it('should apply is doubleSize correct', () => {
    fixture.componentRef.setInput('isDoubleSize', true);
    fixture.detectChanges();
    const hostClass: string[] = compiled.classList.value.split(' ');
    expect(hostClass).toContain('w-2/4');
  });

  it('should onClick is emited when handleClick is called', () => {
    spyOn(app.onClick, 'emit');
    app.handleCLick();
    expect(app.onClick.emit).toHaveBeenCalled();
  });

  it('should set isPress true and then keyboardPressStyles is called', (done) => {
    app.value()!.nativeElement.innerText = '1';
    app.keyboardPressed('1');

    expect(app.isPressed()).toBeTrue();

    setTimeout(() => {
      expect(app.isPressed()).toBeFalse();
      done();
    }, 151);
  });

  it('should diplay projected content', () => {
    const testHostFix = TestBed.createComponent(TestHostComponent);

    const compiled = testHostFix.nativeElement as HTMLDivElement;

    const span = compiled.querySelector('.projected-content');

    expect(span).not.toBeNull();
    expect(span?.classList).toContain('underline');
  });
});
