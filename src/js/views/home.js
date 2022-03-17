import { cors, endpoint, key, secret } from '../config/config.js';
import { renderElementAndClean, renderElement, cleanElement } from '../modules/renderElement.js';
import { fetchData } from '../modules/fetch.js';
import { voedingsleerContainer } from './components/voedingsleer.js';
import { errorVoedingsleer } from './components/errorMessage.js';
import { loader } from './components/loader.js';

const Home = {
    render: async () => {
        const view = `
            <section class="section home">
                <h1><span>O</span><span>B</span><span>A</span> Amsterdam</h1>
                <section class="onderwerpen">
                    <h2>Onderwerpen:</h2>
                    <div>
                        <ul>
                            <li><a href="#voedingsleer">Voedingsleer</a></li>
                            <li><a href="#sportvoeding">Sportvoeding</a></li>
                            <li><a href="#conditie">Conditie</a></li>
                            <li><a href="#dieet">Dieet</a></li>
                        </ul>
                    </div>
                </section>
                
                <section class="content">
                    ${loader}
                </section>
            </section>
        `;
        return view;
    },
    after_render: async () => {
        const query = 'Voedingsleer';
        const detail = 'Default';
        const url = `${cors}${endpoint}${query}&authorization=${key}&detaillevel=${detail}&output=json`;
        const stagingURL =
            'https://obaliquid.staging.aquabrowser.nl/onderwijs/api/v1/search/?q=voeding+NOT+lom.lifecycle.contribute.publisher%3Dwikipedia&authorization=a57b7bbd1cde2f6fb7ce5b3f2d1d96e0';
        const fallBackURL = '../../../src/js/food.json';
        const content = document.querySelector('.content');

        const config = {
            Authorization: `Bearer ${secret}`,
        };

        // ! Voedingsleer
        renderElementAndClean(content, voedingsleerContainer, 'afterbegin');
        const voedingsleerContainerSelector = document.querySelector('.voedingsleer');
        fetchData(url, fallBackURL, config)
            .then((data) => {
                // ! Get 4 items from the array
                const previewArray = data.results.slice(0, 6);

                previewArray.forEach((result) => {
                    if (result.coverimages.length <= 0 || !result.titles) return;

                    const html = `
                    <article>
                        <img src="${result.coverimages[0]}">
                        <h3>${result.titles[0]}</h3>
                    </article>`;

                    renderElement(voedingsleerContainerSelector, html, 'beforeend');
                });

                const articles = document.querySelectorAll('.voedingsleer article');
                articles.forEach((article) => {
                    article.addEventListener('click', (event) => {
                        event.preventDefault();
                        // TODO: Add logic for detailed page if i have time
                    });
                });

                return data;
            })
            .then((data) => {
                const loaderContainer = document.querySelector('.loader-container');
                loaderContainer.remove();

                renderElement(
                    voedingsleerContainerSelector,
                    `<button class="more-voedingsleer">Meer voedingsleer</button>`,
                    'afterend',
                );

                const fullArray = data.results.slice(6, data.results.length);
                console.log(fullArray);
                const button = document.querySelector('.more-voedingsleer');
                button.addEventListener('click', (event) => {
                    event.preventDefault();
                    fullArray.forEach((result) => {
                        if (result.coverimages.length <= 0 || !result.titles) return;
                        const html = `
                        <article>
                            <img src="${result.coverimages[0]}">
                            <h3>${result.titles[0]}</h3>
                        </article>`;
                        renderElement(voedingsleerContainerSelector, html, 'beforeend');
                    });

                    button.remove();
                });
            })
            .catch((error) => {
                console.error(error);
                renderElementAndClean(voedingsleerContainerSelector, errorVoedingsleer, 'afterbegin');
            });
    },
};

export default Home;
