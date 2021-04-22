const { getHost } = require('../src/handlers/mongo');

describe('Test getHost logic', () => {
  test('connectionStr without username and password ', async () => {
    let res1 = getHost("postgres://host.com:5432/db");
    expect(res1).toBe("host.com");
    let res2 = getHost("postgres://www.host.com:5432/db");
    expect(res2).toBe("www.host.com");
  });

  test('connectionStr with username and password ', async () => {
    let res1 = getHost("postgres://username:password@host.com:5432/db");
    expect(res1).toBe("host.com");
    
    let res2 = getHost("postgres://username:password@www.host.com:5432/db");
    expect(res2).toBe("www.host.com");

    let res3 = getHost("postgres://username@www.host.com:5432/db");
    expect(res3).toBe("www.host.com");
  });

  test('test toThrow  ', async () => {
    expect(() => {
      getHost("postgres://");
    }).toThrow();

    // Missing port:
    expect(() => {
      getHost("postgres://www.host.com/db");
    }).toThrow();
  });

});