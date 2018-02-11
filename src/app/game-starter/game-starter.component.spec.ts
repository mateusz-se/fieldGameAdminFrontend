import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GameStarterComponent } from './game-starter.component';

describe('GameStarterComponent', () => {
  let component: GameStarterComponent;
  let fixture: ComponentFixture<GameStarterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GameStarterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameStarterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
