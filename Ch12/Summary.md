A parser is a program that reads a piece of text and producesa data structure that
reflects the structure of the program contained in that text. If the text does not 
form a valid program, the parser should point out the error.

Everything in Egg is an expression.
Expression:
- name of a binding
- number: sequence of digits
- string: sequence of characters (not double quotes) wrapped in double quotes
- application

Applications are used for function calls but also for constructs such as if or 
while.

Binding names can consist of any character that is not whitespace and that does
not have a special meaning in the syntax.

Applications are written by putting parentheses after an expression and having
any number of arguments between those parentheses, separated by commas.

# do(define(x, 10),
#    if(>(x, 5),
#       print("large"),
#       print("small")))

Things that are operators in JS are normal bindings in Egg, applied just like 
other functions

we need a do construct to represent doing multiple things in sequence.

DS parser will use: Syntax Tree that consists of expression objects
each has:
- a type property indicating the kind of expression it is 
- other properties to describe its content.

Expression type:
- "value": represent literal strings or numbers.Their value property contains the string or number value that they represent.

- "word": used for identifiers (names). Such objects have a name property that holds the identifier’s name as a string.

- "apply" expressions represent applications. They have an operator property that refers to the expression that is being applied, as well as an args property that holds an array of argument expressions.

Expressions are not separated into lines, and they have a recursive structure. Application expressions contain other expressions. This problem can be solved very well by writing a parser function that is recursive in a way that reflects the recursive nature of the language.