//we can use the same thing as the companies Model.
"use strict";

const db = require("../db");
const { NotFoundError} = require("../expressError");
const { sqlForPartialUpdate } = require("../helpers/sql");

class Job{
    //create a job returning salary, title?
    static async createJob(jobData){
        const result = await db.query(
            `INSERT INTO jobs(title, salary, equity, company_handle)
            VALUES($1, $2, $3, $4)
            RETURNING  id, title, salary, equity, company_handle`,
            [
                jobData.title,
                jobData.salary,
                jobData.equity,
                jobData.company_handle
            ]
        );
        return result.rows[0];
    };
    //find all jobs following the companies model, with min, max salary
    

  static async findAll({ minSalary, hasEquity, title } = {}) {
    let query = `SELECT jobs.id,
                        jobs.title,
                        jobs.salary,
                        jobs.equity,
                        jobs.company_handle AS "companyHandle",
                        c.name AS "companyName"
                 FROM jobs  
                   LEFT JOIN companies AS c ON c.handle = jobs.company_handle`;
    let Filters = [];
    let queryValues = [];

    // For each possible search term, add to whereExpressions and
    // queryValues so we can generate the right SQL

    if (minSalary !== undefined) {
      queryValues.push(minSalary);
      Filters.push(`salary >= $${queryValues.length}`);
    }

    if (hasEquity === true) {
      Filters.push(`equity > 0`);
    }

    if (title !== undefined) {
      queryValues.push(`%${title}%`);
      Filters.push(`title ILIKE $${queryValues.length}`);
    }

    if (whereExpressions.length > 0) {
      query += " WHERE " + Filters.join(" AND ");
    }

    // Finalize query and return results

    query += " ORDER BY title";
    const result = await db.query(query, queryValues);
    return result.rows;
  }

  //get job by id

  static async get(id) {
    const result = await db.query(
          `SELECT id,
                  title,
                  salary,
                  equity,
                  company_handle AS "companyHandle"
           FROM jobs
           WHERE id = $1`, [id]);

    const job = result.rows[0];

    if (!job) throw new NotFoundError(`No job: ${id}`);

    const companiesRes = await db.query(
          `SELECT handle,
                  name,
                  description,
                  num_employees AS "numEmployees",
                  logo_url AS "logoUrl"
           FROM companies
           WHERE handle = $1`, [job.companyHandle]);

    delete job.companyHandle;
    job.company = companiesRes.rows[0];
    
    return job;
  }

  //update job ??? 

  static async update(id, data) {
    const { setCols, values } = sqlForPartialUpdate(
        data,
        {});
    const idVarIdx = "$" + (values.length + 1);

    const querySql = `UPDATE jobs 
                      SET ${setCols} 
                      WHERE id = ${idVarIdx} 
                      RETURNING id, 
                                title, 
                                salary, 
                                equity,
                                company_handle AS "companyHandle"`;
    const result = await db.query(querySql, [...values, id]);
    const job = result.rows[0];

    if (!job) throw new NotFoundError(`No job: ${id}`);

    return job;
  }

  /** Delete given job from database; returns undefined.
   *
   * Throws NotFoundError if company not found.
   **/

  static async remove(id) {
    const result = await db.query(
          `DELETE
           FROM jobs
           WHERE id = $1
           RETURNING id`, [id]);
    const job = result.rows[0];

    if (!job) throw new NotFoundError(`No job: ${id}`);
  }
}

module.exports = Job;

