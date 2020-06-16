import test from 'ava';
import mailTo from '.';


test('Empty email', t => {
  t.is(mailTo(), 'mailto:');
});

test('Email with recipient string', t => {
  t.is(
    mailTo({
      recipients: {
        to: 'sugar@example.org'
      }
    }),
    'mailto:sugar@example.org'
  );
});

test('Email with complexe recipient string', t => {
  t.is(
    mailTo({
      recipients: {
        to: '"not@me"@example.org'
      }
    }),
    'mailto:%22not%40me%22@example.org'
  );
});

test('Email with complexe recipient list', t => {
  t.is(
    mailTo({
      recipients: {
        to: ['"oh\\\\no"@example.org', '"not@me"@example.org'],
        cc: [`"\\\\\\"it's\\ ugly\\\\\\""@example.org`, 'sista@example.org'],
        cci: ['"not@you"@example.org', 'chris@example.org']
      }
    }),
    "mailto:%22oh%5C%5Cno%22@example.org,%22not@me%22@example.org?cc=%22%5C%5C%5C%22it's%5C%20ugly%5C%5C%5C%22%22@example.org,sista@example.org&cci=%22not@you%22@example.org,chris@example.org"
  );
});

test('Email with recipient list, subject and body', t => {
  t.is(
    mailTo({
      recipients: {
        to: ['mum@example.org', 'daddy@example.org'],
        cc: ['bro@example.org', 'sista@example.org'],
        cci: ['sugar@example.org', 'chris@example.org']
      },
      subject: 'Summer party!',
      body: 'Are you ready for tonight?'
    }),
    'mailto:mum@example.org,daddy@example.org?cc=bro@example.org,sista@example.org&cci=sugar@example.org,chris@example.org&subject=Summer%20party!&body=Are%20you%20ready%20for%20tonight%3F'
  );
});

test('Email with recipient string', t => {
  t.is(
    mailTo({
      recipients: {
        to: 'daddy@example.org',
        cc: 'bro@example.org',
        cci: 'sugar@example.org'
      },
      subject: 'Summer party!',
      body: 'Are you ready for tonight?'
    }),
    'mailto:daddy@example.org?cc=bro@example.org&cci=sugar@example.org&subject=Summer%20party!&body=Are%20you%20ready%20for%20tonight%3F'
  );
});

test('Full featured mail', t => {
  t.is(
    mailTo({
      recipients: {
        to: ['mum@example.org', 'daddy@example.org'],
        cc: 'bro@example.org',
        cci: 'sugar@example.org'
      },
      subject: 'My Wedding',
      body: 'Here we go!'
    }),
    'mailto:mum@example.org,daddy@example.org?cc=bro@example.org&cci=sugar@example.org&subject=My%20Wedding&body=Here%20we%20go!'
  );
});
