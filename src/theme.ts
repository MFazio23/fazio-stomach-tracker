import {createTheme} from '@mui/material/styles';
import {red} from '@mui/material/colors';

export const themeColors = {
    cafeNoir: '#563F1B',
    darkerBrown: '#322004',
    icterine: '#F7F052',
    orangeWheel: '#F28123',
    syracuseOrangeRed: '#D34E24',
    myrtleGreen: '#38726C',
}

export const generateTheme = () => createTheme({
    colorSchemes: {
        light: {
            palette: {
                primary: {
                    main: themeColors.cafeNoir,
                },
                secondary: {
                    main: themeColors.myrtleGreen,
                },
                error: {
                    main: red.A400,
                },
                background: {
                    default: '#F7F0F0',
                    paper: '#FCF5F5'
                },
            },
        },
        dark: {
            palette: {
                primary: {
                    main: themeColors.myrtleGreen,
                },
                secondary: {
                    main: themeColors.cafeNoir,
                },
                error: {
                    main: red.A400,
                },
            },
        },
    }
});
