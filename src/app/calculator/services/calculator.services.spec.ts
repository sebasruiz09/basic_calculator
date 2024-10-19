import { TestBed } from '@angular/core/testing';
import { CalculatorService } from './calculator.service';

describe('CalculatorService', () => {
  let service: CalculatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CalculatorService);
  });

  it('Should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should be created with values', () => {
    expect(service.result()).toBe('0');
  });

  it('should be set result text "0" when press C', () => {
    service.result.set('1');
    service.validateOperations('C');
    expect(service.result()).toEqual('0');
  });

  it('should update resultText with number input', () => {
    service.validateOperations('1');
    expect(service.result()).toBe('1');
  });

  it('should handle correctly operators ', () => {
    service.validateOperations('1');
    //service.validateOperations('+');

    //expect(service.lastOperator()).toBe('+');
    expect(service.result()).toBe('1');
  });
});
