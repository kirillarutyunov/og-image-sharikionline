
import { readFileSync } from 'fs';
// import marked from 'marked';
import { sanitizeHtml } from './sanitizer';
import { ParsedRequest } from './types';
const twemoji = require('twemoji');
const twOptions = { folder: 'svg', ext: '.svg' };
const emojify = (text: string) => twemoji.parse(text, twOptions);

const montserratBlack = readFileSync(`${__dirname}/../_fonts/Montserrat-Black.woff2`).toString('base64');
const montserratBold = readFileSync(`${__dirname}/../_fonts/Montserrat-Bold.woff2`).toString('base64');
const montserratMedium = readFileSync(`${__dirname}/../_fonts/Montserrat-Medium.woff2`).toString('base64');
const montserratRegular = readFileSync(`${__dirname}/../_fonts/Montserrat-Regular.woff2`).toString('base64');
const montserratSemiBold = readFileSync(`${__dirname}/../_fonts/Montserrat-SemiBold.woff2`).toString('base64');

function getCss() {
    return `
    @font-face {
        font-family: 'Montserrat';
        font-style:  normal;
        font-weight: black;
        src: url(data:font/woff2;charset=utf-8;base64,${montserratBlack}) format('woff2');
    }

    @font-face {
        font-family: 'Montserrat';
        font-style:  normal;
        font-weight: bold;
        src: url(data:font/woff2;charset=utf-8;base64,${montserratBold}) format('woff2');
    }
    
    @font-face {
        font-family: 'Montserrat';
        font-style:  normal;
        font-weight: medium;
        src: url(data:font/woff2;charset=utf-8;base64,${montserratMedium}) format('woff2');
    }
    
    @font-face {
        font-family: 'Montserrat';
        font-style:  normal;
        font-weight: normal;
        src: url(data:font/woff2;charset=utf-8;base64,${montserratRegular}) format('woff2');
    }
    
    @font-face {
        font-family: 'Montserrat';
        font-style:  normal;
        font-weight: semi-bold;
        src: url(data:font/woff2;charset=utf-8;base64,${montserratSemiBold}) format('woff2');
    }

    body {
        height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0;
        margin: 0;
    }
    
    .footer {
        margin-top: 30px;
        position: relative;
        z-index: 8;
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    
    .footer__logo,
    .footer__label {
        text-align: center;
    }
    
    .footer__label {
        font-size: 50px;
        font-family: 'Montserrat';
        font-weight: medium;
        color: #1C3E40;
    }
    
    .card {
        width: 100%;
    }

    .post-data {
        margin-bottom: 120px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        position: relative;
        z-index: 10;
        width: 100%;
    }
    
    .post-data__main {
        width: 65%;
    }
    
    .post-data__title {
        padding-right: 30px;
    }
    
    .post-data__photo {
        width: 520px;
        flex: 0 0 470px;
        text-align: right;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        height: 520px;
        width: 520px;
    }
    
    .wrapper {
        position: relative;
        height: 100%;
        width: 100%;
        padding: 0;
    }
    
    .post-data__photo img {
        width: 580px;
        height: 470px;
        border-radius: 15px;
        object-fit: cover;
    }

    .logo-wrapper {
        display: flex;
        align-items: center;
        align-content: center;
        justify-content: center;
        justify-items: center;
    }

    .logo {
        margin: 0 75px;
    }

    .plus {
        color: #BBB;
        font-family: Times New Roman, Verdana;
        font-size: 100px;
    }

    .spacer {
        margin: 150px;
        width: 100%;
    }

    .emoji {
        height: 1em;
        width: 1em;
        margin: 0 .05em 0 .1em;
        vertical-align: -0.1em;
    }
    
    .heading {
        font-family: 'Montserrat';
        font-weight: bold;
        font-size: 90px;
        line-height: 1.1;
    }
    
    .top-border {
        width: 100%;
        height: 30px;
        background: #dd6098;
        position: absolute;
        top: 0;
        left: 0;
    }
    
    .post-data__emojis {
        font-size: 94px;
        margin-bottom: 30px;
    }
    `;
}

export function getHtml(parsedReq: ParsedRequest) {
    const { header, image } = parsedReq;
    return `<!DOCTYPE html>
<html>
    <meta charset="utf-8">
    <title>Generated Image</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <style>
        ${getCss()}
    </style>
    <body>
        <div class="top-border"></div>
        <div class="spacer">
            <div class="card">
                <div class="post-data">
                    <div class="post-data__main">
                        <div class="post-data__emojis">${emojify(`🔵&thinsp;🟣&thinsp;🟡`)}</div>
                        <div class="post-data__title heading">${emojify(sanitizeHtml(header))}</div>
                    </div>
                    <div class="post-data__photo">${
                        image ? `${getImage(image)}` : '&nbsp;'
                    }</div>
                </div>
                <div class="footer">
                    <div class="footer__logo">
                        <img src="https://sharikionline.com/wp-content/themes/sharikionline/assets/images/sharikionline.com-logo.png" alt="">
                        <div class="footer__label">Игры шарики онлайн!</div>
                    </div>
                </div>
            </div>
        </div>
    </body>
</html>`;
}

function getImage(src: string, width = 'auto', height = '225') {
    return `<img
        class="post-image"
        alt="Generated Image"
        src="${sanitizeHtml(src)}"
        width="${sanitizeHtml(width)}"
        height="${sanitizeHtml(height)}"
    />`
}