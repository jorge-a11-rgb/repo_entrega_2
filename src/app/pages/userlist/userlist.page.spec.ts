import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';

import { UserlistPage } from './userlist.page';

describe('UserlistPage', () => {
  let component: UserlistPage;
  let fixture: ComponentFixture<UserlistPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ UserlistPage ],
      imports: [IonicModule.forRoot(), CommonModule, FormsModule, RouterModule]
    }).compileComponents();

    fixture = TestBed.createComponent(UserlistPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
