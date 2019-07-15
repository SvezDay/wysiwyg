import {Directive, ViewContainerRef} from '@angular/core';

@Directive({
    selector: '[appUbHost]'
})
export class UbDirective {
    constructor(public viewContainerRef: ViewContainerRef) { }
}
