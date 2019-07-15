import { Type } from '@angular/core';

export class UbItem {
    constructor(
        public component: Type<any>,
        public data: any
    /* public id: Type<any>,
        public label: string,
        public content: string,
        public sub: Array<any>*/
    ) {}
}
