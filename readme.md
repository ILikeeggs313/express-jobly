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

Fifth commit: since the job routes should have similar functions to the companies route, copy from the companies route and modified the names

6th commit : job applications
    Add a route at POST /users/:username/jobs/:id that allows that user to apply for a job (or an admin to do it for them). That route should return JSON like:

    { applied: jobId }

    Change the output of the get-all-info methods and routes for users so those include the a field with a simple list of job IDs the user has applied for:

    { ..., jobs: [ jobId, jobId, ... ] }
    Document this carefully and write tests.

