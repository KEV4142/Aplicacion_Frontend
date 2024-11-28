import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColaboradoresSucursalesComponent } from './colaboradores-sucursales.component';

describe('ColaboradoresSucursalesComponent', () => {
  let component: ColaboradoresSucursalesComponent;
  let fixture: ComponentFixture<ColaboradoresSucursalesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ColaboradoresSucursalesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ColaboradoresSucursalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
