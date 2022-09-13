import AbstractView from "./AbstractView.js"
export default class extends AbstractView {
    constructor(){
        super();
    }
    async getHtml(){
        return `
        <style type="text/css">
            .side-nav__a { 
                color: #232946bc;
            }
            .side-nav__a__active{
                color:#232946bc;
            }
            .side-nav__b { 
                color: #eebbc3;
            }
        </style>
        <div class="table-stat">
            <table class="q-graph">
                <caption>
                    <select class="box__inputi">
                        <option>30 days</option>
                    </select>
                </caption>
                <thead>
                    <tr>
                        <th></th>
                        <th class="sent">Incomes</th>
                        <th class="paid">Expenses</th>
                    </tr>
                </thead>
                <tbody>
                    <tr class="qtr1">
                        <th scope="row">1-7 March</th>
                        <td class="sent bar">
                            <p>$18,450.00</p>
                        </td>
                        <td class="paid bar">
                            <p>$16,500.00</p>
                        </td>
                    </tr>
                    <tr class="qtr2">
                        <th scope="row">8-15 March</th>
                        <td class="sent bar">
                            <p>$34,340.72</p>
                        </td>
                        <td class="paid bar">
                            <p>$32,340.72</p>
                        </td>
                    </tr>
                    <tr class="qtr3">
                        <th scope="row">16-23 March</th>
                        <td class="sent bar">
                            <p>$43,145.52</p>
                        </td>
                        <td class="paid bar">
                            <p>$32,225.52</p>
                        </td>
                    </tr>
                    <tr class="qtr4">
                        <th scope="row">24-31 March</th>
                        <td class="sent bar">
                            <p>$18,415.96</p>
                        </td>
                        <td class="paid bar">
                            <p>$32,425.00</p>
                        </td>
                    </tr>
                </tbody>
            </table>

            <div class="ticks">
                <div class="tick">
                    <p>$50,000</p>
                </div>
                <div class="tick">
                    <p>$40,000</p>
                </div>
                <div class="tick">
                    <p>$30,000</p>
                </div>
                <div class="tick">
                    <p>$20,000</p>
                </div>
                <div class="tick">
                    <p>$10,000</p>
                </div>
            </div>
        </div>`;
    }
}