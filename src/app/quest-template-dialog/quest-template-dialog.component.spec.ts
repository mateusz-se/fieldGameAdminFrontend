import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestTemplateDialogComponent } from './quest-template-dialog.component';

describe('QuestTemplateDialogComponent', () => {
  let component: QuestTemplateDialogComponent;
  let fixture: ComponentFixture<QuestTemplateDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestTemplateDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestTemplateDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
