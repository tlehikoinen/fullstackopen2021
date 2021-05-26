const dummyTest = require('../utils/list_helper').dummy

test('dummy returns one', () => {
    const blogs = []
    const result = dummyTest(blogs)
    expect(result).toBe(1)
})