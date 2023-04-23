import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnswerHistoryComponent } from './answer-history.component';

describe('AnswerHistoryComponent', () => {
  let component: AnswerHistoryComponent;
  let fixture: ComponentFixture<AnswerHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnswerHistoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnswerHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
