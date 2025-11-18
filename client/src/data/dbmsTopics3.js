export const dbmsTopics3 = [
  {
    id: 'sql-joins',
    title: 'JOINs (INNER, LEFT, RIGHT, FULL OUTER, CROSS, SELF)',
    explanation: `SQL JOINs combine rows from two or more tables based on related columns. Different types of joins return different result sets, making them essential for querying relational databases effectively. Understanding when to use each join type is crucial for writing efficient queries.`,
    keyPoints: [
      'INNER JOIN - Returns only matching rows from both tables',
      'LEFT JOIN - Returns all rows from left table, matching from right',
      'RIGHT JOIN - Returns all rows from right table, matching from left', 
      'FULL OUTER JOIN - Returns all rows from both tables',
      'CROSS JOIN - Cartesian product of both tables',
      'SELF JOIN - Joins table with itself using aliases'
    ],
    codeExamples: [
      {
        title: 'SQL JOIN Examples',
        language: 'sql',
        code: `-- Sample tables
CREATE TABLE customers (
    customer_id INT PRIMARY KEY,
    name VARCHAR(100),
    city VARCHAR(50)
);

CREATE TABLE orders (
    order_id INT PRIMARY KEY,
    customer_id INT,
    order_date DATE,
    amount DECIMAL(10,2)
);

-- INNER JOIN - Only customers with orders
SELECT c.name, o.order_date, o.amount
FROM customers c
INNER JOIN orders o ON c.customer_id = o.customer_id;

-- LEFT JOIN - All customers, with or without orders
SELECT c.name, o.order_date, o.amount
FROM customers c
LEFT JOIN orders o ON c.customer_id = o.customer_id;

-- RIGHT JOIN - All orders, even if customer doesn't exist
SELECT c.name, o.order_date, o.amount
FROM customers c
RIGHT JOIN orders o ON c.customer_id = o.customer_id;

-- FULL OUTER JOIN - All customers and all orders
SELECT c.name, o.order_date, o.amount
FROM customers c
FULL OUTER JOIN orders o ON c.customer_id = o.customer_id;

-- CROSS JOIN - Cartesian product (use with caution)
SELECT c.name, p.product_name
FROM customers c
CROSS JOIN products p;

-- SELF JOIN - Find customers in same city
SELECT c1.name AS customer1, c2.name AS customer2, c1.city
FROM customers c1
JOIN customers c2 ON c1.city = c2.city AND c1.customer_id < c2.customer_id;

-- Multiple JOINs
SELECT c.name, o.order_date, oi.product_name, oi.quantity
FROM customers c
JOIN orders o ON c.customer_id = o.customer_id
JOIN order_items oi ON o.order_id = oi.order_id
WHERE o.order_date >= '2024-01-01';

-- JOIN with aggregation
SELECT c.name, COUNT(o.order_id) as order_count, SUM(o.amount) as total_spent
FROM customers c
LEFT JOIN orders o ON c.customer_id = o.customer_id
GROUP BY c.customer_id, c.name;`
      }
    ],
    questions: [
      { question: "What is the difference between INNER JOIN and LEFT JOIN?", answer: "INNER JOIN returns only rows that have matching values in both tables. LEFT JOIN returns all rows from the left table and matching rows from the right table, with NULL values for non-matching right table columns." },
      { question: "When would you use a CROSS JOIN?", answer: "CROSS JOIN is used when you need the Cartesian product of two tables. Common use cases: generating all possible combinations (like product variants), creating test data, or mathematical operations requiring all pair combinations. Use carefully as it can produce very large result sets." },
      { question: "How does a SELF JOIN work and when is it useful?", answer: "SELF JOIN joins a table with itself using table aliases. Useful for: finding hierarchical relationships (employees and managers), comparing rows within the same table, finding duplicates, or identifying relationships between records in the same table." },
      { question: "What is the performance difference between different JOIN types?", answer: "INNER JOINs are typically fastest as they can stop processing when no match is found. LEFT/RIGHT JOINs are slower as they must process all rows from one table. FULL OUTER JOINs are slowest. Performance also depends on indexes, data distribution, and query optimizer." },
      { question: "How do you optimize JOIN performance?", answer: "Optimization strategies: create indexes on JOIN columns, use appropriate JOIN type for your needs, filter data early with WHERE clauses, avoid JOINing large tables without proper indexes, consider denormalization for frequently joined tables, and analyze execution plans." }
    ]
  },
  {
    id: 'group-by-having',
    title: 'GROUP BY and HAVING',
    explanation: `GROUP BY groups rows with the same values in specified columns into summary rows, often used with aggregate functions. HAVING filters groups after grouping occurs, while WHERE filters individual rows before grouping. Understanding the order of operations is crucial for correct query results.`,
    keyPoints: [
      'GROUP BY creates groups of rows with same column values',
      'Used with aggregate functions (COUNT, SUM, AVG, MIN, MAX)',
      'HAVING filters groups after GROUP BY is applied',
      'WHERE filters rows before GROUP BY is applied',
      'All non-aggregate columns in SELECT must be in GROUP BY',
      'Execution order: WHERE → GROUP BY → HAVING → ORDER BY'
    ],
    codeExamples: [
      {
        title: 'GROUP BY and HAVING Examples',
        language: 'sql',
        code: `-- Basic GROUP BY with aggregate functions
SELECT department, COUNT(*) as employee_count, AVG(salary) as avg_salary
FROM employees
GROUP BY department;

-- GROUP BY with multiple columns
SELECT department, job_title, COUNT(*) as count, MAX(salary) as max_salary
FROM employees
GROUP BY department, job_title;

-- HAVING clause to filter groups
SELECT department, COUNT(*) as employee_count
FROM employees
GROUP BY department
HAVING COUNT(*) > 5; -- Only departments with more than 5 employees

-- WHERE vs HAVING
SELECT department, AVG(salary) as avg_salary
FROM employees
WHERE hire_date >= '2020-01-01' -- Filter rows before grouping
GROUP BY department
HAVING AVG(salary) > 50000; -- Filter groups after grouping

-- Complex GROUP BY with calculations
SELECT 
    YEAR(order_date) as order_year,
    MONTH(order_date) as order_month,
    COUNT(*) as total_orders,
    SUM(amount) as total_revenue,
    AVG(amount) as avg_order_value,
    MIN(amount) as min_order,
    MAX(amount) as max_order
FROM orders
WHERE order_date >= '2023-01-01'
GROUP BY YEAR(order_date), MONTH(order_date)
HAVING SUM(amount) > 10000
ORDER BY order_year, order_month;

-- GROUP BY with JOINs
SELECT 
    c.city,
    COUNT(DISTINCT c.customer_id) as customer_count,
    COUNT(o.order_id) as total_orders,
    SUM(o.amount) as total_revenue
FROM customers c
LEFT JOIN orders o ON c.customer_id = o.customer_id
GROUP BY c.city
HAVING COUNT(o.order_id) > 0;

-- ROLLUP for subtotals (SQL Server, Oracle, PostgreSQL)
SELECT 
    department,
    job_title,
    COUNT(*) as employee_count,
    SUM(salary) as total_salary
FROM employees
GROUP BY ROLLUP(department, job_title);

-- CUBE for all combinations (SQL Server, Oracle)
SELECT 
    department,
    job_title,
    COUNT(*) as employee_count
FROM employees
GROUP BY CUBE(department, job_title);

-- GROUPING SETS for specific combinations
SELECT 
    department,
    job_title,
    COUNT(*) as employee_count
FROM employees
GROUP BY GROUPING SETS (
    (department),
    (job_title),
    (department, job_title),
    ()
);`
      }
    ],
    questions: [
      { question: "What is the difference between WHERE and HAVING clauses?", answer: "WHERE filters individual rows before grouping occurs and cannot use aggregate functions. HAVING filters groups after GROUP BY is applied and can use aggregate functions. WHERE is processed before GROUP BY, HAVING is processed after." },
      { question: "Why must all non-aggregate columns in SELECT be in GROUP BY?", answer: "This ensures deterministic results. Without this rule, the database wouldn't know which value to return for non-aggregate columns when multiple rows are grouped together. It maintains data integrity and prevents ambiguous results." },
      { question: "What is the execution order of SQL clauses?", answer: "Logical execution order: FROM → WHERE → GROUP BY → HAVING → SELECT → ORDER BY → LIMIT. This order determines how data is processed and which clauses can reference results from previous steps." },
      { question: "How do ROLLUP, CUBE, and GROUPING SETS work?", answer: "ROLLUP creates hierarchical subtotals (useful for reports). CUBE creates subtotals for all possible combinations of grouping columns. GROUPING SETS allows you to specify exactly which grouping combinations you want, providing more control than ROLLUP or CUBE." },
      { question: "How can you optimize GROUP BY performance?", answer: "Optimization strategies: create indexes on GROUP BY columns, use covering indexes when possible, filter data early with WHERE clauses, avoid grouping by expressions (use computed columns instead), and consider partitioning for very large tables." }
    ]
  },
  {
    id: 'window-functions',
    title: 'Window Functions (ROW_NUMBER, RANK, DENSE_RANK, LEAD, LAG)',
    explanation: `Window functions perform calculations across a set of table rows related to the current row, without collapsing the result set like GROUP BY. They provide powerful analytical capabilities for ranking, running totals, comparisons with previous/next rows, and statistical analysis.`,
    keyPoints: [
      'Operates on a window of rows related to current row',
      'Does not collapse rows like GROUP BY does',
      'OVER clause defines the window specification',
      'PARTITION BY divides result set into partitions',
      'ORDER BY defines ordering within partitions',
      'Frame specification controls which rows are included'
    ],
    codeExamples: [
      {
        title: 'Window Functions Examples',
        language: 'sql',
        code: `-- ROW_NUMBER - Assigns unique sequential numbers
SELECT 
    employee_id,
    name,
    department,
    salary,
    ROW_NUMBER() OVER (ORDER BY salary DESC) as overall_rank,
    ROW_NUMBER() OVER (PARTITION BY department ORDER BY salary DESC) as dept_rank
FROM employees;

-- RANK and DENSE_RANK - Handle ties differently
SELECT 
    employee_id,
    name,
    salary,
    RANK() OVER (ORDER BY salary DESC) as rank_with_gaps,
    DENSE_RANK() OVER (ORDER BY salary DESC) as rank_no_gaps
FROM employees;

-- LEAD and LAG - Access next/previous rows
SELECT 
    order_date,
    amount,
    LAG(amount) OVER (ORDER BY order_date) as previous_amount,
    LEAD(amount) OVER (ORDER BY order_date) as next_amount,
    amount - LAG(amount) OVER (ORDER BY order_date) as change_from_previous
FROM orders
ORDER BY order_date;

-- Running totals and moving averages
SELECT 
    order_date,
    amount,
    SUM(amount) OVER (ORDER BY order_date ROWS UNBOUNDED PRECEDING) as running_total,
    AVG(amount) OVER (ORDER BY order_date ROWS 2 PRECEDING) as moving_avg_3days
FROM orders
ORDER BY order_date;

-- NTILE - Divide into buckets
SELECT 
    employee_id,
    name,
    salary,
    NTILE(4) OVER (ORDER BY salary) as salary_quartile
FROM employees;

-- FIRST_VALUE and LAST_VALUE
SELECT 
    employee_id,
    name,
    department,
    salary,
    FIRST_VALUE(salary) OVER (PARTITION BY department ORDER BY salary DESC) as highest_in_dept,
    LAST_VALUE(salary) OVER (PARTITION BY department ORDER BY salary DESC 
                            ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING) as lowest_in_dept
FROM employees;

-- Percentage calculations
SELECT 
    product_id,
    sales_amount,
    sales_amount / SUM(sales_amount) OVER () * 100 as pct_of_total,
    PERCENT_RANK() OVER (ORDER BY sales_amount) as percentile_rank,
    CUME_DIST() OVER (ORDER BY sales_amount) as cumulative_distribution
FROM product_sales;

-- Complex window with frame specification
SELECT 
    order_date,
    daily_sales,
    AVG(daily_sales) OVER (
        ORDER BY order_date 
        ROWS BETWEEN 3 PRECEDING AND 3 FOLLOWING
    ) as seven_day_avg,
    SUM(daily_sales) OVER (
        ORDER BY order_date 
        RANGE BETWEEN INTERVAL '7' DAY PRECEDING AND CURRENT ROW
    ) as weekly_total
FROM daily_sales_summary;`
      }
    ],
    questions: [
      { question: "What is the difference between RANK() and DENSE_RANK()?", answer: "RANK() leaves gaps in ranking when there are ties (1,2,2,4), while DENSE_RANK() doesn't leave gaps (1,2,2,3). RANK() shows how many rows have better values, DENSE_RANK() shows how many distinct better values exist." },
      { question: "How do LEAD() and LAG() functions work?", answer: "LAG() accesses data from previous rows, LEAD() accesses data from following rows. Both take optional offset (default 1) and default value parameters. Useful for comparing current row with adjacent rows or calculating period-over-period changes." },
      { question: "What is the difference between ROWS and RANGE in window frames?", answer: "ROWS counts physical rows (ROWS BETWEEN 1 PRECEDING AND 1 FOLLOWING = 3 rows). RANGE considers logical ranges based on values (RANGE BETWEEN 1 PRECEDING AND 1 FOLLOWING includes all rows within value range). RANGE is useful for time-based windows." },
      { question: "How do window functions differ from GROUP BY?", answer: "Window functions don't collapse rows - they add calculated columns to existing rows. GROUP BY reduces rows to one per group. Window functions can access individual row data while performing aggregate calculations across related rows." },
      { question: "When should you use PARTITION BY in window functions?", answer: "Use PARTITION BY to reset the window calculation for each group. For example, ranking employees within each department, calculating running totals per customer, or finding top N products per category. It's like GROUP BY but without collapsing rows." }
    ]
  },
  {
    id: 'sql-advanced-queries',
    title: 'Advanced SQL Queries (CTE, Subqueries, UNION)',
    explanation: `Advanced SQL features like Common Table Expressions (CTEs), subqueries, and UNION operations enable complex data manipulation and analysis. These tools help break down complex problems into manageable parts and combine results from multiple queries effectively.`,
    keyPoints: [
      'CTEs provide temporary named result sets for complex queries',
      'Subqueries can be correlated or non-correlated',
      'EXISTS and NOT EXISTS for efficient existence checks',
      'UNION combines results, UNION ALL includes duplicates',
      'Recursive CTEs for hierarchical data processing',
      'Proper indexing crucial for subquery performance'
    ],
    codeExamples: [
      {
        title: 'Advanced SQL Query Examples',
        language: 'sql',
        code: `-- Common Table Expression (CTE)
WITH high_earners AS (
    SELECT employee_id, name, salary, department
    FROM employees
    WHERE salary > 75000
),
dept_stats AS (
    SELECT department, AVG(salary) as avg_salary, COUNT(*) as emp_count
    FROM high_earners
    GROUP BY department
)
SELECT he.name, he.salary, ds.avg_salary, ds.emp_count
FROM high_earners he
JOIN dept_stats ds ON he.department = ds.department;

-- Recursive CTE for hierarchical data
WITH employee_hierarchy AS (
    -- Anchor: Top-level managers
    SELECT employee_id, name, manager_id, 0 as level
    FROM employees
    WHERE manager_id IS NULL
    
    UNION ALL
    
    -- Recursive: Employees reporting to managers
    SELECT e.employee_id, e.name, e.manager_id, eh.level + 1
    FROM employees e
    JOIN employee_hierarchy eh ON e.manager_id = eh.employee_id
)
SELECT * FROM employee_hierarchy ORDER BY level, name;

-- Correlated Subquery
SELECT e1.name, e1.salary
FROM employees e1
WHERE e1.salary > (
    SELECT AVG(e2.salary)
    FROM employees e2
    WHERE e2.department = e1.department
);

-- EXISTS and NOT EXISTS
-- Customers who have placed orders
SELECT c.name
FROM customers c
WHERE EXISTS (
    SELECT 1 FROM orders o WHERE o.customer_id = c.customer_id
);

-- Customers who haven't placed orders
SELECT c.name
FROM customers c
WHERE NOT EXISTS (
    SELECT 1 FROM orders o WHERE o.customer_id = c.customer_id
);

-- UNION and UNION ALL
-- Combine current and archived orders
SELECT order_id, customer_id, order_date, 'current' as status
FROM orders
WHERE order_date >= '2024-01-01'

UNION ALL

SELECT order_id, customer_id, order_date, 'archived' as status
FROM archived_orders
WHERE order_date >= '2024-01-01';

-- Nth Highest Salary Query
-- Second highest salary using LIMIT/OFFSET
SELECT DISTINCT salary
FROM employees
ORDER BY salary DESC
LIMIT 1 OFFSET 1;

-- Nth highest using window functions
WITH ranked_salaries AS (
    SELECT salary, DENSE_RANK() OVER (ORDER BY salary DESC) as rank
    FROM employees
)
SELECT salary
FROM ranked_salaries
WHERE rank = 2;

-- Delete Duplicates Query
-- Using ROW_NUMBER to identify duplicates
WITH duplicate_rows AS (
    SELECT employee_id, 
           ROW_NUMBER() OVER (PARTITION BY email ORDER BY employee_id) as rn
    FROM employees
)
DELETE FROM employees
WHERE employee_id IN (
    SELECT employee_id FROM duplicate_rows WHERE rn > 1
);

-- Complex analytical query
WITH monthly_sales AS (
    SELECT 
        DATE_TRUNC('month', order_date) as month,
        SUM(amount) as total_sales
    FROM orders
    GROUP BY DATE_TRUNC('month', order_date)
),
sales_with_growth AS (
    SELECT 
        month,
        total_sales,
        LAG(total_sales) OVER (ORDER BY month) as prev_month_sales,
        (total_sales - LAG(total_sales) OVER (ORDER BY month)) / 
        LAG(total_sales) OVER (ORDER BY month) * 100 as growth_rate
    FROM monthly_sales
)
SELECT 
    month,
    total_sales,
    growth_rate,
    CASE 
        WHEN growth_rate > 10 THEN 'High Growth'
        WHEN growth_rate > 0 THEN 'Positive Growth'
        WHEN growth_rate < -10 THEN 'Declining'
        ELSE 'Stable'
    END as growth_category
FROM sales_with_growth
ORDER BY month;`
      }
    ],
    questions: [
      { question: "What are the advantages of using CTEs over subqueries?", answer: "CTEs provide better readability, can be referenced multiple times in the same query, support recursion, make complex queries easier to debug and maintain, and can improve query performance by avoiding repeated subquery execution." },
      { question: "What is the difference between correlated and non-correlated subqueries?", answer: "Non-correlated subqueries execute once and return the same result for all outer query rows. Correlated subqueries execute once for each outer query row, referencing outer query columns. Correlated subqueries are typically slower but more flexible." },
      { question: "When should you use EXISTS vs IN with subqueries?", answer: "Use EXISTS when checking for existence regardless of values, especially with NULLs (EXISTS handles NULLs correctly). Use IN when comparing specific values and you're sure there are no NULLs. EXISTS often performs better with large datasets." },
      { question: "What is the difference between UNION and UNION ALL?", answer: "UNION removes duplicate rows and sorts the result (slower). UNION ALL includes all rows including duplicates and doesn't sort (faster). Use UNION ALL when you know there are no duplicates or duplicates are acceptable." },
      { question: "How do you write efficient queries to find Nth highest values?", answer: "Methods include: LIMIT/OFFSET (simple but not standard SQL), window functions like DENSE_RANK() (handles ties well), or subqueries with COUNT. Window functions are generally most efficient and handle edge cases better." }
    ]
  },
  {
    id: 'nosql-databases',
    title: 'NoSQL Databases',
    explanation: `NoSQL databases provide flexible, scalable alternatives to traditional relational databases. They are designed to handle large volumes of unstructured or semi-structured data, offer horizontal scalability, and support various data models including document, key-value, column-family, and graph structures.`,
    keyPoints: [
      'Document Stores - Store data as documents (JSON, BSON)',
      'Key-Value Stores - Simple key-value pairs for fast access',
      'Column-Family - Wide column stores for analytical workloads',
      'Graph Databases - Nodes and relationships for connected data',
      'Horizontal scalability and distributed architecture',
      'Eventual consistency vs strong consistency trade-offs'
    ],
    codeExamples: [
      {
        title: 'NoSQL Database Examples',
        language: 'javascript',
        code: `// Document Database (MongoDB)
// Insert document
db.users.insertOne({
    _id: ObjectId(),
    name: "John Doe",
    email: "john@example.com",
    address: {
        street: "123 Main St",
        city: "New York",
        zipcode: "10001"
    },
    orders: [
        { orderId: 1, amount: 99.99, date: new Date() },
        { orderId: 2, amount: 149.99, date: new Date() }
    ]
});

// Query with nested fields
db.users.find({
    "address.city": "New York",
    "orders.amount": { $gt: 100 }
});

// Update nested arrays
db.users.updateOne(
    { email: "john@example.com" },
    { $push: { orders: { orderId: 3, amount: 75.50, date: new Date() } } }
);

// Key-Value Store (Redis)
// Basic operations
SET user:1001 "{'name':'John','email':'john@example.com'}"
GET user:1001
DEL user:1001

// Hash operations
HSET user:1001 name "John Doe" email "john@example.com" age 30
HGET user:1001 name
HGETALL user:1001

// List operations (for activity feeds)
LPUSH user:1001:activities "logged_in"
LPUSH user:1001:activities "viewed_product:123"
LRANGE user:1001:activities 0 9  // Get last 10 activities

// Set operations (for tags, followers)
SADD user:1001:tags "developer" "javascript" "nodejs"
SMEMBERS user:1001:tags
SINTER user:1001:tags user:1002:tags  // Common tags

// Column-Family (Cassandra CQL)
// Create keyspace and table
CREATE KEYSPACE ecommerce WITH replication = {
    'class': 'SimpleStrategy',
    'replication_factor': 3
};

CREATE TABLE user_activities (
    user_id UUID,
    activity_date DATE,
    activity_time TIMESTAMP,
    activity_type TEXT,
    details MAP<TEXT, TEXT>,
    PRIMARY KEY (user_id, activity_date, activity_time)
);

// Insert time-series data
INSERT INTO user_activities (user_id, activity_date, activity_time, activity_type, details)
VALUES (uuid(), '2024-01-15', now(), 'page_view', {'page': 'product', 'product_id': '123'});

// Query by partition key
SELECT * FROM user_activities 
WHERE user_id = ? AND activity_date = '2024-01-15';

// Graph Database (Neo4j Cypher)
// Create nodes and relationships
CREATE (u:User {name: 'John', email: 'john@example.com'})
CREATE (p:Product {name: 'Laptop', price: 999.99})
CREATE (c:Category {name: 'Electronics'})

// Create relationships
MATCH (u:User {name: 'John'}), (p:Product {name: 'Laptop'})
CREATE (u)-[:PURCHASED {date: '2024-01-15', amount: 999.99}]->(p)

MATCH (p:Product {name: 'Laptop'}), (c:Category {name: 'Electronics'})
CREATE (p)-[:BELONGS_TO]->(c)

// Complex graph queries
// Find products purchased by friends
MATCH (u:User {name: 'John'})-[:FRIEND]->(friend)-[:PURCHASED]->(product)
RETURN product.name, COUNT(*) as friend_purchases
ORDER BY friend_purchases DESC

// Recommendation based on similar users
MATCH (u:User {name: 'John'})-[:PURCHASED]->(p:Product)<-[:PURCHASED]-(similar:User)
MATCH (similar)-[:PURCHASED]->(recommendation:Product)
WHERE NOT (u)-[:PURCHASED]->(recommendation)
RETURN recommendation.name, COUNT(*) as similarity_score
ORDER BY similarity_score DESC LIMIT 5`
      }
    ],
    questions: [
      { question: "What are the main differences between SQL and NoSQL databases?", answer: "SQL databases use structured schemas, ACID transactions, and SQL queries. NoSQL databases offer flexible schemas, horizontal scalability, eventual consistency, and various data models. SQL is better for complex relationships, NoSQL for large-scale, distributed applications." },
      { question: "When should you choose a document database over a relational database?", answer: "Choose document databases when: data is naturally hierarchical or nested, schema changes frequently, you need horizontal scaling, working with JSON-like data, or when object-relational mapping overhead is significant. Examples: content management, catalogs, user profiles." },
      { question: "What are the advantages and disadvantages of key-value stores?", answer: "Advantages: extremely fast access, simple model, high scalability, low latency. Disadvantages: limited query capabilities, no complex relationships, no transactions across keys, difficult for complex data analysis. Best for caching, session storage, real-time recommendations." },
      { question: "How do column-family databases differ from traditional RDBMS?", answer: "Column-family databases store data in column families (like tables) but with flexible schemas per row. They excel at time-series data, analytics, and write-heavy workloads. Unlike RDBMS, they're optimized for horizontal scaling and can handle sparse data efficiently." },
      { question: "What types of problems are graph databases best suited for?", answer: "Graph databases excel at: social networks, recommendation engines, fraud detection, network analysis, knowledge graphs, and any scenario involving complex relationships. They perform traversals and relationship queries much faster than relational databases with multiple JOINs." }
    ]
  }
];