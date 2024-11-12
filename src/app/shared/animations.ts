import { trigger, transition, style, animate, query, group } from '@angular/animations';

export const slideAnimation = trigger('slideInOut', [
      transition(':increment', [
            // When moving to next image (forward)
            query(':enter, :leave', style({ position: 'absolute', width: '100%' }), { optional: true }),
            group([
                  query(':leave', [animate('300ms ease-out', style({ transform: 'translateX(-100%)' }))], { optional: true }),
                  query(':enter', [style({ transform: 'translateX(100%)' }), animate('300ms ease-out', style({ transform: 'translateX(0)' }))], { optional: true }),
            ])
      ]),
      transition(':decrement', [
            // When moving to previous image (backward)
            query(':enter, :leave', style({ position: 'absolute', width: '100%' }), { optional: true }),
            group([
                  query(':leave', [animate('300ms ease-out', style({ transform: 'translateX(100%)' }))], { optional: true }),
                  query(':enter', [style({ transform: 'translateX(-100%)' }), animate('300ms ease-out', style({ transform: 'translateX(0)' }))], { optional: true }),
            ])
      ])
]);
