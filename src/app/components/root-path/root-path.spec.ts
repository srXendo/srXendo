import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RootPath } from './root-path';

describe('RootPath', () => {
  let component: RootPath;
  let fixture: ComponentFixture<RootPath>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RootPath]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RootPath);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
