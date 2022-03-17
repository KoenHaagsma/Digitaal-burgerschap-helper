import { renderElementAndClean, renderElement, cleanElement } from '../modules/renderElement.js';

// TODO: Fix styling

let getArticle = async () => {
    // TODO: Build so that article will be the article that is clicked on
    try {
        let res = await fetch('../../../src/js/food.json');
        return await res.json();
    } catch (error) {
        console.log(error);
    }
};

const Details = {
    render: async () => {
        const view = `
        <section class="section details">
            <a href="/Healty-food-helper/#/" class="back-button"><</a>
            <h1><span>o</span><span>b</span><span>a</span> Amsterdam</h1>
            <div class="loader-container">
                <img src="/Healty-food-helper/images/Preloader_3.gif">
            </div>
            <div class="details-content"></div>
        </section>
        `;
        return view;
    },
    after_render: async () => {
        let article = await getArticle();
        console.log(article.results[0]);
        const loader = document.querySelector('.loader-container');
        const content = document.querySelector('.details-content');
        loader.remove();
        // TODO: Make it so that articles are populated with related content to the detail page shown.
        const html = `
            <section>
                <img src="${article.results[0].coverimages[0]}">
                <h2>${article.results[0].titles[0]}</h2>
                <p>ISBN: ${article.results[0].isbn[0]}</p>
                <p><b>Samenvatting</b>:<br> ${article.results[0].summaries[0]}</p>
                <section>
                    <h2>Gerelateerde boeken/artikelen/lessen</h2>
                    <div>
                        <article>Boek</article>
                        <article>Artikel</article>
                        <article>Les</article>
                    </div>
                </section>
            </section>
        `;

        renderElementAndClean(content, html, 'afterbegin');
    },
};

export default Details;
