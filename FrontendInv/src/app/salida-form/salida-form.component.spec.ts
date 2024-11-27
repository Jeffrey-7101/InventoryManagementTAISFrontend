import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalidaFormComponent } from './salida-form.component';

describe('SalidaFormComponent', () => {
  let component: SalidaFormComponent;
  let fixture: ComponentFixture<SalidaFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SalidaFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SalidaFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
