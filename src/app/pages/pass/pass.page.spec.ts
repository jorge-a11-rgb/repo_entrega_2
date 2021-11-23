import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';

import { PassPage } from './pass.page';

describe('PassPage', () => {
  let component: PassPage;
  let fixture: ComponentFixture<PassPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PassPage ],
      imports: [IonicModule.forRoot(), CommonModule, FormsModule, RouterModule]
    }).compileComponents();

    fixture = TestBed.createComponent(PassPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
