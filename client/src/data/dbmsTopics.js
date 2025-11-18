import { dbmsTopics2 } from './dbmsTopics2';
import { dbmsTopics3 } from './dbmsTopics3';

export const dbmsTopics = [
  {
    id: 'acid-properties',
    title: 'ACID Properties',
    explanation: `ACID properties are fundamental characteristics that guarantee reliable processing of database transactions. ACID stands for Atomicity, Consistency, Isolation, and Durability. These properties ensure that database transactions are processed reliably and maintain data integrity even in the presence of errors, power failures, or concurrent access.`,
    keyPoints: [
      'Atomicity - All operations in a transaction succeed or all fail',
      'Consistency - Database remains in valid state before and after transaction',
      'Isolation - Concurrent transactions do not interfere with each other',
      'Durability - Committed changes persist even after system failure',
      'Essential for maintaining data integrity in multi-user environments',
      'Trade-offs exist between ACID compliance and performance'
    ],
    codeExamples: [
      {
        title: 'ACID Properties Example',
        language: 'sql',
        code: `-- Atomicity Example: Bank Transfer
BEGIN TRANSACTION;
UPDATE accounts SET balance = balance - 100 WHERE account_id = 1;
UPDATE accounts SET balance = balance + 100 WHERE account_id = 2;
-- Either both updates succeed or both are rolled back
COMMIT;

-- Consistency Example: Check constraints
CREATE TABLE accounts (
    account_id INT PRIMARY KEY,
    balance DECIMAL(10,2) CHECK (balance >= 0)
);

-- Isolation Example: Transaction levels
SET TRANSACTION ISOLATION LEVEL READ COMMITTED;
BEGIN TRANSACTION;
SELECT balance FROM accounts WHERE account_id = 1;
-- Other transactions cannot modify this row until commit
UPDATE accounts SET balance = balance - 50 WHERE account_id = 1;
COMMIT;

-- Durability Example: Write-ahead logging
-- Changes are logged before being applied to ensure recovery`
      }
    ],
    questions: [
      { question: "What are ACID properties and why are they important?", answer: "ACID properties (Atomicity, Consistency, Isolation, Durability) ensure reliable database transactions. They're important for maintaining data integrity, preventing corruption, ensuring concurrent access safety, and guaranteeing that committed changes persist even after system failures." },
      { question: "Explain Atomicity with a real-world example.", answer: "Atomicity ensures all operations in a transaction complete successfully or none do. Example: Bank transfer - debit from account A and credit to account B must both succeed or both fail. If system crashes after debit but before credit, the transaction is rolled back completely." },
      { question: "How does Isolation prevent concurrent transaction issues?", answer: "Isolation ensures concurrent transactions don't interfere with each other through locking mechanisms and isolation levels (Read Uncommitted, Read Committed, Repeatable Read, Serializable). This prevents dirty reads, phantom reads, and non-repeatable reads." },
      { question: "What is the difference between Consistency and Durability?", answer: "Consistency ensures database remains in valid state (constraints satisfied) before and after transactions. Durability ensures committed changes persist permanently, even after system failures. Consistency is about data validity, durability is about data persistence." },
      { question: "How do NoSQL databases handle ACID properties?", answer: "Traditional NoSQL databases often sacrifice ACID for performance and scalability (BASE properties instead). However, modern NoSQL systems like MongoDB offer ACID transactions for single documents or multi-document operations, while distributed systems may provide eventual consistency." }
    ]
  },
  {
    id: 'cap-theorem',
    title: 'CAP Theorem',
    explanation: `CAP Theorem, also known as Brewer's theorem, states that in a distributed database system, you can only guarantee two out of three properties: Consistency (all nodes see the same data simultaneously), Availability (system remains operational), and Partition tolerance (system continues despite network failures). This theorem helps understand trade-offs in distributed system design.`,
    keyPoints: [
      'Consistency - All nodes see the same data at the same time',
      'Availability - System remains operational and responsive',
      'Partition Tolerance - System continues despite network failures',
      'Can only guarantee 2 out of 3 properties simultaneously',
      'Helps guide distributed system architecture decisions',
      'Different systems make different trade-offs based on requirements'
    ],
    codeExamples: [
      {
        title: 'CAP Theorem Trade-offs',
        language: 'javascript',
        code: `// CP System (Consistency + Partition Tolerance)
// Example: Traditional RDBMS with strong consistency
class CPDatabase {
    constructor() {
        this.nodes = [];
        this.data = new Map();
    }
    
    write(key, value) {
        // Wait for majority consensus before confirming write
        if (this.getMajorityNodes().length < Math.ceil(this.nodes.length / 2)) {
            throw new Error("Cannot achieve consistency - insufficient nodes");
        }
        // All nodes must agree before write is confirmed
        this.data.set(key, value);
        return "Write confirmed with strong consistency";
    }
}

// AP System (Availability + Partition Tolerance)
// Example: DNS, Web caches
class APDatabase {
    constructor() {
        this.nodes = [];
        this.localData = new Map();
    }
    
    write(key, value) {
        // Accept write immediately, sync later
        this.localData.set(key, value);
        this.asyncSync(key, value); // Eventually consistent
        return "Write accepted - will sync eventually";
    }
    
    read(key) {
        // Always return data, even if potentially stale
        return this.localData.get(key) || "default_value";
    }
}

// CA System (Consistency + Availability)
// Example: Single-node RDBMS
class CADatabase {
    constructor() {
        this.data = new Map();
        this.isPartitioned = false;
    }
    
    write(key, value) {
        if (this.isPartitioned) {
            throw new Error("System unavailable during partition");
        }
        this.data.set(key, value);
        return "Write successful";
    }
}`
      }
    ],
    questions: [
      { question: "What is CAP Theorem and what are its implications?", answer: "CAP Theorem states that distributed systems can only guarantee 2 of 3 properties: Consistency, Availability, and Partition tolerance. Implications include: must choose trade-offs based on requirements, perfect distributed systems don't exist, and different architectures suit different use cases." },
      { question: "Give examples of systems that choose CP, AP, and CA.", answer: "CP (Consistency + Partition tolerance): MongoDB, Redis Cluster, HBase. AP (Availability + Partition tolerance): Cassandra, DynamoDB, DNS. CA (Consistency + Availability): Traditional RDBMS in single-node setup, but CA is rare in truly distributed systems." },
      { question: "Why is CA (Consistency + Availability) rare in distributed systems?", answer: "Network partitions are inevitable in distributed systems. A truly distributed system must handle partition tolerance. CA systems typically exist only in single-node setups or systems that become unavailable during network partitions." },
      { question: "How does eventual consistency relate to CAP Theorem?", answer: "Eventual consistency is a strategy used by AP systems that sacrifice immediate consistency for availability and partition tolerance. Data will become consistent across all nodes eventually, but not immediately. This allows systems to remain available during partitions." },
      { question: "Can you violate CAP Theorem with modern technologies?", answer: "No, CAP Theorem is a mathematical proof that cannot be violated. However, modern systems use techniques like: tunable consistency levels, hybrid approaches for different data types, and improved partition detection to minimize the impact of trade-offs." }
    ]
  },
  {
    id: 'normalization',
    title: 'Normalization (1NF, 2NF, 3NF, BCNF)',
    explanation: `Database normalization is the process of organizing data to reduce redundancy and improve data integrity. It involves decomposing tables into smaller, related tables and defining relationships between them. The main normal forms are 1NF (atomic values), 2NF (no partial dependencies), 3NF (no transitive dependencies), and BCNF (Boyce-Codd Normal Form for stronger 3NF).`,
    keyPoints: [
      '1NF - Atomic values, no repeating groups, unique rows',
      '2NF - 1NF + no partial functional dependencies',
      '3NF - 2NF + no transitive functional dependencies',
      'BCNF - 3NF + every determinant is a candidate key',
      'Reduces data redundancy and update anomalies',
      'Improves data integrity and consistency'
    ],
    codeExamples: [
      {
        title: 'Normalization Process Example',
        language: 'sql',
        code: `-- Unnormalized Table (0NF)
CREATE TABLE student_courses_unnormalized (
    student_id INT,
    student_name VARCHAR(50),
    courses VARCHAR(200), -- "Math,Physics,Chemistry"
    instructor_names VARCHAR(200) -- "Dr.Smith,Dr.Jones,Dr.Brown"
);

-- First Normal Form (1NF) - Atomic values
CREATE TABLE student_courses_1nf (
    student_id INT,
    student_name VARCHAR(50),
    course_name VARCHAR(50),
    instructor_name VARCHAR(50)
);

-- Second Normal Form (2NF) - Remove partial dependencies
CREATE TABLE students (
    student_id INT PRIMARY KEY,
    student_name VARCHAR(50)
);

CREATE TABLE courses (
    course_id INT PRIMARY KEY,
    course_name VARCHAR(50),
    instructor_name VARCHAR(50)
);

CREATE TABLE enrollments (
    student_id INT,
    course_id INT,
    PRIMARY KEY (student_id, course_id),
    FOREIGN KEY (student_id) REFERENCES students(student_id),
    FOREIGN KEY (course_id) REFERENCES courses(course_id)
);

-- Third Normal Form (3NF) - Remove transitive dependencies
CREATE TABLE instructors (
    instructor_id INT PRIMARY KEY,
    instructor_name VARCHAR(50),
    department VARCHAR(50)
);

CREATE TABLE courses_3nf (
    course_id INT PRIMARY KEY,
    course_name VARCHAR(50),
    instructor_id INT,
    FOREIGN KEY (instructor_id) REFERENCES instructors(instructor_id)
);

-- BCNF Example - Every determinant is a candidate key
-- If a course can have multiple instructors and an instructor teaches specific sections
CREATE TABLE course_sections (
    course_id INT,
    section_id INT,
    instructor_id INT,
    time_slot VARCHAR(20),
    PRIMARY KEY (course_id, section_id),
    FOREIGN KEY (instructor_id) REFERENCES instructors(instructor_id)
);`
      }
    ],
    questions: [
      { question: "What is database normalization and why is it important?", answer: "Normalization is organizing data to reduce redundancy and improve integrity by decomposing tables into smaller, related tables. It's important because it eliminates data redundancy, prevents update anomalies, saves storage space, and ensures data consistency." },
      { question: "Explain the difference between 2NF and 3NF.", answer: "2NF eliminates partial functional dependencies (non-key attributes depend on part of composite key). 3NF eliminates transitive dependencies (non-key attributes depend on other non-key attributes). 3NF is stricter and requires 2NF compliance first." },
      { question: "What is BCNF and how does it differ from 3NF?", answer: "BCNF (Boyce-Codd Normal Form) is a stricter version of 3NF where every determinant must be a candidate key. While 3NF allows some determinants that aren't candidate keys, BCNF eliminates all such cases, providing stronger normalization." },
      { question: "What are the disadvantages of over-normalization?", answer: "Over-normalization can lead to: complex queries requiring multiple joins, reduced query performance, increased storage overhead for foreign keys, more complex application logic, and potential for referential integrity issues." },
      { question: "When might you choose to denormalize a database?", answer: "Denormalization might be chosen for: read-heavy applications where query performance is critical, data warehousing scenarios, when joins are too expensive, for caching frequently accessed data, or when dealing with historical/archival data that doesn't change." }
    ]
  },
  {
    id: 'denormalization',
    title: 'Denormalization',
    explanation: `Denormalization is the process of intentionally introducing redundancy into a normalized database to improve read performance. It involves combining tables or duplicating data to reduce the number of joins required for queries. While it can improve query performance, it comes at the cost of increased storage and potential data inconsistency risks.`,
    keyPoints: [
      'Intentional introduction of redundancy for performance',
      'Reduces complex joins and improves query speed',
      'Common in data warehouses and read-heavy applications',
      'Trade-off between storage space and query performance',
      'Requires careful maintenance to prevent inconsistencies',
      'Often used with materialized views and caching strategies'
    ],
    codeExamples: [
      {
        title: 'Denormalization Strategies',
        language: 'sql',
        code: `-- Normalized Tables
CREATE TABLE customers (
    customer_id INT PRIMARY KEY,
    customer_name VARCHAR(100),
    email VARCHAR(100)
);

CREATE TABLE orders (
    order_id INT PRIMARY KEY,
    customer_id INT,
    order_date DATE,
    total_amount DECIMAL(10,2),
    FOREIGN KEY (customer_id) REFERENCES customers(customer_id)
);

CREATE TABLE order_items (
    item_id INT PRIMARY KEY,
    order_id INT,
    product_name VARCHAR(100),
    quantity INT,
    price DECIMAL(10,2),
    FOREIGN KEY (order_id) REFERENCES orders(order_id)
);

-- Denormalized Table for Reporting
CREATE TABLE order_summary_denormalized (
    order_id INT,
    customer_id INT,
    customer_name VARCHAR(100), -- Redundant from customers table
    customer_email VARCHAR(100), -- Redundant from customers table
    order_date DATE,
    total_amount DECIMAL(10,2),
    item_count INT, -- Calculated field
    product_names TEXT, -- Concatenated product names
    INDEX idx_customer_date (customer_id, order_date),
    INDEX idx_order_date (order_date)
);

-- Materialized View for Complex Aggregations
CREATE MATERIALIZED VIEW monthly_sales_summary AS
SELECT 
    DATE_FORMAT(order_date, '%Y-%m') as month,
    COUNT(*) as total_orders,
    SUM(total_amount) as total_revenue,
    AVG(total_amount) as avg_order_value,
    COUNT(DISTINCT customer_id) as unique_customers
FROM orders 
GROUP BY DATE_FORMAT(order_date, '%Y-%m');

-- Trigger to maintain denormalized data
DELIMITER //
CREATE TRIGGER update_order_summary 
AFTER INSERT ON orders
FOR EACH ROW
BEGIN
    INSERT INTO order_summary_denormalized 
    SELECT 
        o.order_id,
        o.customer_id,
        c.customer_name,
        c.email,
        o.order_date,
        o.total_amount,
        COUNT(oi.item_id),
        GROUP_CONCAT(oi.product_name)
    FROM orders o
    JOIN customers c ON o.customer_id = c.customer_id
    LEFT JOIN order_items oi ON o.order_id = oi.order_id
    WHERE o.order_id = NEW.order_id
    GROUP BY o.order_id;
END//
DELIMITER ;`
      }
    ],
    questions: [
      { question: "What is denormalization and when should it be used?", answer: "Denormalization is intentionally adding redundancy to improve query performance. Use it when: read performance is critical, complex joins are too slow, in data warehouses, for frequently accessed reports, or when storage cost is less important than query speed." },
      { question: "What are the risks and challenges of denormalization?", answer: "Risks include: data inconsistency from redundant data, increased storage requirements, complex update operations, potential for data anomalies, maintenance overhead for keeping redundant data synchronized, and increased application complexity." },
      { question: "How do you maintain data consistency in denormalized databases?", answer: "Maintain consistency through: database triggers for automatic updates, application-level synchronization logic, batch processes for periodic updates, materialized views with refresh schedules, event-driven updates, and careful transaction management." },
      { question: "What is the difference between denormalization and materialized views?", answer: "Denormalization physically stores redundant data in tables. Materialized views store query results that can be refreshed periodically. Materialized views are easier to maintain and can be dropped/recreated, while denormalized tables require more careful synchronization." },
      { question: "How do you decide between normalization and denormalization?", answer: "Consider: read vs write ratio (high reads favor denormalization), query complexity and performance requirements, storage costs, data consistency requirements, maintenance complexity, and team expertise. Often use hybrid approaches with selective denormalization." }
    ]
  },
  {
    id: 'database-keys',
    title: 'Primary Key vs Foreign Key vs Candidate Key',
    explanation: `Database keys are attributes or combinations of attributes that uniquely identify records and establish relationships between tables. Primary keys uniquely identify each row in a table, foreign keys establish relationships between tables, and candidate keys are potential primary keys. Understanding these keys is fundamental to proper database design and referential integrity.`,
    keyPoints: [
      'Primary Key - Uniquely identifies each row, cannot be null',
      'Foreign Key - References primary key of another table',
      'Candidate Key - Any attribute that could serve as primary key',
      'Composite Key - Primary key made of multiple attributes',
      'Super Key - Set of attributes that uniquely identifies rows',
      'Keys ensure data integrity and establish relationships'
    ],
    codeExamples: [
      {
        title: 'Database Keys Examples',
        language: 'sql',
        code: `-- Primary Key Examples
CREATE TABLE employees (
    employee_id INT AUTO_INCREMENT PRIMARY KEY, -- Simple primary key
    email VARCHAR(100) UNIQUE NOT NULL, -- Candidate key
    ssn VARCHAR(11) UNIQUE NOT NULL, -- Another candidate key
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    department_id INT
);

-- Composite Primary Key
CREATE TABLE order_items (
    order_id INT,
    product_id INT,
    quantity INT NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    PRIMARY KEY (order_id, product_id), -- Composite primary key
    FOREIGN KEY (order_id) REFERENCES orders(order_id),
    FOREIGN KEY (product_id) REFERENCES products(product_id)
);

-- Foreign Key with Constraints
CREATE TABLE orders (
    order_id INT AUTO_INCREMENT PRIMARY KEY,
    customer_id INT NOT NULL,
    employee_id INT,
    order_date DATE NOT NULL,
    FOREIGN KEY (customer_id) REFERENCES customers(customer_id)
        ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (employee_id) REFERENCES employees(employee_id)
        ON DELETE SET NULL ON UPDATE CASCADE
);

-- Super Key and Candidate Key Examples
CREATE TABLE students (
    student_id INT PRIMARY KEY, -- Chosen primary key
    email VARCHAR(100) UNIQUE, -- Candidate key
    ssn VARCHAR(11) UNIQUE, -- Candidate key
    student_number VARCHAR(20) UNIQUE, -- Candidate key
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    -- Super keys: {student_id}, {email}, {ssn}, {student_number}
    -- Super keys: {student_id, first_name}, {email, last_name}, etc.
    INDEX idx_name (last_name, first_name)
);

-- Referential Integrity Examples
ALTER TABLE employees 
ADD CONSTRAINT fk_emp_dept 
FOREIGN KEY (department_id) REFERENCES departments(department_id)
ON DELETE RESTRICT ON UPDATE CASCADE;

-- Check constraint for additional integrity
ALTER TABLE employees 
ADD CONSTRAINT chk_email_format 
CHECK (email REGEXP '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}$');`
      }
    ],
    questions: [
      { question: "What is the difference between primary key and candidate key?", answer: "A candidate key is any attribute or combination that can uniquely identify rows in a table. A primary key is the chosen candidate key that will actually be used to uniquely identify rows. A table can have multiple candidate keys but only one primary key." },
      { question: "Can a table have multiple foreign keys? Give an example.", answer: "Yes, a table can have multiple foreign keys referencing different tables. Example: An 'orders' table might have foreign keys for customer_id (referencing customers table), employee_id (referencing employees table), and shipping_address_id (referencing addresses table)." },
      { question: "What are the rules for primary keys?", answer: "Primary key rules: must be unique for each row, cannot contain NULL values, should be stable (not change frequently), preferably simple (single column when possible), and should be meaningless (not contain business logic that might change)." },
      { question: "Explain ON DELETE CASCADE vs ON DELETE SET NULL.", answer: "ON DELETE CASCADE automatically deletes child records when parent is deleted (e.g., delete all order items when order is deleted). ON DELETE SET NULL sets foreign key to NULL when parent is deleted (e.g., set employee_id to NULL when employee is deleted but keep the order record)." },
      { question: "What is a surrogate key vs natural key?", answer: "Natural key uses existing data attributes (like SSN, email) that have business meaning. Surrogate key is artificially created (like auto-increment ID) with no business meaning. Surrogate keys are preferred for primary keys as they're stable and don't change with business rules." }
    ]
  },
  {
    id: 'er-diagrams',
    title: 'ER Diagrams',
    explanation: `Entity-Relationship (ER) diagrams are visual representations of database structure showing entities, attributes, and relationships between entities. They help in database design by providing a clear picture of data requirements and relationships before implementation. ER diagrams use specific symbols for entities (rectangles), attributes (ovals), and relationships (diamonds).`,
    keyPoints: [
      'Entities - Objects or concepts (rectangles)',
      'Attributes - Properties of entities (ovals)',
      'Relationships - Associations between entities (diamonds)',
      'Cardinality - One-to-one, one-to-many, many-to-many',
      'Primary keys underlined, foreign keys indicated',
      'Helps visualize database structure before implementation'
    ],
    codeExamples: [
      {
        title: 'ER Diagram to SQL Implementation',
        language: 'sql',
        code: `-- ER Diagram Translation to SQL
-- Entity: Customer
CREATE TABLE customers (
    customer_id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    phone VARCHAR(20),
    address TEXT,
    registration_date DATE DEFAULT CURRENT_DATE
);

-- Entity: Product
CREATE TABLE products (
    product_id INT AUTO_INCREMENT PRIMARY KEY,
    product_name VARCHAR(100) NOT NULL,
    description TEXT,
    price DECIMAL(10,2) NOT NULL,
    stock_quantity INT DEFAULT 0,
    category_id INT,
    created_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Entity: Category
CREATE TABLE categories (
    category_id INT AUTO_INCREMENT PRIMARY KEY,
    category_name VARCHAR(50) NOT NULL,
    description TEXT
);

-- Relationship: Customer PLACES Order (1:M)
CREATE TABLE orders (
    order_id INT AUTO_INCREMENT PRIMARY KEY,
    customer_id INT NOT NULL,
    order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    total_amount DECIMAL(10,2),
    status ENUM('pending', 'processing', 'shipped', 'delivered', 'cancelled'),
    FOREIGN KEY (customer_id) REFERENCES customers(customer_id)
);

-- Relationship: Order CONTAINS Product (M:N)
-- Resolved with junction table
CREATE TABLE order_items (
    order_id INT,
    product_id INT,
    quantity INT NOT NULL,
    unit_price DECIMAL(10,2) NOT NULL,
    PRIMARY KEY (order_id, product_id),
    FOREIGN KEY (order_id) REFERENCES orders(order_id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(product_id)
);

-- Relationship: Category HAS Products (1:M)
ALTER TABLE products 
ADD FOREIGN KEY (category_id) REFERENCES categories(category_id);

-- Weak Entity Example: Order Items depend on Orders
-- (Already implemented above with composite primary key)

-- Self-Referencing Relationship: Employee MANAGES Employee
CREATE TABLE employees (
    employee_id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    manager_id INT,
    department VARCHAR(50),
    hire_date DATE,
    FOREIGN KEY (manager_id) REFERENCES employees(employee_id)
);

-- Ternary Relationship Example: Supplier SUPPLIES Product TO Store
CREATE TABLE supplier_product_store (
    supplier_id INT,
    product_id INT,
    store_id INT,
    supply_date DATE,
    quantity INT,
    cost DECIMAL(10,2),
    PRIMARY KEY (supplier_id, product_id, store_id),
    FOREIGN KEY (supplier_id) REFERENCES suppliers(supplier_id),
    FOREIGN KEY (product_id) REFERENCES products(product_id),
    FOREIGN KEY (store_id) REFERENCES stores(store_id)
);`
      }
    ],
    questions: [
      { question: "What are the main components of an ER diagram?", answer: "Main components: Entities (rectangles) representing objects/concepts, Attributes (ovals) representing properties, Relationships (diamonds) representing associations, Primary keys (underlined attributes), and Cardinality indicators showing relationship types (1:1, 1:M, M:N)." },
      { question: "How do you represent different types of relationships in ER diagrams?", answer: "One-to-One (1:1): single line on both sides. One-to-Many (1:M): single line on 'one' side, crow's foot on 'many' side. Many-to-Many (M:N): crow's foot on both sides. Participation can be total (double line) or partial (single line)." },
      { question: "What is a weak entity and how is it represented?", answer: "A weak entity cannot exist without a strong entity and doesn't have a primary key of its own. Represented by double rectangle. Its primary key is formed by combining its partial key with the primary key of the strong entity it depends on." },
      { question: "How do you convert a many-to-many relationship to tables?", answer: "Create a junction/bridge table with foreign keys referencing the primary keys of both entities. The junction table's primary key is typically the combination of both foreign keys. Additional attributes of the relationship become columns in the junction table." },
      { question: "What is the difference between total and partial participation?", answer: "Total participation (double line): every entity instance must participate in the relationship. Partial participation (single line): entity instances may or may not participate. Example: Every employee must belong to a department (total) vs. employees may have dependents (partial)." }
    ]
  },
  {
    id: 'indexing',
    title: 'Indexing',
    explanation: `Database indexing is a data structure technique used to quickly locate and access data in a database. Indexes create shortcuts to data, similar to an index in a book. They significantly improve query performance by reducing the amount of data that needs to be examined, but come with trade-offs in storage space and write performance.`,
    keyPoints: [
      'Improves SELECT query performance dramatically',
      'Slows down INSERT, UPDATE, DELETE operations',
      'Requires additional storage space',
      'Automatically created for PRIMARY KEY and UNIQUE constraints',
      'Can be created on single or multiple columns',
      'Different types serve different query patterns'
    ],
    codeExamples: [
      {
        title: 'Index Creation and Usage',
        language: 'sql',
        code: `-- Create single column index
CREATE INDEX idx_employee_last_name ON employees(last_name);

-- Create composite index
CREATE INDEX idx_employee_dept_salary ON employees(department_id, salary);

-- Create unique index
CREATE UNIQUE INDEX idx_employee_email ON employees(email);

-- Partial index (PostgreSQL)
CREATE INDEX idx_active_employees ON employees(last_name) WHERE status = 'active';

-- Query that uses index
SELECT * FROM employees WHERE last_name = 'Smith';
-- Index scan instead of full table scan

-- Query using composite index
SELECT * FROM employees WHERE department_id = 5 AND salary > 50000;
-- Uses idx_employee_dept_salary efficiently

-- Drop index
DROP INDEX idx_employee_last_name;

-- Show execution plan
EXPLAIN SELECT * FROM employees WHERE last_name = 'Smith';`
      }
    ],
    questions: [
      { question: "What is database indexing and how does it improve performance?", answer: "Indexing creates data structures that provide fast access paths to table data. It improves performance by allowing the database to locate rows without scanning the entire table, similar to using a book's index to find specific topics quickly." },
      { question: "What are the disadvantages of having too many indexes?", answer: "Disadvantages include: increased storage space, slower INSERT/UPDATE/DELETE operations (indexes must be maintained), increased memory usage, and potential for the optimizer to choose suboptimal indexes." },
      { question: "When should you create an index?", answer: "Create indexes when: columns are frequently used in WHERE clauses, JOIN conditions, ORDER BY clauses, or as foreign keys. Avoid on small tables, columns with high update frequency, or columns with low selectivity." },
      { question: "What is index selectivity and why is it important?", answer: "Index selectivity is the ratio of distinct values to total rows. High selectivity (many unique values) makes indexes more effective. Low selectivity (few unique values like gender) makes indexes less useful and potentially wasteful." },
      { question: "How do composite indexes work?", answer: "Composite indexes span multiple columns and are most effective when queries filter on the leftmost columns first. The order matters - an index on (A,B,C) can efficiently handle queries on A, (A,B), or (A,B,C) but not on B or C alone." }
    ]
  },
  {
    id: 'index-types',
    title: 'Types of Indexes (Primary, Secondary, Clustering)',
    explanation: `Different types of indexes serve various purposes and have distinct characteristics. Primary indexes are automatically created for primary keys, secondary indexes are additional indexes on non-key columns, and clustering indexes determine the physical storage order of data. Understanding these types helps in choosing the right indexing strategy.`,
    keyPoints: [
      'Primary Index - Automatically created for primary key',
      'Secondary Index - Created on non-key columns for query optimization',
      'Clustered Index - Determines physical row storage order',
      'Non-clustered Index - Points to data rows, doesn\'t change storage order',
      'Unique Index - Ensures uniqueness and improves performance',
      'Covering Index - Contains all columns needed for a query'
    ],
    codeExamples: [
      {
        title: 'Different Index Types',
        language: 'sql',
        code: `-- Primary Index (automatically created)
CREATE TABLE employees (
    employee_id INT PRIMARY KEY, -- Primary index created automatically
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    department_id INT,
    salary DECIMAL(10,2)
);

-- Secondary Index
CREATE INDEX idx_department ON employees(department_id);
CREATE INDEX idx_salary ON employees(salary);

-- Clustered Index (SQL Server syntax)
CREATE CLUSTERED INDEX idx_employee_id ON employees(employee_id);

-- Non-clustered Index
CREATE NONCLUSTERED INDEX idx_last_name ON employees(last_name);

-- Unique Index
CREATE UNIQUE INDEX idx_employee_email ON employees(email);

-- Covering Index (includes additional columns)
CREATE INDEX idx_dept_covering ON employees(department_id) 
INCLUDE (first_name, last_name, salary);

-- Filtered Index (SQL Server)
CREATE INDEX idx_active_employees ON employees(last_name) 
WHERE status = 'Active';

-- Function-based Index (Oracle)
CREATE INDEX idx_upper_last_name ON employees(UPPER(last_name));

-- Partial Index (PostgreSQL)
CREATE INDEX idx_high_salary ON employees(salary) WHERE salary > 100000;`
      }
    ],
    questions: [
      { question: "What is the difference between clustered and non-clustered indexes?", answer: "Clustered index determines the physical storage order of data rows (only one per table). Non-clustered index is a separate structure that points to data rows without changing their physical order (multiple allowed per table)." },
      { question: "Can a table have multiple clustered indexes?", answer: "No, a table can have only one clustered index because it determines the physical storage order of rows. However, a table can have multiple non-clustered indexes." },
      { question: "What is a covering index and when is it useful?", answer: "A covering index includes all columns needed for a query, allowing the database to satisfy the query entirely from the index without accessing the table data. Useful for frequently executed queries with specific column requirements." },
      { question: "What happens when you don't have a clustered index?", answer: "Without a clustered index, the table is stored as a heap with no particular order. Data pages are not linked, making range scans less efficient. SQL Server creates a non-clustered index on the primary key instead." },
      { question: "When should you use filtered or partial indexes?", answer: "Use filtered/partial indexes when queries frequently filter on specific conditions (like status='Active'). They're smaller, faster to maintain, and more efficient for queries matching the filter condition." }
    ]
  },
  {
    id: 'btree-vs-bplus',
    title: 'B-Tree vs B+ Tree',
    explanation: `B-Trees and B+ Trees are balanced tree data structures used in database indexing. B-Trees store data in both internal and leaf nodes, while B+ Trees store data only in leaf nodes with internal nodes containing only keys. B+ Trees are more commonly used in databases due to better range query performance and sequential access.`,
    keyPoints: [
      'B-Tree stores data in all nodes (internal and leaf)',
      'B+ Tree stores data only in leaf nodes',
      'B+ Tree leaf nodes are linked for sequential access',
      'B+ Tree better for range queries and full scans',
      'B-Tree may require fewer disk accesses for single key lookup',
      'Both maintain balanced structure with logarithmic operations'
    ],
    codeExamples: [
      {
        title: 'B-Tree vs B+ Tree Structure',
        language: 'javascript',
        code: `// B-Tree Node Structure
class BTreeNode {
    constructor(isLeaf = false) {
        this.keys = [];        // Keys stored in node
        this.values = [];      // Data stored in ALL nodes
        this.children = [];    // Child pointers
        this.isLeaf = isLeaf;
    }
    
    search(key) {
        let i = 0;
        while (i < this.keys.length && key > this.keys[i]) {
            i++;
        }
        
        if (i < this.keys.length && key === this.keys[i]) {
            return this.values[i]; // Data found in internal node
        }
        
        if (this.isLeaf) {
            return null; // Not found
        }
        
        return this.children[i].search(key); // Recurse to child
    }
}

// B+ Tree Node Structure
class BPlusTreeNode {
    constructor(isLeaf = false) {
        this.keys = [];        // Keys for navigation
        this.children = [];    // Child pointers or data (leaf only)
        this.isLeaf = isLeaf;
        this.next = null;      // Link to next leaf (for range queries)
    }
    
    search(key) {
        if (this.isLeaf) {
            // Data only in leaf nodes
            let i = this.keys.indexOf(key);
            return i !== -1 ? this.children[i] : null;
        }
        
        // Internal node - find child to follow
        let i = 0;
        while (i < this.keys.length && key >= this.keys[i]) {
            i++;
        }
        return this.children[i].search(key);
    }
    
    rangeQuery(startKey, endKey) {
        if (!this.isLeaf) {
            // Navigate to leftmost leaf
            return this.children[0].rangeQuery(startKey, endKey);
        }
        
        let results = [];
        let current = this;
        
        while (current) {
            for (let i = 0; i < current.keys.length; i++) {
                if (current.keys[i] >= startKey && current.keys[i] <= endKey) {
                    results.push(current.children[i]);
                }
            }
            current = current.next; // Follow leaf links
        }
        return results;
    }
}`
      }
    ],
    questions: [
      { question: "What is the main difference between B-Tree and B+ Tree?", answer: "B-Tree stores data in both internal and leaf nodes, while B+ Tree stores data only in leaf nodes. B+ Tree internal nodes contain only keys for navigation, making them more compact and efficient for range queries." },
      { question: "Why are B+ Trees preferred for database indexes?", answer: "B+ Trees are preferred because: leaf nodes are linked enabling efficient range scans, internal nodes are smaller (more keys fit in memory), sequential access is faster, and all data access has consistent performance (always goes to leaf level)." },
      { question: "How do range queries differ between B-Tree and B+ Tree?", answer: "B+ Tree range queries are more efficient because leaf nodes are linked - you can traverse sequentially. B-Tree requires tree traversal for each key in the range, making it slower for range operations." },
      { question: "What are the advantages of B-Tree over B+ Tree?", answer: "B-Tree advantages: may require fewer disk accesses for single key lookups (data might be in internal nodes), slightly less storage overhead (no duplicate keys in leaves), and simpler deletion algorithms." },
      { question: "How does the linking of leaf nodes in B+ Tree help?", answer: "Linked leaf nodes enable efficient sequential access, range queries, and full index scans. You can traverse all data in sorted order without tree traversal, which is crucial for database operations like ORDER BY and range predicates." }
    ]
  },
  {
    id: 'hash-index',
    title: 'Hash Index',
    explanation: `Hash indexes use hash functions to map keys to bucket locations, providing O(1) average-case lookup time. They are excellent for equality searches but cannot support range queries or sorting. Hash indexes are ideal for exact match lookups and are commonly used in memory-based storage engines and for specific use cases.`,
    keyPoints: [
      'O(1) average-case lookup time for equality searches',
      'Cannot support range queries or ORDER BY operations',
      'Excellent for exact match WHERE clauses',
      'Hash collisions handled by chaining or open addressing',
      'Memory efficient for equality-based access patterns',
      'Not suitable for partial key matches or pattern matching'
    ],
    codeExamples: [
      {
        title: 'Hash Index Implementation',
        language: 'javascript',
        code: `// Hash Index Implementation
class HashIndex {
    constructor(bucketSize = 1000) {
        this.buckets = new Array(bucketSize);
        this.bucketSize = bucketSize;
        
        // Initialize buckets
        for (let i = 0; i < bucketSize; i++) {
            this.buckets[i] = [];
        }
    }
    
    // Simple hash function
    hash(key) {
        let hash = 0;
        for (let i = 0; i < key.length; i++) {
            hash = (hash * 31 + key.charCodeAt(i)) % this.bucketSize;
        }
        return Math.abs(hash);
    }
    
    // Insert key-value pair
    insert(key, value) {
        const bucketIndex = this.hash(key);
        const bucket = this.buckets[bucketIndex];
        
        // Check if key already exists
        for (let i = 0; i < bucket.length; i++) {
            if (bucket[i].key === key) {
                bucket[i].value = value; // Update existing
                return;
            }
        }
        
        // Add new entry
        bucket.push({ key, value });
    }
    
    // Search for key
    search(key) {
        const bucketIndex = this.hash(key);
        const bucket = this.buckets[bucketIndex];
        
        for (let i = 0; i < bucket.length; i++) {
            if (bucket[i].key === key) {
                return bucket[i].value;
            }
        }
        return null; // Not found
    }
    
    // Delete key
    delete(key) {
        const bucketIndex = this.hash(key);
        const bucket = this.buckets[bucketIndex];
        
        for (let i = 0; i < bucket.length; i++) {
            if (bucket[i].key === key) {
                bucket.splice(i, 1);
                return true;
            }
        }
        return false; // Not found
    }
    
    // Cannot support range queries efficiently
    rangeQuery(startKey, endKey) {
        throw new Error("Hash indexes do not support range queries");
    }
}

// SQL Examples
/*
-- Create hash index (MySQL with MEMORY engine)
CREATE TABLE user_sessions (
    session_id VARCHAR(32) PRIMARY KEY,
    user_id INT,
    created_at TIMESTAMP
) ENGINE=MEMORY;

-- Hash index automatically created on PRIMARY KEY
-- Excellent for: SELECT * FROM user_sessions WHERE session_id = 'abc123';
-- Cannot use for: SELECT * FROM user_sessions WHERE session_id LIKE 'abc%';
*/`
      }
    ],
    questions: [
      { question: "When should you use hash indexes over B-Tree indexes?", answer: "Use hash indexes for: exact equality lookups, high-frequency point queries, memory-based tables, and when you never need range queries or sorting. They provide O(1) lookup time vs O(log n) for B-Trees." },
      { question: "What are the limitations of hash indexes?", answer: "Limitations include: no support for range queries, cannot be used for ORDER BY, no partial key matching, no pattern matching (LIKE), and performance degrades with high collision rates." },
      { question: "How do hash collisions affect performance?", answer: "Hash collisions occur when different keys hash to the same bucket. They're handled by chaining (linked lists) or open addressing. High collision rates degrade performance from O(1) to O(n) in worst case." },
      { question: "Which storage engines support hash indexes?", answer: "MySQL MEMORY engine uses hash indexes by default. InnoDB uses adaptive hash indexes internally. PostgreSQL doesn't have explicit hash indexes but uses hash joins. Redis uses hash tables for key-value storage." },
      { question: "How do you choose a good hash function for indexes?", answer: "Good hash functions should: distribute keys uniformly across buckets, be fast to compute, minimize collisions, and be deterministic. Common choices include MD5, SHA-1, or simple polynomial rolling hashes for strings." }
    ]
  },
  {
    id: 'composite-index',
    title: 'Composite Index',
    explanation: `Composite indexes (also called compound or multi-column indexes) span multiple columns and can significantly improve query performance when filtering, sorting, or joining on multiple columns. The order of columns in a composite index is crucial and affects which queries can use the index efficiently.`,
    keyPoints: [
      'Spans multiple columns in a specific order',
      'Column order determines query optimization effectiveness',
      'Follows leftmost prefix rule for query matching',
      'Can eliminate the need for separate single-column indexes',
      'Useful for queries with multiple WHERE conditions',
      'Can serve as covering index for specific queries'
    ],
    codeExamples: [
      {
        title: 'Composite Index Usage',
        language: 'sql',
        code: `-- Create composite index
CREATE INDEX idx_employee_dept_salary_name ON employees(department_id, salary, last_name);

-- Queries that can use the index efficiently (leftmost prefix rule)
-- Uses full index
SELECT * FROM employees 
WHERE department_id = 5 AND salary > 50000 AND last_name = 'Smith';

-- Uses index on (department_id, salary)
SELECT * FROM employees 
WHERE department_id = 5 AND salary > 50000;

-- Uses index on (department_id)
SELECT * FROM employees 
WHERE department_id = 5;

-- Cannot use index efficiently (skips leftmost column)
SELECT * FROM employees 
WHERE salary > 50000 AND last_name = 'Smith';

-- Cannot use index (starts with middle column)
SELECT * FROM employees 
WHERE salary > 50000;

-- Covering index example
CREATE INDEX idx_covering ON orders(customer_id, order_date) 
INCLUDE (total_amount, status);

-- This query uses only the index (no table access)
SELECT total_amount, status 
FROM orders 
WHERE customer_id = 123 AND order_date >= '2024-01-01';

-- Index for sorting
CREATE INDEX idx_sort ON products(category_id, price DESC, product_name);

-- Efficient sorting using index
SELECT * FROM products 
WHERE category_id = 1 
ORDER BY price DESC, product_name;

-- Multiple column uniqueness
CREATE UNIQUE INDEX idx_unique_enrollment 
ON enrollments(student_id, course_id, semester);`
      }
    ],
    questions: [
      { question: "What is the leftmost prefix rule in composite indexes?", answer: "The leftmost prefix rule states that a composite index can only be used efficiently if the query includes the leftmost column(s) of the index. An index on (A,B,C) can be used for queries on A, (A,B), or (A,B,C) but not for queries on B, C, or (B,C)." },
      { question: "How do you determine the optimal column order in a composite index?", answer: "Order columns by: 1) Equality conditions first, 2) Most selective columns first, 3) Range conditions last, 4) Consider query patterns and frequency. Generally: WHERE equality columns, then ORDER BY columns, then SELECT columns for covering." },
      { question: "When should you use composite indexes instead of multiple single-column indexes?", answer: "Use composite indexes when: queries frequently filter on multiple columns together, you need to enforce multi-column uniqueness, queries can benefit from covering indexes, or you want to reduce index maintenance overhead." },
      { question: "What is a covering index and how does it relate to composite indexes?", answer: "A covering index contains all columns needed for a query, allowing the database to satisfy the query entirely from the index. Composite indexes often serve as covering indexes by including frequently selected columns in addition to filter columns." },
      { question: "How do composite indexes affect INSERT/UPDATE/DELETE performance?", answer: "Composite indexes slow down write operations more than single-column indexes because: more columns must be maintained, larger index entries require more I/O, and complex key comparisons are needed. Balance read performance gains against write performance costs." }
    ]
  },
  {
    id: 'indexing-advantages-disadvantages',
    title: 'Advantages and Disadvantages of Indexing',
    explanation: `Database indexing provides significant performance benefits for read operations but comes with trade-offs in storage space, write performance, and maintenance overhead. Understanding these trade-offs is crucial for making informed decisions about when and how to implement indexes in database design.`,
    keyPoints: [
      'Advantages: Faster SELECT queries, improved JOIN performance, efficient sorting',
      'Disadvantages: Slower INSERT/UPDATE/DELETE, additional storage space, maintenance overhead',
      'Trade-off between read and write performance',
      'Index maintenance requires CPU and I/O resources',
      'Over-indexing can hurt overall database performance',
      'Proper index strategy requires understanding query patterns'
    ],
    codeExamples: [
      {
        title: 'Index Performance Impact',
        language: 'sql',
        code: `-- Performance comparison examples

-- Without index: Full table scan
SELECT * FROM employees WHERE last_name = 'Smith';
-- Execution: Scans all 1M rows, takes 2000ms

-- With index: Index seek
CREATE INDEX idx_last_name ON employees(last_name);
SELECT * FROM employees WHERE last_name = 'Smith';
-- Execution: Index seek, returns in 5ms

-- INSERT performance impact
-- Without indexes
INSERT INTO employees (first_name, last_name, email, department_id) 
VALUES ('John', 'Doe', 'john.doe@email.com', 5);
-- Fast: Only table write required

-- With multiple indexes
CREATE INDEX idx_last_name ON employees(last_name);
CREATE INDEX idx_email ON employees(email);
CREATE INDEX idx_department ON employees(department_id);

INSERT INTO employees (first_name, last_name, email, department_id) 
VALUES ('John', 'Doe', 'john.doe@email.com', 5);
-- Slower: Must update table + 3 indexes

-- Storage overhead example
SELECT 
    table_name,
    ROUND(((data_length + index_length) / 1024 / 1024), 2) AS 'Total MB',
    ROUND((data_length / 1024 / 1024), 2) AS 'Data MB',
    ROUND((index_length / 1024 / 1024), 2) AS 'Index MB',
    ROUND((index_length / data_length) * 100, 2) AS 'Index %'
FROM information_schema.tables 
WHERE table_schema = 'your_database';

-- Index usage analysis
SHOW INDEX FROM employees;

-- Find unused indexes (MySQL)
SELECT 
    s.table_schema,
    s.table_name,
    s.index_name,
    s.cardinality
FROM information_schema.statistics s
LEFT JOIN performance_schema.table_io_waits_summary_by_index_usage t
    ON s.table_schema = t.object_schema 
    AND s.table_name = t.object_name 
    AND s.index_name = t.index_name
WHERE t.index_name IS NULL 
    AND s.table_schema NOT IN ('mysql', 'performance_schema', 'information_schema');`
      }
    ],
    questions: [
      { question: "What are the main advantages of database indexing?", answer: "Advantages include: dramatically faster SELECT queries (especially with WHERE clauses), improved JOIN performance, efficient ORDER BY operations, faster GROUP BY and DISTINCT operations, and better performance for foreign key constraints." },
      { question: "What are the main disadvantages of indexing?", answer: "Disadvantages include: slower INSERT/UPDATE/DELETE operations, additional storage space (often 10-20% of table size), increased memory usage, maintenance overhead during bulk operations, and potential for unused indexes to waste resources." },
      { question: "How do you determine if an index is worth creating?", answer: "Consider: query frequency and performance impact, read vs write ratio, selectivity of indexed columns, available storage space, and maintenance costs. Use query execution plans and performance monitoring to measure actual impact." },
      { question: "What is over-indexing and how do you avoid it?", answer: "Over-indexing occurs when too many indexes exist, hurting write performance without providing read benefits. Avoid by: monitoring index usage, removing unused indexes, combining related indexes into composite indexes, and regularly reviewing index effectiveness." },
      { question: "How do indexes affect database maintenance operations?", answer: "Indexes slow down: bulk INSERT operations, UPDATE statements affecting indexed columns, DELETE operations, and table rebuilds. They also increase backup size and time. Consider dropping indexes before bulk operations and recreating them afterward." }
    ]
  },
  {
    id: 'transactions-concurrency',
    title: 'Transactions & Concurrency',
    explanation: `Database transactions ensure data integrity through ACID properties, while concurrency control manages simultaneous access by multiple users. Understanding transaction lifecycle, isolation levels, and concurrency problems is essential for building reliable database applications that maintain consistency under concurrent access.`,
    keyPoints: [
      'Transactions ensure atomicity, consistency, isolation, and durability',
      'Concurrency control prevents data corruption from simultaneous access',
      'Isolation levels balance consistency with performance',
      'Locking mechanisms prevent conflicting operations',
      'Deadlocks can occur when transactions wait for each other',
      'Optimistic vs pessimistic concurrency control strategies'
    ],
    codeExamples: [
      {
        title: 'Transaction and Concurrency Examples',
        language: 'sql',
        code: `-- Basic transaction
BEGIN TRANSACTION;
    UPDATE accounts SET balance = balance - 100 WHERE account_id = 1;
    UPDATE accounts SET balance = balance + 100 WHERE account_id = 2;
    -- Both succeed or both rollback
COMMIT;

-- Transaction with error handling
BEGIN TRANSACTION;
BEGIN TRY
    UPDATE inventory SET quantity = quantity - 5 WHERE product_id = 123;
    INSERT INTO orders (customer_id, product_id, quantity) VALUES (456, 123, 5);
    COMMIT TRANSACTION;
END TRY
BEGIN CATCH
    ROLLBACK TRANSACTION;
    THROW;
END CATCH;

-- Isolation level examples
-- Read Uncommitted (dirty reads possible)
SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED;
BEGIN TRANSACTION;
    SELECT balance FROM accounts WHERE account_id = 1; -- May see uncommitted changes
COMMIT;

-- Read Committed (default in most databases)
SET TRANSACTION ISOLATION LEVEL READ COMMITTED;
BEGIN TRANSACTION;
    SELECT balance FROM accounts WHERE account_id = 1; -- Only sees committed data
COMMIT;

-- Repeatable Read (prevents non-repeatable reads)
SET TRANSACTION ISOLATION LEVEL REPEATABLE READ;
BEGIN TRANSACTION;
    SELECT COUNT(*) FROM orders WHERE status = 'pending'; -- Same result if repeated
    -- ... other operations
    SELECT COUNT(*) FROM orders WHERE status = 'pending'; -- Same count guaranteed
COMMIT;

-- Serializable (highest isolation)
SET TRANSACTION ISOLATION LEVEL SERIALIZABLE;
BEGIN TRANSACTION;
    SELECT * FROM products WHERE category = 'electronics';
    -- No other transaction can modify electronics products
COMMIT;

-- Explicit locking
BEGIN TRANSACTION;
    SELECT balance FROM accounts WHERE account_id = 1 FOR UPDATE; -- Exclusive lock
    UPDATE accounts SET balance = balance - 100 WHERE account_id = 1;
COMMIT;

-- Deadlock example (Transaction 1)
BEGIN TRANSACTION;
    UPDATE accounts SET balance = balance - 50 WHERE account_id = 1; -- Locks account 1
    WAITFOR DELAY '00:00:05'; -- Simulate processing time
    UPDATE accounts SET balance = balance + 50 WHERE account_id = 2; -- Waits for account 2
COMMIT;

-- Deadlock example (Transaction 2 - run simultaneously)
BEGIN TRANSACTION;
    UPDATE accounts SET balance = balance - 30 WHERE account_id = 2; -- Locks account 2
    WAITFOR DELAY '00:00:05'; -- Simulate processing time
    UPDATE accounts SET balance = balance + 30 WHERE account_id = 1; -- Waits for account 1
COMMIT;`
      }
    ],
    questions: [
      { question: "What is a database transaction and why is it important?", answer: "A transaction is a logical unit of work that must be executed completely or not at all. It's important because it ensures data integrity through ACID properties, maintains consistency during failures, and provides isolation between concurrent operations." },
      { question: "What are the different isolation levels and their trade-offs?", answer: "Read Uncommitted (fastest, allows dirty reads), Read Committed (prevents dirty reads), Repeatable Read (prevents non-repeatable reads), Serializable (prevents phantom reads, slowest). Higher isolation means better consistency but lower concurrency." },
      { question: "What is a deadlock and how can it be prevented?", answer: "A deadlock occurs when two or more transactions wait for each other indefinitely. Prevention strategies: consistent lock ordering, timeout mechanisms, deadlock detection and rollback, minimizing transaction duration, and using appropriate isolation levels." },
      { question: "What is the difference between optimistic and pessimistic locking?", answer: "Pessimistic locking prevents conflicts by locking resources immediately (assumes conflicts are likely). Optimistic locking allows concurrent access and checks for conflicts at commit time (assumes conflicts are rare). Choose based on contention levels." },
      { question: "How do you handle transaction failures and rollbacks?", answer: "Use try-catch blocks to handle errors, implement savepoints for partial rollbacks, log transaction details for debugging, design idempotent operations, and implement retry logic with exponential backoff for transient failures." }
    ]
  }
];

export const allDbmsTopics = [...dbmsTopics, ...dbmsTopics2, ...dbmsTopics3];