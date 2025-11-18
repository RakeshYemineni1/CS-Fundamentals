export const dbmsTopics2 = [
  {
    id: 'transaction-lifecycle',
    title: 'Transaction Lifecycle',
    explanation: `The transaction lifecycle describes the states a transaction goes through from initiation to completion. Understanding these states helps in managing transaction behavior, handling failures, and implementing proper error handling in database applications.`,
    keyPoints: [
      'Active - Transaction is executing operations',
      'Partially Committed - Transaction completed but not yet committed',
      'Committed - Transaction successfully completed and changes are permanent',
      'Failed - Transaction cannot proceed due to error',
      'Aborted - Transaction rolled back and database restored to previous state',
      'Terminated - Transaction has ended (either committed or aborted)'
    ],
    codeExamples: [
      {
        title: 'Transaction Lifecycle Management',
        language: 'sql',
        code: `-- Transaction lifecycle example
BEGIN TRANSACTION; -- Active state
    UPDATE accounts SET balance = balance - 100 WHERE id = 1;
    UPDATE accounts SET balance = balance + 100 WHERE id = 2;
    -- Partially committed state (operations done, not yet committed)
COMMIT; -- Committed state (permanent)

-- Transaction with rollback
BEGIN TRANSACTION; -- Active state
BEGIN TRY
    UPDATE inventory SET quantity = quantity - 5 WHERE product_id = 123;
    IF @@ROWCOUNT = 0
        THROW 50001, 'Product not found', 1; -- Failed state
    INSERT INTO orders (product_id, quantity) VALUES (123, 5);
    COMMIT; -- Committed state
END TRY
BEGIN CATCH
    ROLLBACK; -- Aborted state
    PRINT 'Transaction failed: ' + ERROR_MESSAGE();
END CATCH;
-- Terminated state

-- Savepoint example
BEGIN TRANSACTION;
    INSERT INTO customers (name) VALUES ('John Doe');
    SAVE TRANSACTION sp1; -- Savepoint
    
    INSERT INTO orders (customer_id) VALUES (SCOPE_IDENTITY());
    IF @@ERROR <> 0
        ROLLBACK TRANSACTION sp1; -- Partial rollback to savepoint
    ELSE
        COMMIT; -- Full commit`
      }
    ],
    questions: [
      { question: "What are the different states in a transaction lifecycle?", answer: "Active (executing), Partially Committed (operations complete but not committed), Committed (permanent changes), Failed (error occurred), Aborted (rolled back), and Terminated (ended). Transactions move through these states based on success or failure." },
      { question: "What happens during the partially committed state?", answer: "In partially committed state, all transaction operations have completed successfully, but changes haven't been made permanent yet. The system ensures durability by writing to logs before transitioning to committed state." },
      { question: "How do savepoints work in transaction management?", answer: "Savepoints allow partial rollbacks within a transaction. You can set named points and rollback to them if errors occur, without aborting the entire transaction. Useful for complex transactions with multiple logical steps." },
      { question: "What causes a transaction to enter the failed state?", answer: "Transactions enter failed state due to: constraint violations, deadlocks, system failures, explicit rollback commands, timeout expiration, or resource unavailability. Failed transactions must be aborted and rolled back." },
      { question: "How do you handle transaction failures in application code?", answer: "Use try-catch blocks to detect failures, implement proper rollback logic, log error details for debugging, retry transient failures with exponential backoff, and ensure cleanup of resources like connections and locks." }
    ]
  },
  {
    id: 'isolation-levels',
    title: 'Isolation Levels',
    explanation: `Isolation levels define the degree to which transactions are isolated from each other. They control what data a transaction can see when other transactions are running concurrently. Higher isolation levels provide better consistency but reduce concurrency and performance.`,
    keyPoints: [
      'Read Uncommitted - Lowest isolation, allows dirty reads',
      'Read Committed - Prevents dirty reads, allows non-repeatable reads',
      'Repeatable Read - Prevents dirty and non-repeatable reads',
      'Serializable - Highest isolation, prevents all phenomena',
      'Trade-off between consistency and performance',
      'Different databases may implement levels differently'
    ],
    codeExamples: [
      {
        title: 'Isolation Level Examples',
        language: 'sql',
        code: `-- Read Uncommitted (Level 0)
SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED;
BEGIN TRANSACTION;
    SELECT balance FROM accounts WHERE id = 1; -- May see uncommitted changes
COMMIT;

-- Read Committed (Level 1) - Default in most databases
SET TRANSACTION ISOLATION LEVEL READ COMMITTED;
BEGIN TRANSACTION;
    SELECT balance FROM accounts WHERE id = 1; -- Only committed data
    -- Another transaction commits changes to account 1
    SELECT balance FROM accounts WHERE id = 1; -- May see different value
COMMIT;

-- Repeatable Read (Level 2)
SET TRANSACTION ISOLATION LEVEL REPEATABLE READ;
BEGIN TRANSACTION;
    SELECT balance FROM accounts WHERE id = 1; -- Returns 1000
    -- Another transaction updates account 1 balance to 1500
    SELECT balance FROM accounts WHERE id = 1; -- Still returns 1000
    SELECT COUNT(*) FROM accounts; -- May see phantom rows
COMMIT;

-- Serializable (Level 3)
SET TRANSACTION ISOLATION LEVEL SERIALIZABLE;
BEGIN TRANSACTION;
    SELECT * FROM accounts WHERE balance > 1000;
    -- No other transaction can insert/update/delete accounts
    -- that would affect this result set
    SELECT * FROM accounts WHERE balance > 1000; -- Identical result
COMMIT;

-- Lock-based implementation example
-- Shared lock for reads
SELECT balance FROM accounts WHERE id = 1 WITH (HOLDLOCK);

-- Exclusive lock for writes
SELECT balance FROM accounts WHERE id = 1 WITH (UPDLOCK);
UPDATE accounts SET balance = balance - 100 WHERE id = 1;`
      }
    ],
    questions: [
      { question: "What is the difference between Read Committed and Repeatable Read?", answer: "Read Committed prevents dirty reads but allows non-repeatable reads (same query may return different results). Repeatable Read prevents both dirty reads and non-repeatable reads by holding shared locks until transaction end." },
      { question: "When would you use Read Uncommitted isolation level?", answer: "Use Read Uncommitted for: reporting queries where approximate data is acceptable, read-heavy workloads where performance is critical, data warehouse scenarios, or when reading from read-only replicas where consistency is less critical." },
      { question: "What are phantom reads and how does Serializable prevent them?", answer: "Phantom reads occur when a transaction re-executes a query and sees new rows that weren't there before. Serializable prevents this by using range locks or predicate locks that prevent other transactions from inserting matching rows." },
      { question: "How do isolation levels affect database performance?", answer: "Higher isolation levels reduce performance due to: increased locking overhead, longer lock hold times, higher chance of deadlocks, and reduced concurrency. Choose the lowest level that meets your consistency requirements." },
      { question: "Can you change isolation level during a transaction?", answer: "Generally no - isolation level should be set before starting a transaction. Some databases allow it but behavior is undefined. Best practice is to set isolation level at session or transaction start." }
    ]
  },
  {
    id: 'concurrency-problems',
    title: 'Dirty Read, Non-repeatable Read, Phantom Read',
    explanation: `Concurrency problems occur when multiple transactions access the same data simultaneously without proper isolation. Understanding these problems helps in choosing appropriate isolation levels and designing robust database applications.`,
    keyPoints: [
      'Dirty Read - Reading uncommitted changes from other transactions',
      'Non-repeatable Read - Same query returns different results within transaction',
      'Phantom Read - New rows appear in subsequent queries',
      'Lost Update - Concurrent updates overwrite each other',
      'Each isolation level prevents specific problems',
      'Higher isolation levels prevent more problems but reduce performance'
    ],
    codeExamples: [
      {
        title: 'Concurrency Problems Examples',
        language: 'sql',
        code: `-- Dirty Read Example
-- Transaction 1 (READ UNCOMMITTED)
SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED;
BEGIN TRANSACTION;
    SELECT balance FROM accounts WHERE id = 1; -- Reads 1000
    -- Transaction 2 updates balance to 500 but doesn't commit
    SELECT balance FROM accounts WHERE id = 1; -- Reads 500 (dirty read)
    -- Transaction 2 rolls back
    SELECT balance FROM accounts WHERE id = 1; -- Reads 1000 again
COMMIT;

-- Non-repeatable Read Example
-- Transaction 1 (READ COMMITTED)
SET TRANSACTION ISOLATION LEVEL READ COMMITTED;
BEGIN TRANSACTION;
    SELECT balance FROM accounts WHERE id = 1; -- Reads 1000
    -- Transaction 2 commits: UPDATE accounts SET balance = 1500 WHERE id = 1
    SELECT balance FROM accounts WHERE id = 1; -- Reads 1500 (non-repeatable)
COMMIT;

-- Phantom Read Example
-- Transaction 1 (REPEATABLE READ)
SET TRANSACTION ISOLATION LEVEL REPEATABLE READ;
BEGIN TRANSACTION;
    SELECT COUNT(*) FROM accounts WHERE balance > 1000; -- Returns 5
    -- Transaction 2 commits: INSERT INTO accounts VALUES (6, 'New', 1200)
    SELECT COUNT(*) FROM accounts WHERE balance > 1000; -- Returns 6 (phantom)
COMMIT;

-- Lost Update Example
-- Transaction 1
BEGIN TRANSACTION;
    DECLARE @balance INT = (SELECT balance FROM accounts WHERE id = 1); -- 1000
    -- Transaction 2 also reads balance = 1000 and updates to 900
    UPDATE accounts SET balance = @balance - 200 WHERE id = 1; -- Sets to 800
COMMIT; -- Lost update: Transaction 2's update is overwritten

-- Prevention with locking
-- Transaction 1 (prevents lost update)
BEGIN TRANSACTION;
    SELECT balance FROM accounts WHERE id = 1 WITH (UPDLOCK); -- Exclusive lock
    UPDATE accounts SET balance = balance - 200 WHERE id = 1;
COMMIT;`
      }
    ],
    questions: [
      { question: "What is a dirty read and why is it problematic?", answer: "A dirty read occurs when a transaction reads uncommitted changes from another transaction. It's problematic because the other transaction might rollback, making the read data invalid and potentially causing incorrect business decisions." },
      { question: "How does a non-repeatable read differ from a phantom read?", answer: "Non-repeatable read involves existing rows changing values between reads. Phantom read involves new rows appearing or existing rows disappearing between reads. Both violate transaction isolation but affect different aspects of data consistency." },
      { question: "What is the lost update problem and how can it be prevented?", answer: "Lost update occurs when concurrent transactions read the same data, modify it, and the last update overwrites previous changes. Prevent with: optimistic locking (version numbers), pessimistic locking (SELECT FOR UPDATE), or atomic operations." },
      { question: "Which isolation levels prevent which concurrency problems?", answer: "Read Uncommitted: prevents none. Read Committed: prevents dirty reads. Repeatable Read: prevents dirty and non-repeatable reads. Serializable: prevents dirty reads, non-repeatable reads, and phantom reads." },
      { question: "How do you detect and handle concurrency problems in applications?", answer: "Detection: use appropriate isolation levels, implement version checking, monitor for deadlocks. Handling: retry logic for transient failures, optimistic concurrency with conflict resolution, proper error handling, and user notification of conflicts." }
    ]
  },
  {
    id: 'locking-mechanisms',
    title: 'Two-Phase Locking (2PL)',
    explanation: `Two-Phase Locking is a concurrency control protocol that ensures serializability by dividing transaction execution into two phases: growing phase (acquiring locks) and shrinking phase (releasing locks). Once a transaction starts releasing locks, it cannot acquire new ones.`,
    keyPoints: [
      'Growing Phase - Transaction can only acquire locks, not release them',
      'Shrinking Phase - Transaction can only release locks, not acquire new ones',
      'Ensures conflict serializability of concurrent transactions',
      'Strict 2PL holds all locks until transaction commits/aborts',
      'Prevents cascading rollbacks but may cause deadlocks',
      'Foundation for most commercial database locking systems'
    ],
    codeExamples: [
      {
        title: 'Two-Phase Locking Implementation',
        language: 'javascript',
        code: `// Two-Phase Locking Protocol Implementation
class TwoPhaseLocking {
    constructor() {
        this.locks = new Map(); // resource -> {type, holders, waiters}
        this.transactions = new Map(); // txId -> {locks, phase}
    }
    
    startTransaction(txId) {
        this.transactions.set(txId, {
            locks: new Set(),
            phase: 'GROWING'
        });
    }
    
    acquireLock(txId, resource, lockType) {
        const tx = this.transactions.get(txId);
        
        if (tx.phase === 'SHRINKING') {
            throw new Error('Cannot acquire lock in shrinking phase');
        }
        
        if (this.canGrantLock(resource, lockType, txId)) {
            this.grantLock(txId, resource, lockType);
            tx.locks.add({resource, lockType});
            return true;
        }
        
        // Add to wait queue
        this.addToWaitQueue(txId, resource, lockType);
        return false; // Transaction must wait
    }
    
    releaseLock(txId, resource) {
        const tx = this.transactions.get(txId);
        tx.phase = 'SHRINKING'; // Enter shrinking phase
        
        this.removeLock(txId, resource);
        tx.locks.delete({resource});
        
        // Grant waiting locks
        this.processWaitQueue(resource);
    }
    
    canGrantLock(resource, lockType, txId) {
        const lockInfo = this.locks.get(resource);
        if (!lockInfo) return true;
        
        // Shared locks are compatible with other shared locks
        if (lockType === 'SHARED' && lockInfo.type === 'SHARED') {
            return true;
        }
        
        // Exclusive locks are not compatible with any other locks
        return false;
    }
    
    // Strict 2PL - release all locks at commit/abort
    commitTransaction(txId) {
        const tx = this.transactions.get(txId);
        
        // Release all locks at once (strict 2PL)
        for (const lock of tx.locks) {
            this.removeLock(txId, lock.resource);
            this.processWaitQueue(lock.resource);
        }
        
        this.transactions.delete(txId);
    }
    
    abortTransaction(txId) {
        // Same as commit for lock release
        this.commitTransaction(txId);
    }
}

// SQL Examples of 2PL in action
/*
-- Transaction 1: Growing Phase
BEGIN TRANSACTION;
    SELECT * FROM accounts WHERE id = 1; -- Acquire shared lock on account 1
    SELECT * FROM accounts WHERE id = 2; -- Acquire shared lock on account 2
    UPDATE accounts SET balance = balance - 100 WHERE id = 1; -- Upgrade to exclusive
    UPDATE accounts SET balance = balance + 100 WHERE id = 2; -- Upgrade to exclusive
    -- Still in growing phase - can acquire more locks
    
-- Shrinking Phase begins with first lock release
COMMIT; -- All locks released at once (Strict 2PL)

-- Deadlock scenario with 2PL
-- Transaction A
BEGIN TRANSACTION;
    UPDATE accounts SET balance = balance - 50 WHERE id = 1; -- Lock account 1
    UPDATE accounts SET balance = balance + 50 WHERE id = 2; -- Wait for account 2
COMMIT;

-- Transaction B (concurrent)
BEGIN TRANSACTION;
    UPDATE accounts SET balance = balance - 30 WHERE id = 2; -- Lock account 2
    UPDATE accounts SET balance = balance + 30 WHERE id = 1; -- Wait for account 1 (DEADLOCK)
COMMIT;
*/`
      }
    ],
    questions: [
      { question: "What are the two phases in Two-Phase Locking?", answer: "Growing Phase: transaction can only acquire locks, cannot release any. Shrinking Phase: transaction can only release locks, cannot acquire new ones. This ensures serializability by preventing certain lock acquisition patterns that could cause conflicts." },
      { question: "What is the difference between basic 2PL and Strict 2PL?", answer: "Basic 2PL allows lock release as soon as shrinking phase begins. Strict 2PL holds all locks until transaction commits or aborts. Strict 2PL prevents cascading rollbacks but may increase lock contention." },
      { question: "How does 2PL prevent non-serializable schedules?", answer: "2PL ensures that if transaction T1 accesses data item X before T2, then T1 must complete its access to all shared data items before T2 begins accessing any of them. This creates a serialization order equivalent to some serial execution." },
      { question: "What are the disadvantages of Two-Phase Locking?", answer: "Disadvantages include: potential for deadlocks, reduced concurrency due to lock holding, cascading rollbacks in basic 2PL, and performance overhead from lock management. May also cause lock thrashing in high-contention scenarios." },
      { question: "How do databases implement deadlock detection with 2PL?", answer: "Databases maintain wait-for graphs showing transaction dependencies. Cycles in the graph indicate deadlocks. Detection algorithms run periodically, and when deadlocks are found, one transaction is chosen as victim and rolled back to break the cycle." }
    ]
  },
  {
    id: 'optimistic-pessimistic-locking',
    title: 'Optimistic vs Pessimistic Locking',
    explanation: `Optimistic and pessimistic locking are two different approaches to handling concurrent access to data. Pessimistic locking prevents conflicts by locking resources immediately, while optimistic locking allows concurrent access and detects conflicts at commit time.`,
    keyPoints: [
      'Pessimistic Locking - Lock resources immediately to prevent conflicts',
      'Optimistic Locking - Allow concurrent access, check for conflicts later',
      'Pessimistic better for high contention scenarios',
      'Optimistic better for low contention scenarios',
      'Version numbers or timestamps used in optimistic locking',
      'Choice depends on conflict probability and performance requirements'
    ],
    codeExamples: [
      {
        title: 'Optimistic vs Pessimistic Locking',
        language: 'sql',
        code: `-- Pessimistic Locking Examples
-- Exclusive lock (prevents all other access)
BEGIN TRANSACTION;
    SELECT balance FROM accounts WHERE id = 1 WITH (UPDLOCK, HOLDLOCK);
    -- Other transactions blocked until this commits
    UPDATE accounts SET balance = balance - 100 WHERE id = 1;
COMMIT;

-- Shared lock (allows other readers)
BEGIN TRANSACTION;
    SELECT * FROM products WHERE category = 'electronics' WITH (HOLDLOCK);
    -- Other readers allowed, writers blocked
    -- Process the data...
COMMIT;

-- Optimistic Locking with Version Numbers
-- Table with version column
CREATE TABLE accounts (
    id INT PRIMARY KEY,
    balance DECIMAL(10,2),
    version INT DEFAULT 1
);

-- Optimistic update
DECLARE @currentVersion INT;
DECLARE @currentBalance DECIMAL(10,2);

-- Read current data and version
SELECT @currentBalance = balance, @currentVersion = version 
FROM accounts WHERE id = 1;

-- Perform business logic
SET @currentBalance = @currentBalance - 100;

-- Update with version check
UPDATE accounts 
SET balance = @currentBalance, version = version + 1
WHERE id = 1 AND version = @currentVersion;

IF @@ROWCOUNT = 0
    THROW 50001, 'Optimistic concurrency conflict detected', 1;

-- Optimistic Locking with Timestamps
CREATE TABLE orders (
    id INT PRIMARY KEY,
    customer_id INT,
    total DECIMAL(10,2),
    last_modified TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Update with timestamp check
DECLARE @lastModified TIMESTAMP;
SELECT @lastModified = last_modified FROM orders WHERE id = 123;

-- Business logic here...

UPDATE orders 
SET total = 150.00, last_modified = CURRENT_TIMESTAMP
WHERE id = 123 AND last_modified = @lastModified;

-- Application-level optimistic locking
/*
// Pseudo-code for application logic
function updateAccount(accountId, newBalance, expectedVersion) {
    try {
        result = database.execute(
            "UPDATE accounts SET balance = ?, version = version + 1 " +
            "WHERE id = ? AND version = ?",
            [newBalance, accountId, expectedVersion]
        );
        
        if (result.rowsAffected === 0) {
            throw new OptimisticLockException("Data was modified by another user");
        }
        
        return true;
    } catch (OptimisticLockException e) {
        // Retry logic or user notification
        return handleConflict(accountId, e);
    }
}
*/`
      }
    ],
    questions: [
      { question: "When should you use pessimistic locking vs optimistic locking?", answer: "Use pessimistic locking when: conflicts are likely, data consistency is critical, users can wait for locks, or in high-contention scenarios. Use optimistic locking when: conflicts are rare, performance is critical, users expect immediate response, or in read-heavy workloads." },
      { question: "How do you implement optimistic locking with version numbers?", answer: "Add a version column to tables, increment it on each update, and include current version in WHERE clause of updates. If no rows are affected, another transaction modified the data. This detects conflicts without locking." },
      { question: "What are the advantages and disadvantages of each approach?", answer: "Pessimistic: Advantages - prevents conflicts, ensures consistency. Disadvantages - reduced concurrency, potential deadlocks. Optimistic: Advantages - better performance, no deadlocks. Disadvantages - conflicts detected late, retry logic needed." },
      { question: "How do you handle optimistic locking conflicts in applications?", answer: "Strategies include: automatic retry with exponential backoff, user notification with option to retry, merge conflicts automatically where possible, or escalate to pessimistic locking for problematic records." },
      { question: "Can you combine optimistic and pessimistic locking?", answer: "Yes, hybrid approaches are common: use optimistic locking by default, escalate to pessimistic for high-contention records, or use different strategies for different data types based on access patterns and business requirements." }
    ]
  },
  {
    id: 'deadlock-database',
    title: 'Deadlock in Database',
    explanation: `Database deadlocks occur when two or more transactions wait for each other indefinitely, creating a circular dependency. Understanding deadlock causes, detection, and prevention is crucial for building robust database applications that can handle concurrent access gracefully.`,
    keyPoints: [
      'Circular wait condition between two or more transactions',
      'Each transaction holds locks needed by others',
      'System must detect and resolve deadlocks automatically',
      'Deadlock victim selection based on various factors',
      'Prevention strategies include lock ordering and timeouts',
      'Application should handle deadlock exceptions gracefully'
    ],
    codeExamples: [
      {
        title: 'Deadlock Examples and Prevention',
        language: 'sql',
        code: `-- Classic Deadlock Scenario
-- Transaction 1
BEGIN TRANSACTION;
    UPDATE accounts SET balance = balance - 100 WHERE account_id = 1; -- Locks account 1
    WAITFOR DELAY '00:00:05'; -- Simulate processing time
    UPDATE accounts SET balance = balance + 100 WHERE account_id = 2; -- Waits for account 2
COMMIT;

-- Transaction 2 (runs concurrently)
BEGIN TRANSACTION;
    UPDATE accounts SET balance = balance - 50 WHERE account_id = 2; -- Locks account 2
    WAITFOR DELAY '00:00:05'; -- Simulate processing time  
    UPDATE accounts SET balance = balance + 50 WHERE account_id = 1; -- Waits for account 1 (DEADLOCK!)
COMMIT;

-- Deadlock Prevention: Consistent Lock Ordering
-- Both transactions access accounts in same order (1, then 2)
-- Transaction 1
BEGIN TRANSACTION;
    UPDATE accounts SET balance = balance - 100 WHERE account_id = 1;
    UPDATE accounts SET balance = balance + 100 WHERE account_id = 2;
COMMIT;

-- Transaction 2
BEGIN TRANSACTION;
    UPDATE accounts SET balance = balance + 50 WHERE account_id = 1; -- Waits for T1
    UPDATE accounts SET balance = balance - 50 WHERE account_id = 2; -- No deadlock
COMMIT;

-- Deadlock Prevention: Single Statement
-- Use single UPDATE with JOIN to avoid multiple locks
UPDATE a1 SET balance = a1.balance - 100
FROM accounts a1, accounts a2
WHERE a1.account_id = 1 AND a2.account_id = 2
    AND a1.balance >= 100;

UPDATE a2 SET balance = a2.balance + 100  
FROM accounts a2
WHERE a2.account_id = 2;

-- Deadlock Handling in Application
BEGIN TRY
    BEGIN TRANSACTION;
        UPDATE accounts SET balance = balance - 100 WHERE account_id = 1;
        UPDATE accounts SET balance = balance + 100 WHERE account_id = 2;
    COMMIT;
END TRY
BEGIN CATCH
    IF ERROR_NUMBER() = 1205 -- Deadlock error
    BEGIN
        ROLLBACK;
        WAITFOR DELAY '00:00:01'; -- Brief delay
        -- Retry logic here
        EXEC RetryTransaction;
    END
    ELSE
    BEGIN
        ROLLBACK;
        THROW; -- Re-throw other errors
    END
END CATCH;

-- Lock Timeout Prevention
SET LOCK_TIMEOUT 30000; -- 30 seconds
BEGIN TRANSACTION;
    -- Operations that might deadlock
    UPDATE accounts SET balance = balance - 100 WHERE account_id = 1;
COMMIT;

-- Deadlock Monitoring Query (SQL Server)
SELECT 
    session_id,
    blocking_session_id,
    wait_type,
    wait_time,
    wait_resource
FROM sys.dm_exec_requests 
WHERE blocking_session_id <> 0;`
      }
    ],
    questions: [
      { question: "What conditions must exist for a deadlock to occur?", answer: "Four conditions: Mutual Exclusion (resources can't be shared), Hold and Wait (processes hold resources while waiting for others), No Preemption (resources can't be forcibly taken), and Circular Wait (circular chain of processes waiting for each other)." },
      { question: "How do databases detect and resolve deadlocks?", answer: "Databases maintain wait-for graphs and periodically check for cycles. When detected, they choose a deadlock victim (usually transaction with least cost to rollback) and abort it, allowing others to proceed. The victim receives a deadlock error." },
      { question: "What strategies can prevent deadlocks?", answer: "Prevention strategies: consistent lock ordering across transactions, minimize transaction duration, use appropriate isolation levels, implement timeouts, avoid user interaction during transactions, and use single statements instead of multiple updates where possible." },
      { question: "How should applications handle deadlock exceptions?", answer: "Applications should: catch deadlock exceptions specifically, implement retry logic with exponential backoff, limit retry attempts, log deadlock occurrences for analysis, and provide user feedback for persistent failures." },
      { question: "What factors influence deadlock victim selection?", answer: "Factors include: transaction duration (newer transactions often chosen), number of log records (less work to rollback), transaction priority, resources held, and estimated rollback cost. Goal is to minimize overall system impact." }
    ]
  }
];