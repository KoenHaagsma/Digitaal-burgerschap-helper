import { renderElementAndClean, renderElement, cleanElement } from '../../modules/renderElement.js';
import { fetchData } from '../../modules/fetch.js';
import { errorVoedingsleer } from './errorMessage.js';

const topicSections = (url, fallBackURL, config, topic, classes) => {
    const view = `
    <div class="topic-container">
        <h2>${topic}</h2>
        <section class="${classes} topic" id=${classes}>
            <div class="loader-container">
                <img src="/Healty-food-helper/images/Preloader_3.gif">
            </div>
        </section>
    </div>
    `;

    const content = document.querySelector('.content');
    renderElement(content, view, 'beforeend');
    const loaderContainer = document.querySelector('.loader-container');
    loaderContainer.remove();

    const containerSelector = document.querySelector(`.${classes}`);
    fetchData(url, fallBackURL, config)
        .then((data) => {
            // ! Get first 6 items from the array
            const previewArray = data.results.slice(0, 6);

            previewArray.forEach((result) => {
                if (result.coverimages.length <= 0 || !result.titles) return;

                const html = `
                    <article>
                        <img src="${result.coverimages[0]}">
                        <h3>${result.titles[0]}</h3>
                    </article>`;

                renderElement(containerSelector, html, 'beforeend');
            });

            const articles = document.querySelectorAll(`.${classes} article`);
            articles.forEach((article) => {
                article.addEventListener('click', (event) => {
                    event.preventDefault();
                    location.href = `/Healty-food-helper/#/details/preview`;
                });
            });

            return data;
        })
        .then((data) => {
            const loaderContainer = document.querySelector(`.topic-container > .${classes} > .loader-container`);
            if (loaderContainer) {
                loaderContainer.remove();
            }
            if (data.results.length > 6) {
                renderElement(
                    containerSelector,
                    `<button class="more-${classes} more-button">Meer ${classes}</button>`,
                    'afterend',
                );
                const fullArray = data.results.slice(6, data.results.length);
                const button = document.querySelector(`.more-${classes}`);
                button.addEventListener('click', (event) => {
                    event.preventDefault();
                    fullArray.forEach((result) => {
                        if (result.coverimages.length <= 0 || !result.titles) return;
                        const html = `
                        <article>
                            <img src="${result.coverimages[0]}">
                            <h3>${result.titles[0]}</h3>
                        </article>`;
                        renderElement(containerSelector, html, 'beforeend');
                    });
                    const articles = document.querySelectorAll(`.${classes} article`);
                    articles.forEach((article) => {
                        article.addEventListener('click', (event) => {
                            event.preventDefault();
                            location.href = `/Healty-food-helper/#/details/preview`;
                        });
                    });

                    button.remove();
                });
            }
        })
        .catch((error) => {
            console.error(error);
            renderElementAndClean(containerSelector, errorVoedingsleer, 'afterbegin');
        });
    return view;
};

export { topicSections };
