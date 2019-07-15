import {Component, ElementRef, Input, OnInit, Renderer2, ViewChild} from '@angular/core';

import { ItemInterface } from './it.interface';
import {UbDirective} from './ub-host.directive';

@Component({
    template: ''
})
export class ItemComponent implements ItemInterface, OnInit {
    @Input() data: any;
    @ViewChild(UbDirective) ubHost: UbDirective;
    constructor(private ref: ElementRef, private renderer: Renderer2) {
    }
    ngOnInit(): void {
        // innerHTML here !
        console.log('this.data: ', this.data);
        let elemHtml = `
        <div class='ubs-item' id='${this.data.id}'>
            <div class='ub-${this.data.label}'>${this.data.html}</div>
        `;
        if (!!this.data.sub.length) {
            /*            for (let i = 0; i < this.data.sub.length; i++) {
                            elemHtml + = `<ng-template appUbHost></ng-template>`;
                            elemHtml += `<app-item [json]=${this.data[i].sub}`;
                        }*/
        }
        elemHtml += '</div>';
        // tslint:disable-next-line:prefer-for-of
        for (let i = 0; i < this.data.length; i++) {
            elemHtml += `<app-item [json]='${this.data[i]}'></app-item>`;
        }
        this.renderer.setProperty(this.ref.nativeElement, 'innerHTML', elemHtml);
    }

    /*commandEngin(oldValue: string, newValue: string, elemPath: any): void {
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
  }*/
}
