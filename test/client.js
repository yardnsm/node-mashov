import Client from '../lib/client';

test('should reject if user is not logged', (done) => {
  const client = new Client({
    // ...
  });

  client.getGrades().catch((err) => {
    expect(err.message).toEqual('User is not logged in');
    done();
  });
});
