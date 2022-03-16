import { cors, endpoint, key, secret } from '../config/config.js';
import { renderElementAndClean, renderElement } from '../modules/renderElement.js';

const Home = {
    render: async () => {
        const view = `
            <section class="section home">
                <h1>Homepage</h1>
                <section class="content"></section>
            </section>
        `;
        return view;
    },
    after_render: async () => {
        const query = 'Voedingsleer';
        const detail = 'Default';
        const url = `${cors}${endpoint}${query}&authorization=${key}&detaillevel=${detail}&output=json`;
        const content = document.querySelector('.content');

        const config = {
            Authorization: `Bearer ${secret}`,
        };

        fetch(url, config)
            .then((response) => response.json())
            .then((data) => console(data))
            .catch(() => {
                fetch('../../../src/js/food.json')
                    .then((response) => response.json())
                    .then((data) => {
                        console.log(data.results);
                        data.results.forEach((result) => {
                            let html = `
                            <article>
                                <h2>${result.titles[0]}</h2>
                                <img src="${result.coverimages[0]}">
                                <ul>
                                    ${result.languages.map((language) => `<li>${language}</li>`)}
                                </ul>   
                            </article>
                            `;
                            renderElement(content, html, 'afterbegin');
                        });
                    })
                    .catch((err) => console.error(err));
            });
    },
};

export default Home;
