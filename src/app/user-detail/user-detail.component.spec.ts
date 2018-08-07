import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { userDetailComponent } from './user-detail.component';

describe('userDetailComponent', () => {
  let component: userDetailComponent;
  let fixture: ComponentFixture<userDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ userDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(userDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
