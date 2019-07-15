import {
  Directive,
  Component,
  ElementRef,
  Renderer2,
  ViewChild,
  AfterViewInit,
  SimpleChange,
  SimpleChanges,
  HostListener,
  OnInit, Input, ComponentFactoryResolver
} from '@angular/core';
import {DataService} from '../data.service';
import {forEach} from '@angular-devkit/schematics';
import {UbItem} from './ub-item';
import {UbDirective} from './ub-host.directive';
import {ItemInterface} from './it.interface';


// IMPORTANT convertir en Reactive Programming !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

@Component({
  selector: 'app-home',
  // templateUrl: 'home.page.html',
  template: `<ion-header><ion-toolbar><ion-title>Ionic Blank</ion-title></ion-toolbar></ion-header>
              <ion-content>
                <ion-card>
                  <ion-card-content>
                    <div #ubContent contenteditable="true">
                    </div>
                  </ion-card-content>
                </ion-card>
              </ion-content>`,
  styleUrls: ['home.page.scss']
})
export class HomePage implements OnInit, AfterViewInit {

  private changes: MutationObserver;

  @ViewChild('ubContent') ubContent: ElementRef;
  constructor(private dataService: DataService, private renderer: Renderer2) {
  }

  ngOnInit() {
    // Mutations observer docs
    // https://anotherdevblog.com/2018/06/14/use-mutationobserver-to-spy-on-the-dom/
    this.dataService.rest().then(data => {
      // console.log('home.page ngOnInit data: ', data);
      this.renderer.setProperty(this.ubContent.nativeElement, 'innerHTML', data);

      const config = {
        // attributes: true,
        // attributeOldValue: true,
        subtree: true,
        characterData: true,
        characterDataOldValue: true,
        childList: true
      };
      const observer = new MutationObserver((mutations) => {
        console.log('mutations.length: ', mutations.length);
        console.log('mutations[0].type: ', mutations[0].type);
        console.log('mutations[0].data: ', mutations[0]);
        console.log('mutations[0]: ', mutations[0]);
        console.log('mutations[1]: ', mutations[1]);

        const oldValue = mutations[0].target;
        console.log('oldValue', oldValue);
        const newValue = mutations[1].target;
        console.log('newValue', newValue);

        const labelClass = mutations[0].target.parentElement.attributes[0];
        console.log('typeof labelClass: ', typeof labelClass);
        console.log('labelClass: ', labelClass);

        const id = '';
        console.log('item id: ', id);

        console.log('mutations[1].target', mutations[1].target.parentElement);
        console.log('mutations[0].target.parentElement.attributes', mutations[0].target.parentElement.attributes);
        // console.log('mutations[1].target.parentElement.attributes[0]', mutations[1].target.parentElement.attributes[0]);
        // console.log('mutations[1].target.parentElement.attributes', mutations[1].target.parentElement.attributes);
        const current = mutations[0].target.parentElement;
        const parent = current.parentElement;
        console.log('parent: ', parent);
        console.log('current: ', typeof current);

        // console.log('mutations[0].substringData()', mutations[0].substringData());
        /*const domparser = new DOMParser();​​​​​​
        const domdoc = domparser.parseFromString(subParentNode, 'text/html');
        console.log('domdoc: ', domdoc);*/
        // const oldValue = mutations[0].oldValue;
        // const newValue = mutations[1].oldValue;
/*        mutations.forEach((mutation: MutationRecord) => {
          console.log(mutation);
        });*/
      });
      observer.observe(this.ubContent.nativeElement, config);
    });
  }


  ngAfterViewInit(): void {
    // console.log('this.ubContent.nativeElement', this.ubContent.nativeElement);
    /*this.renderer.listen(this.ubContent.nativeElement, 'DOMSubtreeModified', (event: any) => {
      console.log('event DOMSubtreeModified: ', event);
      const regexCmd = /\s(\.in)?(\.[a-z]{1,})/gmi;
      const elem = event.path[1];
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
    });*/
  }
}
/*this.dataService.rest().then(data => {
  this.renderer.setProperty(this.ubContent.nativeElement, 'innerHTML', data);
});*/
/*const config = {
  attributes: true,
  characterData: true,
  childList: true,
  subtree: true,
  attributeOldValue: true,
  characterDataOldValue: true
};
this.changes = new MutationObserver((mutations: MutationRecord[]) => {
  console.log('mutations lenght', mutations.length);
  console.log('mutations', mutations);
      mutations.forEach((mutation: MutationRecord) => {

        console.log(mutation);
      });
    }
);
this.changes.observe(this.ubContent.nativeElement, config);*/
// this.changes.observe(this.ubContent, config);
