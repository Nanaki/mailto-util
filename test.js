import test from 'ava';
import mailTo from '.';


test('Empty mail', t => {
  t.is(mailTo(), 'mailto:');
});

test('Simple mail', t => {
  t.is(
    mailTo({
      recipients: {
        to: 'sugar@youhou.com'
      }
    }),
    'mailto:sugar@youhou.com'
  );
});

test('Recipient list', t => {
  t.is(
    mailTo({
      recipients: {
        to: ['mum@youhou.com', 'daddy@youhou.com'],
        cc: ['bro@youhou.com', 'sista@youhou.com'],
        cci: ['sugar@youhou.com', 'chris@youhou.com']
      },
      subject: 'Summer party!',
      body: 'Are you ready for tonight?'
    }),
    'mailto:mum@youhou.com,daddy@youhou.com?cc=bro@youhou.com,sista@youhou.com&cci=sugar@youhou.com,chris@youhou.com&subject=Summer%20party!&body=Are%20you%20ready%20for%20tonight%3F'
  );
});

test('Recipient string', t => {
  t.is(
    mailTo({
      recipients: {
        to: 'daddy@youhou.com',
        cc: 'bro@youhou.com',
        cci: 'sugar@youhou.com'
      },
      subject: 'Summer party!',
      body: 'Are you ready for tonight?'
    }),
    'mailto:daddy@youhou.com?cc=bro@youhou.com&cci=sugar@youhou.com&subject=Summer%20party!&body=Are%20you%20ready%20for%20tonight%3F'
  );
});

test('Full featured mail', t => {
  t.is(
    mailTo({
      recipients: {
        to: ['mum@youhou.com', 'daddy@youhou.com'],
        cc: 'bro@youhou.com',
        cci: 'sugar@youhou.com'
      },
      subject: 'My Wedding',
      body: 'Here we go!'
    }),
    'mailto:mum@youhou.com,daddy@youhou.com?cc=bro@youhou.com&cci=sugar@youhou.com&subject=My%20Wedding&body=Here%20we%20go!'
  );
});
