import { cors, endpoint, key, secret } from '../config/config.js';
import { loader } from './components/loader.js';
import { topicSections } from './components/topicsections.js';

const Home = {
    render: async () => {
        const view = `
            <section class="section home">
                <h1><span>o</span><span>b</span><span>a</span> Amsterdam</h1>
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
        const detail = 'Default';
        const queryVoedingsleer = 'Voedingsleer';
        const querySportvoeding = 'Sportvoeding';
        const queryConditie = 'Conditie';
        const queryDieet = 'Dieet';
        const urlVoedingsleer = `${cors}${endpoint}${queryVoedingsleer}&authorization=${key}&detaillevel=${detail}&output=json`;
        const urlSportvoeding = `${cors}${endpoint}${querySportvoeding}&authorization=${key}&detaillevel=${detail}&output=json`;
        const urlConditie = `${cors}${endpoint}${queryConditie}&authorization=${key}&detaillevel=${detail}&output=json`;
        const urlDieet = `${cors}${endpoint}${queryDieet}&authorization=${key}&detaillevel=${detail}&output=json`;
        const fallBackURL = '/Healty-food-helper/src/js/food.json';

        const stagingURL =
            'https://obaliquid.staging.aquabrowser.nl/onderwijs/api/v1/search/?q=voeding+NOT+lom.lifecycle.contribute.publisher%3Dwikipedia&authorization=a57b7bbd1cde2f6fb7ce5b3f2d1d96e0';

        const config = {
            Authorization: `Bearer ${secret}`,
        };

        topicSections(urlVoedingsleer, fallBackURL, config, queryVoedingsleer, 'voedingsleer');
        topicSections(urlSportvoeding, fallBackURL, config, querySportvoeding, 'sportvoeding');
        topicSections(urlConditie, fallBackURL, config, queryConditie, 'conditie');
        topicSections(urlDieet, fallBackURL, config, queryDieet, 'dieet');
    },
};

export default Home;
