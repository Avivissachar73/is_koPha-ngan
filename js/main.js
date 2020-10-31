import transs from './translations.js';
import {getIsKophangan} from './httpService.js';

const state = {
    lang: localStorage.lang || 'en',
    ans: '',
    process: false
};
const t = (keyWord) => transs[keyWord] && transs[keyWord][state.lang] || keyWord;


window.doTrans = (lang) => {
    localStorage.lang = lang;
    state.lang = lang;
    init();
}

window.doCheck = async () => {
    state.process = true;
    render();
    try {
        const isKoPangan = await getIsKophangan();
        state.ans = isKoPangan? 'koPhangan' : 'notKoPhangan';
    } catch(err) {
        state.ans = err.message;
    }
    setTimeout(() => {
        state.process = false;
        render();
    }, 3500);
}

function App() {
    return `
        <div class="app container ${state.lang === 'he' && 'rtl' || ''}">
            <header class="app-header">
                <h1 class="title">${t('appTitle')}?</h1>
                <select onchange="doTrans(this.value)">
                    <option value="en" label="English" ${state.lang === 'en' && 'selected="selected"'}/>
                    <option value="he" label="עברית" ${state.lang === 'he' && 'selected="selected"'}/>
                </select>
            </header>

            <main class="app-main">
                <section class="ans-container">
                    ${  
                        state.process && `<img class="loader" src="img/loader.gif"/>` ||
                        state.ans && `<h2 class="ans">${t(state.ans)}</h2>` || ''
                    }
                </section>

                ${!state.process && 
                    `<button onclick="doCheck()">${state.ans && t('tryAgain') + '...' || t('check') + '!'}</button>`
                    || ''
                }
            </main>
            
            <footer class="app-footer">
                <h4>${t('creatorName')}</h4>
            </footer>
        </div>
    `;
}

function render() {
    const selector = '#app';
    document.querySelector(selector).innerHTML = App();
}

function init() {
    document.title = t('appTitle');
    render();
}

document.body.onload = init;