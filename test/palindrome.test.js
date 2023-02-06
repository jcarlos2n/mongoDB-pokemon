const {palindrome} = require('../utils/for_testing')

test('palindrome of jocann', () =>{
    const result = palindrome('jocann')

    expect(result).toBe('nnacoj')
})

test('palindrome of empty string', () =>{
    const result = palindrome('')

    expect(result).toBeUndefined
})