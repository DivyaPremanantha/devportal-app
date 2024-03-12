export const LoadCSS = (content) => {

    Object.assign(document.querySelector('body').style, {

        'color': content.theme.palette.text.primary,
        'background-color': content.theme.palette.background.primary,
    })
    // Object.assign(document.querySelector('.nav-bar').style, {

    //     'background': content.theme.palette.background.secondary,
    //     'color': content.theme.palette.text.secondary,
    // })

    if (document.querySelector('.heading') !== null) {
        Object.assign(document.querySelector('.heading').style, {
            'font-family': content.theme.typography.heading.fontFamily,
        })
    }

    if (document.querySelector('.paragraph') !== null) {
        Object.assign(document.querySelector('.paragraph').style, {
            'font-family': content.theme.typography.paragraph.fontFamily,
        })
    }

    if (document.querySelector('.button') !== null) {
        Object.assign(document.querySelector('.button').style, {
            'background-color': content.theme.palette.button.primary,
            'font-family': content.theme.typography.paragraph.fontFamily,
        })
    }
}
