# Jobly Backend

This is the Express backend for Jobly, version 2.

To run this:

    node server.js
    
To run the tests:

    jest -i

second commit:
    Added filtering into GET /companies route, can be passed into
    query tring:
        name: filter by name, case insensitive
        minEmployees: minimum numbers of employees.
        maxEmployees: maximum numbers of employees.
        if minEmployees > maxEmployees, return 400 bad request.

third commit:  
    Added authorization so that only people with is_admin flag can
    create, update, and delete companies from the database.
    

    Find a way to do this where you don’t need to change the code of these routes, and where you don’t need to SELECT information about the user on every request, but that the authentication credentials provided by the user can contain information suitable for this requirement.

    Update tests to demonstrate that these security changes are working.


Fourth commit: Adding features for jobs to the application