import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GameAddQuestComponent } from './game-add-quest.component';

describe('GameAddQuestComponent', () => {
  let component: GameAddQuestComponent;
  let fixture: ComponentFixture<GameAddQuestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GameAddQuestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameAddQuestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
