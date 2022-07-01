import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskInfoModalComponent } from './task-info-modal.component';

describe('TaskInfoModalComponent', () => {
  let component: TaskInfoModalComponent;
  let fixture: ComponentFixture<TaskInfoModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaskInfoModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaskInfoModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
