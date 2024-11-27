import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderIngresosComponent } from './header-ingresos.component';

describe('HeaderIngresosComponent', () => {
  let component: HeaderIngresosComponent;
  let fixture: ComponentFixture<HeaderIngresosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderIngresosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeaderIngresosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
