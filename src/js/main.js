function getCookie(name){
    let matches = document.cookie.match(new RegExp("(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"));
    return matches ? decodeURIComponent(matches[1]) : undefined;
}

window.onload = function(){
    let personButton = document.querySelector('.person-button__input');
    
    let selectionIndividuals = document.querySelector('.selection-individuals');
    let selectionBank = document.querySelector('.selection-bank');

    if(getCookie('person-selection') === undefined){
        let cookieDate = new Date();
        cookieDate.setMonth(cookieDate.getFullYear() + 1);
        document.cookie = 'person-selection=selection-individuals;expires=' + cookieDate.toUTCString();
    }

    if(getCookie('person-selection') === 'selection-individuals'){
        selectionIndividuals.style.opacity = '1';
        selectionBank.style.opacity = '34%';
    }else{
        selectionIndividuals.style.opacity = '34%';
        selectionBank.style.opacity = '1';
        personButton.checked = true;
    }

    personButton.addEventListener('click', function(){
        let cookieDate = new Date();
        cookieDate.setMonth(cookieDate.getFullYear() + 1);

        if(personButton.checked){
            selectionIndividuals.style.opacity = '34%';
            selectionBank.style.opacity = '1';
            document.cookie = 'person-selection=selection-bank;expires=' + cookieDate.toUTCString();
        }else{
            selectionIndividuals.style.opacity = '1';
            selectionBank.style.opacity = '34%';
            document.cookie = 'person-selection=selection-individuals;expires=' + cookieDate.toUTCString();
        }
    })

    let citySelector = document.querySelector('.cite-selector');

    citySelector.addEventListener('click', function(){
        if(citySelector.classList.contains('show')){
            citySelector.classList.remove('show');
        }else{
            citySelector.classList.add('show');
        }
    })

    let citySelectOptions = document.querySelectorAll('.cite-selector .cite-selector__option');
    let citeSelected = document.querySelector('.cite-selector .cite-selector__backdrop');

    citySelectOptions.forEach(citySelectOption => {
        citySelectOption.addEventListener('click', function(){
            citeSelected.innerHTML = citySelectOption.innerHTML;
        })
    })
    
    //add button for view full content
    function toggleContent(nextText, nextTabValue) {
        const heightOfText = nextText.offsetHeight;
        
        if(heightOfText >= 650) {
            const button = document.createElement('button');
    
            button.textContent = 'Развернуть текст';
            button.classList.add(`detailed-tabs-body__btn`, `${nextTabValue}`);
    
            button.addEventListener('click', (e) => {
                const textBlock = nextText.querySelector('.text-block');
                if (textBlock.classList.contains('overflow')) {
                    textBlock.classList.remove('overflow');
                    e.target.classList.add('show');
                } else {
                    textBlock.classList.add('overflow');
                    e.target.classList.remove('show');
                }
                
            });
            if (!nextText.querySelector(`.${nextTabValue}`))
                nextText.insertAdjacentElement('beforeend', button);
        }
    }

    let tabs = document.querySelectorAll('.detailed .detailed-tabs .detailed-tab');
        tabs.forEach(tab => {
            tab.addEventListener('click', function(){
                let nextTabValue = tab.getAttribute('data-value');
    
                let activeTab = document.querySelector('.detailed .detailed-tabs .detailed-tab.active');
                let activeTabValue = activeTab.getAttribute('data-value');
    
                let activeText = document.querySelector('.detailed .detailed-tabs-body .detailed-tabs-body__text[data-value="' + activeTabValue + '"]');
                let nextText = document.querySelector('.detailed .detailed-tabs-body .detailed-tabs-body__text[data-value="' + nextTabValue + '"]');
    
                if(!tab.classList.contains('active')){
                    tab.classList.add('active');
                    activeTab.classList.remove('active');
    
                    nextText.classList.add('show');
                    activeText.classList.remove('show');
                }

                toggleContent(nextText, nextTabValue)
            });
        });
    
    const select = document.querySelector('.detailed-tabs__select');
    
    select.addEventListener('change', (e) => {
        const tab = document.querySelector(`option[data-value="${e.target.value}"]`);
        let nextTabValue = e.target.value;
        
        let activeTab = document.querySelector('.detailed-tab-sm.active');
        let activeTabValue = activeTab.getAttribute('data-value');

        let activeText = document.querySelector('.detailed .detailed-tabs-body .detailed-tabs-body__text[data-value="' + activeTabValue + '"]');
        let nextText = document.querySelector('.detailed .detailed-tabs-body .detailed-tabs-body__text[data-value="' + nextTabValue + '"]');

        if(!tab.classList.contains('active')){
            tab.classList.add('active');
            activeTab.classList.remove('active');

            nextText.classList.add('show');
            activeText.classList.remove('show');
        }

        toggleContent(nextText, nextTabValue)
    })
    
    const activeTab = document.querySelector('.detailed-tabs-body__text.show');
    const activeTabAttribute = activeTab.getAttribute('data-value');
    toggleContent(activeTab, activeTabAttribute);

    const menuItems = document.querySelectorAll('.menu-block');
    
    menuItems.forEach(menu => {
        menu.addEventListener('click', () => {
            if(menu.classList.contains('show')) {
                menu.classList.remove('show')
            } else {
                menu.classList.add('show')
            }
        })
    });

    //arrows for scrollbar
    const arrows = document.querySelectorAll('.scroll-arrow')

    arrows.forEach(arrow => {
        arrow.addEventListener('click', () => {
            const container = document.querySelector('.make-loan__table-wrapper');
            const step = 100;

            const sl = container.scrollLeft;

            if(arrow.classList.contains('scroll-arrows__right')) {
                container.scrollTo((sl + step), 0);
            } else {
                if ((sl - step) <= 0) {
                    container.scrollTo(0, 0);
                } else {
                    container.scrollTo((sl - step), 0);
                }
            }
        })
    })
    //change available of buttons for scroll
    const scrollBody = document.querySelector('.make-loan__table-wrapper');
    scrollBody.addEventListener('scroll', () => {
        const container = document.querySelector('.make-loan__table-wrapper');
        const con = document.querySelector('.make-loan__scroll')
        const step = 100;
        const sl = container.scrollLeft;

        if(sl >= 200) {
            arrows[1].classList.add('gray')
        } else {
            arrows[1].classList.remove('gray')
        }

        if((sl - step) <= -100) {
            arrows[0].classList.add('gray');
        } else {
            arrows[0].classList.remove('gray')
        }
        
    });
};
