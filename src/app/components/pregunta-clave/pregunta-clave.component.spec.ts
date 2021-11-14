import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';

import { PreguntaClaveComponent } from './pregunta-clave.component';

describe('PreguntaClaveComponent', () => {
  let component: PreguntaClaveComponent;
  let fixture: ComponentFixture<PreguntaClaveComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PreguntaClaveComponent ],
      imports: [IonicModule.forRoot(), FormsModule, RouterModule]
    }).compileComponents();

    fixture = TestBed.createComponent(PreguntaClaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
