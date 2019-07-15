import {AfterViewInit, Component, ComponentFactoryResolver, ElementRef, Input, OnInit, Renderer2, ViewChild} from '@angular/core';

import { ItemInterface } from './it.interface';
import {UbDirective} from './ub-host.directive';
import {DataService} from '../data.service';

@Component({
    selector: 'app-item',
    template: `
        <div #contner class='ubs-item'>
            <div contenteditable="true"></div>
            <ng-template appUbHost></ng-template>
        </div>
    `
})
export class ItemPage implements ItemInterface, OnInit, AfterViewInit {
    private container: ElementRef;
    private child: ElementRef;
    @Input() data: any;
    @ViewChild(UbDirective) ubHost: UbDirective;
    @ViewChild('contner') contner: ElementRef;
    constructor(private ref: ElementRef, private renderer: Renderer2, private componentFactoryResolver: ComponentFactoryResolver) {
    }
    ngOnInit(): void {
        this.container = this.ref.nativeElement.children[0];
        this.child = this.ref.nativeElement.children[0].children[0];

        this.renderer.setProperty(this.container, 'id', this.data.id);
        this.renderer.addClass(this.child, `ub-${this.data.label}`);
        this.renderer.setProperty(this.child, 'innerHTML', this.data.html);
        if (!!this.data.sub.length) {
            this.loadComponent(this.data.sub);
        }
        console.log('check');
        const config = {
            attributes: true,
            characterData: true,
            childList: true,
            subtree: true,
            attributeOldValue: true,
            characterDataOldValue: true
        };
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation: MutationRecord) => {
                console.log(mutation);
            });
        });
        observer.observe(this.contner.nativeElement, config);
    }
    ngAfterViewInit(): void {

    }

    loadComponent(items: any): void {
//    console.log('dataService data: ', items);
        const viewContainerRef = this.ubHost.viewContainerRef;
        viewContainerRef.clear();
        for (let i = 0; i < items.length; i++) {
            const componentFactory = this.componentFactoryResolver.resolveComponentFactory(items[i].component);
            const componentRef = viewContainerRef.createComponent(componentFactory);
            (componentRef.instance as ItemInterface).data = items[i].data;
        }
    }


    commandEngin(oldValue: string, newValue: string, elemPath: any): void {
        const regexCmd = /\s(\.in)?(\.[a-z]{1,})/gmi;
        const elem = elemPath;
        const inner = elem.innerText;
        const matches = regexCmd.exec(inner);
        const newText = inner.replace(regexCmd, '');
        const id = elem.id;
        // const orderNumb = id.match(/_([0,9]{1,3}.*)/gmi)
        // console.log('matches', matches);
        const parent = this.renderer.parentNode(elem);
        if (!!matches) {
          const matchIn = matches[1];
          const match = matches[2];
          const regexClass = /ub-[a-z]{1,}/gmi;
          const elemClass = elem.className;
          const ubClass = regexClass.exec(elemClass)[0];
          if (matchIn) {
            // do something
            console.log('cmd in');
          }
          switch (true) {
            case match === '.undefined':
              console.log('check');
              this.renderer.removeClass(elem, ubClass);
              // this.renderer.removeClass(elem, 'ub-principe');
              this.renderer.addClass(elem, 'ub-undefined');
              this.renderer.setProperty(elem, 'innerText', newText);
              break;
            case match === '.principe':
              this.renderer.removeClass(elem, ubClass);
              this.renderer.addClass(elem, 'ub-principe');
              this.renderer.setProperty(elem, 'innerText', newText);
              break;
            case matchIn === '.in': // Cette commande intègre l'item d'oû elle a été lancé dans le frère antérieur s'il en existe un
              this.renderer.appendChild(elem, ubClass);
              this.renderer.addClass(elem, 'ub-principe');
              this.renderer.setProperty(elem, 'innerText', newText);
              break;
            default:
          }
        }
    }
}
