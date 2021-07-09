import { IncomingMessage } from 'http';
import { parse } from 'url';
import { ParsedRequest } from './types';

export function parseRequest(req: IncomingMessage) {
    console.log('HTTP ' + req.url);
    const { query } = parse(req.url || '/', true);
    const { image, logo, header, fileExtension, countryFlag, otherCountryFlag } = (query || {});

    if (Array.isArray(header)) {
        throw new Error('Expected a single header');
    }
    if (Array.isArray(logo)) {
        throw new Error('Expected a single logo');
    }
    if (Array.isArray(image)) {
        throw new Error('Expected a single image');
    }
    if (Array.isArray(countryFlag)) {
        throw new Error('Expected a single countryFlag');
    }
    if (Array.isArray(otherCountryFlag)) {
        throw new Error('Expected a single otherCountryFlag');
    }

    let decodedHeader = ''
    if(header != undefined) {
        decodedHeader = decodeURIComponent(header)
    }

    const parsedRequest: ParsedRequest = {
        fileExtension: fileExtension === 'jpeg' ? fileExtension : 'png',
        header: decodedHeader,
        logo: logo !== undefined ? logo : '',
        image:  image !== undefined ? image : '',
        countryFlag: countryFlag !== undefined ? countryFlag : '',
        otherCountryFlag: otherCountryFlag !== undefined ? otherCountryFlag : '',
    };
    return parsedRequest;
}
