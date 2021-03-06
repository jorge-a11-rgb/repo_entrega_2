import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';

import { Pass2Page } from './pass2.page';

describe('Pass2Page', () => {
  let component: Pass2Page;
  let fixture: ComponentFixture<Pass2Page>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ Pass2Page ],
      imports: [IonicModule.forRoot(), CommonModule, FormsModule, RouterModule]
    }).compileComponents();

    fixture = TestBed.createComponent(Pass2Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
