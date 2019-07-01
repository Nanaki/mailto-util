'use strict';

const concatEmails = (emails) => {
    if (!emails) {
        return '';
    }

    return String(emails.filter((email) => email));
};

const normalizeArray = (value) => {
    return Array.isArray(value) ? value : [value];
};

const normalizeEmails = (emails) => {
    return concatEmails(normalizeArray(emails));
};

const mailTo =({ recipients: { to, cc, cci }, subject, body } = { recipients: {} }) => {
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
