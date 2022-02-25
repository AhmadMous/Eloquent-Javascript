// Quoting Style
// Imagine you have written a story and used single quotation marks through-
// out to mark pieces of dialogue. Now you want to replace all the dialogue
// quotes with double quotes, while keeping the single quotes used in contrac-
// tions like aren’t.
// Think of a pattern that distinguishes these two kinds of quote usage and
// craft a call to the replace method that does the proper replacement.

// solution tested on https://eloquentjavascript.net/code/#9.2
// 'I'm the cook,' he said, 'it's my job.'
// -> "I'm the cook," he said, "it's my job."

console.log(text.replace(/(^| )'|'($| )/g, '$1"$2'));

// Pattern matching breakdown
// $1': (^| )': either of start of string or space, followed by a ' character
// '$2: '($| ): ' followed by either of end of string or space
// |: signifies either "$1'" or "'$2" will match
// if "$1'" matches(say " '" for example) replacing by only " will remove a character (space or ^)
// therefore we make sure to add that back in after capture group with '$1"'
// same goes for other match with "'$2" but the replacement for subgroup comes
// after the newly added ", ("$2')
// The "g" flag at the end of the regex means global, all matches, not just first