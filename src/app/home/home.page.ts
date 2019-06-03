import {Component, ElementRef, Renderer2, ViewChild, AfterViewInit, SimpleChange, SimpleChanges} from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements AfterViewInit{
  @ViewChild('ubContent') ubContent: ElementRef;
  name = 'my title';
  // tslint:disable-next-line:max-line-length
  doc = `
    <div class="ub-item ub-undefined">Le Lorem Ipsum est simplement du faux texte employé dans la composition et la mise en page avant
     impression. Le <span>Lorem Ipsum</span> est le faux texte standard de l'imprimerie depuis les années 1500, quand un imprimeur anonyme
      ensemble des morceaux de texte pour réaliser un livre spécimen de polices de texte. Il n'a pas fait que survivre cinq siècles</div>
    <div class="ub-item ub-principe">Contrairement à une opinion répandue, le Lorem Ipsum n'est pas simplement du texte aléatoire. Il
     trouve ses racines dans une oeuvre de la littérature latine classique datant de 45 av. J.-C., le rendant vieux de 2000 ans.</div>
   `;
  constructor(private renderer: Renderer2, private el: ElementRef) {
    // console.log('el', el.nativeElement);
  }
  ngAfterViewInit(): void {
    // this.name = 'my title';
    this.renderer.setProperty(this.ubContent.nativeElement, 'innerHTML', this.doc);
    this.renderer.listen(this.ubContent.nativeElement, 'click', (event: any) => {
      console.log(event);
      // this.display(event);
    });
    this.renderer.listen(this.ubContent.nativeElement, 'keyup', (event: any) => {
      console.log(event.target);
      const regex = /\s\.[a-z]{1,}/gmi;
      const elem = event.path[0];
      const innerHTML = elem.innerHTML;
      const match = innerHTML.match(regex);
      // console.log('match', match);
      if (match) {
        switch (match[0]) {
          case ' .principe':
            // console.log(event);
            for (let c of elem.classList) {
              this.renderer.removeClass(elem, c);
            }
            this.renderer.addClass(elem, 'ub-item');
            this.renderer.addClass(elem, 'ub-principe');
            break;
          case ' .undefined':
            console.log(event);
/*              elem.classList.forEach((val, key, list) => {
              console.log('val: ', val);
              console.log('key: ', key);
              console.log('list: ', list);
              this.renderer.removeClass(elem, val);
            });*/
            // console.log(elem.classList);
            /*console.log(elem.classList);
            for (let c of elem.classList) {
              console.log(c)
              this.renderer.removeClass(elem, c);
            }*/
            this.renderer.removeClass(elem, 'ub-principe');
            console.log(elem.classList);
            this.renderer.addClass(elem, 'ub-item');
            this.renderer.addClass(elem, 'ub-undefined');
            break;
          default:
            // console.log(match[0] + ' :', typeof match[0]);
        }
      }
    });
  }
  resize() {
    // this.renderer.setStyle(this.el.nativeElement, 'height', this.)
  }
  addItem() {

  }
  display(event) {
    console.log('ev type', event.type);
    console.log(this.ubContent.nativeElement);
  }
  onChange(event) {
    console.log(event);
  }

}
