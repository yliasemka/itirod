import AbstractView from "./AbstractView.js";
export default class extends AbstractView {
  constructor() {
    super();
  }
  async getHtml() {
    return `
        <style type="text/css">
            .side-nav__a { 
                color: #eebbc3;
            }
            .side-nav__a__active{
                color:#232946bc;
            }
            .side-nav__b { 
                color: #232946bc;
            }
        </style>
        <a href="#addCatform" class="add-button">
        <div>
            <img class="add-button__img" src="/static/images/plus.svg"> 
            <p>Add categories</p>
        </div>
        </a>
        <table class="categories-table">
            <tr>
                <th></th>
                <th class="td-type-categories">Loading files from databse...</th>
                <th class="td-amount"></th>
            </tr>
    </table>
        `;
  }
}
