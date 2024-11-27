import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderSalidasComponent } from './header-salidas.component';

describe('HeaderSalidasComponent', () => {
  let component: HeaderSalidasComponent;
  let fixture: ComponentFixture<HeaderSalidasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderSalidasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeaderSalidasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
