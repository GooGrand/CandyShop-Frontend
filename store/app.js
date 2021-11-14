export const state = () => ({
  menu: {
    open: false,
    landingNavigation: [
      {
        route: 'catalog',
        label: 'Launch APP',
      },
      // {
      //   href: '/',
      //   label: 'Docs',
      // },
      {
        href: 'https://github.com/Candy-Shop-One/CandyShop-web',
        label: 'Github',
      },
      // {
      //   href: '/',
      //   label: 'Medium',
      // },
      {
        href: 'https://twitter.com/0xCandyDapp',
        label: 'Twitter',
      },
      {
        href: ' https://t.me/CandyDapp_community',
        label: 'Telegram',
      },
    ],
    navigation: [
      {
        route: 'logs',
        label: 'Logs',
      },
      {
        route: 'transfer',
        label: 'Transfer',
      },
    ],
    partners: [
      {
        href: '/',
        label: 'Graviton',
      },
      {
        href: '/',
        label: 'Gravity',
      },
    ],
    socials: [
      {
        href: 'https://twitter.com/0xCandyDapp',
        icon: 'mono/twitter',
      },
      // {
      //   href: '/',
      //   icon: 'mono/medium',
      // },
      {
        href: 'https://github.com/Candy-Shop-One/CandyShop-web',
        icon: 'mono/github',
      },
      {
        href: 'https://t.me/CandyDapp_community',
        icon: 'mono/telegram',
      },
    ],
  },
  menuInterface: {
    open: false,
    landingNavigation: [
      {
        href: '/',
        main: true,
        label: 'Info',
      },
      {
        href: '/',
        label: 'About',
      },
      {
        href: '/',
        label: 'Analytics charts',
      },
      {
        href: 'https://twitter.com/0xCandyDapp',
        label: 'Twitter',
      },
      {
        href: '/',
        main: true,
        label: 'Resources',
      },
      {
        href: '/',
        label: 'Docs',
      },
      {
        href: '/',
        label: 'FAQ',
      },
      {
        href: '/',
        label: 'Blog',
      },
      {
        href: 'https://github.com/SuSy-One/candyshop-web',
        label: 'Github',
      },

      {
        href: '/',
        main: true,
        label: 'Help',
      },

      {
        href: '/',
        label: 'Support',
      },
    ],
    navigation: [
      {
        route: 'About',
        label: 'About',
      },
      {
        route: 'cabinet',
        label: 'My candies',
      },
      {
        disabled: true,
        disabledTitle: 'soon',
        interface: true,
        route: 'Analytics-charts',
        label: 'Analytics charts',
      },
    ],
    partners: [
      {
        href: '/',
        label: 'Graviton',
      },
      {
        href: '/',
        label: 'Gravity',
      },
    ],
    socials: [
      {
        href: 'https://twitter.com/0xCandyDapp',
        icon: 'mono/twitter',
      },
      {
        href: '/',
        icon: 'mono/medium',
      },
      {
        href: 'https://github.com/SuSy-One/candyshop-web',
        icon: 'mono/github',
      },
      {
        href: 'https://t.me/CandyDapp_community',
        icon: 'mono/telegram',
      },
    ],
  },
  exampleModals: {
    connectWallet: {
      index: '1', // Индекс для перерисовки одного и того же модального окна
      name: 'connect-wallet', // Уникальное название модального окна
      data: {
        label: 'MetaMask',
        img: require('~/assets/img/icons/sol.svg'),
      }, // Данные помещаемые в модальное окно
    },
    buy: {
      index: '2', // Индекс для перерисовки одного и того же модального окна
      name: 'buyLP', // Уникальное название модального окна
      data: {
        label: 'MetaMask',
        img: require('~/assets/img/icons/sol.svg'),
      }, // Данные помещаемые в модальное окно
    },
    redeem: {
      index: '3', // Индекс для перерисовки одного и того же модального окна
      name: 'redeem', // Уникальное название модального окна
      data: {
        label: 'MetaMask',
        img: require('~/assets/img/icons/sol.svg'),
      }, // Данные помещаемые в модальное окно
    },
    confirmModal: {
      index: '4', // Индекс для перерисовки одного и того же модального окна
      name: 'confirmModal', // Уникальное название модального окна
      data: {
        label: 'MetaMask',
        img: require('~/assets/img/icons/sol.svg'),
      }, // Данные помещаемые в модальное окно
    },
    selectNetwork: {
      index: '5', // Индекс для перерисовки одного и того же модального окна
      name: 'select-network', // Уникальное название модального окна
      data: {
        label: 'MetaMask',
        img: require('~/assets/img/icons/sol.svg'),
      }, // Данные помещаемые в модальное окно
    },
  },
  modals: [],
})

export const mutations = {
  TOGGLE_MENU(state) {
    state.menu.open = !state.menu.open
  },
  TOGGLE_MENU_INTERFACE(state) {
    state.menuInterface.open = !state.menuInterface.open
  },
  PUSH_MODAL(state, modal) {
    state.modals.push(modal);
  },
  PUSH_MODALS(state, modals) {
    state.modals = [...state.modals, ...modals];
  },
  CLOSE_ALL_MODALS(state) {
    state.modals = [];
  },
  CLOSE_MODAL(state) {
    state.modals.pop();
  },
  SET_DATA_MODAL(state, {name, index, data}) {
    const modals = state.modals;
    for (let i = 0; i < modals.length; i++) {
      const modal = modals[i]
      if (modal.name === name && modal.index === index) {
        modal.data = data
      }
    }
  }
}

export const getters = {
  menu: (state) => state.menu,
  menuInterface: (state) => state.menuInterface,
  exampleModals: (state) => state.exampleModals,
  modals: (state) => state.modals,
}
