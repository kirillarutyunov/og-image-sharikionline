export type FileType = 'png' | 'jpeg';
export type Theme = 'light' | 'dark';

export interface ParsedRequest {
    image: string;
    logo: string;
    header: string;
    fileExtension: FileType;
    countryFlag: string;
    otherCountryFlag: string | null;
}
