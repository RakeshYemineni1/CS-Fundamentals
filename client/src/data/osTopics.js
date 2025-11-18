export const osTopics = [
  {
    id: 'process-management',
    title: 'Process Management',
    explanation: 'Process management is the core function of an operating system that handles the creation, execution, scheduling, and termination of processes. A process is a program in execution with its own memory space, resources, and execution context. Process management ensures efficient CPU utilization, fair resource allocation, and system stability through sophisticated scheduling algorithms and state management.',
    keyPoints: [
      'Handles process creation, execution, and termination lifecycle',
      'Manages Process Control Block (PCB) for each process',
      'Implements context switching for multitasking',
      'Provides process isolation and memory protection',
      'Coordinates inter-process communication mechanisms',
      'Ensures fair CPU allocation through scheduling algorithms'
    ],
    codeExamples: [{
      title: 'Process Control Block (PCB) Structure',
      language: 'java',
      code: `// Process Control Block (PCB) Structure
class ProcessControlBlock {
    int processId, parentProcessId, userId, groupId;
    ProcessState state;
    int priority, programCounter, stackPointer;
    int[] registers = new int[32];
    PageTable pageTable;
    List<OpenFile> openFiles;
    long arrivalTime, burstTime, waitingTime;
    
    enum ProcessState { NEW, READY, RUNNING, WAITING, TERMINATED }
}

// Context Switching Algorithm
ALGORITHM ContextSwitch(currentProcess, nextProcess):
    SAVE CPU.registers TO currentProcess.PCB.registers
    SAVE CPU.programCounter TO currentProcess.PCB.programCounter
    currentProcess.state = READY
    nextProcess.state = RUNNING
    LOAD nextProcess.PCB.registers TO CPU.registers
    LOAD nextProcess.PCB.programCounter TO CPU.programCounter
    SWITCH_PAGE_TABLE(nextProcess.PCB.pageTable)
    FLUSH_TLB()

// Process Creation (fork)
ALGORITHM ProcessCreation():
    newPCB = ALLOCATE_PCB()
    newPID = GENERATE_UNIQUE_PID()
    COPY_MEMORY_SPACE(parent, child)
    COPY_FILE_DESCRIPTORS(parent, child)
    newPCB.processId = newPID
    newPCB.parentProcessId = parent.processId
    ADD_TO_PROCESS_TABLE(newPCB)
    RETURN newPID TO parent, 0 TO child`
    }],
    questions: [
      { question: "What is the difference between a process and a thread?", answer: "A process is an independent program execution with its own memory space, file descriptors, and system resources, providing strong isolation but expensive context switching. A thread is a lightweight execution unit within a process sharing memory and resources, enabling fast communication but weaker isolation." },
      { question: "Explain the process lifecycle and state transitions.", answer: "Process lifecycle: NEW (process creation), READY (waiting in scheduler queue), RUNNING (executing on CPU), WAITING (blocked on I/O), TERMINATED (cleanup and exit). Transitions occur due to scheduler decisions, I/O requests/completion, time quantum expiration, and process completion." },
      { question: "What is context switching and why is it expensive?", answer: "Context switching saves current process state and loads another process state when CPU switches between processes. It's expensive due to saving/loading registers, updating page tables, flushing TLB/caches, and kernel mode transitions." },
      { question: "Compare multithreading vs multiprocessing.", answer: "Multithreading: shared memory space, fast context switching, efficient communication, weak isolation. Multiprocessing: separate memory spaces, expensive context switching, IPC overhead, strong isolation, fault tolerance." },
      { question: "Explain user mode vs kernel mode.", answer: "User mode: restricted instruction set, no direct hardware access, memory protection enforced. Kernel mode: full instruction access, direct hardware control, complete memory access. Mode switching occurs via system calls, interrupts, exceptions." },
      { question: "How does process creation work in Unix/Linux?", answer: "Uses fork() system call creating exact parent copy, returning 0 to child and PID to parent. Child typically calls exec() to replace memory image. Copy-on-write optimization delays memory copying until modification." },
      { question: "What is a Process Control Block (PCB)?", answer: "PCB contains all process information: process ID, state, priority, program counter, CPU registers, memory management info, I/O status, and parent/child relationships. It enables context switching and process management." },
      { question: "What are zombie and orphan processes?", answer: "Zombie: terminated process whose exit status hasn't been read by parent. Orphan: running process whose parent terminated, adopted by init process (PID 1)." },
      { question: "Explain process hierarchy and parent-child relationships.", answer: "Processes form tree structure with init (PID 1) as root. Parents create children via fork(), children inherit attributes. Parents can wait() for child completion and receive exit status." },
      { question: "What factors influence process scheduling decisions?", answer: "Process priority, arrival time, CPU burst time, I/O requirements, fairness, aging, real-time constraints. Modern schedulers use multi-level feedback queues and completely fair scheduler (CFS) algorithms." }
    ]
  },
  {
    id: 'process-vs-thread',
    title: 'Process vs Thread',
    explanation: 'Understanding the fundamental differences between processes and threads is crucial for system design. Processes provide strong isolation with separate memory spaces, while threads share memory within a process for efficient communication. The choice between processes and threads involves trade-offs between isolation, performance, and complexity.',
    keyPoints: [
      'Processes have separate memory spaces, threads share memory',
      'Process context switching is expensive, thread switching is fast',
      'Processes provide strong isolation, threads enable fast communication',
      'Process creation is costly, thread creation is lightweight',
      'Processes use IPC for communication, threads use shared variables',
      'Process failure is isolated, thread failure affects entire process'
    ],
    codeExamples: [{
      title: 'Process vs Thread Comparison',
      language: 'java',
      code: `// Process Characteristics
Process Features:
- Independent virtual address space (4GB on 32-bit)
- Own heap, stack, code, and data segments
- Separate file descriptor table
- Heavy context switching (100-1000 microseconds)
- Inter-process communication via IPC
- Strong fault isolation

// Thread Characteristics  
Thread Features:
- Shared virtual address space within process
- Own stack (1-8MB) and register set
- Shared heap, code, data, file descriptors
- Light context switching (1-10 microseconds)
- Direct memory communication
- Weak fault isolation

// Thread Creation Example
ALGORITHM CreateThread():
    threadStack = ALLOCATE_STACK(STACK_SIZE)
    threadContext = CREATE_CONTEXT(function, args)
    threadContext.stackPointer = threadStack + STACK_SIZE
    ADD_TO_THREAD_LIST(threadContext)
    SCHEDULE_THREAD(threadContext)

// Process vs Thread Context Switch
ALGORITHM ProcessContextSwitch():
    SAVE_PROCESS_STATE(currentProcess)
    SWITCH_ADDRESS_SPACE(nextProcess)
    FLUSH_TLB()
    INVALIDATE_CACHE()
    LOAD_PROCESS_STATE(nextProcess)

ALGORITHM ThreadContextSwitch():
    SAVE_THREAD_REGISTERS(currentThread)
    SWITCH_STACK_POINTER(nextThread)
    LOAD_THREAD_REGISTERS(nextThread)
    // No address space switch needed`
    }],
    questions: [
      { question: "When would you choose processes over threads?", answer: "Choose processes for: fault isolation requirements, security boundaries, distributed systems, different programming languages, independent applications. Processes prevent one component's failure from affecting others." },
      { question: "When would you choose threads over processes?", answer: "Choose threads for: shared data processing, responsive user interfaces, producer-consumer scenarios, parallel algorithms on shared data, performance-critical applications requiring fast communication." },
      { question: "What are the memory implications of processes vs threads?", answer: "Processes: separate virtual address spaces, higher memory overhead, no shared memory corruption risk. Threads: shared address space, lower memory overhead, risk of memory corruption affecting all threads." },
      { question: "How do communication mechanisms differ between processes and threads?", answer: "Process communication: pipes, message queues, shared memory, sockets (slower, more secure). Thread communication: shared variables, mutexes, condition variables (faster, less secure)." },
      { question: "Explain the security implications of processes vs threads.", answer: "Processes: strong security boundaries, memory protection, privilege separation. Threads: shared memory vulnerabilities, one thread's security breach affects all, harder to implement security policies." },
      { question: "What are the debugging challenges with processes vs threads?", answer: "Process debugging: easier isolation, independent debugging sessions, crash doesn't affect others. Thread debugging: race conditions, non-deterministic behavior, shared state corruption, deadlock detection complexity." },
      { question: "How do processes and threads scale differently?", answer: "Process scaling: limited by memory overhead, good for distributed systems, horizontal scaling across machines. Thread scaling: limited by synchronization overhead, good for multi-core systems, vertical scaling within machine." },
      { question: "What is the impact on system resources?", answer: "Processes: higher CPU overhead (context switching), more memory usage, more file descriptors. Threads: lower CPU overhead, shared memory efficiency, fewer system resources per execution unit." },
      { question: "How do exception handling mechanisms differ?", answer: "Processes: exceptions isolated to individual process, system remains stable. Threads: unhandled exception can terminate entire process, affecting all threads, requires careful exception handling design." },
      { question: "What are hybrid approaches combining processes and threads?", answer: "Multi-process with multi-threading: web servers use process pools with thread pools, combines fault isolation with performance. Actor model: lightweight processes with message passing. Microservices: processes for services, threads within services." }
    ]
  },
  {
    id: 'process-states',
    title: 'Process States and PCB',
    explanation: 'Process states represent the current status of a process in the system, while the Process Control Block (PCB) stores all information needed to manage the process. Understanding state transitions and PCB structure is essential for operating system design and process management.',
    keyPoints: [
      'Five process states: NEW, READY, RUNNING, WAITING, TERMINATED',
      'PCB stores all process information for management',
      'State transitions triggered by scheduling and I/O events',
      'PCB enables context switching and process restoration',
      'Process hierarchy maintained through parent-child relationships',
      'Zombie and orphan processes require special handling'
    ],
    codeExamples: [{
      title: 'Complete Process Control Block Structure',
      language: 'java',
      code: `// Complete Process Control Block Structure
struct ProcessControlBlock {
    // Process Identification
    int processId, parentProcessId, userId, groupId, sessionId;
    
    // Process State Information
    ProcessState state;
    int priority, niceness;
    int programCounter, stackPointer, framePointer;
    int[] generalRegisters = new int[32];
    int statusRegister;
    
    // Memory Management
    int baseRegister, limitRegister;
    PageTable pageTable;
    SegmentTable segmentTable;
    int memorySize;
    
    // I/O Status
    List<OpenFile> openFiles;
    List<IORequest> pendingIO;
    List<Device> allocatedDevices;
    
    // CPU Scheduling
    long arrivalTime, burstTime, remainingTime;
    int timeQuantum;
    long waitingTime, turnaroundTime, responseTime;
    
    // Process Relationships
    List<Integer> childProcesses;
    List<Signal> pendingSignals;
    
    enum ProcessState {
        NEW,        // Being created
        READY,      // Ready to run
        RUNNING,    // Currently executing
        WAITING,    // Waiting for I/O or event
        TERMINATED  // Finished execution
    }
}

// State Transition Algorithm
ALGORITHM ProcessStateTransition():
    NEW -> READY:
        WHEN process creation completed AND memory allocated
        ACTION: Add to ready queue, initialize PCB
    
    READY -> RUNNING:
        WHEN CPU scheduler selects process
        ACTION: Load process context, start execution timer
    
    RUNNING -> WAITING:
        WHEN process requests I/O OR waits for resource
        ACTION: Save context, move to wait queue
    
    WAITING -> READY:
        WHEN I/O completes OR resource available
        ACTION: Move to ready queue, update state
    
    RUNNING -> READY:
        WHEN time quantum expires OR preemption
        ACTION: Save context, add to ready queue
    
    RUNNING -> TERMINATED:
        WHEN process completes OR receives termination signal
        ACTION: Clean up resources, notify parent

// PCB Management Operations
ALGORITHM CreatePCB(programPath, args):
    pcb = ALLOCATE_PCB()
    pcb.processId = GENERATE_PID()
    pcb.state = NEW
    pcb.priority = DEFAULT_PRIORITY
    LOAD_PROGRAM(programPath, pcb)
    INITIALIZE_MEMORY_SPACE(pcb)
    ADD_TO_PROCESS_TABLE(pcb)
    RETURN pcb

ALGORITHM UpdatePCBOnContextSwitch(pcb):
    pcb.programCounter = CPU.programCounter
    pcb.stackPointer = CPU.stackPointer
    COPY CPU.registers TO pcb.generalRegisters
    pcb.statusRegister = CPU.statusRegister
    UPDATE_STATISTICS(pcb)`
    }],
    questions: [
      { question: "Explain all process states and their transitions with examples.", answer: "NEW: process being created (loading executable). READY: waiting for CPU (in scheduler queue). RUNNING: executing on CPU (active process). WAITING: blocked on I/O (reading file). TERMINATED: finished execution (cleanup phase). Transitions occur due to scheduling decisions, I/O operations, time quantum expiration, and process completion." },
      { question: "What information is stored in a Process Control Block?", answer: "PCB stores: process identification (PID, parent PID, user ID), state information (current state, priority, registers), memory management (page tables, memory limits), I/O status (open files, pending requests), scheduling info (arrival time, burst time), and process relationships (parent/child links)." },
      { question: "How does the OS use PCB during context switching?", answer: "During context switch: save current process state to its PCB (registers, PC, stack pointer), update process statistics, load next process state from its PCB, switch memory management context (page tables), update CPU registers and program counter." },
      { question: "What happens when a process transitions from RUNNING to WAITING?", answer: "Process makes system call for I/O or resource, OS saves process context to PCB, changes state to WAITING, moves process to appropriate wait queue, selects next ready process for execution, updates scheduling statistics." },
      { question: "Describe the NEW to READY state transition process.", answer: "Process creation completes, memory allocated and initialized, executable loaded into memory, PCB fully populated, process added to ready queue, scheduler can now select it for execution, state changed from NEW to READY." },
      { question: "How are process priorities managed in the PCB?", answer: "PCB stores base priority and current effective priority, aging mechanisms increment priority over time, priority inheritance for synchronization, real-time processes have fixed priorities, scheduler uses priority for selection decisions." },
      { question: "What role does PCB play in process termination?", answer: "PCB tracks termination status and exit code, maintains reference count for cleanup, stores resource usage statistics, enables parent notification via wait(), facilitates zombie process management until parent reads exit status." },
      { question: "How does PCB support inter-process communication?", answer: "PCB maintains list of open IPC channels (pipes, message queues), tracks shared memory segments, stores signal handlers and pending signals, manages semaphore and mutex ownership, enables process group communication." },
      { question: "Explain PCB's role in memory management.", answer: "PCB contains page table pointers for virtual memory, stores memory limits and base addresses, tracks allocated memory regions, maintains memory usage statistics, enables memory protection between processes, supports copy-on-write mechanisms." },
      { question: "How is PCB used in process scheduling algorithms?", answer: "PCB stores scheduling parameters (priority, arrival time, burst time), maintains execution history for adaptive algorithms, tracks CPU usage for fair scheduling, stores aging information to prevent starvation, enables multi-level feedback queue management." }
    ]
  },
  {
    id: 'context-switching',
    title: 'Context Switching',
    explanation: 'Context switching is the process of storing and restoring the state of a process or thread so that execution can be resumed from the same point later. It is a fundamental feature of multitasking operating systems and involves significant overhead that must be minimized for system performance.',
    keyPoints: [
      'Saves current process state and loads next process state',
      'Involves saving/loading registers, PC, and memory context',
      'Triggered by time quantum expiration, I/O, or interrupts',
      'Expensive operation requiring optimization techniques',
      'Thread context switching faster than process switching',
      'Hardware support can reduce context switch overhead'
    ],
    codeExamples: [{
      title: 'Context Switch Implementation',
      language: 'java',
      code: `// Context Switch Implementation
ALGORITHM ContextSwitch(currentProcess, nextProcess):
    START_TIMER(context_switch_time)
    
    // Phase 1: Save current process context
    SAVE CPU.generalRegisters TO currentProcess.PCB.registers
    SAVE CPU.programCounter TO currentProcess.PCB.programCounter
    SAVE CPU.stackPointer TO currentProcess.PCB.stackPointer
    SAVE CPU.statusRegister TO currentProcess.PCB.statusRegister
    SAVE FPU.registers TO currentProcess.PCB.fpuRegisters
    
    // Phase 2: Update process states
    currentProcess.state = READY
    currentProcess.lastCPUTime = CURRENT_TIME()
    nextProcess.state = RUNNING
    nextProcess.contextSwitches++
    
    // Phase 3: Memory management context switch
    IF currentProcess.pageTable != nextProcess.pageTable:
        SWITCH_PAGE_TABLE(nextProcess.PCB.pageTable)
        FLUSH_TLB()
        INVALIDATE_CACHE_ENTRIES()
    
    // Phase 4: Load next process context
    LOAD nextProcess.PCB.registers TO CPU.generalRegisters
    LOAD nextProcess.PCB.programCounter TO CPU.programCounter
    LOAD nextProcess.PCB.stackPointer TO CPU.stackPointer
    LOAD nextProcess.PCB.statusRegister TO CPU.statusRegister
    
    // Phase 5: Update system state
    UPDATE_CURRENT_PROCESS(nextProcess)
    RESTART_TIMER(nextProcess.timeQuantum)
    
    END_TIMER(context_switch_time)
    UPDATE_STATISTICS(context_switch_overhead)

// Hardware Context Switch Support
struct HardwareContext {
    int generalRegisters[32];
    int programCounter;
    int stackPointer;
    int statusRegister;
    int floatingPointRegisters[32];
    int controlRegisters[8];
};

// Context Switch Optimization
ALGORITHM OptimizedContextSwitch():
    // Use hardware support when available
    IF HARDWARE_CONTEXT_SWITCH_SUPPORTED:
        HARDWARE_SAVE_CONTEXT(currentProcess)
        HARDWARE_LOAD_CONTEXT(nextProcess)
    ELSE:
        SOFTWARE_CONTEXT_SWITCH(currentProcess, nextProcess)
    
    // Minimize TLB flushes
    IF TAGGED_TLB_SUPPORTED:
        TAG_TLB_ENTRIES_WITH_PROCESS_ID()
    ELSE:
        FLUSH_TLB()

// Context Switch Triggers
Context Switch Triggers:
1. Time quantum expiration (preemptive scheduling)
2. Process blocks on I/O operation
3. Process waits for synchronization primitive
4. Higher priority process becomes ready
5. Process voluntarily yields CPU
6. Interrupt handling completion`
    }],
    questions: [
      { question: "What is context switching and when does it occur?", answer: "Context switching is saving current process state and loading another process state when CPU switches between processes. It occurs during: time quantum expiration, I/O blocking, synchronization waits, higher priority process arrival, voluntary CPU yielding, and interrupt handling." },
      { question: "What are the steps involved in a context switch?", answer: "Steps: 1) Save current process registers and state to PCB, 2) Update process state and statistics, 3) Select next process from ready queue, 4) Switch memory management context (page tables), 5) Load next process state from PCB, 6) Update CPU registers and resume execution." },
      { question: "Why is context switching expensive and how can overhead be reduced?", answer: "Expensive due to: saving/loading registers, memory management updates, TLB/cache flushes, kernel mode transitions. Reduction techniques: hardware context switch support, tagged TLBs, efficient scheduling algorithms, thread pools, and minimizing unnecessary switches." },
      { question: "How does context switching differ between processes and threads?", answer: "Process context switch: complete state save/restore, memory space switch, TLB flush, expensive (100-1000μs). Thread context switch: minimal state save/restore, same memory space, no TLB flush, faster (1-10μs)." },
      { question: "What hardware support exists for context switching?", answer: "Hardware support includes: multiple register sets, tagged TLBs, hardware task switching (x86 TSS), fast system call instructions (SYSENTER/SYSEXIT), virtualization extensions, and specialized context switch instructions." },
      { question: "How do different CPU architectures handle context switching?", answer: "x86: Task State Segment (TSS) or software switching. ARM: Banked registers for different modes. RISC-V: Software-managed with fast register save/restore. SPARC: Register windows reduce context switch overhead. Each architecture optimizes based on register count and instruction set." },
      { question: "What is the impact of context switching on system performance?", answer: "Impact includes: CPU overhead (1-10% typical), cache pollution (cold cache after switch), TLB misses, memory bandwidth usage, reduced instruction pipeline efficiency. High context switch rates can significantly degrade system performance." },
      { question: "How do operating systems minimize context switch frequency?", answer: "Techniques: longer time quanta for CPU-bound processes, batch processing, thread pools, asynchronous I/O, event-driven programming, user-level threading, and intelligent scheduling algorithms that consider process behavior patterns." },
      { question: "What information must be saved during a context switch?", answer: "Must save: general-purpose registers, program counter, stack pointer, status/flags register, floating-point registers, memory management registers (page table base), I/O state, interrupt masks, and any architecture-specific state." },
      { question: "How does context switching interact with virtual memory?", answer: "Context switching requires: switching page tables, flushing TLB (unless tagged), invalidating cache entries, updating memory management unit, handling page faults during switch, and maintaining memory protection between processes." }
    ]
  },
  {
    id: 'cpu-scheduling',
    title: 'CPU Scheduling Algorithms',
    explanation: 'CPU scheduling determines which process gets CPU time and for how long. Different algorithms optimize for different metrics: throughput, response time, fairness, or predictability. Understanding scheduling algorithms is crucial for system performance and meeting application requirements.',
    keyPoints: [
      'Determines process execution order and CPU time allocation',
      'FCFS is simple but suffers from convoy effect',
      'SJF provides optimal average waiting time',
      'Round Robin ensures fairness with time quantum',
      'Priority scheduling may cause starvation without aging',
      'Multilevel feedback queues adapt to process behavior'
    ],
    codeExamples: [{
      title: 'CPU Scheduling Algorithms Implementation',
      language: 'java',
      code: `// First Come First Served (FCFS)
ALGORITHM FCFS_Scheduling(processes[]):
    SORT processes BY arrivalTime
    currentTime = 0
    totalWaitingTime = 0
    
    FOR each process p IN processes:
        IF currentTime < p.arrivalTime:
            currentTime = p.arrivalTime
        
        p.startTime = currentTime
        p.waitingTime = currentTime - p.arrivalTime
        p.completionTime = currentTime + p.burstTime
        p.turnaroundTime = p.completionTime - p.arrivalTime
        
        currentTime = p.completionTime
        totalWaitingTime += p.waitingTime
    
    averageWaitingTime = totalWaitingTime / processes.length

// Shortest Job First (SJF)
ALGORITHM SJF_NonPreemptive(processes[]):
    availableProcesses = []
    currentTime = 0
    completed = 0
    
    WHILE completed < processes.length:
        FOR each process p IN processes:
            IF p.arrivalTime <= currentTime AND NOT p.completed:
                ADD p TO availableProcesses
        
        IF availableProcesses.empty():
            currentTime = FIND_NEXT_ARRIVAL_TIME()
            CONTINUE
        
        shortestJob = FIND_MIN_BURST_TIME(availableProcesses)
        shortestJob.startTime = currentTime
        shortestJob.waitingTime = currentTime - shortestJob.arrivalTime
        shortestJob.completionTime = currentTime + shortestJob.burstTime
        
        currentTime = shortestJob.completionTime
        shortestJob.completed = true
        completed++

// Round Robin Scheduling
ALGORITHM RoundRobin_Scheduling(processes[], timeQuantum):
    readyQueue = CircularQueue()
    currentTime = 0
    completed = 0
    
    FOR each process p IN processes:
        IF p.arrivalTime == 0:
            ADD p TO readyQueue
            p.remainingTime = p.burstTime
    
    WHILE completed < processes.length:
        IF readyQueue.empty():
            currentTime = FIND_NEXT_ARRIVAL_TIME()
            CONTINUE
        
        currentProcess = DEQUEUE(readyQueue)
        
        IF currentProcess.responseTime == -1:
            currentProcess.responseTime = currentTime - currentProcess.arrivalTime
        
        executionTime = MIN(timeQuantum, currentProcess.remainingTime)
        currentProcess.remainingTime -= executionTime
        currentTime += executionTime
        
        IF currentProcess.remainingTime == 0:
            currentProcess.completionTime = currentTime
            completed++
        ELSE:
            ADD currentProcess TO readyQueue

// Priority Scheduling with Aging
ALGORITHM Priority_Scheduling_With_Aging(processes[]):
    readyQueue = PriorityQueue(compareByPriority)
    currentTime = 0
    AGING_FACTOR = 1
    AGING_INTERVAL = 10
    
    WHILE processes_remaining:
        FOR each process p IN processes:
            IF p.arrivalTime <= currentTime AND NOT p.added:
                ADD p TO readyQueue
        
        IF currentTime % AGING_INTERVAL == 0:
            FOR each process p IN readyQueue:
                p.effectivePriority = MAX(0, p.effectivePriority - AGING_FACTOR)
        
        highestPriorityProcess = readyQueue.poll()
        EXECUTE(highestPriorityProcess)

// Multilevel Feedback Queue
ALGORITHM Multilevel_Feedback_Queue():
    queue1 = Queue()  // quantum = 8ms
    queue2 = Queue()  // quantum = 16ms  
    queue3 = Queue()  // FCFS
    
    WHILE processes_remaining:
        IF NOT queue1.empty():
            process = DEQUEUE(queue1)
            EXECUTE(process, 8)
            IF process.remainingTime > 0:
                ENQUEUE(process, queue2)
        ELSE IF NOT queue2.empty():
            process = DEQUEUE(queue2)
            EXECUTE(process, 16)
            IF process.remainingTime > 0:
                ENQUEUE(process, queue3)
        ELSE IF NOT queue3.empty():
            process = DEQUEUE(queue3)
            EXECUTE(process, process.remainingTime)

// Performance Metrics
Turnaround Time = Completion Time - Arrival Time
Waiting Time = Turnaround Time - Burst Time
Response Time = First CPU Time - Arrival Time
CPU Utilization = (Total CPU Time) / (Total Elapsed Time)
Throughput = Number of Processes / Total Time`
    }],
    questions: [
      { question: "Compare FCFS, SJF, and Round Robin algorithms.", answer: "FCFS: Simple, no starvation, but convoy effect where short processes wait behind long ones. SJF: Optimal average waiting time, but requires burst time prediction and can starve long processes. Round Robin: Fair time allocation, good response time, but context switching overhead with small quantum." },
      { question: "What is the convoy effect in FCFS scheduling?", answer: "Convoy effect occurs when short processes get stuck behind a long-running process, significantly increasing average waiting time. Example: CPU-intensive process (100ms) before I/O-bound processes (5ms each) causes all short processes to wait unnecessarily." },
      { question: "How do you choose optimal time quantum in Round Robin?", answer: "Balance response time and overhead. Too small (1-5ms): excessive context switching. Too large (>100ms): approaches FCFS. Optimal: 10-100ms, typically 20-50ms. Rule: quantum should be larger than 80% of CPU bursts." },
      { question: "Explain starvation in priority scheduling and prevention methods.", answer: "Starvation occurs when low-priority processes never get CPU due to continuous high-priority arrivals. Prevention: 1) Aging - gradually increase priority over time, 2) Priority inheritance, 3) Multilevel feedback queues with promotion." },
      { question: "Differentiate between preemptive and non-preemptive scheduling.", answer: "Non-preemptive: process runs until completion or voluntary yield (FCFS, SJF). Preemptive: OS can interrupt running process (Round Robin, SRTF). Preemptive provides better response time but higher overhead." },
      { question: "What is Shortest Remaining Time First (SRTF)?", answer: "Preemptive version of SJF that switches to newly arrived processes with shorter remaining time. Provides optimal average waiting time but increases context switching overhead and complexity." },
      { question: "How does multilevel queue scheduling work?", answer: "Partitions processes into separate queues by type (system, interactive, batch) with different algorithms and priorities. Each queue has fixed priority, with higher queues served first." },
      { question: "What performance metrics evaluate scheduling algorithms?", answer: "CPU Utilization (maximize), Throughput (maximize), Turnaround Time (minimize), Waiting Time (minimize), Response Time (minimize for interactive). Different algorithms optimize different metrics." },
      { question: "Explain aging in process scheduling.", answer: "Aging prevents starvation by gradually increasing priority of waiting processes. Implementation: track waiting time, periodically boost priority, reset when process runs. Ensures bounded waiting time." },
      { question: "Compare turnaround time, waiting time, and response time.", answer: "Turnaround Time = Completion - Arrival (total time in system). Waiting Time = Turnaround - Burst (time in ready queue). Response Time = First CPU - Arrival (time to first response). Response critical for interactive systems." }
    ]
  },
  {
    id: 'multithreading-multiprocessing',
    title: 'Multithreading vs Multiprocessing',
    explanation: 'Multithreading and multiprocessing are two approaches to achieving parallelism. Multithreading uses multiple threads within a single process for shared memory communication, while multiprocessing uses multiple processes for isolation and fault tolerance. The choice depends on application requirements for performance, isolation, and scalability.',
    keyPoints: [
      'Multithreading uses shared memory, multiprocessing uses separate spaces',
      'Threads communicate faster, processes provide better isolation',
      'Thread creation is lightweight, process creation is expensive',
      'Multithreading good for I/O-bound, multiprocessing for CPU-bound',
      'Threads share resources, processes have independent resources',
      'Hybrid approaches combine benefits of both techniques'
    ],
    codeExamples: [{
      title: 'Multithreading vs Multiprocessing Implementation',
      language: 'java',
      code: `// Multithreading Implementation
class MultithreadingExample {
    shared_data = 0
    mutex = Mutex()
    
    ALGORITHM WorkerThread(threadId):
        FOR i = 0 TO 1000:
            mutex.lock()
            shared_data++
            mutex.unlock()
            PERFORM_COMPUTATION()
    
    ALGORITHM CreateThreads():
        threads = []
        FOR i = 0 TO NUM_THREADS:
            thread = CREATE_THREAD(WorkerThread, i)
            threads.add(thread)
        
        FOR each thread IN threads:
            JOIN_THREAD(thread)
}

// Multiprocessing Implementation
class MultiprocessingExample {
    ALGORITHM WorkerProcess(processId, sharedMemory):
        FOR i = 0 TO 1000:
            ACQUIRE_SEMAPHORE(sharedMemory.semaphore)
            sharedMemory.data++
            RELEASE_SEMAPHORE(sharedMemory.semaphore)
            PERFORM_COMPUTATION()
    
    ALGORITHM CreateProcesses():
        sharedMemory = CREATE_SHARED_MEMORY()
        processes = []
        
        FOR i = 0 TO NUM_PROCESSES:
            pid = FORK()
            IF pid == 0:  // Child process
                WorkerProcess(i, sharedMemory)
                EXIT()
            ELSE:  // Parent process
                processes.add(pid)
        
        FOR each pid IN processes:
            WAIT_FOR_PROCESS(pid)
}

// Performance Comparison
Multithreading Characteristics:
- Shared memory space (fast communication)
- Light context switching (1-10 microseconds)
- Lower memory overhead
- Weak fault isolation
- Synchronization complexity (race conditions)
- Good for I/O-bound tasks
- Limited by GIL in some languages

Multiprocessing Characteristics:
- Separate memory spaces (IPC required)
- Heavy context switching (100-1000 microseconds)
- Higher memory overhead
- Strong fault isolation
- Complex communication (serialization)
- Good for CPU-intensive tasks
- True parallelism on multi-core systems

// Hybrid Approach
ALGORITHM HybridApproach():
    // Create multiple processes
    FOR i = 0 TO NUM_PROCESSES:
        pid = FORK()
        IF pid == 0:
            // Each process creates multiple threads
            FOR j = 0 TO THREADS_PER_PROCESS:
                CREATE_THREAD(WorkerThread, j)
            WAIT_FOR_ALL_THREADS()
            EXIT()
    
    // Parent waits for all processes
    FOR i = 0 TO NUM_PROCESSES:
        WAIT_FOR_PROCESS()

// Communication Mechanisms
Thread Communication:
- Shared variables (direct memory access)
- Mutexes and condition variables
- Thread-safe data structures
- Lock-free programming

Process Communication:
- Pipes (named and unnamed)
- Message queues
- Shared memory segments
- Sockets (network or Unix domain)
- Memory-mapped files`
    }],
    questions: [
      { question: "When should you choose multithreading over multiprocessing?", answer: "Choose multithreading for: shared data processing, responsive UIs, I/O-bound tasks, fast inter-thread communication, lower memory usage. Threads are ideal when tasks need to share state frequently and fault isolation is less critical." },
      { question: "When should you choose multiprocessing over multithreading?", answer: "Choose multiprocessing for: CPU-intensive tasks, fault isolation requirements, security boundaries, distributed computing, avoiding GIL limitations. Processes are ideal when tasks are independent and system stability is crucial." },
      { question: "What are the performance implications of each approach?", answer: "Multithreading: faster context switching, shared memory efficiency, but synchronization overhead and potential contention. Multiprocessing: slower context switching, IPC overhead, but true parallelism and no shared state contention." },
      { question: "How do memory models differ between threads and processes?", answer: "Threads: shared heap, code, and data segments; separate stacks; risk of memory corruption. Processes: completely separate virtual address spaces; no shared memory corruption; higher memory overhead due to duplication." },
      { question: "Explain the communication mechanisms for threads vs processes.", answer: "Thread communication: shared variables, mutexes, condition variables, atomic operations (fast, direct). Process communication: pipes, message queues, shared memory, sockets (slower, requires serialization/deserialization)." },
      { question: "What are the debugging challenges with each approach?", answer: "Multithreading: race conditions, deadlocks, non-deterministic behavior, shared state corruption. Multiprocessing: complex IPC debugging, process synchronization issues, but easier isolation and independent debugging." },
      { question: "How do exceptions and error handling differ?", answer: "Threads: unhandled exception can crash entire process, affecting all threads; requires careful exception handling. Processes: exceptions isolated to individual process; system remains stable; easier error recovery." },
      { question: "What is the Global Interpreter Lock (GIL) and its impact?", answer: "GIL prevents multiple threads from executing Python bytecode simultaneously, limiting multithreading effectiveness for CPU-bound tasks in Python. Multiprocessing bypasses GIL by using separate interpreters in each process." },
      { question: "How do scalability patterns differ between approaches?", answer: "Multithreading: vertical scaling (more cores), limited by synchronization overhead and memory bandwidth. Multiprocessing: both vertical and horizontal scaling (distributed systems), better for independent tasks." },
      { question: "What are hybrid approaches combining both techniques?", answer: "Hybrid models use multiple processes, each with multiple threads. Examples: web servers (process pool + thread pool), actor model systems, microservices with internal threading. Combines fault isolation with performance benefits." }
    ]
  },
  {
    id: 'user-kernel-mode',
    title: 'User Mode vs Kernel Mode',
    explanation: 'User mode and kernel mode are two distinct execution modes in modern processors that provide different levels of system access and privileges. This separation is fundamental to system security, stability, and resource protection in operating systems.',
    codeExamples: [{
      title: 'Mode Switching Mechanisms',
      language: 'java',
      code: `// Mode Switching Mechanisms
ALGORITHM SystemCall(syscallNumber, parameters):
    // User mode to kernel mode transition
    SAVE_USER_CONTEXT()
    SWITCH_TO_KERNEL_STACK()
    SET_PRIVILEGE_LEVEL(KERNEL_MODE)
    VALIDATE_PARAMETERS(parameters)
    
    SWITCH syscallNumber:
        CASE SYS_READ:
            result = kernel_read(parameters)
        CASE SYS_WRITE:
            result = kernel_write(parameters)
        CASE SYS_OPEN:
            result = kernel_open(parameters)
        DEFAULT:
            result = -ENOSYS
    
    // Kernel mode to user mode transition
    RESTORE_USER_CONTEXT()
    SWITCH_TO_USER_STACK()
    SET_PRIVILEGE_LEVEL(USER_MODE)
    RETURN result

// Privilege Levels (x86 Architecture)
Ring 0 (Kernel Mode):
- Full instruction set access
- Direct hardware manipulation
- Memory management control
- Interrupt handling
- I/O port access
- Critical system operations

Ring 1-2 (System Services):
- Device drivers
- System services
- Limited hardware access
- Intermediate privilege level

Ring 3 (User Mode):
- Application programs
- Restricted instruction set
- No direct hardware access
- Memory protection enforced
- System calls for privileged operations

// Mode Switch Overhead
ALGORITHM MeasureModeSwitch():
    start_time = GET_TIMESTAMP()
    
    // Perform system call
    SYSTEM_CALL(SYS_getpid)
    
    end_time = GET_TIMESTAMP()
    overhead = end_time - start_time
    
    // Typical overhead: 100-1000 CPU cycles
    RETURN overhead

// Memory Protection
User Mode Memory Access:
- Virtual memory through page tables
- Access only to user space (0x00000000 - 0x7FFFFFFF)
- Page fault on kernel space access
- No direct physical memory access

Kernel Mode Memory Access:
- Full virtual and physical memory access
- Kernel space (0x80000000 - 0xFFFFFFFF)
- Direct hardware register access
- Memory management operations

// Interrupt and Exception Handling
ALGORITHM InterruptHandler():
    // Automatic mode switch to kernel mode
    SAVE_INTERRUPTED_CONTEXT()
    DISABLE_INTERRUPTS()
    
    // Determine interrupt source
    interrupt_vector = READ_INTERRUPT_CONTROLLER()
    
    // Call appropriate handler
    CALL_INTERRUPT_SERVICE_ROUTINE(interrupt_vector)
    
    // Return to previous mode
    RESTORE_INTERRUPTED_CONTEXT()
    ENABLE_INTERRUPTS()
    RETURN_FROM_INTERRUPT()

// Security Implications
User Mode Security:
- Cannot access other processes' memory
- Cannot execute privileged instructions
- Cannot directly access hardware
- Sandboxed execution environment

Kernel Mode Security:
- Complete system access
- Must validate all user inputs
- Responsible for access control
- Single point of failure for security`
    }],
    questions: [
      { question: "What is the difference between user mode and kernel mode?", answer: "User mode: restricted execution environment with limited instruction set, no direct hardware access, memory protection enforced. Kernel mode: privileged execution with full instruction set, direct hardware access, complete memory access, interrupt handling capability." },
      { question: "How does mode switching occur and what triggers it?", answer: "Mode switching occurs via: system calls (user to kernel), interrupts (hardware events), exceptions (page faults, illegal instructions), timer interrupts. Process involves saving context, changing privilege level, switching stacks, and validating operations." },
      { question: "What is the overhead of mode switching and how can it be minimized?", answer: "Overhead includes: context saving/restoring, privilege level changes, stack switching, parameter validation (typically 100-1000 cycles). Minimization: batch system calls, use user-level libraries, asynchronous I/O, memory-mapped I/O, fast system call instructions." },
      { question: "Explain the x86 privilege ring architecture.", answer: "Ring 0 (kernel): full privileges, hardware access, memory management. Ring 1-2 (system services): device drivers, intermediate privileges. Ring 3 (user): applications, restricted access. Most modern systems use only Ring 0 and Ring 3 for simplicity." },
      { question: "How does memory protection work between modes?", answer: "User mode: access only user space (lower virtual addresses), page tables enforce protection, page faults on kernel space access. Kernel mode: access all memory including kernel space, can modify page tables, direct physical memory access." },
      { question: "What security implications arise from mode separation?", answer: "User mode provides sandboxing, prevents direct hardware access, isolates processes. Kernel mode is trusted computing base, must validate all inputs, single point of failure. Vulnerabilities in kernel mode can compromise entire system." },
      { question: "How do system calls bridge user and kernel modes?", answer: "System calls provide controlled interface: user mode makes request via software interrupt, kernel validates parameters, executes privileged operation, returns result to user mode. Examples: file I/O, process creation, network operations." },
      { question: "What happens during interrupt handling regarding modes?", answer: "Interrupts automatically switch to kernel mode, save interrupted context, disable interrupts, execute interrupt service routine, restore context, return to previous mode. Critical for handling hardware events and maintaining system responsiveness." },
      { question: "How do different architectures implement mode separation?", answer: "x86: Ring-based protection with 4 levels. ARM: Exception levels (EL0-EL3) with TrustZone. RISC-V: Machine, Supervisor, User modes. Each provides hardware-enforced privilege separation with different granularities." },
      { question: "What are the performance considerations of frequent mode switches?", answer: "Frequent switches cause: CPU overhead, cache pollution, TLB flushes, pipeline stalls. Optimization strategies: user-level threading, event-driven programming, batched operations, memory-mapped I/O, and minimizing system call frequency." }
    ]
  },
  {
    id: 'synchronization',
    title: 'Synchronization',
    explanation: 'Process synchronization ensures correct execution of cooperating processes by coordinating access to shared resources and data. It prevents race conditions, ensures data consistency, and maintains system integrity in concurrent environments. Key concepts include critical sections, mutual exclusion mechanisms, and classic synchronization problems.',
    codeExamples: [{
      title: 'Synchronization Fundamentals',
      language: 'java',
      code: `// Critical Section Problem Framework
ALGORITHM CriticalSection():
    ENTRY_SECTION()     // Request permission to enter
    CRITICAL_SECTION()  // Access shared resource
    EXIT_SECTION()      // Release permission
    REMAINDER_SECTION() // Non-critical work

// Requirements: Mutual Exclusion, Progress, Bounded Waiting

// Race Condition Example
shared_variable = 0

ALGORITHM Process1():
    temp = shared_variable
    temp = temp + 1
    shared_variable = temp

ALGORITHM Process2():
    temp = shared_variable
    temp = temp + 1
    shared_variable = temp

// Without synchronization: final value unpredictable
// With synchronization: final value = 2

// Hardware Support - Test-and-Set
ALGORITHM TestAndSet(target):
    boolean rv = target
    target = true
    RETURN rv

// Spin Lock using Test-and-Set
class SpinLock {
    boolean lock = false
    
    acquire():
        WHILE TestAndSet(lock):
            // Busy wait (spin)
    
    release():
        lock = false
}`
    }],
    questions: [
      { question: "What is process synchronization and why is it needed?", answer: "Process synchronization coordinates access to shared resources among concurrent processes to prevent race conditions, ensure data consistency, and maintain system integrity. It's needed because concurrent access to shared data can lead to unpredictable results and system corruption." },
      { question: "What is a race condition and how can it be prevented?", answer: "Race condition occurs when multiple processes access shared data concurrently, and the final result depends on timing of execution. Prevention methods: mutual exclusion (locks/mutexes), atomic operations, semaphores, monitors, and proper synchronization primitives." },
      { question: "What are the three requirements for a critical section solution?", answer: "1) Mutual Exclusion - only one process in critical section at a time, 2) Progress - if no process is in critical section and some want to enter, selection cannot be postponed indefinitely, 3) Bounded Waiting - limit on number of times other processes enter before a waiting process gets access." },
      { question: "How do hardware synchronization primitives work?", answer: "Hardware primitives like Test-and-Set, Compare-and-Swap, and Fetch-and-Add provide atomic operations that cannot be interrupted. They form the foundation for higher-level synchronization constructs and enable lock-free programming techniques." },
      { question: "What is the difference between busy waiting and blocking?", answer: "Busy waiting (spinning) continuously checks condition consuming CPU cycles, good for short waits and multiprocessor systems. Blocking puts process to sleep until condition met, requires context switching, good for long waits and single processor systems." },
      { question: "Explain Peterson's solution for two-process synchronization.", answer: "Peterson's solution uses two shared variables: flag[] (indicates process wants to enter) and turn (indicates whose turn it is). It satisfies all three critical section requirements using only shared memory, but only works for two processes." },
      { question: "What are the advantages and disadvantages of software-only synchronization?", answer: "Advantages: no special hardware required, portable across architectures. Disadvantages: complex to implement correctly, may not scale well, can be inefficient, difficult to extend to multiple processes, prone to programming errors." },
      { question: "How do atomic operations help in synchronization?", answer: "Atomic operations execute as single, indivisible units that cannot be interrupted. They provide foundation for lock-free data structures, implement synchronization primitives, ensure memory consistency, and enable efficient concurrent algorithms without traditional locking." },
      { question: "What is the ABA problem in lock-free programming?", answer: "ABA problem occurs when a value changes from A to B and back to A between reads, making Compare-and-Swap think nothing changed. Solutions include: using version numbers, hazard pointers, or epoch-based memory management to detect intermediate changes." },
      { question: "How does memory ordering affect synchronization?", answer: "Memory ordering determines when memory operations become visible to other processors. Weak ordering can reorder operations for performance, requiring memory barriers/fences to ensure correct synchronization. Strong ordering provides sequential consistency but may impact performance." }
    ]
  },
  {
    id: 'critical-section-problem',
    title: 'Critical Section Problem',
    explanation: 'The critical section problem involves designing protocols to ensure that when one process is executing in its critical section, no other process can execute in its critical section. It is fundamental to process synchronization and requires solutions that satisfy mutual exclusion, progress, and bounded waiting.',
    codeExamples: [{
      title: 'Critical Section Solutions',
      language: 'java',
      code: `// Peterson's Algorithm (Two Process Solution)
class PetersonsAlgorithm {
    boolean[] flag = new boolean[2];  // flag[i] = true if process i wants to enter
    int turn;  // whose turn it is to enter
    
    ALGORITHM Process_i(int i):
        int j = 1 - i;  // other process
        
        // Entry section
        flag[i] = true;
        turn = j;
        WHILE (flag[j] && turn == j):
            // Busy wait
        
        // Critical section
        CRITICAL_SECTION()
        
        // Exit section
        flag[i] = false;
        
        // Remainder section
        REMAINDER_SECTION()
}

// Bakery Algorithm (N Process Solution)
class BakeryAlgorithm {
    boolean[] choosing = new boolean[n];
    int[] number = new int[n];
    
    ALGORITHM Process_i(int i):
        // Entry section
        choosing[i] = true;
        number[i] = MAX(number[0], number[1], ..., number[n-1]) + 1;
        choosing[i] = false;
        
        FOR j = 0 TO n-1:
            WHILE choosing[j]:
                // Wait until j finishes choosing
            
            WHILE (number[j] != 0) AND 
                  ((number[j], j) < (number[i], i)):
                // Wait until j finishes or has higher priority
        
        // Critical section
        CRITICAL_SECTION()
        
        // Exit section
        number[i] = 0;
}

// Hardware-based Solution using Test-and-Set
class TestAndSetLock {
    boolean lock = false;
    
    ALGORITHM acquire():
        WHILE TestAndSet(lock):
            // Busy wait until lock is acquired
    
    ALGORITHM release():
        lock = false;
    
    ALGORITHM TestAndSet(boolean target):
        boolean rv = target;
        target = true;
        RETURN rv;
}

// Compare-and-Swap Implementation
class CompareAndSwapLock {
    int lock = 0;  // 0 = unlocked, 1 = locked
    
    ALGORITHM acquire():
        WHILE CompareAndSwap(lock, 0, 1) != 0:
            // Busy wait
    
    ALGORITHM release():
        lock = 0;
    
    ALGORITHM CompareAndSwap(int value, int expected, int new_value):
        int temp = value;
        IF value == expected:
            value = new_value;
        RETURN temp;
}

// Bounded Waiting Solution
class BoundedWaitingLock {
    boolean[] waiting = new boolean[n];
    boolean lock = false;
    
    ALGORITHM acquire(int i):
        waiting[i] = true;
        key = true;
        WHILE waiting[i] AND key:
            key = TestAndSet(lock);
        waiting[i] = false;
    
    ALGORITHM release(int i):
        j = (i + 1) % n;
        WHILE (j != i) AND NOT waiting[j]:
            j = (j + 1) % n;
        
        IF j == i:
            lock = false;
        ELSE:
            waiting[j] = false;
}`
    }],
    questions: [
      { question: "What is the critical section problem and its requirements?", answer: "Critical section problem involves ensuring only one process executes in critical section at a time. Requirements: 1) Mutual Exclusion - exclusive access, 2) Progress - no indefinite postponement when critical section is free, 3) Bounded Waiting - limit on times others enter before a waiting process." },
      { question: "Explain Peterson's algorithm and prove it satisfies all requirements.", answer: "Peterson's algorithm uses flag[] and turn variables. Mutual exclusion: both processes can't have flag[i]=true and turn pointing to them simultaneously. Progress: if one process doesn't want to enter, other can proceed. Bounded waiting: alternating turn ensures fairness." },
      { question: "What is the Bakery algorithm and how does it work?", answer: "Bakery algorithm assigns numbers like bakery queue system. Process with smallest number enters first. Uses (number, process_id) for tie-breaking. Handles n processes, ensures FIFO ordering, but requires atomic read/write of multi-word values." },
      { question: "How do hardware synchronization instructions solve critical section problem?", answer: "Hardware instructions like Test-and-Set, Compare-and-Swap provide atomic operations that cannot be interrupted. They enable simple, efficient solutions but may cause busy waiting. Modern processors provide these primitives for building higher-level synchronization constructs." },
      { question: "What are the advantages and disadvantages of software-only solutions?", answer: "Advantages: no special hardware, works on any system, provably correct. Disadvantages: complex implementation, busy waiting wastes CPU, difficult to extend beyond few processes, may not work with modern compiler optimizations and weak memory models." },
      { question: "How does the bounded waiting requirement prevent starvation?", answer: "Bounded waiting ensures that after a process requests entry, there's a limit on how many times other processes can enter before it gets access. This prevents indefinite postponement (starvation) and guarantees eventual access to critical section." },
      { question: "What is the difference between Test-and-Set and Compare-and-Swap?", answer: "Test-and-Set atomically reads and sets a boolean value, returning old value. Compare-and-Swap atomically compares value with expected and updates if equal, returning old value. CAS is more powerful, enabling lock-free data structures and ABA problem solutions." },
      { question: "Why don't simple flag-based solutions work for critical section problem?", answer: "Simple flags can lead to: 1) Violation of mutual exclusion if both processes set flags simultaneously, 2) Deadlock if both processes wait for each other, 3) No progress if processes alternate in lockstep. Need additional coordination mechanism like turn variable." },
      { question: "How do memory consistency models affect critical section solutions?", answer: "Weak memory models allow instruction reordering, potentially breaking software solutions. Modern processors may reorder reads/writes for performance. Solutions need memory barriers/fences to ensure correct ordering, or rely on hardware atomic instructions that provide necessary guarantees." },
      { question: "What is priority inversion in context of critical sections?", answer: "Priority inversion occurs when high-priority process waits for low-priority process holding critical section, while medium-priority process runs. Solutions: priority inheritance (boost holder's priority), priority ceiling protocol (inherit maximum priority of all resources)." }
    ]
  },
  {
    id: 'race-condition',
    title: 'Race Condition',
    explanation: 'A race condition occurs when multiple processes or threads access shared data concurrently, and the final result depends on the relative timing of their execution. Race conditions can lead to data corruption, inconsistent states, and unpredictable program behavior, making them critical to identify and prevent.',
    codeExamples: [{
      title: 'Race Condition Examples and Prevention',
      language: 'java',
      code: `// Classic Race Condition Example
class BankAccount {
    private int balance = 1000;
    
    // Unsafe method - race condition possible
    public void withdraw(int amount) {
        int temp = balance;        // Read
        temp = temp - amount;      // Modify
        balance = temp;            // Write
    }
    
    // Safe method - synchronized
    public synchronized void safeWithdraw(int amount) {
        balance = balance - amount;
    }
}

// Race Condition in Counter
class UnsafeCounter {
    private int count = 0;
    
    public void increment() {
        count++;  // Not atomic: read, increment, write
    }
}

class SafeCounter {
    private int count = 0;
    private final Object lock = new Object();
    
    public void increment() {
        synchronized(lock) {
            count++;
        }
    }
    
    // Or using atomic operations
    private AtomicInteger atomicCount = new AtomicInteger(0);
    
    public void atomicIncrement() {
        atomicCount.incrementAndGet();
    }
}

// Producer-Consumer Race Condition
class Buffer {
    private int[] buffer = new int[10];
    private int count = 0;
    
    // Unsafe - race condition between producer and consumer
    public void produce(int item) {
        buffer[count] = item;
        count++;
    }
    
    public int consume() {
        count--;
        return buffer[count];
    }
    
    // Safe version with synchronization
    public synchronized void safeProduce(int item) {
        while (count == buffer.length) {
            wait();  // Buffer full
        }
        buffer[count] = item;
        count++;
        notifyAll();
    }
    
    public synchronized int safeConsume() {
        while (count == 0) {
            wait();  // Buffer empty
        }
        count--;
        int item = buffer[count];
        notifyAll();
        return item;
    }
}

// Check-Then-Act Race Condition
class SingletonRaceCondition {
    private static Singleton instance;
    
    // Unsafe - race condition in lazy initialization
    public static Singleton getInstance() {
        if (instance == null) {           // Check
            instance = new Singleton();   // Act
        }
        return instance;
    }
    
    // Safe - double-checked locking
    public static Singleton getSafeInstance() {
        if (instance == null) {
            synchronized(Singleton.class) {
                if (instance == null) {
                    instance = new Singleton();
                }
            }
        }
        return instance;
    }
}

// Time-of-Check-Time-of-Use (TOCTOU) Race
ALGORITHM FileAccessRace():
    // Unsafe
    IF FILE_EXISTS(filename):     // Check
        content = READ_FILE(filename)  // Use
    
    // Safe
    TRY:
        content = READ_FILE(filename)
    CATCH FileNotFoundException:
        HANDLE_ERROR()

// Prevention Techniques
1. Mutual Exclusion (Locks, Mutexes)
2. Atomic Operations
3. Immutable Objects
4. Thread-Local Storage
5. Lock-Free Programming
6. Message Passing`
    }],
    questions: [
      { question: "What is a race condition and what causes it?", answer: "Race condition occurs when multiple processes/threads access shared data concurrently, and the final result depends on execution timing. Caused by: non-atomic operations on shared data, lack of proper synchronization, interleaving of read-modify-write operations, and concurrent access without coordination." },
      { question: "Explain the classic bank account race condition example.", answer: "Two threads withdrawing from same account: Thread1 reads balance (1000), Thread2 reads balance (1000), Thread1 subtracts 100 (writes 900), Thread2 subtracts 200 (writes 800). Final balance is 800 instead of correct 700. Both threads read same initial value before either completes update." },
      { question: "What is the difference between race condition and data race?", answer: "Data race: concurrent access to shared memory where at least one is write, without synchronization. Race condition: broader concept where program correctness depends on timing. Data race is implementation-level, race condition is design-level. Data race can cause race condition but not always." },
      { question: "How do atomic operations prevent race conditions?", answer: "Atomic operations execute as single, indivisible units that cannot be interrupted. They prevent race conditions by ensuring read-modify-write sequences complete without interference. Examples: atomic increment, compare-and-swap, test-and-set. Hardware guarantees atomicity at instruction level." },
      { question: "What is check-then-act race condition and how to prevent it?", answer: "Check-then-act occurs when checking condition and acting on it are separate operations, allowing state to change between check and act. Example: if(list.size() > 0) list.remove(). Prevention: use atomic operations, synchronization blocks, or exception handling instead of pre-checking." },
      { question: "Explain Time-of-Check-Time-of-Use (TOCTOU) race conditions.", answer: "TOCTOU occurs when checking resource availability and using it are separate operations, allowing resource state to change between check and use. Common in file systems, security checks. Prevention: use atomic operations, proper locking, or handle exceptions rather than pre-checking." },
      { question: "How do immutable objects help prevent race conditions?", answer: "Immutable objects cannot be modified after creation, eliminating shared mutable state that causes race conditions. Multiple threads can safely read immutable objects without synchronization. Any 'modification' creates new object, avoiding concurrent modification issues. Functional programming heavily uses this approach." },
      { question: "What are the different strategies to prevent race conditions?", answer: "1) Mutual exclusion (locks, mutexes), 2) Atomic operations, 3) Immutable data structures, 4) Thread-local storage, 5) Lock-free programming with CAS, 6) Message passing instead of shared memory, 7) Actor model, 8) Software transactional memory." },
      { question: "How does the happens-before relationship help understand race conditions?", answer: "Happens-before defines ordering between operations across threads. If operation A happens-before B, then A's effects are visible to B. Race conditions occur when operations lack happens-before relationship. Synchronization primitives establish happens-before edges, ensuring proper ordering and visibility." },
      { question: "What tools and techniques can detect race conditions?", answer: "Static analysis tools (FindBugs, Clang Static Analyzer), dynamic analysis (ThreadSanitizer, Helgrind), stress testing with multiple threads, code review focusing on shared data access, formal verification methods, and runtime detection tools that monitor memory access patterns." }
    ]
  },
  {
    id: 'mutex-vs-semaphore',
    title: 'Mutex vs Semaphore (Binary vs Counting)',
    explanation: 'Mutex and semaphores are synchronization primitives with different characteristics. Mutex provides mutual exclusion with ownership concept, while semaphores can be binary (like mutex) or counting (allowing multiple access). Understanding their differences is crucial for choosing the right synchronization mechanism.',
    codeExamples: [{
      title: 'Mutex vs Semaphore Implementation',
      language: 'java',
      code: `// Mutex Implementation
class Mutex {
    private boolean locked = false;
    private Thread owner = null;
    private Queue<Thread> waitingQueue = new LinkedList<>();
    
    public synchronized void lock() {
        Thread currentThread = Thread.currentThread();
        
        while (locked) {
            waitingQueue.add(currentThread);
            try {
                wait();
            } catch (InterruptedException e) {
                waitingQueue.remove(currentThread);
                throw e;
            }
        }
        
        locked = true;
        owner = currentThread;
    }
    
    public synchronized void unlock() {
        if (owner != Thread.currentThread()) {
            throw new IllegalStateException("Only owner can unlock");
        }
        
        locked = false;
        owner = null;
        
        if (!waitingQueue.isEmpty()) {
            notify();
        }
    }
}

// Binary Semaphore Implementation
class BinarySemaphore {
    private int value;
    private Queue<Thread> waitingQueue = new LinkedList<>();
    
    public BinarySemaphore(int initialValue) {
        this.value = (initialValue > 0) ? 1 : 0;
    }
    
    public synchronized void wait() {  // P operation
        while (value == 0) {
            waitingQueue.add(Thread.currentThread());
            try {
                wait();
            } catch (InterruptedException e) {
                waitingQueue.remove(Thread.currentThread());
                throw e;
            }
        }
        value = 0;
    }
    
    public synchronized void signal() {  // V operation
        value = 1;
        if (!waitingQueue.isEmpty()) {
            waitingQueue.poll();
            notify();
        }
    }
}

// Counting Semaphore Implementation
class CountingSemaphore {
    private int value;
    private Queue<Thread> waitingQueue = new LinkedList<>();
    
    public CountingSemaphore(int initialValue) {
        this.value = Math.max(0, initialValue);
    }
    
    public synchronized void wait() {  // P operation
        while (value == 0) {
            waitingQueue.add(Thread.currentThread());
            try {
                wait();
            } catch (InterruptedException e) {
                waitingQueue.remove(Thread.currentThread());
                throw e;
            }
        }
        value--;
    }
    
    public synchronized void signal() {  // V operation
        value++;
        if (!waitingQueue.isEmpty()) {
            waitingQueue.poll();
            notify();
        }
    }
    
    public synchronized int availablePermits() {
        return value;
    }
}

// Usage Examples

// Mutex for Critical Section
Mutex mutex = new Mutex();

ALGORITHM CriticalSectionWithMutex():
    mutex.lock()
    try {
        // Critical section
        SHARED_RESOURCE_ACCESS()
    } finally {
        mutex.unlock()
    }

// Counting Semaphore for Resource Pool
CountingSemaphore resourcePool = new CountingSemaphore(5);

ALGORITHM ResourcePoolAccess():
    resourcePool.wait()  // Acquire resource
    try {
        USE_RESOURCE()
    } finally {
        resourcePool.signal()  // Release resource
    }

// Binary Semaphore for Signaling
BinarySemaphore signal = new BinarySemaphore(0);

ALGORITHM Producer():
    PRODUCE_ITEM()
    signal.signal()  // Notify consumer

ALGORITHM Consumer():
    signal.wait()    // Wait for signal
    CONSUME_ITEM()

// Comparison Summary
Mutex Characteristics:
- Binary (locked/unlocked)
- Ownership concept
- Only owner can unlock
- Recursive locking possible
- Priority inheritance support

Binary Semaphore Characteristics:
- Binary (0/1)
- No ownership
- Any thread can signal
- Used for signaling
- Simpler implementation

Counting Semaphore Characteristics:
- Integer value (0 to N)
- Resource counting
- Multiple concurrent access
- No ownership
- Resource pool management`
    }],
    questions: [
      { question: "What is the fundamental difference between mutex and semaphore?", answer: "Mutex: binary lock with ownership concept, only the thread that acquired it can release it, used for mutual exclusion. Semaphore: counting mechanism without ownership, any thread can signal, used for resource counting and signaling between threads." },
      { question: "When should you use a mutex vs a binary semaphore?", answer: "Use mutex for: protecting critical sections, ensuring mutual exclusion, when ownership matters, recursive locking needs. Use binary semaphore for: signaling between threads, synchronization without ownership, producer-consumer signaling, event notification." },
      { question: "Explain the difference between binary and counting semaphores.", answer: "Binary semaphore: value is 0 or 1, acts like a flag, used for signaling and simple mutual exclusion. Counting semaphore: value can be 0 to N, tracks available resources, allows multiple concurrent access up to limit, used for resource pools." },
      { question: "What is the ownership concept in mutex and why is it important?", answer: "Ownership means only the thread that acquired the mutex can release it. Important for: preventing accidental unlocking by wrong thread, enabling recursive locking, supporting priority inheritance, debugging deadlocks, ensuring proper resource management." },
      { question: "How do you implement a counting semaphore using binary semaphores?", answer: "Use multiple binary semaphores with additional synchronization: maintain counter with mutex protection, use binary semaphore for blocking, implement wait() by decrementing counter and blocking if zero, implement signal() by incrementing counter and unblocking waiters." },
      { question: "What are the advantages and disadvantages of each approach?", answer: "Mutex advantages: ownership, priority inheritance, recursive locking, debugging support. Disadvantages: more complex, ownership overhead. Semaphore advantages: flexibility, resource counting, signaling, simpler concept. Disadvantages: no ownership, easier to misuse, potential for errors." },
      { question: "How do priority inheritance and priority ceiling work with mutexes?", answer: "Priority inheritance: when high-priority thread blocks on mutex held by low-priority thread, low-priority thread temporarily inherits high priority. Priority ceiling: mutex has ceiling priority, any thread holding it runs at ceiling priority. Both prevent priority inversion." },
      { question: "Can you implement a mutex using semaphores?", answer: "Yes, using binary semaphore initialized to 1. However, loses ownership concept - any thread can unlock. To add ownership, need additional tracking of which thread holds the semaphore, but this defeats the simplicity advantage." },
      { question: "What is a futex and how does it relate to mutexes?", answer: "Futex (fast userspace mutex) is Linux kernel mechanism combining userspace atomic operations with kernel blocking. Provides efficient mutex implementation: fast path uses atomic operations in userspace, slow path (contention) uses kernel for blocking/waking." },
      { question: "How do reader-writer locks relate to mutexes and semaphores?", answer: "Reader-writer locks allow multiple concurrent readers or single writer. Can be implemented using: combination of mutexes and condition variables, or multiple semaphores (read semaphore for readers, write mutex for writers). Provides more concurrency than simple mutex for read-heavy workloads." }
    ]
  },
  {
    id: 'monitors-and-locks',
    title: 'Monitors and Locks',
    explanation: 'Monitors are high-level synchronization constructs that encapsulate shared data and procedures with automatic mutual exclusion. They provide structured approach to synchronization with condition variables for coordination. Locks are lower-level primitives that can be combined to build monitor-like constructs.',
    codeExamples: [{
      title: 'Monitors and Lock Implementations',
      language: 'java',
      code: `// Monitor Implementation (Java-style)
class BoundedBuffer {
    private int[] buffer;
    private int count, in, out;
    private final Object monitor = new Object();
    
    public BoundedBuffer(int size) {
        buffer = new int[size];
        count = in = out = 0;
    }
    
    public void produce(int item) {
        synchronized(monitor) {  // Monitor entry
            while (count == buffer.length) {
                try {
                    monitor.wait();  // Condition variable
                } catch (InterruptedException e) {
                    Thread.currentThread().interrupt();
                    return;
                }
            }
            
            buffer[in] = item;
            in = (in + 1) % buffer.length;
            count++;
            
            monitor.notifyAll();  // Signal condition
        }  // Monitor exit
    }
    
    public int consume() {
        synchronized(monitor) {
            while (count == 0) {
                try {
                    monitor.wait();
                } catch (InterruptedException e) {
                    Thread.currentThread().interrupt();
                    return -1;
                }
            }
            
            int item = buffer[out];
            out = (out + 1) % buffer.length;
            count--;
            
            monitor.notifyAll();
            return item;
        }
    }
}

// Condition Variable Implementation
class ConditionVariable {
    private Queue<Thread> waitingQueue = new LinkedList<>();
    private Lock associatedLock;
    
    public ConditionVariable(Lock lock) {
        this.associatedLock = lock;
    }
    
    public void wait() throws InterruptedException {
        Thread currentThread = Thread.currentThread();
        waitingQueue.add(currentThread);
        
        associatedLock.unlock();  // Release lock
        
        // Block until signaled
        synchronized(this) {
            while (waitingQueue.contains(currentThread)) {
                this.wait();
            }
        }
        
        associatedLock.lock();    // Reacquire lock
    }
    
    public void signal() {
        synchronized(this) {
            if (!waitingQueue.isEmpty()) {
                waitingQueue.poll();
                this.notify();
            }
        }
    }
    
    public void broadcast() {
        synchronized(this) {
            waitingQueue.clear();
            this.notifyAll();
        }
    }
}

// ReentrantLock Implementation
class ReentrantLock {
    private boolean locked = false;
    private Thread owner = null;
    private int lockCount = 0;
    private Queue<Thread> waitingQueue = new LinkedList<>();
    
    public synchronized void lock() {
        Thread currentThread = Thread.currentThread();
        
        // Reentrant check
        if (owner == currentThread) {
            lockCount++;
            return;
        }
        
        while (locked) {
            waitingQueue.add(currentThread);
            try {
                wait();
            } catch (InterruptedException e) {
                waitingQueue.remove(currentThread);
                throw new RuntimeException(e);
            }
        }
        
        locked = true;
        owner = currentThread;
        lockCount = 1;
    }
    
    public synchronized void unlock() {
        if (owner != Thread.currentThread()) {
            throw new IllegalStateException("Not lock owner");
        }
        
        lockCount--;
        if (lockCount == 0) {
            locked = false;
            owner = null;
            
            if (!waitingQueue.isEmpty()) {
                notify();
            }
        }
    }
    
    public synchronized boolean tryLock() {
        Thread currentThread = Thread.currentThread();
        
        if (owner == currentThread) {
            lockCount++;
            return true;
        }
        
        if (!locked) {
            locked = true;
            owner = currentThread;
            lockCount = 1;
            return true;
        }
        
        return false;
    }
}

// Read-Write Lock Implementation
class ReadWriteLock {
    private int readers = 0;
    private boolean writer = false;
    private Thread writingThread = null;
    private Queue<Thread> writeQueue = new LinkedList<>();
    
    public synchronized void readLock() {
        while (writer || !writeQueue.isEmpty()) {
            try {
                wait();
            } catch (InterruptedException e) {
                throw new RuntimeException(e);
            }
        }
        readers++;
    }
    
    public synchronized void readUnlock() {
        readers--;
        if (readers == 0) {
            notifyAll();
        }
    }
    
    public synchronized void writeLock() {
        Thread currentThread = Thread.currentThread();
        writeQueue.add(currentThread);
        
        while (readers > 0 || writer) {
            try {
                wait();
            } catch (InterruptedException e) {
                writeQueue.remove(currentThread);
                throw new RuntimeException(e);
            }
        }
        
        writeQueue.remove(currentThread);
        writer = true;
        writingThread = currentThread;
    }
    
    public synchronized void writeUnlock() {
        if (writingThread != Thread.currentThread()) {
            throw new IllegalStateException("Not write lock owner");
        }
        
        writer = false;
        writingThread = null;
        notifyAll();
    }
}

// Monitor vs Lock Comparison
Monitor Advantages:
- Automatic mutual exclusion
- Structured programming
- Condition variables integrated
- Less error-prone
- Language support (Java synchronized)

Lock Advantages:
- More flexible
- Timeout support
- Try-lock operations
- Multiple condition variables
- Better performance control`
    }],
    questions: [
      { question: "What is a monitor and how does it differ from locks?", answer: "Monitor is high-level synchronization construct that encapsulates shared data and procedures with automatic mutual exclusion. Differs from locks: automatic lock management, structured approach, integrated condition variables, language support. Locks are lower-level, more flexible but require manual management." },
      { question: "Explain condition variables and their role in monitors.", answer: "Condition variables allow threads to wait for specific conditions within monitors. Operations: wait() releases monitor lock and blocks thread, signal() wakes one waiting thread, broadcast() wakes all waiting threads. Essential for coordination beyond simple mutual exclusion." },
      { question: "What is the difference between Mesa and Hoare monitor semantics?", answer: "Hoare semantics: signaling thread immediately transfers control to signaled thread, guaranteeing condition still holds. Mesa semantics: signaled thread eventually runs but condition may change, requires while loops instead of if statements. Mesa is more practical and commonly implemented." },
      { question: "How do you implement a monitor using locks and condition variables?", answer: "Use mutex for mutual exclusion, condition variables for coordination. Pattern: acquire lock, check condition in while loop, wait if condition false, perform operation, signal condition variables, release lock. Requires careful lock management and proper condition checking." },
      { question: "What is a reentrant lock and why is it useful?", answer: "Reentrant lock allows same thread to acquire it multiple times without deadlocking. Useful for: recursive functions, calling other synchronized methods, complex call chains. Maintains lock count, only releases when count reaches zero. Prevents self-deadlock scenarios." },
      { question: "Explain read-write locks and their advantages.", answer: "Read-write locks allow multiple concurrent readers or single writer. Advantages: increased concurrency for read-heavy workloads, better performance than exclusive locks, maintains data consistency. Implementations must handle reader-writer priority, starvation prevention, and upgrade/downgrade scenarios." },
      { question: "What are the advantages and disadvantages of monitors?", answer: "Advantages: automatic synchronization, structured programming, less error-prone, integrated condition variables, language support. Disadvantages: less flexible than locks, potential performance overhead, limited timeout support, single condition variable in some implementations." },
      { question: "How do you prevent priority inversion with locks?", answer: "Priority inheritance: lock holder inherits highest priority of waiting threads. Priority ceiling: lock has ceiling priority, holder runs at ceiling. Immediate priority ceiling: thread gets ceiling priority upon lock acquisition. Prevents unbounded priority inversion scenarios." },
      { question: "What is lock-free programming and how does it relate to locks?", answer: "Lock-free programming uses atomic operations instead of locks to coordinate threads. Advantages: no deadlocks, better scalability, progress guarantees. Challenges: ABA problem, memory ordering, complexity. Complements rather than replaces locks - used for specific high-performance scenarios." },
      { question: "How do you handle spurious wakeups in monitor implementations?", answer: "Spurious wakeups occur when wait() returns without explicit signal. Handle by: using while loops instead of if statements for condition checking, rechecking condition after wakeup, proper condition variable usage. Essential for robust monitor implementations across different platforms." }
    ]
  },
  {
    id: 'deadlocks',
    title: 'Deadlocks',
    explanation: 'Deadlock is a system state where processes are permanently blocked, each waiting for resources held by others in a circular dependency. It represents a critical system failure requiring careful prevention or recovery. Understanding deadlock conditions, prevention strategies, and detection algorithms is essential for system reliability.',
    codeExamples: [{
      title: 'Deadlock Fundamentals and Examples',
      language: 'java',
      code: `// Classic Deadlock Example
class DeadlockExample {
    private final Object lock1 = new Object();
    private final Object lock2 = new Object();
    
    public void method1() {
        synchronized(lock1) {
            System.out.println("Thread 1: Holding lock1...");
            
            try { Thread.sleep(100); } catch (InterruptedException e) {}
            
            System.out.println("Thread 1: Waiting for lock2...");
            synchronized(lock2) {
                System.out.println("Thread 1: Holding lock1 & lock2...");
            }
        }
    }
    
    public void method2() {
        synchronized(lock2) {
            System.out.println("Thread 2: Holding lock2...");
            
            try { Thread.sleep(100); } catch (InterruptedException e) {}
            
            System.out.println("Thread 2: Waiting for lock1...");
            synchronized(lock1) {
                System.out.println("Thread 2: Holding lock2 & lock1...");
            }
        }
    }
}

// Four Necessary Conditions for Deadlock (Coffman Conditions)
1. Mutual Exclusion: At least one resource must be non-shareable
2. Hold and Wait: Process holds resources while waiting for others
3. No Preemption: Resources cannot be forcibly removed from processes
4. Circular Wait: Circular chain of processes waiting for resources

// Deadlock Prevention by Eliminating Conditions

// 1. Eliminate Mutual Exclusion
ALGORITHM Spooling_Example():
    // Make printer shareable through spooling
    INSTEAD_OF: direct_printer_access
    USE: print_spooler_daemon
    // Multiple processes can "print" simultaneously

// 2. Eliminate Hold and Wait
ALGORITHM All_Or_Nothing_Allocation():
    required_resources = ANALYZE_PROCESS_NEEDS()
    IF ALL_AVAILABLE(required_resources):
        ALLOCATE_ALL(required_resources)
        EXECUTE_PROCESS()
        RELEASE_ALL(required_resources)
    ELSE:
        WAIT_UNTIL_ALL_AVAILABLE()

// 3. Allow Preemption
ALGORITHM Resource_Preemption():
    IF process_requests_unavailable_resource:
        IF resource_holder_can_be_preempted:
            PREEMPT_RESOURCE(current_holder)
            SAVE_STATE(current_holder)
            ALLOCATE_TO_REQUESTER()
        ELSE:
            BLOCK_REQUESTER()

// 4. Eliminate Circular Wait - Resource Ordering
ALGORITHM Ordered_Resource_Allocation():
    resource_order = {R1: 1, R2: 2, R3: 3, ...}
    
    RULE: Process can only request resources in increasing order
    
    IF process_holds(Ri) AND wants(Rj):
        IF resource_order[Rj] > resource_order[Ri]:
            ALLOW_REQUEST()
        ELSE:
            DENY_REQUEST()  // Would violate ordering

// Deadlock Prevention Example
class DeadlockPrevention {
    private final Object lock1 = new Object();
    private final Object lock2 = new Object();
    
    // Always acquire locks in same order
    public void safeMethod1() {
        synchronized(lock1) {
            synchronized(lock2) {
                // Critical section
            }
        }
    }
    
    public void safeMethod2() {
        synchronized(lock1) {  // Same order as method1
            synchronized(lock2) {
                // Critical section
            }
        }
    }
}`
    }],
    questions: [
      { question: "What is deadlock and what are the four necessary conditions?", answer: "Deadlock occurs when processes are permanently blocked, each waiting for resources held by others. Four Coffman conditions: 1) Mutual Exclusion - resources can't be shared, 2) Hold and Wait - processes hold while waiting, 3) No Preemption - can't forcibly take resources, 4) Circular Wait - circular chain of waiting. All four must be present simultaneously." },
      { question: "How can you prevent deadlock by eliminating each condition?", answer: "1) Eliminate Mutual Exclusion: make resources shareable (spooling), 2) Eliminate Hold and Wait: acquire all resources at once or none, 3) Allow Preemption: forcibly take resources from processes, 4) Eliminate Circular Wait: impose total ordering on resource types, always request in increasing order." },
      { question: "What is the difference between deadlock prevention and avoidance?", answer: "Prevention: eliminate one of four necessary conditions, may reduce system efficiency but guarantees no deadlock. Avoidance: use algorithms like Banker's to avoid unsafe states, allows all conditions but carefully manages resource allocation to prevent deadlock scenarios." },
      { question: "Explain the resource ordering technique for deadlock prevention.", answer: "Assign unique numbers to all resource types, require processes to request resources in increasing numerical order. If process holds resource i, it can only request resources j where j > i. This breaks circular wait condition by preventing cycles in resource allocation graph." },
      { question: "What are the trade-offs of different deadlock prevention strategies?", answer: "Eliminating mutual exclusion: not always possible, may compromise security. Hold and wait elimination: poor resource utilization, starvation possible. Allowing preemption: complex state saving, not suitable for all resources. Resource ordering: may force inefficient resource usage patterns." },
      { question: "How does the all-or-nothing resource allocation strategy work?", answer: "Process must declare all needed resources upfront and acquire them atomically - either gets all resources or none. Eliminates hold and wait condition. Disadvantages: poor resource utilization, requires knowing all resources in advance, may cause starvation." },
      { question: "What types of resources can and cannot be preempted?", answer: "Preemptible: CPU time, memory pages (can be swapped), network bandwidth. Non-preemptible: printers, tape drives, database locks, critical sections. Preemption feasible when resource state can be saved and restored without affecting correctness." },
      { question: "How do you implement resource ordering in practice?", answer: "Assign global ordering to lock types, enforce acquisition order through: coding standards, static analysis tools, runtime checks, lock hierarchies. Example: always acquire database locks before file locks before memory locks. Requires discipline and tooling support." },
      { question: "What is livelock and how does it relate to deadlock?", answer: "Livelock occurs when processes continuously change state in response to others but make no progress. Related to deadlock: both involve processes not progressing, but livelock processes are active (not blocked). Can occur in deadlock recovery algorithms when processes repeatedly back off." },
      { question: "How do timeout-based approaches help with deadlock?", answer: "Set timeouts on resource requests - if timeout expires, release held resources and retry. Doesn't prevent deadlock but provides recovery mechanism. Challenges: choosing appropriate timeout values, handling partial operations, ensuring consistency after timeout." }
    ]
  },
  {
    id: 'deadlock-conditions',
    title: 'Deadlock Conditions (4 Necessary Conditions)',
    explanation: 'The four Coffman conditions are necessary and sufficient for deadlock to occur. Understanding these conditions is crucial for deadlock prevention, as eliminating any one condition prevents deadlock. Each condition represents a different aspect of resource management and process behavior.',
    codeExamples: [{
      title: 'Four Coffman Conditions Detailed Analysis',
      language: 'java',
      code: `// Condition 1: Mutual Exclusion
class MutualExclusionExample {
    // Non-shareable resource (printer)
    private boolean printerInUse = false;
    
    public synchronized boolean requestPrinter() {
        if (printerInUse) {
            return false;  // Cannot share printer
        }
        printerInUse = true;
        return true;
    }
    
    public synchronized void releasePrinter() {
        printerInUse = false;
    }
    
    // Shareable resource (read-only file) - eliminates mutual exclusion
    private int readers = 0;
    
    public synchronized void startReading() {
        readers++;  // Multiple readers allowed
    }
    
    public synchronized void stopReading() {
        readers--;
    }
}

// Condition 2: Hold and Wait
class HoldAndWaitExample {
    private final Object resource1 = new Object();
    private final Object resource2 = new Object();
    
    // Demonstrates hold and wait
    public void holdAndWaitMethod() {
        synchronized(resource1) {  // Hold resource1
            System.out.println("Holding resource1");
            
            // Now wait for resource2 while holding resource1
            synchronized(resource2) {
                System.out.println("Got both resources");
            }
        }
    }
    
    // Eliminates hold and wait - all or nothing
    public void allOrNothingMethod() {
        // Try to acquire both resources atomically
        synchronized(this) {
            if (tryLock(resource1) && tryLock(resource2)) {
                try {
                    System.out.println("Got both resources atomically");
                } finally {
                    unlock(resource2);
                    unlock(resource1);
                }
            } else {
                // Release any acquired resources and retry
                releaseAll();
            }
        }
    }
}

// Condition 3: No Preemption
class PreemptionExample {
    private volatile Thread resourceHolder = null;
    private final Object resource = new Object();
    
    // Non-preemptive resource allocation
    public void nonPreemptiveAcquire() {
        synchronized(resource) {
            resourceHolder = Thread.currentThread();
            // Resource cannot be taken away forcibly
            doWork();
            resourceHolder = null;
        }
    }
    
    // Preemptive resource allocation
    public boolean preemptiveAcquire(long timeout) {
        long startTime = System.currentTimeMillis();
        
        while (System.currentTimeMillis() - startTime < timeout) {
            synchronized(resource) {
                if (resourceHolder == null) {
                    resourceHolder = Thread.currentThread();
                    return true;
                }
                
                // Can preempt if holder is lower priority
                if (canPreempt(resourceHolder)) {
                    interruptHolder(resourceHolder);
                    resourceHolder = Thread.currentThread();
                    return true;
                }
            }
            
            try { Thread.sleep(10); } catch (InterruptedException e) { break; }
        }
        return false;
    }
}

// Condition 4: Circular Wait
class CircularWaitExample {
    // Resource ordering to prevent circular wait
    private static final int RESOURCE_A_ORDER = 1;
    private static final int RESOURCE_B_ORDER = 2;
    private static final int RESOURCE_C_ORDER = 3;
    
    private final Object resourceA = new Object();
    private final Object resourceB = new Object();
    private final Object resourceC = new Object();
    
    // Potential circular wait scenario
    public void potentialCircularWait() {
        // Process 1: A -> B -> C
        // Process 2: C -> A -> B  
        // Process 3: B -> C -> A
        // This can create circular wait
    }
    
    // Prevents circular wait using resource ordering
    public void preventCircularWait() {
        // Always acquire in order: A(1) -> B(2) -> C(3)
        synchronized(resourceA) {      // Order 1
            synchronized(resourceB) {  // Order 2
                synchronized(resourceC) {  // Order 3
                    // All resources acquired in order
                    doWork();
                }
            }
        }
    }
    
    // Wait-for graph representation
    class WaitForGraph {
        private Map<Integer, List<Integer>> adjacencyList;
        
        public boolean hasCycle() {
            // DFS-based cycle detection
            Set<Integer> visited = new HashSet<>();
            Set<Integer> recursionStack = new HashSet<>();
            
            for (Integer node : adjacencyList.keySet()) {
                if (hasCycleDFS(node, visited, recursionStack)) {
                    return true;
                }
            }
            return false;
        }
        
        private boolean hasCycleDFS(Integer node, Set<Integer> visited, 
                                   Set<Integer> recursionStack) {
            if (recursionStack.contains(node)) {
                return true;  // Back edge found - cycle detected
            }
            
            if (visited.contains(node)) {
                return false;
            }
            
            visited.add(node);
            recursionStack.add(node);
            
            List<Integer> neighbors = adjacencyList.get(node);
            if (neighbors != null) {
                for (Integer neighbor : neighbors) {
                    if (hasCycleDFS(neighbor, visited, recursionStack)) {
                        return true;
                    }
                }
            }
            
            recursionStack.remove(node);
            return false;
        }
    }
}

// Condition Analysis Summary
Condition Analysis:
1. Mutual Exclusion: 
   - Required for: Critical sections, exclusive resources
   - Elimination: Make resources shareable when possible
   
2. Hold and Wait:
   - Common in: Multi-step operations, nested locking
   - Elimination: Atomic resource acquisition
   
3. No Preemption:
   - Applies to: Non-preemptible resources (printers, locks)
   - Elimination: Allow resource preemption with state saving
   
4. Circular Wait:
   - Caused by: Inconsistent resource ordering
   - Elimination: Impose total ordering on resources`
    }],
    questions: [
      { question: "Explain each of the four Coffman conditions with examples.", answer: "1) Mutual Exclusion: resources can't be shared (printer, critical section), 2) Hold and Wait: process holds resources while waiting for others (nested locking), 3) No Preemption: resources can't be forcibly taken (database locks), 4) Circular Wait: circular chain of processes waiting (P1→P2→P3→P1). All four must be present for deadlock." },
      { question: "Why are all four conditions necessary for deadlock?", answer: "Deadlock requires complete blockage of all involved processes. Mutual exclusion creates contention, hold and wait creates dependencies, no preemption prevents resolution, circular wait creates the cycle. Remove any condition and processes can make progress, breaking the deadlock." },
      { question: "How does resource ordering prevent circular wait?", answer: "Assign unique numbers to resource types, require processes to request in increasing order. If process holds resource i, can only request j where j > i. This creates partial ordering that prevents cycles in wait-for graph, breaking circular wait condition." },
      { question: "What are examples of shareable vs non-shareable resources?", answer: "Shareable: read-only files, CPU time (time-sliced), network bandwidth, read-only data structures. Non-shareable: printers, write access to files, critical sections, hardware devices. Sharing eliminates mutual exclusion but requires careful coordination." },
      { question: "How can you eliminate the hold and wait condition?", answer: "1) All-or-nothing allocation: acquire all needed resources atomically, 2) Release and retry: release all held resources before requesting new ones, 3) Two-phase locking: growing phase (only acquire), shrinking phase (only release). Reduces resource utilization but prevents deadlock." },
      { question: "When is resource preemption feasible and when is it not?", answer: "Feasible: CPU (context switch), memory (swap to disk), network connections (can be re-established). Not feasible: printers (can't undo printing), database transactions (consistency issues), critical sections (correctness violations). Requires ability to save and restore state." },
      { question: "How do you detect circular wait using wait-for graphs?", answer: "Create directed graph where nodes are processes and edges represent waiting relationships. Edge from P1 to P2 means P1 waits for resource held by P2. Circular wait exists if and only if graph contains a cycle. Use DFS with recursion stack to detect cycles." },
      { question: "What is the relationship between the four conditions?", answer: "Conditions are independent - each addresses different aspect of resource management. However, they interact: mutual exclusion creates need for waiting, hold and wait creates dependencies, no preemption prevents breaking dependencies, circular wait creates deadlock cycle. All must be present simultaneously." },
      { question: "How do modern systems typically handle these conditions?", answer: "Combination approach: use resource ordering for locks (prevent circular wait), timeouts for some operations (limited preemption), lock-free algorithms where possible (eliminate mutual exclusion), careful lock design (minimize hold and wait). No single solution fits all scenarios." },
      { question: "What are the performance implications of eliminating each condition?", answer: "Mutual exclusion elimination: may require complex coordination, potential consistency issues. Hold and wait elimination: poor resource utilization, potential starvation. Preemption: overhead of state saving/restoring. Circular wait elimination: may force inefficient resource usage patterns, requires global coordination." }
    ]
  },
  {
    id: 'deadlock-prevention-avoidance-detection',
    title: 'Deadlock Prevention vs Avoidance vs Detection',
    explanation: 'Three main approaches to handle deadlocks: Prevention eliminates one of the four necessary conditions, Avoidance uses algorithms to avoid unsafe states, and Detection allows deadlocks but detects and recovers from them. Each approach has different trade-offs in terms of performance, complexity, and resource utilization.',
    codeExamples: [{
      title: 'Deadlock Management Strategies Implementation',
      language: 'java',
      code: `// Deadlock Prevention - Resource Ordering
class DeadlockPrevention {
    // Assign ordering to locks
    private static final int ACCOUNT_LOCK_ORDER = 1;
    private static final int AUDIT_LOCK_ORDER = 2;
    private static final int BACKUP_LOCK_ORDER = 3;
    
    private final Object accountLock = new Object();
    private final Object auditLock = new Object();
    private final Object backupLock = new Object();
    
    // Always acquire locks in order
    public void transfer(Account from, Account to, double amount) {
        // Determine lock order based on account IDs
        Account firstLock = (from.getId() < to.getId()) ? from : to;
        Account secondLock = (from.getId() < to.getId()) ? to : from;
        
        synchronized(firstLock) {
            synchronized(secondLock) {
                from.withdraw(amount);
                to.deposit(amount);
            }
        }
    }
    
    // Timeout-based prevention
    public boolean tryTransferWithTimeout(Account from, Account to, 
                                        double amount, long timeout) {
        long startTime = System.currentTimeMillis();
        
        while (System.currentTimeMillis() - startTime < timeout) {
            if (from.tryLock() && to.tryLock()) {
                try {
                    from.withdraw(amount);
                    to.deposit(amount);
                    return true;
                } finally {
                    to.unlock();
                    from.unlock();
                }
            }
            
            // Release any acquired locks and retry
            from.unlock();
            to.unlock();
            
            try { Thread.sleep(10); } catch (InterruptedException e) { break; }
        }
        return false;
    }
}

// Deadlock Detection - Wait-for Graph
class DeadlockDetection {
    private Map<Integer, Set<Integer>> waitForGraph;
    private Map<Integer, Set<Integer>> resourceAllocation;
    
    public DeadlockDetection() {
        waitForGraph = new HashMap<>();
        resourceAllocation = new HashMap<>();
    }
    
    // Add wait relationship: process waits for resource held by holder
    public void addWaitRelation(int waitingProcess, int holdingProcess) {
        waitForGraph.computeIfAbsent(waitingProcess, k -> new HashSet<>())
                   .add(holdingProcess);
    }
    
    // Remove wait relationship
    public void removeWaitRelation(int waitingProcess, int holdingProcess) {
        Set<Integer> waitSet = waitForGraph.get(waitingProcess);
        if (waitSet != null) {
            waitSet.remove(holdingProcess);
            if (waitSet.isEmpty()) {
                waitForGraph.remove(waitingProcess);
            }
        }
    }
    
    // Detect deadlock using DFS cycle detection
    public List<Integer> detectDeadlock() {
        Set<Integer> visited = new HashSet<>();
        Set<Integer> recursionStack = new HashSet<>();
        List<Integer> path = new ArrayList<>();
        
        for (Integer process : waitForGraph.keySet()) {
            if (!visited.contains(process)) {
                List<Integer> cycle = detectCycleDFS(process, visited, 
                                                   recursionStack, path);
                if (cycle != null) {
                    return cycle;
                }
            }
        }
        return null; // No deadlock detected
    }
    
    private List<Integer> detectCycleDFS(Integer process, Set<Integer> visited,
                                       Set<Integer> recursionStack, 
                                       List<Integer> path) {
        if (recursionStack.contains(process)) {
            // Found cycle - extract it from path
            int cycleStart = path.indexOf(process);
            return new ArrayList<>(path.subList(cycleStart, path.size()));
        }
        
        if (visited.contains(process)) {
            return null;
        }
        
        visited.add(process);
        recursionStack.add(process);
        path.add(process);
        
        Set<Integer> neighbors = waitForGraph.get(process);
        if (neighbors != null) {
            for (Integer neighbor : neighbors) {
                List<Integer> cycle = detectCycleDFS(neighbor, visited, 
                                                   recursionStack, path);
                if (cycle != null) {
                    return cycle;
                }
            }
        }
        
        recursionStack.remove(process);
        path.remove(path.size() - 1);
        return null;
    }
    
    // Deadlock recovery strategies
    public void recoverFromDeadlock(List<Integer> deadlockedProcesses) {
        // Strategy 1: Process termination
        terminateProcesses(deadlockedProcesses);
        
        // Strategy 2: Resource preemption
        // preemptResources(deadlockedProcesses);
        
        // Strategy 3: Rollback
        // rollbackProcesses(deadlockedProcesses);
    }
    
    private void terminateProcesses(List<Integer> processes) {
        // Terminate processes based on priority, cost, etc.
        processes.sort((p1, p2) -> Integer.compare(getPriority(p1), getPriority(p2)));
        
        for (Integer process : processes) {
            terminateProcess(process);
            
            // Check if deadlock is resolved
            if (detectDeadlock() == null) {
                break;
            }
        }
    }
}

// Deadlock Recovery Algorithms
class DeadlockRecovery {
    
    // Process Termination Recovery
    public void processTerminationRecovery(List<Integer> deadlockedProcesses) {
        // Option 1: Terminate all deadlocked processes
        for (Integer process : deadlockedProcesses) {
            terminateProcess(process);
            reclaimResources(process);
        }
        
        // Option 2: Terminate one by one until deadlock broken
        while (isDeadlocked()) {
            Integer victim = selectVictim(deadlockedProcesses);
            terminateProcess(victim);
            reclaimResources(victim);
            deadlockedProcesses.remove(victim);
        }
    }
    
    // Resource Preemption Recovery
    public void resourcePreemptionRecovery() {
        while (isDeadlocked()) {
            Integer victimProcess = selectPreemptionVictim();
            Set<Integer> preemptedResources = preemptResources(victimProcess);
            
            // Rollback victim to safe state
            rollbackToCheckpoint(victimProcess);
            
            // Allocate preempted resources to waiting processes
            redistributeResources(preemptedResources);
            
            // Prevent starvation
            incrementRollbackCount(victimProcess);
            if (getRollbackCount(victimProcess) > MAX_ROLLBACKS) {
                boostPriority(victimProcess);
            }
        }
    }
    
    // Victim selection criteria
    private Integer selectVictim(List<Integer> candidates) {
        return candidates.stream()
            .min(Comparator.comparingInt(this::calculateVictimCost))
            .orElse(candidates.get(0));
    }
    
    private int calculateVictimCost(Integer process) {
        return getExecutionTime(process) + 
               getResourcesHeld(process).size() * 10 +
               getRollbackCount(process) * 100;
    }
}

// Comparison of Approaches
Approach Comparison:

Prevention:
- Eliminates one of four conditions
- Guarantees no deadlock
- May reduce system efficiency
- Simple to implement
- Conservative approach

Avoidance:
- Uses algorithms like Banker's
- Requires advance resource information
- Better resource utilization than prevention
- Runtime overhead for safety checks
- May reject safe requests

Detection:
- Allows deadlocks to occur
- Periodic detection algorithms
- Recovery mechanisms needed
- Good resource utilization
- Detection and recovery overhead`
    }],
    questions: [
      { question: "Compare deadlock prevention, avoidance, and detection approaches.", answer: "Prevention: eliminates one of four conditions, guarantees no deadlock but may reduce efficiency. Avoidance: uses algorithms like Banker's to avoid unsafe states, better utilization but requires advance information. Detection: allows deadlocks but detects and recovers, good utilization but has recovery overhead." },
      { question: "What are the trade-offs between the three approaches?", answer: "Prevention: simple but conservative, may waste resources. Avoidance: balanced approach but requires future knowledge and runtime checks. Detection: maximum resource utilization but complexity in detection algorithms and recovery mechanisms. Choice depends on system requirements and deadlock frequency." },
      { question: "How does deadlock detection using wait-for graphs work?", answer: "Create directed graph where nodes are processes and edges represent waiting relationships. Process P1 waits for P2 if P1 needs resource held by P2. Deadlock exists if and only if graph contains cycle. Use DFS with recursion stack to detect cycles efficiently." },
      { question: "What are the different deadlock recovery strategies?", answer: "1) Process termination: abort all deadlocked processes or one-by-one until resolved, 2) Resource preemption: forcibly take resources and redistribute, 3) Rollback: restore processes to safe checkpoints. Selection based on process priority, execution time, resources held, and rollback history." },
      { question: "How do you select victims for deadlock recovery?", answer: "Consider factors: process priority (terminate low priority first), execution time (minimize lost work), resources held (minimize impact), rollback count (prevent starvation), process type (interactive vs batch). Use weighted scoring function combining multiple criteria for optimal victim selection." },
      { question: "What is the ostrich algorithm for deadlock handling?", answer: "Ignore deadlock problem entirely, assuming deadlocks are rare enough that prevention/detection cost exceeds restart cost. Used when: deadlocks extremely rare, system can tolerate occasional failures, prevention overhead unacceptable. Common in desktop systems where user can reboot." },
      { question: "How does timeout-based deadlock handling work?", answer: "Set timeouts on resource requests - if timeout expires, assume deadlock and take recovery action (release resources, retry). Advantages: simple implementation, works with any resource type. Disadvantages: choosing timeout values, false positives, may not detect all deadlocks." },
      { question: "What are the challenges in implementing deadlock detection?", answer: "Challenges: maintaining accurate wait-for graph, handling dynamic resource allocation/deallocation, determining detection frequency, minimizing detection overhead, handling false positives, coordinating detection in distributed systems. Requires careful balance between accuracy and performance." },
      { question: "How do you prevent starvation during deadlock recovery?", answer: "Track rollback history for each process, limit maximum rollbacks per process, boost priority of frequently rolled-back processes, use aging mechanisms, consider fairness in victim selection. Ensure that same process isn't repeatedly selected as victim." },
      { question: "What factors determine the choice of deadlock handling strategy?", answer: "System type (batch vs interactive), deadlock frequency, resource utilization requirements, performance constraints, recovery time tolerance, system complexity, available information about future requests. Real-time systems prefer prevention, general-purpose systems often use detection." }
    ]
  },
  {
    id: 'bankers-algorithm',
    title: "Banker's Algorithm",
    explanation: "Banker's Algorithm is a deadlock avoidance algorithm that determines whether granting a resource request will lead to an unsafe state. It maintains information about allocated resources, maximum needs, and available resources to ensure the system remains in a safe state where all processes can complete execution.",
    codeExamples: [{
      title: "Banker's Algorithm Complete Implementation",
      language: 'java',
      code: `// Banker's Algorithm Implementation
class BankersAlgorithm {
    private int processes;        // Number of processes
    private int resources;        // Number of resource types
    private int[][] allocation;   // Currently allocated resources
    private int[][] max;          // Maximum resource needs
    private int[] available;      // Available resources
    private int[][] need;         // Remaining resource needs
    
    public BankersAlgorithm(int processes, int resources) {
        this.processes = processes;
        this.resources = resources;
        this.allocation = new int[processes][resources];
        this.max = new int[processes][resources];
        this.available = new int[resources];
        this.need = new int[processes][resources];
    }
    
    // Initialize system state
    public void initializeSystem(int[][] allocation, int[][] max, int[] available) {
        this.allocation = allocation.clone();
        this.max = max.clone();
        this.available = available.clone();
        
        // Calculate need matrix: need[i][j] = max[i][j] - allocation[i][j]
        for (int i = 0; i < processes; i++) {
            for (int j = 0; j < resources; j++) {
                need[i][j] = max[i][j] - allocation[i][j];
            }
        }
    }
    
    // Safety Algorithm - Check if system is in safe state
    public SafetyResult isSafeState() {
        int[] work = available.clone();
        boolean[] finish = new boolean[processes];
        List<Integer> safeSequence = new ArrayList<>();
        
        // Find processes that can complete
        int count = 0;
        while (count < processes) {
            boolean found = false;
            
            for (int i = 0; i < processes; i++) {
                if (!finish[i] && canAllocate(i, work)) {
                    // Process i can complete
                    for (int j = 0; j < resources; j++) {
                        work[j] += allocation[i][j];
                    }
                    
                    finish[i] = true;
                    safeSequence.add(i);
                    count++;
                    found = true;
                    break;
                }
            }
            
            if (!found) {
                // No process can complete - unsafe state
                return new SafetyResult(false, null, 
                    "System is in unsafe state - no safe sequence exists");
            }
        }
        
        return new SafetyResult(true, safeSequence, 
            "System is in safe state");
    }
    
    // Check if process can be allocated resources
    private boolean canAllocate(int process, int[] work) {
        for (int j = 0; j < resources; j++) {
            if (need[process][j] > work[j]) {
                return false;
            }
        }
        return true;
    }
    
    // Resource Request Algorithm
    public RequestResult requestResources(int processId, int[] request) {
        // Step 1: Check if request is valid
        for (int j = 0; j < resources; j++) {
            if (request[j] > need[processId][j]) {
                return new RequestResult(false, 
                    "Request exceeds maximum need for process " + processId);
            }
            
            if (request[j] > available[j]) {
                return new RequestResult(false, 
                    "Request exceeds available resources");
            }
        }
        
        // Step 2: Temporarily allocate resources
        int[] originalAvailable = available.clone();
        int[] originalAllocation = allocation[processId].clone();
        int[] originalNeed = need[processId].clone();
        
        for (int j = 0; j < resources; j++) {
            available[j] -= request[j];
            allocation[processId][j] += request[j];
            need[processId][j] -= request[j];
        }
        
        // Step 3: Check if resulting state is safe
        SafetyResult safetyResult = isSafeState();
        
        if (safetyResult.isSafe()) {
            return new RequestResult(true, 
                "Request granted - system remains in safe state", 
                safetyResult.getSafeSequence());
        } else {
            // Step 4: Rollback if unsafe
            available = originalAvailable;
            allocation[processId] = originalAllocation;
            need[processId] = originalNeed;
            
            return new RequestResult(false, 
                "Request denied - would lead to unsafe state");
        }
    }
    
    // Release resources when process completes
    public void releaseResources(int processId) {
        for (int j = 0; j < resources; j++) {
            available[j] += allocation[processId][j];
            allocation[processId][j] = 0;
            need[processId][j] = max[processId][j];
        }
    }
    
    // Display current system state
    public void displayState() {
        System.out.println("\nCurrent System State:");
        System.out.println("Available: " + Arrays.toString(available));
        
        System.out.println("\nAllocation Matrix:");
        for (int i = 0; i < processes; i++) {
            System.out.println("P" + i + ": " + Arrays.toString(allocation[i]));
        }
        
        System.out.println("\nMax Matrix:");
        for (int i = 0; i < processes; i++) {
            System.out.println("P" + i + ": " + Arrays.toString(max[i]));
        }
        
        System.out.println("\nNeed Matrix:");
        for (int i = 0; i < processes; i++) {
            System.out.println("P" + i + ": " + Arrays.toString(need[i]));
        }
    }
}

// Result classes
class SafetyResult {
    private boolean safe;
    private List<Integer> safeSequence;
    private String message;
    
    public SafetyResult(boolean safe, List<Integer> safeSequence, String message) {
        this.safe = safe;
        this.safeSequence = safeSequence;
        this.message = message;
    }
    
    // Getters
    public boolean isSafe() { return safe; }
    public List<Integer> getSafeSequence() { return safeSequence; }
    public String getMessage() { return message; }
}

class RequestResult {
    private boolean granted;
    private String message;
    private List<Integer> safeSequence;
    
    public RequestResult(boolean granted, String message) {
        this(granted, message, null);
    }
    
    public RequestResult(boolean granted, String message, List<Integer> safeSequence) {
        this.granted = granted;
        this.message = message;
        this.safeSequence = safeSequence;
    }
    
    // Getters
    public boolean isGranted() { return granted; }
    public String getMessage() { return message; }
    public List<Integer> getSafeSequence() { return safeSequence; }
}

// Example Usage
class BankersAlgorithmExample {
    public static void main(String[] args) {
        // Initialize system with 5 processes and 3 resource types
        BankersAlgorithm banker = new BankersAlgorithm(5, 3);
        
        // Current allocation
        int[][] allocation = {
            {0, 1, 0},  // P0
            {2, 0, 0},  // P1
            {3, 0, 2},  // P2
            {2, 1, 1},  // P3
            {0, 0, 2}   // P4
        };
        
        // Maximum needs
        int[][] max = {
            {7, 5, 3},  // P0
            {3, 2, 2},  // P1
            {9, 0, 2},  // P2
            {2, 2, 2},  // P3
            {4, 3, 3}   // P4
        };
        
        // Available resources
        int[] available = {3, 3, 2};
        
        banker.initializeSystem(allocation, max, available);
        
        // Check if system is in safe state
        SafetyResult result = banker.isSafeState();
        System.out.println(result.getMessage());
        if (result.isSafe()) {
            System.out.println("Safe sequence: " + result.getSafeSequence());
        }
        
        // Process P1 requests (1, 0, 2)
        int[] request = {1, 0, 2};
        RequestResult requestResult = banker.requestResources(1, request);
        System.out.println(requestResult.getMessage());
    }
}`
    }],
    questions: [
      { question: "How does Banker's Algorithm work and what information does it need?", answer: "Banker's Algorithm needs: allocation matrix (currently allocated resources), max matrix (maximum resource needs), available vector (currently available resources). It calculates need matrix (max - allocation) and uses safety algorithm to check if granting a request leads to safe state where all processes can complete." },
      { question: "Explain the safety algorithm in Banker's Algorithm.", answer: "Safety algorithm simulates process completion: 1) Initialize work = available, finish[i] = false for all processes, 2) Find process i where finish[i] = false and need[i] ≤ work, 3) Set work = work + allocation[i], finish[i] = true, 4) Repeat until all processes finish (safe) or no process can proceed (unsafe)." },
      { question: "What is a safe state vs unsafe state in Banker's Algorithm?", answer: "Safe state: exists at least one execution sequence allowing all processes to complete without deadlock. Unsafe state: no such sequence guaranteed, deadlock possible but not certain. Safe state has safe sequence where each process can get needed resources and complete." },
      { question: "Describe the resource request algorithm steps.", answer: "1) Check if request ≤ need and request ≤ available, 2) Temporarily allocate: available -= request, allocation += request, need -= request, 3) Run safety algorithm on new state, 4) If safe, grant request; if unsafe, rollback allocation and deny request." },
      { question: "What are the advantages and disadvantages of Banker's Algorithm?", answer: "Advantages: guarantees deadlock avoidance, optimal resource utilization in safe states, works for multiple resource types. Disadvantages: requires advance knowledge of maximum needs, processes must declare max requirements, may reject safe requests, overhead of safety checks, not practical for dynamic systems." },
      { question: "Why might Banker's Algorithm reject a safe request?", answer: "Algorithm is conservative - it only grants requests that guarantee system remains safe. A request might be safe now but could lead to unsafe state later when combined with future requests. Algorithm ensures that granting request maintains ability to satisfy all processes' maximum needs." },
      { question: "How do you handle process completion in Banker's Algorithm?", answer: "When process completes: 1) Add its allocated resources back to available pool, 2) Reset its allocation to zero, 3) Reset its need to maximum (if process might restart), 4) Update system state. This increases available resources for other processes." },
      { question: "What happens if a process requests more than its declared maximum?", answer: "Request is immediately rejected as invalid. Banker's Algorithm assumes processes declare their maximum resource needs upfront and never exceed them. Requesting more than maximum violates algorithm assumptions and could lead to unsafe states." },
      { question: "How does Banker's Algorithm handle multiple resource types?", answer: "Uses matrices instead of arrays: allocation[i][j] = resources of type j allocated to process i, max[i][j] = maximum need of resource j by process i. Safety algorithm checks all resource types simultaneously - process can proceed only if it can get all needed resource types." },
      { question: "What are the practical limitations of Banker's Algorithm?", answer: "Limitations: requires fixed number of processes and resources, processes must know maximum needs in advance, doesn't handle dynamic resource creation/destruction, conservative approach may underutilize resources, overhead of safety checks, not suitable for systems with varying resource requirements." }
    ]
  },
  {
    id: 'memory-management',
    title: 'Memory Management',
    explanation: 'Memory management is responsible for efficient allocation, deallocation, and organization of system memory. It provides memory protection, enables multiprogramming, and creates the illusion of unlimited memory through virtual memory systems. Key mechanisms include paging and segmentation, each with distinct advantages for different use cases.',
    keyPoints: [
      'Manages allocation and deallocation of memory space',
      'Provides memory protection between processes',
      'Enables multiprogramming through memory sharing',
      'Implements virtual memory for memory abstraction',
      'Handles address translation from virtual to physical',
      'Optimizes memory utilization and performance'
    ],
    codeExamples: [{
      title: 'Memory Management Fundamentals',
      language: 'java',
      code: `// Memory Management Unit (MMU) Simulation
class MemoryManagementUnit {
    private PageTable pageTable;
    private TLB tlb;
    private int pageSize;
    private int physicalMemorySize;
    
    public MemoryManagementUnit(int pageSize, int physicalMemorySize) {
        this.pageSize = pageSize;
        this.physicalMemorySize = physicalMemorySize;
        this.pageTable = new PageTable();
        this.tlb = new TLB(64); // 64-entry TLB
    }
    
    // Virtual to Physical Address Translation
    public int translateAddress(int virtualAddress) {
        int pageNumber = virtualAddress / pageSize;
        int offset = virtualAddress % pageSize;
        
        // Check TLB first (fast path)
        TLBEntry tlbEntry = tlb.lookup(pageNumber);
        if (tlbEntry != null && tlbEntry.isValid()) {
            return tlbEntry.getFrameNumber() * pageSize + offset;
        }
        
        // TLB miss - check page table (slow path)
        PageTableEntry pte = pageTable.getEntry(pageNumber);
        if (pte.isValid()) {
            // Update TLB with new translation
            tlb.update(pageNumber, pte.getFrameNumber());
            return pte.getFrameNumber() * pageSize + offset;
        } else {
            // Page fault - page not in memory
            handlePageFault(pageNumber);
            return translateAddress(virtualAddress); // Retry after loading page
        }
    }
    
    private void handlePageFault(int pageNumber) {
        // Load page from disk to memory
        int frameNumber = allocateFrame();
        loadPageFromDisk(pageNumber, frameNumber);
        pageTable.updateEntry(pageNumber, frameNumber, true);
    }
}

// Memory Allocation Strategies
class MemoryAllocator {
    private List<MemoryBlock> freeBlocks;
    private List<MemoryBlock> allocatedBlocks;
    
    // First Fit Algorithm
    public MemoryBlock firstFit(int size) {
        for (MemoryBlock block : freeBlocks) {
            if (block.getSize() >= size) {
                return allocateFromBlock(block, size);
            }
        }
        return null; // No suitable block found
    }
    
    // Best Fit Algorithm
    public MemoryBlock bestFit(int size) {
        MemoryBlock bestBlock = null;
        int minWaste = Integer.MAX_VALUE;
        
        for (MemoryBlock block : freeBlocks) {
            if (block.getSize() >= size) {
                int waste = block.getSize() - size;
                if (waste < minWaste) {
                    minWaste = waste;
                    bestBlock = block;
                }
            }
        }
        
        return bestBlock != null ? allocateFromBlock(bestBlock, size) : null;
    }
    
    // Worst Fit Algorithm
    public MemoryBlock worstFit(int size) {
        MemoryBlock worstBlock = null;
        int maxSize = 0;
        
        for (MemoryBlock block : freeBlocks) {
            if (block.getSize() >= size && block.getSize() > maxSize) {
                maxSize = block.getSize();
                worstBlock = block;
            }
        }
        
        return worstBlock != null ? allocateFromBlock(worstBlock, size) : null;
    }
    
    // Buddy System Algorithm
    public MemoryBlock buddyAllocate(int size) {
        int blockSize = nextPowerOfTwo(size);
        MemoryBlock block = findFreeBlock(blockSize);
        
        if (block == null) {
            // Split larger block
            MemoryBlock largerBlock = findFreeBlock(blockSize * 2);
            if (largerBlock != null) {
                splitBlock(largerBlock);
                block = findFreeBlock(blockSize);
            }
        }
        
        if (block != null) {
            markAllocated(block);
        }
        return block;
    }
    
    // Memory Compaction
    public void compactMemory() {
        // Move all allocated blocks to one end
        int newAddress = 0;
        
        for (MemoryBlock block : allocatedBlocks) {
            if (block.getAddress() != newAddress) {
                moveBlock(block, newAddress);
                updateProcessPointers(block.getProcess(), newAddress);
            }
            newAddress += block.getSize();
        }
        
        // Create single large free block
        int freeSpaceStart = newAddress;
        int freeSpaceSize = getTotalMemory() - newAddress;
        createFreeBlock(freeSpaceStart, freeSpaceSize);
    }
}`
    }],
    questions: [
      { question: "What is memory management and why is it important?", answer: "Memory management handles allocation, deallocation, and organization of system memory. Important for: enabling multiprogramming, providing memory protection between processes, optimizing memory utilization, implementing virtual memory abstraction, and ensuring system stability through proper resource management." },
      { question: "Explain the difference between logical and physical addresses.", answer: "Logical address: generated by CPU during program execution, also called virtual address, used by processes. Physical address: actual location in physical memory, used by memory hardware. Memory Management Unit (MMU) translates logical to physical addresses using page tables or segmentation." },
      { question: "What are the main memory allocation strategies?", answer: "First Fit: allocate first sufficient block (fast but fragmentation). Best Fit: allocate smallest sufficient block (minimizes waste but slow). Worst Fit: allocate largest block (larger remaining fragments). Next Fit: start search from last allocation point. Each has trade-offs between speed and fragmentation." },
      { question: "How does the buddy system work for memory allocation?", answer: "Buddy system allocates memory in powers of 2. When allocating: find smallest power-of-2 block that fits request, split larger blocks if needed. When deallocating: merge with buddy if both free, recursively merge larger buddies. Reduces external fragmentation but may cause internal fragmentation." },
      { question: "What is memory compaction and when is it used?", answer: "Memory compaction moves all allocated blocks to one end of memory, creating single large free block. Used to eliminate external fragmentation in variable-size allocation. Expensive operation requiring: moving memory contents, updating all pointers, pausing processes. Alternative to fragmentation in segmentation systems." },
      { question: "Explain the role of Memory Management Unit (MMU).", answer: "MMU is hardware component that translates virtual addresses to physical addresses. Functions: address translation using page tables, memory protection enforcement, TLB management for fast translation, handling page faults, supporting virtual memory operations. Essential for modern memory management systems." },
      { question: "What are the advantages of virtual memory?", answer: "Virtual memory provides: illusion of unlimited memory, memory protection between processes, efficient memory sharing, support for multiprogramming, simplified programming model, ability to run programs larger than physical memory, and efficient use of physical memory through demand paging." },
      { question: "How do you handle memory fragmentation?", answer: "Internal fragmentation: use smaller allocation units, variable-size allocation. External fragmentation: compaction, coalescing adjacent free blocks, buddy system, paging (eliminates external fragmentation), garbage collection, memory pools for fixed-size objects." },
      { question: "What is the difference between static and dynamic memory allocation?", answer: "Static allocation: memory allocated at compile time, fixed size, stored in stack/data segment, automatic deallocation. Dynamic allocation: memory allocated at runtime, variable size, stored in heap, manual deallocation required. Dynamic provides flexibility but requires careful management to avoid leaks." },
      { question: "How do modern operating systems optimize memory management?", answer: "Optimizations include: demand paging (load pages only when needed), copy-on-write (share pages until modification), memory-mapped files, lazy allocation, page clustering, prefetching, memory compression, NUMA-aware allocation, and hardware support like TLB and page table walkers." }
    ]
  },
  {
    id: 'paging-vs-segmentation',
    title: 'Paging vs Segmentation',
    explanation: 'Paging and segmentation are two fundamental memory management schemes. Paging divides memory into fixed-size pages for uniform management, while segmentation uses variable-size segments based on logical program units. Each approach has distinct advantages and trade-offs for different system requirements.',
    keyPoints: [
      'Paging uses fixed-size pages, segmentation uses variable-size segments',
      'Paging eliminates external fragmentation, may cause internal fragmentation',
      'Segmentation reflects program structure, may cause external fragmentation',
      'Paging provides uniform memory management and protection',
      'Segmentation enables logical organization and sharing',
      'Modern systems often combine both approaches (paged segmentation)'
    ],
    codeExamples: [{
      title: 'Paging vs Segmentation Implementation',
      language: 'java',
      code: `// Paging System Implementation
class PagingSystem {
    private static final int PAGE_SIZE = 4096; // 4KB pages
    private PageTable[] pageTables; // One per process
    private boolean[] frameTable; // Track allocated frames
    private int totalFrames;
    
    public PagingSystem(int physicalMemorySize) {
        this.totalFrames = physicalMemorySize / PAGE_SIZE;
        this.frameTable = new boolean[totalFrames];
        this.pageTables = new PageTable[MAX_PROCESSES];
    }
    
    // Virtual to Physical Address Translation
    public int translateAddress(int processId, int virtualAddress) {
        int pageNumber = virtualAddress / PAGE_SIZE;
        int offset = virtualAddress % PAGE_SIZE;
        
        PageTableEntry entry = pageTables[processId].getEntry(pageNumber);
        if (!entry.isValid()) {
            handlePageFault(processId, pageNumber);
            entry = pageTables[processId].getEntry(pageNumber);
        }
        
        return entry.getFrameNumber() * PAGE_SIZE + offset;
    }
    
    // Allocate page for process
    public boolean allocatePage(int processId, int pageNumber) {
        int freeFrame = findFreeFrame();
        if (freeFrame == -1) {
            // No free frames - need page replacement
            freeFrame = pageReplacementAlgorithm();
        }
        
        frameTable[freeFrame] = true;
        pageTables[processId].setEntry(pageNumber, freeFrame, true);
        return true;
    }
    
    // Paging Advantages:
    // - No external fragmentation
    // - Uniform memory management
    // - Easy allocation/deallocation
    // - Hardware support available
    
    // Paging Disadvantages:
    // - Internal fragmentation (up to page_size - 1)
    // - Doesn't reflect program structure
    // - Page table overhead
    // - TLB misses can be expensive
}

// Segmentation System Implementation
class SegmentationSystem {
    private SegmentTable[] segmentTables; // One per process
    private List<MemorySegment> freeSegments;
    private List<MemorySegment> allocatedSegments;
    
    public SegmentationSystem() {
        this.segmentTables = new SegmentTable[MAX_PROCESSES];
        this.freeSegments = new ArrayList<>();
        this.allocatedSegments = new ArrayList<>();
    }
    
    // Virtual to Physical Address Translation
    public int translateAddress(int processId, int segmentNumber, int offset) {
        SegmentTableEntry entry = segmentTables[processId].getEntry(segmentNumber);
        
        // Check segment bounds
        if (offset >= entry.getLimit()) {
            throw new SegmentationFaultException("Offset exceeds segment limit");
        }
        
        return entry.getBaseAddress() + offset;
    }
    
    // Allocate segment for process
    public boolean allocateSegment(int processId, int segmentNumber, 
                                 int size, SegmentType type) {
        MemorySegment segment = findSuitableSegment(size);
        if (segment == null) {
            // Try compaction
            compactMemory();
            segment = findSuitableSegment(size);
        }
        
        if (segment != null) {
            allocateFromSegment(segment, size);
            segmentTables[processId].setEntry(segmentNumber, 
                segment.getBaseAddress(), size, getPermissions(type));
            return true;
        }
        return false;
    }
    
    // Segmentation Advantages:
    // - Reflects program structure (code, data, stack)
    // - No internal fragmentation
    // - Supports sharing and protection
    // - Variable size allocation
    
    // Segmentation Disadvantages:
    // - External fragmentation
    // - Complex memory management
    // - Compaction may be needed
    // - Segment table overhead
}

// Paged Segmentation (Hybrid Approach)
class PagedSegmentationSystem {
    private SegmentTable[] segmentTables;
    private PageTable[][] pageTables; // Page table per segment per process
    private static final int PAGE_SIZE = 4096;
    
    // Two-level address translation
    public int translateAddress(int processId, int segmentNumber, 
                              int virtualAddress) {
        // Step 1: Segment translation
        SegmentTableEntry segEntry = segmentTables[processId].getEntry(segmentNumber);
        
        // Check segment bounds
        if (virtualAddress >= segEntry.getLimit()) {
            throw new SegmentationFaultException("Address exceeds segment limit");
        }
        
        // Step 2: Page translation within segment
        int pageNumber = virtualAddress / PAGE_SIZE;
        int offset = virtualAddress % PAGE_SIZE;
        
        PageTableEntry pageEntry = pageTables[processId][segmentNumber].getEntry(pageNumber);
        if (!pageEntry.isValid()) {
            handlePageFault(processId, segmentNumber, pageNumber);
            pageEntry = pageTables[processId][segmentNumber].getEntry(pageNumber);
        }
        
        return pageEntry.getFrameNumber() * PAGE_SIZE + offset;
    }
    
    // Hybrid Advantages:
    // - Combines benefits of both approaches
    // - Logical organization with efficient management
    // - No external fragmentation
    // - Supports sharing and protection
    
    // Hybrid Disadvantages:
    // - Increased complexity
    // - Two-level translation overhead
    // - More memory for tables
    // - Hardware support required
}

// Comparison Summary
class MemoryManagementComparison {
    /*
    PAGING:
    - Fixed-size pages (typically 4KB)
    - Eliminates external fragmentation
    - May cause internal fragmentation
    - Simple hardware implementation
    - Uniform memory management
    - Page table per process
    
    SEGMENTATION:
    - Variable-size segments
    - No internal fragmentation
    - May cause external fragmentation
    - Reflects program structure
    - Supports logical organization
    - Segment table per process
    
    PAGED SEGMENTATION:
    - Segments divided into pages
    - Combines advantages of both
    - Two-level address translation
    - More complex implementation
    - Used in modern systems (x86-64)
    */
}`
    }],
    questions: [
      { question: "Compare paging and segmentation memory management schemes.", answer: "Paging: fixed-size pages, eliminates external fragmentation, uniform management, may cause internal fragmentation. Segmentation: variable-size segments, reflects program structure, no internal fragmentation, may cause external fragmentation. Paging simpler to implement, segmentation more logical but complex." },
      { question: "What are the advantages and disadvantages of paging?", answer: "Advantages: no external fragmentation, uniform memory management, easy allocation/deallocation, hardware support. Disadvantages: internal fragmentation (up to page_size-1), doesn't reflect program structure, page table overhead, potential TLB misses." },
      { question: "What are the advantages and disadvantages of segmentation?", answer: "Advantages: reflects program structure, no internal fragmentation, supports sharing and protection, variable size allocation. Disadvantages: external fragmentation, complex memory management, may need compaction, segment table overhead." },
      { question: "How does address translation work in paging vs segmentation?", answer: "Paging: virtual address = page number + offset, translate page number to frame number via page table, physical address = frame number + offset. Segmentation: virtual address = segment number + offset, check bounds, physical address = segment base + offset." },
      { question: "What is paged segmentation and why is it used?", answer: "Paged segmentation combines both approaches: segments are divided into pages. Provides logical organization of segmentation with efficient management of paging. Two-level translation: segment number → segment base, then page number → frame number. Used in modern x86-64 systems." },
      { question: "How do you handle fragmentation in each scheme?", answer: "Paging: internal fragmentation handled by choosing appropriate page size, no external fragmentation. Segmentation: external fragmentation handled by compaction, coalescing free segments, best-fit allocation. Paged segmentation eliminates external fragmentation through paging." },
      { question: "What is the role of page tables vs segment tables?", answer: "Page tables: map page numbers to frame numbers, fixed-size entries, one entry per page. Segment tables: store base address and limit for each segment, variable-size entries, one entry per segment. Both provide address translation and protection information." },
      { question: "How do protection and sharing work in each scheme?", answer: "Paging: protection bits in page table entries (read/write/execute), sharing by mapping same frame to multiple page tables. Segmentation: protection per segment (code read-only, data read-write), sharing entire segments between processes." },
      { question: "What are the hardware requirements for each scheme?", answer: "Paging: MMU with page table base register, TLB for fast translation, page fault handling. Segmentation: segment registers, bounds checking hardware, segmentation fault handling. Both need address translation hardware and memory protection mechanisms." },
      { question: "How do modern systems implement memory management?", answer: "Most modern systems use paged segmentation or pure paging. x86-64 uses segmentation with paging overlay. ARM uses pure paging. RISC-V supports both. Trend toward simpler paging-only systems due to hardware complexity and performance considerations." }
    ]
  },
  {
    id: 'page-replacement-algorithms',
    title: 'Page Replacement Algorithms (FIFO, LRU, Optimal)',
    explanation: 'Page replacement algorithms determine which page to evict from memory when a new page needs to be loaded and memory is full. Different algorithms optimize for different metrics and have varying implementation complexity and performance characteristics.',
    keyPoints: [
      'FIFO replaces oldest loaded page (simple but Belady\'s anomaly)',
      'LRU replaces least recently used page (good performance, high overhead)',
      'Optimal replaces page used farthest in future (theoretical minimum)',
      'Clock algorithm approximates LRU with lower overhead',
      'Working set model prevents thrashing',
      'Page replacement critical for virtual memory performance'
    ],
    codeExamples: [{
      title: 'Page Replacement Algorithms Implementation',
      language: 'java',
      code: `// FIFO Page Replacement
class FIFOPageReplacement {
    private Queue<Integer> pageQueue;
    private Set<Integer> pagesInMemory;
    private int frameCount;
    private int pageFaults;
    
    public FIFOPageReplacement(int frameCount) {
        this.frameCount = frameCount;
        this.pageQueue = new LinkedList<>();
        this.pagesInMemory = new HashSet<>();
        this.pageFaults = 0;
    }
    
    public boolean accessPage(int pageNumber) {
        if (pagesInMemory.contains(pageNumber)) {
            return false; // Page hit
        }
        
        pageFaults++;
        
        if (pagesInMemory.size() < frameCount) {
            // Memory not full
            pagesInMemory.add(pageNumber);
            pageQueue.offer(pageNumber);
        } else {
            // Memory full - replace oldest page
            int victimPage = pageQueue.poll();
            pagesInMemory.remove(victimPage);
            pagesInMemory.add(pageNumber);
            pageQueue.offer(pageNumber);
        }
        return true; // Page fault
    }
}

// LRU Page Replacement
class LRUPageReplacement {
    private LinkedHashMap<Integer, Integer> pageMap;
    private int frameCount;
    private int pageFaults;
    
    public LRUPageReplacement(int frameCount) {
        this.frameCount = frameCount;
        this.pageFaults = 0;
        // LinkedHashMap maintains insertion/access order
        this.pageMap = new LinkedHashMap<Integer, Integer>(frameCount, 0.75f, true) {
            @Override
            protected boolean removeEldestEntry(Map.Entry<Integer, Integer> eldest) {
                return size() > frameCount;
            }
        };
    }
    
    public boolean accessPage(int pageNumber) {
        if (pageMap.containsKey(pageNumber)) {
            // Page hit - update access time
            pageMap.get(pageNumber); // This moves to end in access-order LinkedHashMap
            return false;
        }
        
        pageFaults++;
        pageMap.put(pageNumber, pageNumber);
        return true; // Page fault
    }
}

// Optimal Page Replacement (Theoretical)
class OptimalPageReplacement {
    private Set<Integer> pagesInMemory;
    private int frameCount;
    private int pageFaults;
    
    public OptimalPageReplacement(int frameCount) {
        this.frameCount = frameCount;
        this.pagesInMemory = new HashSet<>();
        this.pageFaults = 0;
    }
    
    public boolean accessPage(int pageNumber, int[] futureReferences, int currentIndex) {
        if (pagesInMemory.contains(pageNumber)) {
            return false; // Page hit
        }
        
        pageFaults++;
        
        if (pagesInMemory.size() < frameCount) {
            pagesInMemory.add(pageNumber);
        } else {
            // Find page that will be used farthest in future
            int victimPage = findOptimalVictim(futureReferences, currentIndex);
            pagesInMemory.remove(victimPage);
            pagesInMemory.add(pageNumber);
        }
        return true;
    }
    
    private int findOptimalVictim(int[] futureReferences, int currentIndex) {
        int farthest = currentIndex;
        int victimPage = -1;
        
        for (Integer page : pagesInMemory) {
            int nextUse = findNextUse(page, futureReferences, currentIndex + 1);
            if (nextUse > farthest) {
                farthest = nextUse;
                victimPage = page;
            }
        }
        
        return victimPage != -1 ? victimPage : pagesInMemory.iterator().next();
    }
    
    private int findNextUse(int page, int[] references, int startIndex) {
        for (int i = startIndex; i < references.length; i++) {
            if (references[i] == page) {
                return i;
            }
        }
        return Integer.MAX_VALUE; // Never used again
    }
}

// Clock (Second Chance) Algorithm
class ClockPageReplacement {
    private int[] frames;
    private boolean[] referenceBits;
    private int clockHand;
    private Set<Integer> pagesInMemory;
    private int frameCount;
    private int pageFaults;
    
    public ClockPageReplacement(int frameCount) {
        this.frameCount = frameCount;
        this.frames = new int[frameCount];
        this.referenceBits = new boolean[frameCount];
        this.clockHand = 0;
        this.pagesInMemory = new HashSet<>();
        this.pageFaults = 0;
        Arrays.fill(frames, -1);
    }
    
    public boolean accessPage(int pageNumber) {
        if (pagesInMemory.contains(pageNumber)) {
            // Page hit - set reference bit
            setReferenceBit(pageNumber);
            return false;
        }
        
        pageFaults++;
        
        // Find frame for new page
        int frameIndex = findVictimFrame();
        
        // Remove old page if frame was occupied
        if (frames[frameIndex] != -1) {
            pagesInMemory.remove(frames[frameIndex]);
        }
        
        // Load new page
        frames[frameIndex] = pageNumber;
        referenceBits[frameIndex] = true;
        pagesInMemory.add(pageNumber);
        
        return true;
    }
    
    private int findVictimFrame() {
        while (true) {
            if (frames[clockHand] == -1) {
                // Empty frame
                return clockHand;
            }
            
            if (!referenceBits[clockHand]) {
                // Found victim (reference bit = 0)
                return clockHand;
            }
            
            // Give second chance (clear reference bit)
            referenceBits[clockHand] = false;
            clockHand = (clockHand + 1) % frameCount;
        }
    }
    
    private void setReferenceBit(int pageNumber) {
        for (int i = 0; i < frameCount; i++) {
            if (frames[i] == pageNumber) {
                referenceBits[i] = true;
                break;
            }
        }
    }
}

// Enhanced Second Chance (NRU - Not Recently Used)
class NRUPageReplacement {
    private PageFrame[] frames;
    private int clockHand;
    private int frameCount;
    
    class PageFrame {
        int pageNumber;
        boolean referenceBit;
        boolean modifyBit;
        
        int getClass() {
            if (!referenceBit && !modifyBit) return 0; // Not referenced, not modified
            if (!referenceBit && modifyBit) return 1;  // Not referenced, modified
            if (referenceBit && !modifyBit) return 2;  // Referenced, not modified
            return 3; // Referenced, modified
        }
    }
    
    public int findVictimPage() {
        // Look for lowest class page
        for (int cls = 0; cls <= 3; cls++) {
            for (int i = 0; i < frameCount; i++) {
                int index = (clockHand + i) % frameCount;
                if (frames[index].getClass() == cls) {
                    clockHand = (index + 1) % frameCount;
                    return index;
                }
            }
        }
        return clockHand; // Fallback
    }
}`
    }],
    questions: [
      { question: "Compare FIFO, LRU, and Optimal page replacement algorithms.", answer: "FIFO: replaces oldest page, simple implementation, suffers from Belady's anomaly. LRU: replaces least recently used, excellent performance with good locality, high implementation overhead. Optimal: replaces page used farthest in future, theoretically minimum page faults, impossible to implement (requires future knowledge)." },
      { question: "What is Belady's anomaly and which algorithms suffer from it?", answer: "Belady's anomaly occurs when increasing number of page frames results in more page faults instead of fewer. FIFO algorithm suffers from this anomaly. LRU and Optimal algorithms are stack algorithms and don't exhibit Belady's anomaly - more frames always result in fewer or equal page faults." },
      { question: "How does the Clock (Second Chance) algorithm work?", answer: "Clock algorithm uses circular list of pages with reference bits. When replacement needed: if reference bit = 0, replace page; if reference bit = 1, set to 0 and move to next page. Approximates LRU with lower overhead, gives pages 'second chance' before replacement." },
      { question: "What are the implementation challenges of LRU?", answer: "LRU requires tracking access order for all pages. Implementations: counter method (timestamp on each access), stack method (maintain stack of page numbers), hardware support needed for efficiency. High overhead makes pure LRU impractical, leading to approximation algorithms like Clock." },
      { question: "Explain the Not Recently Used (NRU) algorithm.", answer: "NRU uses reference and modify bits to classify pages into 4 classes: (0) not referenced, not modified, (1) not referenced, modified, (2) referenced, not modified, (3) referenced, modified. Replaces page from lowest non-empty class. Periodically clears reference bits." },
      { question: "How do you measure page replacement algorithm performance?", answer: "Metrics: page fault rate (lower better), hit ratio (higher better), working set size, memory utilization. Factors affecting performance: locality of reference, memory size, page size, algorithm overhead. Trace-driven simulation used for evaluation with real workloads." },
      { question: "What is the working set model and how does it relate to page replacement?", answer: "Working set W(t,Δ) = set of pages referenced in last Δ time units. Represents process's memory requirements for efficient execution. Page replacement should maintain working sets in memory to prevent thrashing. Working set size guides memory allocation decisions." },
      { question: "How do modern systems implement LRU approximation?", answer: "Hardware support: reference bits set by MMU on page access. Software algorithms: Clock/Second Chance, NRU, aging (shift reference bits periodically). Multi-level approaches: separate algorithms for different page types. Goal is balance between accuracy and overhead." },
      { question: "What factors influence the choice of page replacement algorithm?", answer: "System type (interactive vs batch), memory size, page fault cost, hardware support available, implementation complexity, locality patterns of applications. Interactive systems prefer algorithms with good response time, batch systems may prioritize throughput." },
      { question: "How do you handle page replacement in multi-level memory systems?", answer: "Different algorithms for different levels: L1/L2 cache (LRU hardware), main memory (Clock/NRU), disk (LRU approximation). Consider access costs at each level, prefetching strategies, and coordination between levels. Modern systems use adaptive algorithms based on access patterns." }
    ]
  }
];