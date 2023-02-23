# Jobly Backend

This is the Express backend for Jobly, version 2.

To run this:

    node server.js
    
To run the tests:

    jest -i

first commit:
    Added filtering into GET /companies route, can be passed into
    query tring:
        name: filter by name, case insensitive
        minEmployees: minimum numbers of employees.
        maxEmployees: maximum numbers of employees.
        if minEmployees > maxEmployees, return 400 bad request.

