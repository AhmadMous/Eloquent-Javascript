// Regexp Golf
// Code golf is a term used for the game of trying to express a particular pro-
// gram in as few characters as possible. Similarly, regexp golf is the practice of
// writing as tiny a regular expression as possible to match a given pattern, and
// only that pattern.
// For each of the following items, write a regular expression to test
// whether any of the given substrings occur in a string. The regular expres-
// sion should match only strings containing one of the substrings described.
// Do not worry about word boundaries unless explicitly mentioned. When
// your expression works, see whether you can make it any smaller.

// Refer to the table in the chapter summary for help. Test each solution
// with a few test strings.
// test this on: https://eloquentjavascript.net/code/#9.1

// 1. car and cat
/ca[rt]/ 
// matches ca with either of r or t

// 2. pop and prop
/pr?op/
// matches p, optionally r, then op

// 3. ferret, ferry, and ferrari
/ferr(et|y|ari)/
// matches ferr with either of et, y, or ari

// 4. Any word ending in ious
/ious\b/
// matches the ious in the ending, which we know is an ending due to the word
// break character, though /\b\w*ious\b/ would make more sense as it grabs the start of the word
// from a word boundary, 0 or more letters, ious, then the word boundary at the end of the word
// ensuring whole word matches, our solution is enough to pass the tests

// 5. A whitespace character followed by a period, comma, colon, or
// semicolon
/\s[.,:;]/
// matches any space character, then either items in the set (., :, or ;)

// 6. A word longer than six letters
/\w{7}/
// matches 7 consecutive word characters, these could actually be in the middle of 1 long word
// and can possibly not make sense as they don't start or end with a word break
// a suggestion is to use /\b\w{7,}\b/ which matches word break, then a word of 7
// or more characters, then a word break
// It's true that our solution doesn't match full words longer than 7 characterss,
// but it is enough to pass the tests

// 7. A word without the letter e (or E)
/\b[^\We]+\b/i
// matches word break, then 1 or more of items in the set of [non(non word characters)none]
// which is another way to say, a word containing any letter but e
// the "i" flag for case insensitive makes it also exclude E
