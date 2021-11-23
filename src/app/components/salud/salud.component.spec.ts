import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';

import { SaludComponent } from './salud.component';

describe('SaludComponent', () => {
  let component: SaludComponent;
  let fixture: ComponentFixture<SaludComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SaludComponent ],
      imports: [IonicModule.forRoot(), FormsModule, RouterModule, CommonModule]
    }).compileComponents();

    fixture = TestBed.createComponent(SaludComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
