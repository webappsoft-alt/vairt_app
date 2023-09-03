import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { WhenExitInvestmentPage } from './when-exit-investment.page';

describe('WhenExitInvestmentPage', () => {
  let component: WhenExitInvestmentPage;
  let fixture: ComponentFixture<WhenExitInvestmentPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ WhenExitInvestmentPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(WhenExitInvestmentPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
