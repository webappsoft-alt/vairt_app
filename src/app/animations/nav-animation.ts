import {AnimationController, Animation} from '@ionic/angular'
export const enterAnimation = (baseEl:HTMLElement, opts?: any): Animation => {
    const DURATION = 200
    const animationCrtl = new AnimationController()
    if(opts.direction == 'forward'){
    return animationCrtl.create()
    .addElement(opts.enteringEl)
    .duration(DURATION)
    .easing('ease-in')
    .fromTo('opacity', 0 ,1)
}else{
    const rootAnimation = animationCrtl.create()
    .addElement(opts.enteringEl)
    .duration(DURATION)
    .easing('ease-in')
    .fromTo('opacity', 0 ,1)

    const leavingAnimation = animationCrtl.create()
    .addElement(opts.leavingEl)
    .duration(DURATION)
    .easing('ease-out')
    .fromTo('opacity', 1, 0)

    return animationCrtl.create().addAnimation([rootAnimation, leavingAnimation])
}
  //  return null
}

export const myEnterAnimation = (baseEl:HTMLElement, opts?: any): Animation => {
  const animationCrtl = new AnimationController()
    const backdropAnimation = animationCrtl.create()
      .addElement(baseEl.querySelector('ion-backdrop')!)
      .fromTo('opacity', '0.4', 'var(--backdrop-opacity)');

    const wrapperAnimation = animationCrtl.create()
      .addElement(baseEl.querySelector('.modal-wrapper')!)
      .keyframes([
        { offset: 0, opacity: '0', transform: 'scale(0)' },
        { offset: 1, opacity: '0.99', transform: 'scale(1)' }
      ]);

    return animationCrtl.create()
      .addElement(baseEl)
      .easing('ease-out')
      .duration(250)
      .addAnimation([backdropAnimation, wrapperAnimation]);
  }

  export const myLeaveAnimation = (baseEl:HTMLElement, opts?: any): Animation => {
    return myEnterAnimation(baseEl).direction('reverse');
}