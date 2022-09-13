import Transaction from "./views/Transaction.js";
import Categories from "./views/Categories.js";
import Statistics from "./views/Statistics.js";

//SPA
const router = async () =>{
    const routes = [
        {path: "/", view: Transaction },
        {path: "/Categories.html", view: Categories},
        {path: "/Statistics.html", view: Statistics},
    ];

    const potentialMatches = routes.map(route => {
        return{
            route: route,
            isMatch: location.pathname === route.path
        };
    });

    let match = potentialMatches.find(potentialMatch => potentialMatch.isMatch);
    if(!match){
        match = {
            route: routes[0],
            isMatch: true
        };
    }

    const view = new match.route.view();

    document.querySelector("#app").innerHTML = await view.getHtml();
    await view.getButtons();
};

document.addEventListener("DOMContentLoaded", () =>{
    router();
});
