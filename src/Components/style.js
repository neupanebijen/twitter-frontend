export const color = {
    primary: 'rgb(29,161,242)',
    primary_shade: 'rgb(26,145,218)',
    secondary: 'rgb(0,0,0)',
    secondary_shade: 'rgb(3,15,23)',
    secondary_background: 'rgba(36,45,52,0.7)',
    tertiary: 'rgb(255,255,255)',
    tertiary_shade: 'rgb(110,118,125)',
    tertiary_text: 'rgb(217,217,217)',
    shade: 'rgb(21,24,28)',
    shade_border: 'rgb(47,51,54)',
}

const size = {
    mobileS: '320px',
    mobileM: '375px',
    mobileL: '425px',
    tablet: '768px',
    laptop: '1024px',
    laptopM: '1340px',
    laptopL: '1440px',
    desktop: '2560px'
}


export const device = {
    mobileS: `(min-width: ${size.mobileS})`,
    mobileM: `(min-width: ${size.mobileM})`,
    mobileL: `(min-width: ${size.mobileL})`,
    tablet: `(min-width: ${size.tablet})`,
    laptop: `(min-width: ${size.laptop})`,
    laptopM: `(min-width: ${size.laptopM})`,
    laptopL: `(min-width: ${size.laptopL})`,
    desktop: `(min-width: ${size.desktop})`,
    desktopL: `(min-width: ${size.desktop})`,

    mobileSMax: `(max-width: ${size.mobileS})`,
    mobileMMax: `(max-width: ${size.mobileM})`,
    mobileLMax: `(max-width: ${size.mobileL})`,
    tabletMax: `(max-width: ${size.tablet})`,
    laptopMax: `(max-width: ${size.laptop})`,
    laptopMMax: `(max-width: ${size.laptopM})`,
    laptopLMax: `(max-width: ${size.laptopL})`,
    desktopMax: `(max-width: ${size.desktop})`,
    desktopLMax: `(max-width: ${size.desktop})`
}