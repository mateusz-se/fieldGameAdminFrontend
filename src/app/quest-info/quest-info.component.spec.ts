import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestInfoComponent } from './quest-info.component';

describe('QuestInfoComponent', () => {
  let component: QuestInfoComponent;
  let fixture: ComponentFixture<QuestInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
