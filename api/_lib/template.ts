
import { readFileSync } from 'fs';
// import marked from 'marked';
import { sanitizeHtml } from './sanitizer';
import { ParsedRequest } from './types';
// const twemoji = require('twemoji');
// const twOptions = { folder: 'svg', ext: '.svg' };
// const emojify = (text: string) => twemoji.parse(text, twOptions);

const rglr = readFileSync(`${__dirname}/../_fonts/Inter-Regular.woff2`).toString('base64');
const bold = readFileSync(`${__dirname}/../_fonts/Inter-Bold.woff2`).toString('base64');
const mono = readFileSync(`${__dirname}/../_fonts/Vera-Mono.woff2`).toString('base64');
const ptreglr = readFileSync(`${__dirname}/../_fonts/PTSans-Regular.woff2`).toString('base64');
const ptbold = readFileSync(`${__dirname}/../_fonts/PTSans-Bold.woff2`).toString('base64');

function getCss() {
    return `
    @font-face {
        font-family: 'Inter';
        font-style:  normal;
        font-weight: normal;
        src: url(data:font/woff2;charset=utf-8;base64,${rglr}) format('woff2');
    }

    @font-face {
        font-family: 'Inter';
        font-style:  normal;
        font-weight: bold;
        src: url(data:font/woff2;charset=utf-8;base64,${bold}) format('woff2');
    }
    
    @font-face {
        font-family: 'PT Sans';
        font-style:  normal;
        font-weight: normal;
        src: url(data:font/woff2;charset=utf-8;base64,${ptreglr}) format('woff2');
    }

    @font-face {
        font-family: 'PT Sans';
        font-style:  normal;
        font-weight: bold;
        src: url(data:font/woff2;charset=utf-8;base64,${ptbold}) format('woff2');
    }

    @font-face {
        font-family: 'Vera';
        font-style: normal;
        font-weight: normal;
        src: url(data:font/woff2;charset=utf-8;base64,${mono})  format("woff2");
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
    }
    
    .footer__logo {
        padding-top: 30px;
        width: 40%;
        border-top: 6px solid #1316ff;
    }
    
    .footer__logo img {
        max-width: 60%;
        max-height: 120px;
    }

    .post-data {
        margin-bottom: 120px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        position: relative;
        z-index: 10;
    }
    
    .post-data__main {
        width: 70%;
    }
       
    .post-data__flags {
        margin-bottom: 30px;
    }
    
    .post-data__flags img {
        width: 120px;
    }
    
    .post-data__photo {
        width: 35%;
        flex: 0 0 35%;
        text-align: right;
        display: flex;
        align-items: center;
        width: 100%;
        justify-content: flex-end;
    }
    
    .wrapper {
        position: relative;
        height: 100%;
        width: 100%;
        padding: 0;
    }
    
    .country-bg {
        position: absolute;
        width: 45%;
        height: 100%;
        top: 0;
        right: 0;
        z-index: 1;
        bottom: 0;
        background-size: cover;
    }
    
    .country-bg:after{
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 0;
        height: 0;
        border-style: solid;
        border-color: transparent #fff transparent #fff;
        border-width: 0 0 100vh 30vh;
    }
    
    .post-data__photo img {
        width: 640px;
        height: 460px;
        border-radius: 15px;
        object-fit: cover;
    }

    code {
        color: #D400FF;
        font-family: 'Vera';
        white-space: pre-wrap;
        letter-spacing: -5px;
    }

    code:before, code:after {
        content: '\`';
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
    }

    .emoji {
        height: 1em;
        width: 1em;
        margin: 0 .05em 0 .1em;
        vertical-align: -0.1em;
    }
    
    .heading {
        font-family: 'PT Sans', sans-serif;
        font-size: 74px;
        font-style: normal;
        font-weight: bold;
        color: #333;
        line-height: 1.2;
    }`;
}

export function getHtml(parsedReq: ParsedRequest) {
    const { countryFlag, header, otherCountryFlag, image } = parsedReq;
    return `<!DOCTYPE html>
<html>
    <meta charset="utf-8">
    <title>Generated Image</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <style>
        ${getCss()}
    </style>
    <body>
        <div class="wrapper">
            <div class="spacer">
                <div class="card">
                    <div class="post-data">
                        <div class="post-data__main">
                            <div class="post-data__flags">
                                <div class="post-data-flags__base">
                                    <img src="${sanitizeHtml(countryFlag)}" alt="">
                                </div>
                                ${getOtherCountryFlag(otherCountryFlag)}
                            </div>
                            <div class="post-data__title heading">${sanitizeHtml(header)}</div>
                        </div>
                        <!-- <div class="post-data__photo">${getImage(image)}</div> -->
                    </div>
                    <div class="footer">
                        <div class="footer__logo"><img src="https://covidcrossborders.com/wp-content/themes/covidcrossborders/assets/images/covidcrossborders.com-logo.png" alt=""></div>
                    </div>
                </div>
            </div>
            <div class="country-bg" style="background-image: url('${sanitizeHtml(image)}')"></div>
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

function getOtherCountryFlag(otherCountryFlag: string|null = null) {
    if(otherCountryFlag === null || otherCountryFlag == '') {
        return ''
    }

    return `<div class="post-data-flags__other-country">
        <img src="${sanitizeHtml(otherCountryFlag)}" alt="Generated Image">
    </div>`
}
