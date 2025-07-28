import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolsBox } from './tools-box';

describe('ToolsBox', () => {
  let component: ToolsBox;
  let fixture: ComponentFixture<ToolsBox>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ToolsBox]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ToolsBox);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
