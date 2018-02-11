import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GameAddMessageComponent } from './game-add-message.component';

describe('GameAddMessageComponent', () => {
  let component: GameAddMessageComponent;
  let fixture: ComponentFixture<GameAddMessageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GameAddMessageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameAddMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
