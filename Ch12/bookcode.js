// (string) =>(expr object, string)
function parseExpression(program) {

    // Skip the spaces in the start string (any amount of whitespaces is allowed)
    program = skipSpace(program);

    // match: is expression hold the expression at the start of the string
    // expr: Object containing the DS of the expression at start of string
    let match, expr;

    // Matches anything but ", inside "", value equals the first capture group
    if (match = /^"([^"]*)"/.exec(program)) {
      expr = {type: "value", value: match[1]};
      
      // Match for number is 1+ digits in addition to a word boundary
    } else if (match = /^\d+\b/.exec(program)) {
      expr = {type: "value", value: Number(match[0])};
    
      // Match for word elements is anything but 
    } else if (match = /^[^\s(),#"]+/.exec(program)) {
      expr = {type: "word", name: match[0]};
    } else {
        
      // No atomic element that egg supports is found
      throw new SyntaxError("Unexpected syntax: " + program);
    }
  
    // Returns the expr object and the rest of the program with match removed
    return parseApply(expr, program.slice(match[0].length));
  }
  

  // Function that repeatedly cuts whitespaces off start of the program string
  function skipSpace(string) {

    // Returns position of first charachter that is not a white space
    let first = string.search(/\S/);

    // The string is all white spaces, return empty string(its equivalent)
    if (first == -1) return "";

    // Return the string from the first non-space charachter forward
    return string.slice(first);
  }

  // Basically we got the first chuck possible and parsed it

  // checks whether the expression is an application. If so, it
  // parses a parenthesized list of arguments.
  function parseApply(expr, program) {

    // Skip spaces in start of rest of string returned
    program = skipSpace(program);

    // If next charachter is not an "("
    if (program[0] != "(") {

      // This is not an application, return the expression given
      return {expr: expr, rest: program};
    }
  
    // skips the opening parenthesis and
    program = skipSpace(program.slice(1));

    // This is an application object
    expr = {type: "apply", operator: expr, args: []};

    // Parse each expression till a closing paranthesis is found
    while (program[0] != ")") {
      
      // Parses argument at start of the string
      let arg = parseExpression(program);
      expr.args.push(arg.expr);

      // Update input for next iteration
      program = skipSpace(arg.rest);

      // If there exists an arguments seperator
      if (program[0] == ",") {
        program = skipSpace(program.slice(1));
      } else if (program[0] != ")") {

        // In case it is neither ")" nor ","
        throw new SyntaxError("Expected ',' or ')'");
      }
    }

    // Calls parseApply again with same syntax tree object after skipping ")"
    // because an application expression can itself be applied
    return parseApply(expr, program.slice(1));
  }

  // Parse function that verifies end of string is reached
  function parse(program) {
    let {expr, rest} = parseExpression(program);

    // Makes sure there is no text left after parsing, whitespaces are ok though
    if (skipSpace(rest).length > 0) {
      throw new SyntaxError("Unexpected text after program");
    }

    // Returns final syntax tree object
    return expr;
  }

// Creates an object with no prototypes to hold special forms
// The specialForms object is used to define special syntax in Egg
const specialForms = Object.create(null);

// Accepts scope and syntax tree objects and returns value produced by expression evaluation
function evaluate(expr, scope) {

  // Case of literal value expression
  if (expr.type == "value") {
    return expr.value;

    // If expression is a binding, check if it is defined in scope and retrieve its value
  } else if (expr.type == "word") {
    if (expr.name in scope) {
      return scope[expr.name];
    } else {

      // Else throw a reference error
      throw new ReferenceError(
        `Undefined binding: ${expr.name}`);
    }

  // Case of application
  } else if (expr.type == "apply") {

    // Destructure the application expression
    let {operator, args} = expr;

    // Check if the operator is a word which is defined in specialForms
    if (operator.type == "word" &&
        operator.name in specialForms) {

      // Apply the special form using args and scope and return its value
      return specialForms[operator.name](expr.args, scope);
    } else {

      // Evaluate the operator
      let op = evaluate(operator, scope);

      // Verify that it is a function
      if (typeof op == "function") {

        // Call it with the evaluated arguments
        return op(...args.map(arg => evaluate(arg, scope)));
      } else {

        // Binding is neither a function nor a special form
        throw new TypeError("Applying a non-function.");
      }
    }
  }
}

// Adding some special forms
specialForms.if = (args, scope) => {

  if (args.length != 3) {
    throw new SyntaxError("Wrong number of args to if");
  } else if (evaluate(args[0], scope) !== false) {
    return evaluate(args[1], scope);
  } else {
    return evaluate(args[2], scope);
  }
};

specialForms.while = (args, scope) => {
  if (args.length != 2) {
    throw new SyntaxError("Wrong number of args to while");
  }
  while (evaluate(args[0], scope) !== false) {
    evaluate(args[1], scope);
  }

  // Since undefined does not exist in Egg, we return false,
  // for lack of a meaningful result.
  return false;
};

specialForms.do = (args, scope) => {
  let value = false;
  for (let arg of args) {
    value = evaluate(arg, scope);
  }
  return value;
};

specialForms.define = (args, scope) => {
  if (args.length != 2 || args[0].type != "word") {
    throw new SyntaxError("Incorrect use of define");
  }
  let value = evaluate(args[1], scope);
  scope[args[0].name] = value;
  return value;
};

specialForms.define = (args, scope) => {
  if (args.length != 2 || args[0].type != "word") {
    throw new SyntaxError("Incorrect use of define");
  }
  let value = evaluate(args[1], scope);
  scope[args[0].name] = value;
  return value;
};

// Creation of top global scope and creating true/false bindings
const topScope = Object.create(null);

topScope.true = true;
topScope.false = false;

// Evaluating a simple expression that negates a boolean value
let prog = parse(`if(true, false, true)`);
console.log(evaluate(prog, topScope));
// → false

// Using Function constructor to synthesize a bunch of operator functions in a loop
for (let op of ["+", "-", "*", "/", "==", "<", ">"]) {
  topScope[op] = Function("a, b", `return a ${op} b;`);
}

// Wrapping console.log in a function and calling it print
topScope.print = value => {
  console.log(value);
  return value;
};

// Provides a convenient way to parse a program and runs it in a fresh scope
// The fresh scope inherits from previously created global scope
function run(program) {
  return evaluate(parse(program), Object.create(topScope));
}


// Treats its last argument as the function’s body and uses all arguments 
// before that as the names of the function’s parameters.
// note: Author should have probably assigned a default scope
specialForms.fun = (args, scope) => {

  // Case where there are no arguments
  if (!args.length) {
    throw new SyntaxError("Functions need a body");
  }

  // Last argument is treated as function body
  let body = args[args.length - 1];

  // Uses all arguments before body as names of the function parameters
  let params = args.slice(0, args.length - 1).map(expr => {
    if (expr.type != "word") {

      // In case a parameter is not a word, throw an error
      throw new SyntaxError("Parameter names must be words");
    }

    // Each expression of the arguments gets mapped to its name
    return expr.name;
  });


  // A function is returned which accesses specified bindings via closure
  return function() {

    // If number of arguments passed to the function does not match that of
    // function definition. throw an error
    if (arguments.length != params.length) {
      throw new TypeError("Wrong number of arguments");
    }

    // Create a new scope that inherits from input scope
    // scope is provided as parameter to the evaluate call (topScope is used here)
    let localScope = Object.create(scope);


    // Adds argument bindings to the newly created scope under specified parameter names
    for (let i = 0; i < arguments.length; i++) {
      localScope[params[i]] = arguments[i];
    }

    // Evaluates the body of the function in the newly created local scope and returns the resultant value
    return evaluate(body, localScope);
  };
};