import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FlipSalebreakdownDetailPage } from './flip-salebreakdown-detail.page';

describe('FlipSalebreakdownDetailPage', () => {
  let component: FlipSalebreakdownDetailPage;
  let fixture: ComponentFixture<FlipSalebreakdownDetailPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ FlipSalebreakdownDetailPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FlipSalebreakdownDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
