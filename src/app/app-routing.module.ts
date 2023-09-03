import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: '',
    pathMatch: 'full'
  },
  {
    path: 'signup',
    loadChildren: () => import('./signup/signup.module').then( m => m.SignupPageModule)
  },
  {
    path: 'otp',
    loadChildren: () => import('./otp/otp.module').then( m => m.OtpPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'address',
    loadChildren: () => import('./address/address.module').then( m => m.AddressPageModule)
  },
  {
    path: 'account-type',
    loadChildren: () => import('./account-type/account-type.module').then( m => m.AccountTypePageModule)
  },
  {
    path: 'investment-type',
    loadChildren: () => import('./investment-type/investment-type.module').then( m => m.InvestmentTypePageModule)
  },
  {
    path: 'level-experience',
    loadChildren: () => import('./level-experience/level-experience.module').then( m => m.LevelExperiencePageModule)
  },
  {
    path: 'strategy',
    loadChildren: () => import('./strategy/strategy.module').then( m => m.StrategyPageModule)
  },
  {
    path: 'exit-investment',
    loadChildren: () => import('./exit-investment/exit-investment.module').then( m => m.ExitInvestmentPageModule)
  },
  {
    path: 'new-investments',
    loadChildren: () => import('./new-investments/new-investments.module').then( m => m.NewInvestmentsPageModule)
  },
  {
    path: 'portfolio',
    loadChildren: () => import('./portfolio/portfolio.module').then( m => m.PortfolioPageModule)
  },
  {
    path: 'flip',
    loadChildren: () => import('./flip/flip.module').then( m => m.FlipPageModule)
  },
  {
    path: 'investment-detail',
    loadChildren: () => import('./investment-detail/investment-detail.module').then( m => m.InvestmentDetailPageModule)
  },
  {
    path: 'setting',
    loadChildren: () => import('./setting/setting.module').then( m => m.SettingPageModule)
  },
  {
    path: 'property-detail',
    loadChildren: () => import('./property-detail/property-detail.module').then( m => m.PropertyDetailPageModule)
  },
  {
    path: 'invest-info',
    loadChildren: () => import('./invest-info/invest-info.module').then( m => m.InvestInfoPageModule)
  },
  {
    path: 'invest-account-info',
    loadChildren: () => import('./invest-account-info/invest-account-info.module').then( m => m.InvestAccountInfoPageModule)
  },
  {
    path: 'invest-amount',
    loadChildren: () => import('./invest-amount/invest-amount.module').then( m => m.InvestAmountPageModule)
  },
  {
    path: 'invest-tell-more',
    loadChildren: () => import('./invest-tell-more/invest-tell-more.module').then( m => m.InvestTellMorePageModule)
  },
  {
    path: 'invest-agree-sign',
    loadChildren: () => import('./invest-agree-sign/invest-agree-sign.module').then( m => m.InvestAgreeSignPageModule)
  },
  {
    path: 'invest-fund',
    loadChildren: () => import('./invest-fund/invest-fund.module').then( m => m.InvestFundPageModule)
  },
  {
    path: 'citizenship',
    loadChildren: () => import('./citizenship/citizenship.module').then( m => m.CitizenshipPageModule)
  },
  {
    path: 'when-exit-investment',
    loadChildren: () => import('./when-exit-investment/when-exit-investment.module').then( m => m.WhenExitInvestmentPageModule)
  },
  {
    path: 'current-income',
    loadChildren: () => import('./current-income/current-income.module').then( m => m.CurrentIncomePageModule)
  },
  {
    path: 'employment-info',
    loadChildren: () => import('./employment-info/employment-info.module').then( m => m.EmploymentInfoPageModule)
  },
  {
    path: 'identity-of',
    loadChildren: () => import('./identity-of/identity-of.module').then( m => m.IdentityOfPageModule)
  },
  {
    path: 'agree-to',
    loadChildren: () => import('./agree-to/agree-to.module').then( m => m.AgreeToPageModule)
  },
  {
    path: 'transaction-detail-modal',
    loadChildren: () => import('./transaction-detail-modal/transaction-detail-modal.module').then( m => m.TransactionDetailModalPageModule)
  },
  {
    path: 'rental-breakdown-modal',
    loadChildren: () => import('./rental-breakdown-modal/rental-breakdown-modal.module').then( m => m.RentalBreakdownModalPageModule)
  },
  {
    path: 'flip-detail',
    loadChildren: () => import('./flip-detail/flip-detail.module').then( m => m.FlipDetailPageModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./profile/profile.module').then( m => m.ProfilePageModule)
  },
  {
    path: 'flip-transaction-detail',
    loadChildren: () => import('./flip-transaction-detail/flip-transaction-detail.module').then( m => m.FlipTransactionDetailPageModule)
  },
  {
    path: 'flip-salebreakdown-detail',
    loadChildren: () => import('./flip-salebreakdown-detail/flip-salebreakdown-detail.module').then( m => m.FlipSalebreakdownDetailPageModule)
  },
  {
    path: 'top-up',
    loadChildren: () => import('./top-up/top-up.module').then( m => m.TopUpPageModule)
  },
  {
    path: 'top-down',
    loadChildren: () => import('./top-down/top-down.module').then( m => m.TopDownPageModule)
  },
  {
    path: 'email-connected',
    loadChildren: () => import('./email-connected/email-connected.module').then( m => m.EmailConnectedPageModule)
  },
  {
    path: 'phone',
    loadChildren: () => import('./phone/phone.module').then( m => m.PhonePageModule)
  },
  {
    path: 'invest-employment-info',
    loadChildren: () => import('./invest-employment-info/invest-employment-info.module').then( m => m.InvestEmploymentInfoPageModule)
  },
  {
    path: 'invest-contact-info',
    loadChildren: () => import('./invest-contact-info/invest-contact-info.module').then( m => m.InvestContactInfoPageModule)
  },
  {
    path: 'invest-identity-of',
    loadChildren: () => import('./invest-identity-of/invest-identity-of.module').then( m => m.InvestIdentityOfPageModule)
  },
  {
    path: 'deposit-funds',
    loadChildren: () => import('./deposit-funds/deposit-funds.module').then( m => m.DepositFundsPageModule)
  },
  {
    path: 'bank-detail',
    loadChildren: () => import('./bank-detail/bank-detail.module').then( m => m.BankDetailPageModule)
  },
  {
    path: 'deposit-instructions',
    loadChildren: () => import('./deposit-instructions/deposit-instructions.module').then( m => m.DepositInstructionsPageModule)
  },
  {
    path: 'confirmation',
    loadChildren: () => import('./confirmation/confirmation.module').then( m => m.ConfirmationPageModule)
  },
  {
    path: 'why-we-ask',
    loadChildren: () => import('./why-we-ask/why-we-ask.module').then( m => m.WhyWeAskPageModule)
  },
  {
    path: 'current-income-model',
    loadChildren: () => import('./current-income-model/current-income-model.module').then( m => m.CurrentIncomeModelPageModule)
  },
  {
    path: 'current-net-worth',
    loadChildren: () => import('./current-net-worth/current-net-worth.module').then( m => m.CurrentNetWorthPageModule)
  },
  {
    path: 'net-worth-modal',
    loadChildren: () => import('./net-worth-modal/net-worth-modal.module').then( m => m.NetWorthModalPageModule)
  },
  {
    path: 'agree-tc',
    loadChildren: () => import('./agree-tc/agree-tc.module').then( m => m.AgreeTcPageModule)
  },
  {
    path: 'account-activate',
    loadChildren: () => import('./account-activate/account-activate.module').then( m => m.AccountActivatePageModule)
  },
  {
    path: 'google-auth-modal',
    loadChildren: () => import('./google-auth-modal/google-auth-modal.module').then( m => m.GoogleAuthModalPageModule)
  },
  {
    path: 'auth-model',
    loadChildren: () => import('./auth-model/auth-model.module').then( m => m.AuthModelPageModule)
  },
  {
    path: 'support',
    loadChildren: () => import('./support/support.module').then( m => m.SupportPageModule)
  },
  {
    path: 'submit-ticket',
    loadChildren: () => import('./submit-ticket/submit-ticket.module').then( m => m.SubmitTicketPageModule)
  },
  {
    path: 'support-view',
    loadChildren: () => import('./support-view/support-view.module').then( m => m.SupportViewPageModule)
  },
  {
    path: 'transaction',
    loadChildren: () => import('./transaction/transaction.module').then( m => m.TransactionPageModule)
  },
  {
    path: 'update-bank-detail',
    loadChildren: () => import('./update-bank-detail/update-bank-detail.module').then( m => m.UpdateBankDetailPageModule)
  },
  {
    path: 'withdrawl-request',
    loadChildren: () => import('./withdrawl-request/withdrawl-request.module').then( m => m.WithdrawlRequestPageModule)
  },
  {
    path: 'funds-request',
    loadChildren: () => import('./funds-request/funds-request.module').then( m => m.FundsRequestPageModule)
  },
  {
    path: 'trans-invest-detail',
    loadChildren: () => import('./trans-invest-detail/trans-invest-detail.module').then( m => m.TransInvestDetailPageModule)
  },
  {
    path: 'all-transaction',
    loadChildren: () => import('./all-transaction/all-transaction.module').then( m => m.AllTransactionPageModule)
  },
  {
    path: 'share-referral',
    loadChildren: () => import('./share-referral/share-referral.module').then( m => m.ShareReferralPageModule)
  },
  {
    path: 'pledge-modal',
    loadChildren: () => import('./pledge-modal/pledge-modal.module').then( m => m.PledgeModalPageModule)
  },
  {
    path: 'email',
    loadChildren: () => import('./email/email.module').then( m => m.EmailPageModule)
  },
  {
    path: 'intro',
    loadChildren: () => import('./intro/intro.module').then( m => m.IntroPageModule)
  },
  {
    path: 'test',
    loadChildren: () => import('./test/test.module').then( m => m.TestPageModule)
  },
  {
    path: 'edit-profile',
    loadChildren: () => import('./profile-screens/edit-profile/edit-profile.module').then( m => m.EditProfilePageModule)
  },
  {
    path: 'change-password',
    loadChildren: () => import('./profile-screens/change-password/change-password.module').then( m => m.ChangePasswordPageModule)
  },
  {
    path: 'bank-account',
    loadChildren: () => import('./profile-screens/bank-account/bank-account.module').then( m => m.BankAccountPageModule)
  },
  {
    path: 'google-auth',
    loadChildren: () => import('./profile-screens/google-auth/google-auth.module').then( m => m.GoogleAuthPageModule)
  },
  {
    path: 'security',
    loadChildren: () => import('./profile-screens/security/security.module').then( m => m.SecurityPageModule)
  },
  {
    path: 'preferences',
    loadChildren: () => import('./profile-screens/preferences/preferences.module').then( m => m.PreferencesPageModule)
  },
  {
    path: 'reference',
    loadChildren: () => import('./profile-screens/reference/reference.module').then( m => m.ReferencePageModule)
  },
  {
    path: 'notification',
    loadChildren: () => import('./notification/notification.module').then( m => m.NotificationPageModule)
  },
  {
    path: 'home/:id',
    loadChildren: () => import('./push-noti-detail/push-noti-detail.module').then( m => m.PushNotiDetailPageModule)
  },
  {
    path: 'allow-location',
    loadChildren: () => import('./allow-location/allow-location.module').then( m => m.AllowLocationPageModule)
  },
  {
    path: 'allow-notification',
    loadChildren: () => import('./allow-notification/allow-notification.module').then( m => m.AllowNotificationPageModule)
  },
  {
    path: 'business-cat-modal',
    loadChildren: () => import('./business-cat-modal/business-cat-modal.module').then( m => m.BusinessCatModalPageModule)
  },
  {
    path: 'forgot-password',
    loadChildren: () => import('./forgot-password/forgot-password.module').then( m => m.ForgotPasswordPageModule)
  },
  {
    path: 'purchased-property',
    loadChildren: () => import('./purchased-property/purchased-property.module').then( m => m.PurchasedPropertyPageModule)
  },
  {
    path: 'liquidate-modal',
    loadChildren: () => import('./liquidate-modal/liquidate-modal.module').then( m => m.LiquidateModalPageModule)
  },
  {
    path: 'liquidate-password',
    loadChildren: () => import('./liquidate-password/liquidate-password.module').then( m => m.LiquidatePasswordPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
