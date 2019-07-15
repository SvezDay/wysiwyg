import { Injectable } from '@angular/core';
import {Observable, observable} from 'rxjs';
import {any} from 'codelyzer/util/function';
import {promise} from 'selenium-webdriver';
import {UbItem} from './home/ub-item';
import {ItemPage} from './home/item.page';

class Item {
  private id: string;
  private label: string;
  private html: string;
  private sub: Array<any>;
}

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private json;
  constructor() {
    this.json = [
      {item: {
      id: 'jBncY9RH6LW7qBwRXq70mxni6c93_1559922970876_1559922974807_0',
          label: 'title',
          html: 'Organisations',
          sub:[
        {item: {
            id: 'jBncY9RH6LW7qBwRXq70mxni6c93_1559922970876_1559922954807_0',
            label: 'title',
            html: 'Profits',
            sub: [
              {item: {
                  id: 'jBncY9RH6LW7qBwRXq70mxni6c93_1559922970876_1559922976807_0',
                  label: 'principe',
                  html: `C'est important mais pas une fin en soi !`,
                  sub:[]}},
              {item: {
                  id: 'jBncY9RH6LW7qBwRXq70mxni6c93_1559922970876_1559922977807_1',
                  label: 'principe',
                  html: `Le profit sert le projet qui sert la cause !`,
                  sub:[]}},
              {item: {
                  id: 'jBncY9RH6LW7qBwRXq70mxni6c93_1559922970876_1559922978807_2',
                  label: 'rule',
                  html: `<ul><li>Valider la cause.</li><li> Valider le projet.</li><li> Valider le business model</li></ul>`,
                  sub:[]}}
            ]}},
        {item: {
              id: 'jBncY9RH6LW7qBwRXq70mxni6c93_1559922970876_1559922977777_1',
              label: 'title',
              html: `Something else`,
              sub: []}}
      ]}}
    ];
      /*this.json = [
          {item: {
                  id: 'jBncY9RH6LW7qBwRXq70mxni6c93_1559922970876_1559922976807_0',
                  label: 'principe',
                  html: `C'est important mais pas une fin en soi !`,
                  sub: []}},
          {item: {
                  id: 'jBncY9RH6LW7qBwRXq70mxni6c93_1559922970876_1559922977807_1',
                  label: 'principe',
                  html: `Le profit sert le projet qui sert la cause !`,
                  sub: []}},
          {item: {
                  id: 'jBncY9RH6LW7qBwRXq70mxni6c93_1559922970876_1559922978807_2',
                  label: 'rule',
                  html: `<ul><li>Valider la cause.</li><li> Valider le projet.</li><li> Valider le business model</li></ul>`,
                  sub: []}}
      ];*/
  }
  jsonToCustomHtml(array: any) {
    return new Promise((resolve, reject) => {
      if (!!array && !!array.length) {
        const promises = [];
        array.forEach(row => {
          const i = this.jsonToCustomHtml(row.item.sub).then(res => {
            return `<div class="ubs-item" id="${row.item.id}">
                        <div class="ub-${row.item.label}">${row.item.html}</div>
                        ${!!res ? "<div class='ubs-sub'>" + res + "</div>" : ""}
                    </div>`;

          });
          promises.push(i);
        });
        resolve(Promise.all(promises));
      } else {
        resolve();
      }
    });
  }
  rest(): any {
    return new Promise((resolve, reject) => {
      this.jsonToCustomHtml(this.json).then(res => {
        // La regex suivant permet de supprimer une virgule qui correspond une liste d'item
        const data = res[0].replace(new RegExp('</div>,<div','g'), '</div><div')
        resolve(data);
      }).catch(e => {
        reject(e);
      });
    });
  }
  jsonData(): any {
      return new Promise((resolve, reject) => {
            resolve(this.itemTree(this.json));
      });
  }
  itemTree(data): any {
      return new Promise((resolve, reject) => {
          const promises = [];
          for (let d of data) {
              const item = new Promise((res, rej) => {
                  if (!!d.item.sub.length) {
                      this.itemTree(d.item.sub).then(newSub => {
                          d.item.sub = newSub;
                      }).then(() => {
                          res(new UbItem(ItemPage, d.item));
                      });
                  } else {
                      res(new UbItem(ItemPage, d.item));
                  }
              });
              promises.push(item);
          }
          resolve(Promise.all(promises));
      });
  }

}
