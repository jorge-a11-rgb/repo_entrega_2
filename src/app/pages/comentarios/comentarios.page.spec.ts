import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';

import { ComentariosPage } from './comentarios.page';

describe('ComentariosPage', () => {
  let component: ComentariosPage;
  let fixture: ComponentFixture<ComentariosPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ComentariosPage ],
      imports: [IonicModule.forRoot(), CommonModule, FormsModule, RouterModule]
    }).compileComponents();

    fixture = TestBed.createComponent(ComentariosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
