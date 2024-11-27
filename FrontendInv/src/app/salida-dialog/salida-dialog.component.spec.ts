import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalidaDialogComponent } from './salida-dialog.component';

describe('SalidaDialogComponent', () => {
  let component: SalidaDialogComponent;
  let fixture: ComponentFixture<SalidaDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SalidaDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SalidaDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
