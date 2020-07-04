import {string, optWhitespace} from 'parsimmon';

export function sites(lang) {
	const {site} = lang;
	return string('Sites').trim(optWhitespace).then(site.many());
}

export {default as site} from './site';
export {default as siteInfo} from './siteInfo';
export {default as siteOwner} from './siteOwner';
export {default as siteParentCiv} from './siteParentCiv';
export {default as siteRuler} from './siteRuler';
