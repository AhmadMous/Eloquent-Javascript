// As this is very simple, and I knew how to use it, I simply commented the author's solution
// Add the functionality to the specialForms object
specialForms.set = (args, env) => {

    // If arguments are not a word and an expression to be evaluated, error
    if (args.length != 2 || args[0].type != "word") {
      throw new SyntaxError("Bad use of set");
    }

    // Grab variable name and value of expression
    let varName = args[0].name;
    let value = evaluate(args[1], env);
  
    // Starting from current scope, check each scope then its parent
    for (let scope = env; scope; scope = Object.getPrototypeOf(scope)) {
      if (Object.prototype.hasOwnProperty.call(scope, varName)) {
        scope[varName] = value;
        return value;
      }
    }

    // Binding name is not found in most local scope, or any outer scope
    throw new ReferenceError(`Setting undefined variable ${varName}`);
  };