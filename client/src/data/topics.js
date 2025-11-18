import { advancedTopics } from './advancedTopics';
import { dbmsTopics } from './dbmsTopics';

const coreTopics = [
  {
    id: 'encapsulation',
    title: 'Encapsulation',
    explanation: `Encapsulation is one of the fundamental principles of Object-Oriented Programming that involves bundling data (attributes) and methods (functions) that operate on that data within a single unit called a class. It also involves restricting direct access to some of an object's components, which is a means of preventing accidental interference and misuse of the methods and data. The main purpose is to hide the internal representation of an object from the outside world and only expose what is necessary through well-defined interfaces.`,
    keyPoints: [
      'Data hiding - Internal object details are hidden from outside world',
      'Access control through access modifiers (private, protected, public)',
      'Getter and setter methods to control access to private data',
      'Reduces complexity and increases reusability',
      'Provides security by preventing unauthorized access',
      'Makes code more maintainable and flexible'
    ],
    codeExamples: [
      {
        title: 'Basic Encapsulation Example',
        language: 'java',
        code: `public class BankAccount {
    private double balance;
    private String accountNumber;
    private String ownerName;
    
    public BankAccount(String accountNumber, String ownerName) {
        this.accountNumber = accountNumber;
        this.ownerName = ownerName;
        this.balance = 0.0;
    }
    
    // Getter methods
    public double getBalance() {
        return balance;
    }
    
    public String getAccountNumber() {
        return accountNumber;
    }
    
    public String getOwnerName() {
        return ownerName;
    }
    
    // Controlled access methods
    public boolean deposit(double amount) {
        if (amount > 0) {
            balance += amount;
            return true;
        }
        return false;
    }
    
    public boolean withdraw(double amount) {
        if (amount > 0 && amount <= balance) {
            balance -= amount;
            return true;
        }
        return false;
    }
}`
      }
    ],
    questions: [
      {
        question: "What is encapsulation and why is it important in OOP?",
        answer: "Encapsulation is the bundling of data and methods that operate on that data within a single unit (class), while restricting access to internal details. It's important because it provides data security, reduces complexity, improves maintainability, and prevents unauthorized access to object internals."
      },
      {
        question: "How do access modifiers support encapsulation?",
        answer: "Access modifiers (private, protected, public) control the visibility and accessibility of class members. Private members are only accessible within the same class, protected members are accessible within the package and subclasses, and public members are accessible everywhere. This supports encapsulation by allowing controlled access to data."
      },
      {
        question: "What are getter and setter methods? Why are they used?",
        answer: "Getter methods retrieve the value of private fields, while setter methods modify them. They're used to provide controlled access to private data, allowing validation, logging, or other processing when data is accessed or modified, maintaining the principle of encapsulation."
      },
      {
        question: "Can you have a class with only private constructors? What would be the use case?",
        answer: "Yes, classes can have only private constructors. Use cases include Singleton pattern (to ensure only one instance), utility classes with only static methods, or factory pattern where object creation is controlled through static factory methods."
      },
      {
        question: "What is the difference between data hiding and encapsulation?",
        answer: "Data hiding is a subset of encapsulation. Data hiding specifically refers to restricting access to data members using access modifiers. Encapsulation is broader - it includes data hiding plus bundling data and methods together in a single unit."
      },
      {
        question: "How does encapsulation improve code maintainability?",
        answer: "Encapsulation improves maintainability by: 1) Hiding implementation details, allowing internal changes without affecting external code, 2) Providing clear interfaces through public methods, 3) Centralizing validation and business logic, 4) Reducing dependencies between classes."
      },
      {
        question: "What happens if you don't use encapsulation in your code?",
        answer: "Without encapsulation: 1) Data can be modified directly leading to invalid states, 2) No validation or business logic enforcement, 3) Tight coupling between classes, 4) Difficult to maintain and debug, 5) Security vulnerabilities, 6) Code becomes fragile and error-prone."
      },
      {
        question: "Can you achieve encapsulation without using private access modifier?",
        answer: "Partial encapsulation is possible using package-private (default) access, but true encapsulation requires private access modifiers. Without private, data is still accessible within the package, which doesn't provide complete data hiding and security."
      },
      {
        question: "Explain the concept of immutable objects in relation to encapsulation.",
        answer: "Immutable objects are objects whose state cannot be changed after creation. They support encapsulation by ensuring data integrity - once created, the object's state is guaranteed to remain constant. This is achieved by making fields final, providing no setters, and returning defensive copies of mutable fields."
      },
      {
        question: "How do you handle encapsulation when dealing with collections as instance variables?",
        answer: "When using collections as instance variables: 1) Make the collection field private, 2) Don't provide direct getter that returns the collection reference, 3) Return defensive copies or unmodifiable views, 4) Provide specific methods to add/remove elements with validation, 5) Initialize collections in constructor to prevent null references."
      }
    ]
  },
  {
    id: 'inheritance',
    title: 'Inheritance',
    explanation: `Inheritance is a fundamental OOP principle that allows a class (child/subclass) to inherit properties and methods from another class (parent/superclass). It establishes an "is-a" relationship between classes and promotes code reusability. The child class can use, extend, or override the functionality of the parent class. Java supports single inheritance (a class can extend only one class) but multiple inheritance through interfaces.`,
    keyPoints: [
      'Promotes code reusability and reduces redundancy',
      'Establishes "is-a" relationship between classes',
      'Child class inherits all non-private members of parent class',
      'Method overriding allows customization of inherited behavior',
      'Constructor chaining ensures proper initialization',
      'Java supports single inheritance for classes, multiple for interfaces'
    ],
    codeExamples: [
      {
        title: 'Basic Inheritance Example',
        language: 'java',
        code: `// Parent class
public class Vehicle {
    protected String brand;
    protected int year;
    protected double price;
    
    public Vehicle(String brand, int year, double price) {
        this.brand = brand;
        this.year = year;
        this.price = price;
    }
    
    public void start() {
        System.out.println(brand + " is starting...");
    }
    
    public void stop() {
        System.out.println(brand + " is stopping...");
    }
}

// Child class
public class Car extends Vehicle {
    private int numberOfDoors;
    
    public Car(String brand, int year, double price, int numberOfDoors) {
        super(brand, year, price); // Call parent constructor
        this.numberOfDoors = numberOfDoors;
    }
    
    // Method overriding
    @Override
    public void start() {
        System.out.println("Car " + brand + " is starting with ignition key...");
    }
    
    public void honk() {
        System.out.println(brand + " car is honking!");
    }
}`
      }
    ],
    questions: [
      {
        question: "What is inheritance and what are its main benefits?",
        answer: "Inheritance allows a class to inherit properties and methods from another class. Benefits include: code reusability, establishing hierarchical relationships, method overriding for customization, reduced development time, easier maintenance, and promoting the DRY (Don't Repeat Yourself) principle."
      },
      {
        question: "What is the difference between 'is-a' and 'has-a' relationships?",
        answer: "'Is-a' represents inheritance (e.g., Car is-a Vehicle), where child class inherits from parent. 'Has-a' represents composition/aggregation (e.g., Car has-a Engine), where one class contains another as a member variable."
      },
      {
        question: "Why doesn't Java support multiple inheritance for classes?",
        answer: "Java doesn't support multiple inheritance for classes to avoid the Diamond Problem - ambiguity when two parent classes have methods with the same signature. This could cause confusion about which method to inherit. Java supports multiple inheritance through interfaces to avoid this issue."
      },
      {
        question: "What is constructor chaining in inheritance?",
        answer: "Constructor chaining is the process where child class constructor calls parent class constructor using 'super()'. This ensures proper initialization of inherited members. If not explicitly called, Java automatically calls the no-argument parent constructor."
      },
      {
        question: "Can you override static methods? Why or why not?",
        answer: "No, static methods cannot be overridden because they belong to the class, not instances. However, you can hide static methods by declaring a static method with the same signature in the child class. This is called method hiding, not overriding."
      },
      {
        question: "What happens if a parent class doesn't have a default constructor?",
        answer: "If parent class doesn't have a default constructor, child class constructor must explicitly call a parent constructor using super() with appropriate parameters. Otherwise, compilation error occurs because Java cannot automatically call the default parent constructor."
      },
      {
        question: "What is the purpose of the 'super' keyword?",
        answer: "The 'super' keyword is used to: 1) Call parent class constructor (super()), 2) Access parent class methods (super.methodName()), 3) Access parent class variables when hidden by child class variables (super.variableName). It provides explicit access to parent class members."
      },
      {
        question: "Can private members of a parent class be inherited?",
        answer: "Private members are not inherited by child classes - they're not accessible directly. However, they exist in the child object and can be accessed through public/protected methods of the parent class. Only public and protected members are directly accessible in child classes."
      },
      {
        question: "How do you prevent a class from being inherited?",
        answer: "Use the 'final' keyword before the class declaration. Final classes cannot be extended. Examples include String, Integer, and other wrapper classes. This is useful when you want to ensure the class behavior cannot be modified through inheritance."
      },
      {
        question: "What is the difference between abstract classes and concrete classes in inheritance?",
        answer: "Abstract classes cannot be instantiated and may contain abstract methods that must be implemented by child classes. Concrete classes can be instantiated and have complete implementations. Abstract classes are used to define common interface and partial implementation for related classes."
      }
    ]
  },
  {
    id: 'polymorphism',
    title: 'Polymorphism',
    explanation: `Polymorphism, derived from Greek meaning "many forms," is the ability of objects of different types to be treated as instances of the same type through a common interface. It allows a single interface to represent different underlying forms (data types). In Java, polymorphism is achieved through method overriding (runtime polymorphism) and method overloading (compile-time polymorphism).`,
    keyPoints: [
      'One interface, multiple implementations',
      'Runtime polymorphism through method overriding and dynamic binding',
      'Compile-time polymorphism through method overloading',
      'Enables writing flexible and extensible code',
      'Supports the Open/Closed Principle',
      'Method resolution happens at runtime for overridden methods'
    ],
    codeExamples: [
      {
        title: 'Runtime Polymorphism Example',
        language: 'java',
        code: `abstract class Animal {
    protected String name;
    
    public Animal(String name) {
        this.name = name;
    }
    
    public abstract void makeSound();
    
    public void displayInfo() {
        System.out.println("Animal: " + name);
        makeSound(); // Polymorphic call
    }
}

class Dog extends Animal {
    public Dog(String name) {
        super(name);
    }
    
    @Override
    public void makeSound() {
        System.out.println(name + " says: Woof! Woof!");
    }
}

class Cat extends Animal {
    public Cat(String name) {
        super(name);
    }
    
    @Override
    public void makeSound() {
        System.out.println(name + " says: Meow! Meow!");
    }
}

// Usage
Animal[] animals = {new Dog("Buddy"), new Cat("Whiskers")};
for (Animal animal : animals) {
    animal.displayInfo(); // Different implementations called
}`
      }
    ],
    questions: [
      {
        question: "What is polymorphism and what are its types?",
        answer: "Polymorphism is the ability of objects to take multiple forms. Types include: 1) Runtime polymorphism (method overriding, dynamic binding), 2) Compile-time polymorphism (method overloading), 3) Parametric polymorphism (generics). It allows one interface to represent different underlying forms."
      },
      {
        question: "Explain the difference between compile-time and runtime polymorphism.",
        answer: "Compile-time polymorphism (method overloading) is resolved during compilation based on method signatures. Runtime polymorphism (method overriding) is resolved during execution based on the actual object type. Runtime polymorphism uses dynamic method dispatch."
      },
      {
        question: "How does dynamic method dispatch work in Java?",
        answer: "Dynamic method dispatch uses the actual object type (not reference type) to determine which overridden method to call at runtime. JVM maintains a virtual method table (vtable) for each class containing method addresses. When a method is called, JVM looks up the actual implementation in the object's vtable."
      },
      {
        question: "Can you achieve polymorphism without inheritance?",
        answer: "Yes, through interfaces. Multiple unrelated classes can implement the same interface, allowing polymorphic behavior without inheritance. This is composition-based polymorphism and is often preferred as it provides more flexibility than inheritance-based polymorphism."
      },
      {
        question: "What is method hiding vs method overriding?",
        answer: "Method overriding occurs with instance methods where child class provides new implementation (runtime polymorphism). Method hiding occurs with static methods where child class method hides parent class method (compile-time resolution). Hidden methods are resolved based on reference type, not object type."
      },
      {
        question: "Why can't we override private methods?",
        answer: "Private methods cannot be overridden because they're not inherited by child classes. They're not visible to child classes, so there's no method to override. If you declare a method with the same signature in child class, it's a new method, not an override."
      },
      {
        question: "How does polymorphism support the Open/Closed Principle?",
        answer: "Polymorphism allows classes to be open for extension (through inheritance/interfaces) but closed for modification. You can add new implementations without changing existing code. Client code works with abstractions, so new concrete implementations can be added without modifying client code."
      },
      {
        question: "What happens when you call an overridden method from a constructor?",
        answer: "Calling overridden methods from constructors can be dangerous because the child class constructor hasn't run yet, so child class fields may not be initialized. The overridden method in child class will be called, but it may access uninitialized fields, leading to unexpected behavior."
      },
      {
        question: "Can constructors be overloaded? Can they be overridden?",
        answer: "Constructors can be overloaded (multiple constructors with different parameters in same class). Constructors cannot be overridden because they're not inherited. Each class has its own constructors, and child class constructors must call parent constructors explicitly or implicitly."
      },
      {
        question: "What is covariant return type in method overriding?",
        answer: "Covariant return type allows an overriding method to return a subtype of the return type declared in the parent class method. For example, if parent method returns Animal, child method can return Dog (subclass of Animal). This maintains type safety while providing more specific return types."
      }
    ]
  },
  {
    id: 'abstraction',
    title: 'Abstraction',
    explanation: `Abstraction is the process of hiding implementation details while showing only essential features of an object. It focuses on what an object does rather than how it does it. In Java, abstraction is achieved through abstract classes and interfaces. Abstract classes can have both abstract methods (without implementation) and concrete methods (with implementation).`,
    keyPoints: [
      'Hides implementation complexity from users',
      'Shows only essential features and functionality',
      'Achieved through abstract classes and interfaces',
      'Promotes loose coupling between components',
      'Enables multiple implementations of same abstraction',
      'Supports design by contract approach'
    ],
    codeExamples: [
      {
        title: 'Abstract Class Example',
        language: 'java',
        code: `public abstract class Shape {
    protected String color;
    
    public Shape(String color) {
        this.color = color;
    }
    
    // Abstract methods - must be implemented by child classes
    public abstract double calculateArea();
    public abstract double calculatePerimeter();
    
    // Concrete method - can be inherited as-is
    public void displayInfo() {
        System.out.println("Shape: " + getClass().getSimpleName());
        System.out.println("Color: " + color);
        System.out.println("Area: " + calculateArea());
    }
}

public class Circle extends Shape {
    private double radius;
    
    public Circle(String color, double radius) {
        super(color);
        this.radius = radius;
    }
    
    @Override
    public double calculateArea() {
        return Math.PI * radius * radius;
    }
    
    @Override
    public double calculatePerimeter() {
        return 2 * Math.PI * radius;
    }
}`
      }
    ],
    questions: [
      {
        question: "What is abstraction and how is it different from encapsulation?",
        answer: "Abstraction hides implementation complexity and shows only essential features, focusing on 'what' an object does. Encapsulation hides internal data and provides controlled access, focusing on 'how' to protect data. Abstraction is about design and interface, encapsulation is about data security and access control."
      },
      {
        question: "What is the difference between abstract classes and interfaces?",
        answer: "Abstract classes can have both abstract and concrete methods, constructors, instance variables, and any access modifiers. Interfaces (pre-Java 8) had only abstract methods and constants. Java 8+ interfaces can have default and static methods. A class can extend one abstract class but implement multiple interfaces."
      },
      {
        question: "When should you use abstract classes vs interfaces?",
        answer: "Use abstract classes when: you have common code to share, need constructors, want to provide default implementations, or have closely related classes. Use interfaces when: you want to specify contract for unrelated classes, need multiple inheritance, want to achieve loose coupling, or defining capabilities."
      },
      {
        question: "Can abstract classes have constructors? Why?",
        answer: "Yes, abstract classes can have constructors. They're used to initialize common fields when subclasses are instantiated. The constructor is called through super() from subclass constructors. You cannot directly instantiate abstract classes, but their constructors are essential for proper initialization of inherited members."
      },
      {
        question: "What are default methods in interfaces and why were they introduced?",
        answer: "Default methods (Java 8+) are interface methods with implementation. They were introduced to enable interface evolution without breaking existing implementations. They allow adding new methods to interfaces while maintaining backward compatibility. Classes can override default methods or inherit them as-is."
      },
      {
        question: "Can you instantiate an abstract class? What about anonymous classes?",
        answer: "You cannot directly instantiate abstract classes using 'new AbstractClass()'. However, you can create anonymous subclasses that provide implementations for abstract methods: 'new AbstractClass() { /* implement abstract methods */ }'. This creates an instance of an anonymous concrete subclass."
      },
      {
        question: "What is the Template Method pattern and how does it relate to abstraction?",
        answer: "Template Method pattern defines the skeleton of an algorithm in an abstract class, with some steps implemented and others left abstract for subclasses. It demonstrates abstraction by separating the algorithm structure (abstract) from specific implementations (concrete). Subclasses fill in the abstract steps without changing the overall algorithm."
      },
      {
        question: "How do static methods in interfaces work?",
        answer: "Static methods in interfaces (Java 8+) belong to the interface, not implementing classes. They're called using interface name (Interface.method()). They cannot be overridden by implementing classes and provide utility methods related to the interface. They help keep related functionality together."
      },
      {
        question: "Can abstract methods be private, final, or static?",
        answer: "Abstract methods cannot be private (must be overridden by subclasses), final (would prevent overriding), or static (belong to class, not instances). They must be public or protected to be accessible to subclasses for implementation. Static methods cannot be abstract because they're not inherited."
      },
      {
        question: "How does abstraction support the Dependency Inversion Principle?",
        answer: "Abstraction supports DIP by allowing high-level modules to depend on abstractions (interfaces/abstract classes) rather than concrete implementations. This inverts the dependency direction - concrete classes depend on abstractions, not vice versa. It enables loose coupling and easier testing through dependency injection."
      }
    ]
  }
];

export const topics = [...coreTopics, ...advancedTopics, ...dbmsTopics];