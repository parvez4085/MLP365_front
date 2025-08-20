import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecureDashboard } from './secure-dashboard';

describe('SecureDashboard', () => {
  let component: SecureDashboard;
  let fixture: ComponentFixture<SecureDashboard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SecureDashboard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SecureDashboard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
