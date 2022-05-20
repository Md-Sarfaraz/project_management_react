import { createTheme } from "react-data-table-component";

const theme = createTheme('solarized', {
    text: {
        primary: '#000',
        secondary: '#000',
    },
    background: {
        default: 'rgba(0,0,0,0,1)',
    },
    context: {
        background: 'rgba(0,0,0,0.5)',
        text: 'rgb(0,250,222)',
    },

    highlightOnHover: {
        default: 'rgba(140,0,210,0.1)',
        text: 'rgba(0,0,0,1)',

    },



    button: {
        default: '#2aa198',
        hover: 'rgba(0,0,0,.08)',
        focus: 'rgba(255,255,255,.12)',
        disabled: 'rgba(255, 255, 255, .34)',
    },
}, 'light');



const customStyles = {
    rows: {
        style: {
            minHeight: '72px', // override the row height
        },
    },
    headCells: {
        style: {
            paddingLeft: '8px', // override the cell padding for head cells
            paddingRight: '8px',
        },
    },
    cells: {
        style: {
            paddingLeft: '8px', // override the cell padding for data cells
            paddingRight: '8px',
            // width: "fit-content",

        },
    },
};

export { theme, customStyles }