'use strict';

// Implements RFC 5322 at 99,99%
// Sources: http://emailregex.com and https://www.regular-expressions.info/email.html
const EMAIL_REGEX = /^(?<localPart>(?:[^<>()\[\]\\.,;:\s@"]+(?:\.[^<>()\[\]\\.,;:\s@"]+)*)|(?:".+"))@(?<domain>(?:\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(?:(?:[a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const encodeEmail = (email) => {
    const match = email && email.match(EMAIL_REGEX);

    if (!match) {
        return '';
    }

    const { groups: { localPart, domain } } = match;

    return `${encodeURI(localPart)}@${encodeURI(domain)}`;
};

const concatEmails = (emails) => {
    if (!emails) {
        return '';
    }

    return String(emails.filter((email) => email));
};

const normalizeArray = (value) => {
    if (!value) {
        return [];
    }

    return Array.isArray(value) ? value : [value];
};

const normalizeEmails = (emails) => {
    return concatEmails(
        normalizeArray(emails)
            .map((email) => encodeEmail(email))
            .filter((email) => email)
    );
};

const mailTo = ({ recipients: { to, cc, cci }, subject, body } = { recipients: {} }) => {
    const recipientsTo = normalizeEmails(to);

    const params = {
        ...(cc && {'cc': normalizeEmails(cc)}),
        ...(cci && {'cci': normalizeEmails(cci)}),
        ...(subject && {'subject': encodeURIComponent(subject)}),
        ...(body && {'body': encodeURIComponent(body)})
    };

    const mailToQueryString = Object.keys(params).map((key) => {
        return `${key}=${params[key]}`;
    }).join('&');

    return mailToQueryString ? `mailto:${recipientsTo}?${mailToQueryString}` : `mailto:${recipientsTo}`;
};

module.exports = mailTo;
