import { createTheme } from "react-data-table-component";

const theme = createTheme('solarized', {
    text: {
        primary: '#fff',
        secondary: '#ccd4ff',
    },
    background: {
        default: 'transparent',
    },
    context: {
        background: '#fff',
        text: 'rgb(0,220,0)',
    },

    action: {
        button: 'rgba(0,0,0,.54)',
        hover: 'rgba(0,200,0,.5)',
        disabled: 'rgba(0,0,0,.12)',
    },
}, 'dark');

export { theme }