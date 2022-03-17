import Home from '../views/home.js';
import Error404 from '../views/error404.js';
import Details from '../views/details.js';
import Utils from '../helpers/Utils.js';

const routes = {
    '/': Home,
    '/details/:id': Details,
};

// https://github.com/rishavs/vanillajs-spa
const router = async () => {
    // Lazy load elements
    const content = null || document.getElementById('page_container');

    let request = Utils.parseRequestURL();

    let parsedURL =
        (request.resource ? '/' + request.resource : '/') +
        (request.id ? '/:id' : '') +
        (request.verb ? '/' + request.verb : '');

    let page = routes[parsedURL] ? routes[parsedURL] : Error404;
    content.innerHTML = await page.render();
    await page.after_render();
};

export default router;
