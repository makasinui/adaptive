function getCookie(name) {
  let matches = document.cookie.match(
    new RegExp(
      "(?:^|; )" +
        name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, "\\$1") +
        "=([^;]*)"
    )
  );
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

window.onload = function () {
  const detailMenu = document.querySelectorAll('.menu-top__arrow-wrapper');
  if(detailMenu) {
    detailMenu.forEach(menu => {
      menu.addEventListener('click', (e) => {
        const arrow = menu.querySelector('.menu-top__arrow');
        const arrows = document.querySelectorAll('.menu-top__arrow');
        const readMore = menu.closest('.menu-top__item').querySelector('.menu-top__arrow-detail');
        const allReadMore = document.querySelectorAll('.menu-top__arrow-detail');

        const deleteCheckedClass = (elements, element) => elements.forEach(el => el !== element && el.classList.remove('checked'));

        deleteCheckedClass(arrows, arrow);
        deleteCheckedClass(allReadMore, readMore);

        const allItems = document.querySelectorAll('.menu-top__item');
        allItems.forEach(it => {it.style.marginBottom = '16px'; it.style.marginTop = '16px'})
        const allItemsArray = [];

        for(let i = 0; i < allItems.length; i++ )
          allItemsArray.push(allItems[i]);

        const idx = allItemsArray.findIndex(a => a===menu.closest('.menu-top__item'));

        if(!arrow.classList.contains('checked')) {
          arrow.classList.add('checked');
          readMore.classList.add('checked');
          /* Меняем отступы чтобы выглядело одинаково */
          allItems[idx].style.marginBottom = '0';
          allItems[idx + 1].style.marginTop = '5px';
        } else {
          arrow.classList.remove('checked');
          readMore.classList.remove('checked');

          allItems[idx].style.marginBottom = '16px';
          allItems[idx + 1].style.marginTop = '16px';

        }
      })
    })
  }

  const headerBottomMenu = document.querySelector('.header__bottom.header-menu');

  if(headerBottomMenu) {
      const openDetail = headerBottomMenu.querySelector('.open-detail');
      openDetail.addEventListener('click', () => {
        if (headerBottomMenu.classList.contains('active')) {
          headerBottomMenu.classList.remove('active')
        } else {
          headerBottomMenu.classList.add('active')
        }
      })


  }

  const bankInfoButton = document.querySelector('.bank-info__button');
  const footer = document.querySelector('.footer');

  if(bankInfoButton !== null){
    bankInfoButton.addEventListener('click', function(){
      if(footer.classList.contains('show')){
        footer.classList.remove('show');
        footer.classList.add('hidden');
      }else{
        footer.classList.remove('hidden');
        footer.classList.add('show');

        window.scrollTo(0, 450);
      }
    });
  }

  window.onscroll = function (e) {
    if (window.scrollY > 0) {
      document.querySelector(".header").style.background = "white";
      document.querySelector(".header").style.opacity = "0.9";
    } else {
      document.querySelector(".header").style.background = "unset";
      document.querySelector(".header").style.opacity = "1";
    }
  };
  let personButton = document.querySelector(".person-button__input");
  let selectionIndividuals = document.querySelector(".selection-individuals");
  let selectionBank = document.querySelector(".selection-bank");

  const selectionIndividualsSm = document.querySelectorAll(".selection-individuals")[1];
  const selectionBankSm = document.querySelectorAll(".selection-bank")[1];

  function setMainColor(cookie) {
    let cookieDate = new Date();
    cookieDate.setMonth(cookieDate.getFullYear() + 1);

    document.cookie = `person-selection=${cookie};expires=${cookieDate.toUTCString()}`;
    if (cookie === 'selection-bank') {
      selectionIndividualsSm.classList.remove('active');
      selectionBankSm.classList.add('active');

      document.documentElement.style.setProperty("--main-color", "#2c9e47");
      document.documentElement.style.setProperty(
        "--table-line",
        `var(--main-color) url("../images/dots (3).png") no-repeat center`
      );

        if (document.querySelector(".info-img")) {
          document.querySelector(".info-img").src = "./images/info-green.png";
        }
    } else {
      selectionIndividualsSm.classList.add('active');
      selectionBankSm.classList.remove('active');

      document.documentElement.style.setProperty("--main-color", "#e9a50d");
      document.documentElement.style.setProperty(
        "--table-line",
        `rgb(254, 215, 60) url("../images/dots.png") no-repeat center`
      );
      if (document.querySelector(".info-img")) {
        document.querySelector(".info-img").src = "./images/info-yellow.png";
      }
    }
  }
  if(selectionIndividualsSm && selectionBankSm) {
    selectionIndividualsSm.addEventListener('click', () => {
      setMainColor('selection-individuals');
    });

    selectionBankSm.addEventListener('click', () => {
      setMainColor('selection-bank');
    });

  }

  if (getCookie("person-selection") === undefined) {
    let cookieDate = new Date();
    cookieDate.setMonth(cookieDate.getFullYear() + 1);
    document.cookie =
      "person-selection=selection-individuals;expires=" +
      cookieDate.toUTCString();
  }

  if (getCookie("person-selection") === "selection-individuals") {
    document.documentElement.style.setProperty("--main-color", "#e9a50d");
    selectionIndividuals.style.opacity = "1";
    selectionBank.style.opacity = "34%";
    document.documentElement.style.setProperty(
      "--table-line",
      `rgb(254, 215, 60) url("../images/dots.png") no-repeat center`
    );
    selectionIndividualsSm && selectionIndividualsSm.classList.add('active');
    selectionBankSm && selectionBankSm.classList.remove('active');
    //document.querySelector('.make-loan__table-wrapper::-webkit-scrollbar-thumb').style.background = 'var(--main-color) url("../images/dots-green.png") no-repeat center'
  } else {
    document.documentElement.style.setProperty("--main-color", "#2c9e47");
    document.documentElement.style.setProperty(
      "--table-line",
      `var(--main-color) url("../images/dots (3).png") no-repeat center`
    );
    selectionIndividuals.style.opacity = "34%";
    selectionBank.style.opacity = "1";

    selectionIndividualsSm && selectionIndividualsSm.classList.remove('active');
    selectionBankSm && selectionBankSm.classList.add('active');
    personButton.checked = true;
  }
  if (document.querySelector(".info-img")) {
    if (getCookie("person-selection") !== "selection-individuals") {
      document.querySelector(".info-img").src = "./images/info-green.png";
    }
  }

  personButton.addEventListener("click", function () {
    let cookieDate = new Date();
    cookieDate.setMonth(cookieDate.getFullYear() + 1);

    if (personButton.checked) {
      selectionIndividuals.style.opacity = "34%";
      document.documentElement.style.setProperty("--main-color", "#2c9e47");

      if (document.querySelector(".info-img")) {
        document.querySelector(".info-img").src = "./images/info-green.png";
      }

      document.documentElement.style.setProperty(
        "--table-line",
        `var(--main-color) url("../images/dots (3).png") no-repeat center`
      );

      selectionBank.style.opacity = "1";
      document.cookie =
        "person-selection=selection-bank;expires=" + cookieDate.toUTCString();
    } else {
      selectionIndividuals.style.opacity = "1";
      document.documentElement.style.setProperty("--main-color", "#e9a50d");
      document.documentElement.style.setProperty(
        "--table-line",
        `rgb(254, 215, 60) url("../images/dots.png") no-repeat center`
      );
      if (document.querySelector(".info-img")) {
        document.querySelector(".info-img").src = "./images/info-yellow.png";
      }

      selectionBank.style.opacity = "34%";
      document.cookie =
        "person-selection=selection-individuals;expires=" +
        cookieDate.toUTCString();
    }
  });

  selectionIndividuals.addEventListener('click', function (e) {
    let selected = getCookie("person-selection");
    if (selected !== "selection-individuals") {
      personButton.click()
    }
  });

  selectionBank.addEventListener('click', function (e) {
    let selected = getCookie("person-selection");
    if (selected !== "selection-bank") {
      personButton.click()
    }
  });

  let citySelector = document.querySelector(".cite-selector");

  citySelector.addEventListener("click", function () {
    if (citySelector.classList.contains("show")) {
      citySelector.classList.remove("show");
    } else {
      citySelector.classList.add("show");
    }
  });

  let citySelectOptions = document.querySelectorAll(
    ".cite-selector .cite-selector__option"
  );
  let citeSelected = document.querySelector(
    ".cite-selector .cite-selector__backdrop"
  );

  citySelectOptions.forEach((citySelectOption) => {
    citySelectOption.addEventListener("click", function () {
      citeSelected.innerHTML = citySelectOption.innerHTML;
    });
  });

  //add button for view full content
  function toggleContent(nextText, nextTabValue) {
    const heightOfText = nextText.offsetHeight;

    if (heightOfText >= 650) {
      const button = document.createElement("button");

      button.textContent = "Развернуть текст";
      button.classList.add(`detailed-tabs-body__btn`, `${nextTabValue}`);

      button.addEventListener("click", (e) => {
        const textBlock = nextText.querySelector(".text-block");
        if (textBlock.classList.contains("overflow")) {
          textBlock.classList.remove("overflow");
          e.target.classList.add("show");
        } else {
          textBlock.classList.add("overflow");
          e.target.classList.remove("show");
        }
      });
      if (!nextText.querySelector(`.${nextTabValue}`))
        nextText.insertAdjacentElement("beforeend", button);
    }
  }

  let tabs = document.querySelectorAll(
    ".detailed .detailed-tabs .detailed-tab"
  );
  tabs.forEach((tab) => {
    tab.addEventListener("click", function () {
      let nextTabValue = tab.getAttribute("data-value");

      let activeTab = document.querySelector(
        ".detailed .detailed-tabs .detailed-tab.active"
      );
      let activeTabValue = activeTab.getAttribute("data-value");

      let activeText = document.querySelector(
        '.detailed .detailed-tabs-body .detailed-tabs-body__text[data-value="' +
          activeTabValue +
          '"]'
      );
      let nextText = document.querySelector(
        '.detailed .detailed-tabs-body .detailed-tabs-body__text[data-value="' +
          nextTabValue +
          '"]'
      );

      if (!tab.classList.contains("active")) {
        tab.classList.add("active");
        activeTab.classList.remove("active");

        nextText.classList.add("show");
        activeText.classList.remove("show");
      }

      toggleContent(nextText, nextTabValue);
    });
  });

  const select = document.querySelector(".detailed-tabs__select");

  if(select !== null){
    select.addEventListener("change", (e) => {
      const tab = document.querySelector(
        `option[data-value="${e.target.value}"]`
      );
      let nextTabValue = e.target.value;

      let activeTab = document.querySelector(".detailed-tab-sm.active");
      let activeTabValue = activeTab.getAttribute("data-value");

      let activeText = document.querySelector(
        '.detailed .detailed-tabs-body .detailed-tabs-body__text[data-value="' +
          activeTabValue +
          '"]'
      );
      let nextText = document.querySelector(
        '.detailed .detailed-tabs-body .detailed-tabs-body__text[data-value="' +
          nextTabValue +
          '"]'
      );

      if (!tab.classList.contains("active")) {
        tab.classList.add("active");
        activeTab.classList.remove("active");

        nextText.classList.add("show");
        activeText.classList.remove("show");
      }

      toggleContent(nextText, nextTabValue);
    });
  }

  const activeTab = document.querySelector(".detailed-tabs-body__text.show");
  if(activeTab !== null){
    const activeTabAttribute = activeTab.getAttribute("data-value");
    toggleContent(activeTab, activeTabAttribute);
  }

  const menuItems = document.querySelectorAll(".menu-block");

  menuItems.forEach((menu) => {
    menu.addEventListener("click", () => {
      if (menu.classList.contains("show")) {
        menu.classList.remove("show");
      } else {
        menu.classList.add("show");
      }
    });
  });

  //arrows for scrollbar
  const arrows = document.querySelectorAll(".scroll-arrow");

  arrows.forEach((arrow) => {
    arrow.addEventListener("click", () => {
      const container = document.querySelector(".make-loan__table-wrapper");
      const step = 100;

      const sl = container.scrollLeft;

      if (arrow.classList.contains("scroll-arrows__right")) {
        container.scrollTo(sl + step, 0);
      } else {
        if (sl - step <= 0) {
          container.scrollTo(0, 0);
        } else {
          container.scrollTo(sl - step, 0);
        }
      }
    });
  });
  //change available of buttons for scroll
  const scrollBody = document.querySelector(".make-loan__table-wrapper");

  if(scrollBody !== null){
    scrollBody.addEventListener("scroll", () => {
      const container = document.querySelector(".make-loan__table-wrapper");
      const con = document.querySelector(".make-loan__scroll");
      const step = 100;
      const sl = container.scrollLeft;

      if (sl >= 200) {
        arrows[1].classList.add("gray");
      } else {
        arrows[1].classList.remove("gray");
      }

      if (sl - step <= -100) {
        arrows[0].classList.add("gray");
      } else {
        arrows[0].classList.remove("gray");
      }
    });
  }
};
