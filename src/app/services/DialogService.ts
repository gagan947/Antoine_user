import { Injectable, ComponentFactoryResolver, ApplicationRef, Injector, ComponentRef } from '@angular/core';

@Injectable({
      providedIn: 'root'
})
export class DialogService {

      constructor(
            private componentFactoryResolver: ComponentFactoryResolver,
            private appRef: ApplicationRef,
            private injector: Injector
      ) { }

      open(component: any, data?: any): void {
            const factory = this.componentFactoryResolver.resolveComponentFactory(component);
            const componentRef = factory.create(this.injector);

            const instance = componentRef.instance as any;

            if (data) {
                  Object.assign(instance, data);
            }

            this.appRef.attachView(componentRef.hostView);
            const domElem = (componentRef.hostView as any).rootNodes[0] as HTMLElement;
            document.body.appendChild(domElem);

            if (instance.closed) {
                  instance.closed.subscribe(() => {
                        this.close(componentRef);
                  });
            }
      }

      close(componentRef: ComponentRef<any>): void {
            this.appRef.detachView(componentRef.hostView);
            componentRef.destroy();
      }
}
