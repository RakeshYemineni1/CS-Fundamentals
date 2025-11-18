export const advancedTopics = [
  {
    id: 'abstract-vs-interface',
    title: 'Abstract Class vs Interface',
    explanation: 'The choice between abstract classes and interfaces is crucial in object-oriented design. Abstract classes provide partial implementation and establish "is-a" relationships, while interfaces define contracts and enable "can-do" relationships.',
    keyPoints: [
      'Abstract classes support both abstract and concrete methods',
      'Interfaces define contracts with method signatures',
      'Single inheritance for classes, multiple inheritance for interfaces',
      'Abstract classes can have constructors and instance variables',
      'Interfaces support default and static methods (Java 8+)',
      'Choose based on relationship type and code sharing needs'
    ],
    codeExamples: [
      {
        title: 'Abstract vs Interface Example',
        language: 'java',
        code: `// Abstract class example
abstract class Vehicle {
    protected String brand;
    protected int year;
    
    public Vehicle(String brand, int year) {
        this.brand = brand;
        this.year = year;
    }
    
    // Concrete method
    public void displayInfo() {
        System.out.println("Brand: " + brand + ", Year: " + year);
    }
    
    // Abstract methods
    public abstract void start();
    public abstract double calculateMaintenanceCost();
}

// Interface example
interface Flyable {
    double MAX_ALTITUDE = 50000.0;
    
    void takeOff();
    void land();
    void fly(double altitude);
    
    default void performPreFlightCheck() {
        System.out.println("Performing pre-flight check");
    }
}

// Class using both
class Airplane extends Vehicle implements Flyable {
    public Airplane(String brand, int year) {
        super(brand, year);
    }
    
    @Override
    public void start() {
        System.out.println("Starting airplane engines");
    }
    
    @Override
    public double calculateMaintenanceCost() {
        return 50000.0;
    }
    
    @Override
    public void takeOff() {
        System.out.println("Airplane taking off");
    }
    
    @Override
    public void land() {
        System.out.println("Airplane landing");
    }
    
    @Override
    public void fly(double altitude) {
        if (altitude <= MAX_ALTITUDE) {
            System.out.println("Flying at " + altitude + " feet");
        }
    }
}`
      }
    ],
    questions: [
      {
        question: "What are the key differences between abstract classes and interfaces?",
        answer: "Abstract classes: can have constructors, instance variables, concrete methods, single inheritance, any access modifiers. Interfaces: no constructors, only constants, abstract methods (+ default/static in Java 8+), multiple inheritance, public methods only."
      },
      {
        question: "When would you choose an abstract class over an interface?",
        answer: "Choose abstract class when: you have common implementation to share, need constructors for initialization, want to provide default behavior, have closely related classes in hierarchy, need non-public methods."
      },
      {
        question: "Can a class extend an abstract class and implement interfaces simultaneously?",
        answer: "Yes, a class can extend one abstract class and implement multiple interfaces. This combines inheritance (is-a relationship) with capability contracts (can-do relationships). The class must implement all abstract methods from both."
      },
      {
        question: "What happens if an abstract class implements an interface?",
        answer: "An abstract class can implement interfaces but doesn't need to provide implementations for all interface methods. It can leave some methods abstract for subclasses to implement, allowing partial fulfillment of the interface contract."
      },
      {
        question: "How do default methods in interfaces affect the abstract class vs interface decision?",
        answer: "Default methods blur the distinction by allowing interfaces to provide implementations. However, interfaces still can't have constructors, instance variables, or protected methods. Abstract classes remain better for shared state and initialization logic."
      },
      {
        question: "Can you have private methods in abstract classes and interfaces?",
        answer: "Abstract classes can have private methods like regular classes. Interfaces can have private methods (Java 9+) but only as helpers for default/static methods. Private methods in interfaces cannot be abstract."
      },
      {
        question: "What is the diamond problem and how do interfaces handle it?",
        answer: "Diamond problem occurs when a class inherits the same method from multiple sources. Interfaces handle it by requiring the implementing class to override conflicting default methods. The class can call specific interface methods using InterfaceName.super.methodName()."
      },
      {
        question: "Can abstract classes have final methods? What about interfaces?",
        answer: "Abstract classes can have final methods that cannot be overridden by subclasses. Interfaces cannot have final methods because all methods (except static and private) are meant to be implementable/overridable. Static methods in interfaces are implicitly final."
      },
      {
        question: "How do you decide between using abstract classes and interfaces in a design?",
        answer: "Consider: 1) Relationship type (is-a vs can-do), 2) Code sharing needs (abstract class for shared implementation), 3) Multiple inheritance requirements (interfaces), 4) Evolution needs (interfaces for adding capabilities), 5) Access control requirements."
      },
      {
        question: "What are marker interfaces and how do they differ from abstract classes?",
        answer: "Marker interfaces are empty interfaces that provide metadata about a class (like Serializable, Cloneable). They indicate capability without defining methods. Abstract classes cannot serve as markers because they imply implementation inheritance."
      }
    ]
  },
  {
    id: 'method-overloading-overriding',
    title: 'Method Overloading vs Overriding',
    explanation: 'Method overloading and overriding are two different concepts in OOP. Overloading occurs when multiple methods in the same class have the same name but different parameters. Overriding occurs when a subclass provides a specific implementation of a method already defined in its parent class.',
    keyPoints: [
      'Overloading: same name, different parameters, compile-time resolution',
      'Overriding: same signature, different implementation, runtime resolution',
      'Overloading can change return type, overriding cannot (except covariant)',
      'Overloading occurs in same class, overriding in inheritance hierarchy',
      'Overloading supports static polymorphism, overriding supports dynamic polymorphism'
    ],
    codeExamples: [
      {
        title: 'Method Overloading Example',
        language: 'java',
        code: `public class Calculator {
    // Method overloading - same name, different parameters
    
    public int add(int a, int b) {
        return a + b;
    }
    
    public double add(double a, double b) {
        return a + b;
    }
    
    public int add(int a, int b, int c) {
        return a + b + c;
    }
    
    public String add(String a, String b) {
        return a + b;
    }
    
    // Different parameter order
    public void display(String name, int age) {
        System.out.println("Name: " + name + ", Age: " + age);
    }
    
    public void display(int age, String name) {
        System.out.println("Age: " + age + ", Name: " + name);
    }
}`
      },
      {
        title: 'Method Overriding Example',
        language: 'java',
        code: `// Parent class
class Animal {
    protected String name;
    
    public Animal(String name) {
        this.name = name;
    }
    
    public void makeSound() {
        System.out.println(name + " makes a sound");
    }
    
    public void eat() {
        System.out.println(name + " is eating");
    }
}

// Child class
class Dog extends Animal {
    public Dog(String name) {
        super(name);
    }
    
    // Method overriding
    @Override
    public void makeSound() {
        System.out.println(name + " says: Woof! Woof!");
    }
    
    @Override
    public void eat() {
        System.out.println(name + " is eating dog food");
        super.eat(); // Call parent method
    }
}`
      }
    ],
    questions: [
      {
        question: "What is the difference between method overloading and method overriding?",
        answer: "Overloading: same method name, different parameters, resolved at compile-time, occurs in same class. Overriding: same method signature, different implementation, resolved at runtime, occurs in inheritance hierarchy."
      },
      {
        question: "Can you overload methods based on return type alone?",
        answer: "No, you cannot overload methods based solely on return type. The compiler uses method signature (name + parameter list) to distinguish overloaded methods. Return type is not part of the method signature for overloading purposes."
      },
      {
        question: "What are the rules for method overriding regarding access modifiers?",
        answer: "In overriding, you can maintain the same access level or make it more accessible (widening), but you cannot make it more restrictive (narrowing). For example: public can stay public, protected can become public, but public cannot become protected or private."
      },
      {
        question: "What is covariant return type in method overriding?",
        answer: "Covariant return type allows an overriding method to return a subtype of the return type declared in the parent class method. For example, if parent method returns Object, child method can return String. This maintains type safety while providing more specific return types."
      },
      {
        question: "Can static methods be overridden? What happens when you try?",
        answer: "Static methods cannot be overridden because they belong to the class, not instances. When you declare a static method with the same signature in a child class, it's called method hiding, not overriding. The method called is determined by the reference type, not the object type."
      },
      {
        question: "What is the difference between method hiding and method overriding?",
        answer: "Method overriding occurs with instance methods and uses dynamic binding (runtime resolution based on object type). Method hiding occurs with static methods and uses static binding (compile-time resolution based on reference type). Overriding supports polymorphism, hiding does not."
      },
      {
        question: "Can you override private methods?",
        answer: "No, private methods cannot be overridden because they are not inherited by child classes. If you declare a method with the same signature in a child class, it's a completely new method, not an override. Private methods are not accessible outside their declaring class."
      },
      {
        question: "What happens if you try to override a final method?",
        answer: "You cannot override final methods. The compiler will generate an error if you attempt to override a final method. Final methods are designed to prevent modification of their behavior in subclasses, ensuring the implementation remains unchanged throughout the inheritance hierarchy."
      },
      {
        question: "Can constructors be overloaded? Can they be overridden?",
        answer: "Constructors can be overloaded (multiple constructors with different parameters in the same class). Constructors cannot be overridden because they are not inherited. Each class has its own constructors, and child class constructors must call parent constructors using super()."
      },
      {
        question: "How does the compiler resolve overloaded method calls?",
        answer: "The compiler uses the following steps: 1) Exact match of parameter types, 2) Widening primitive conversions, 3) Autoboxing/unboxing, 4) Widening reference conversions, 5) Varargs. If multiple methods match at the same level, it results in a compilation error due to ambiguity."
      }
    ]
  },
  {
    id: 'access-modifiers',
    title: 'Access Modifiers',
    explanation: 'Access modifiers in Java control the visibility and accessibility of classes, methods, and variables. They are fundamental to encapsulation and help define the interface between different parts of a program.',
    keyPoints: [
      'Private: accessible only within the same class',
      'Default (package-private): accessible within the same package',
      'Protected: accessible within package and subclasses',
      'Public: accessible from anywhere',
      'Access modifiers support encapsulation and information hiding',
      'Proper use prevents unauthorized access and maintains code integrity'
    ],
    codeExamples: [
      {
        title: 'Access Modifiers Example',
        language: 'java',
        code: `public class AccessExample {
    // Private - only accessible within this class
    private String privateField = "Private";
    
    // Default - accessible within same package
    String defaultField = "Default";
    
    // Protected - accessible within package and subclasses
    protected String protectedField = "Protected";
    
    // Public - accessible from anywhere
    public String publicField = "Public";
    
    // Private method
    private void privateMethod() {
        System.out.println("Private method");
    }
    
    // Public method
    public void publicMethod() {
        System.out.println("Public method");
        privateMethod(); // Can call private method within same class
    }
    
    // Protected method
    protected void protectedMethod() {
        System.out.println("Protected method");
    }
}`
      }
    ],
    questions: [
      {
        question: "What are the four access modifiers in Java and their scope?",
        answer: "1) Private: accessible only within the same class, 2) Default (package-private): accessible within the same package, 3) Protected: accessible within the same package and subclasses, 4) Public: accessible from anywhere in the application."
      },
      {
        question: "Can you override a method with a more restrictive access modifier?",
        answer: "No, you cannot override a method with a more restrictive access modifier. You can only maintain the same access level or make it more accessible (widening). For example, you can override a protected method as public, but not a public method as protected."
      },
      {
        question: "Can a class have private constructors? What are the use cases?",
        answer: "Yes, classes can have private constructors. Use cases include: Singleton pattern (prevent external instantiation), Utility classes with only static methods, Factory pattern (control object creation through static methods), and preventing instantiation of certain classes."
      },
      {
        question: "What is the difference between protected and package-private access?",
        answer: "Package-private (default): accessible within the same package only. Protected: accessible within the same package AND in subclasses even if they're in different packages. Protected provides inheritance-based access across package boundaries, while package-private is strictly package-bound."
      },
      {
        question: "Can you access protected members of a parent class from a subclass in a different package?",
        answer: "Yes, but with restrictions. You can access protected members through inheritance (this.protectedMember) or on instances of the same subclass type. However, you cannot access protected members on instances of the parent class directly from a different package."
      },
      {
        question: "What happens when you don't specify an access modifier?",
        answer: "When no access modifier is specified, it defaults to package-private (default access). This means the member is accessible within the same package but not from different packages, even through inheritance."
      },
      {
        question: "How do access modifiers support encapsulation?",
        answer: "Access modifiers enforce encapsulation by: 1) Hiding internal implementation (private), 2) Controlling interface exposure (public), 3) Allowing controlled inheritance (protected), 4) Enabling package-level organization (default), 5) Preventing unauthorized access and modification of internal state."
      },
      {
        question: "Can static methods be private? What about protected?",
        answer: "Yes, static methods can have any access modifier including private and protected. Private static methods are often used as utility methods within the class. Protected static methods can be accessed by subclasses and within the same package."
      },
      {
        question: "What is the access level of members in an enum?",
        answer: "Enum members follow the same access modifier rules as regular classes. Enum constants are implicitly public, static, and final. You can have private fields and methods in enums for internal implementation, and public methods for the enum's interface."
      },
      {
        question: "How do access modifiers work with nested classes?",
        answer: "Nested classes can access all members of their enclosing class, including private members. Static nested classes can only access static members of the enclosing class. Inner classes have access to instance members. The nested class itself can have any access modifier to control its visibility."
      }
    ]
  },
  {
    id: 'static-dynamic-binding',
    title: 'Static vs Dynamic Binding',
    explanation: 'Binding refers to the process of connecting a method call to the method body. Static binding occurs at compile time, while dynamic binding occurs at runtime. Understanding binding is crucial for understanding polymorphism and performance implications.',
    keyPoints: [
      'Static binding occurs at compile time',
      'Dynamic binding occurs at runtime',
      'Static binding is faster but less flexible',
      'Dynamic binding enables polymorphism',
      'Method resolution depends on binding type',
      'Affects performance and memory usage'
    ],
    codeExamples: [
      {
        title: 'Static vs Dynamic Binding Example',
        language: 'java',
        code: `class Parent {
    // Static method - static binding
    public static void staticMethod() {
        System.out.println("Parent static method");
    }
    
    // Instance method - dynamic binding when overridden
    public void instanceMethod() {
        System.out.println("Parent instance method");
    }
    
    // Final method - static binding (cannot be overridden)
    public final void finalMethod() {
        System.out.println("Parent final method");
    }
}

class Child extends Parent {
    // Method hiding (not overriding) - static binding
    public static void staticMethod() {
        System.out.println("Child static method");
    }
    
    // Method overriding - dynamic binding
    @Override
    public void instanceMethod() {
        System.out.println("Child instance method");
    }
}

public class BindingDemo {
    public static void main(String[] args) {
        Parent parent = new Parent();
        Child child = new Child();
        Parent polymorphicChild = new Child();
        
        // Static methods - resolved at compile time based on reference type
        Parent.staticMethod();           // Parent static method
        Child.staticMethod();            // Child static method
        polymorphicChild.staticMethod(); // Parent static method (reference type)
        
        // Instance methods - resolved at runtime based on object type
        parent.instanceMethod();           // Parent instance method
        child.instanceMethod();            // Child instance method
        polymorphicChild.instanceMethod(); // Child instance method (runtime resolution)
    }
}`
      }
    ],
    questions: [
      {
        question: "What is the difference between static and dynamic binding?",
        answer: "Static binding occurs at compile time and is used for static, private, and final methods. The method call is resolved based on reference type. Dynamic binding occurs at runtime and is used for overridden instance methods. The method call is resolved based on actual object type, enabling polymorphism."
      },
      {
        question: "Which methods use static binding and which use dynamic binding?",
        answer: "Static binding: static methods, private methods, final methods, constructors. Dynamic binding: overridden instance methods in inheritance hierarchy. Static binding is faster but less flexible, while dynamic binding enables runtime polymorphism."
      },
      {
        question: "How does dynamic binding work internally in Java?",
        answer: "Java uses virtual method tables (vtables) for dynamic binding. Each class has a vtable containing pointers to method implementations. At runtime, JVM looks up the actual method implementation in the object's vtable based on the object's actual type, not the reference type."
      },
      {
        question: "What are the performance implications of static vs dynamic binding?",
        answer: "Static binding is faster because method resolution happens at compile time. Dynamic binding has runtime overhead due to vtable lookup and method resolution. However, modern JVMs optimize dynamic binding through techniques like method inlining and just-in-time compilation."
      },
      {
        question: "Why can't private methods use dynamic binding?",
        answer: "Private methods cannot use dynamic binding because they are not inherited by subclasses. Since they're not part of the inheritance hierarchy, there's no polymorphic behavior possible. Private methods are always resolved statically at compile time."
      },
      {
        question: "What is method resolution order in dynamic binding?",
        answer: "In dynamic binding, method resolution starts from the actual object's class and moves up the inheritance hierarchy until it finds the method implementation. The first matching method found is executed, which is why overridden methods in child classes take precedence over parent class methods."
      },
      {
        question: "How does final keyword affect binding?",
        answer: "The final keyword forces static binding for methods because final methods cannot be overridden. This means the method call is resolved at compile time based on the reference type, not at runtime based on the object type. This provides better performance but eliminates polymorphic behavior."
      },
      {
        question: "Can you force static binding for non-static methods?",
        answer: "You cannot directly force static binding for regular instance methods, but you can achieve similar effects by: 1) Making methods final, 2) Making methods private, 3) Using static methods, or 4) Calling methods explicitly with super keyword to bypass dynamic dispatch."
      },
      {
        question: "What is the relationship between binding and polymorphism?",
        answer: "Dynamic binding is the mechanism that enables runtime polymorphism. Without dynamic binding, polymorphic method calls wouldn't work because the method resolution would happen at compile time based on reference type rather than at runtime based on actual object type."
      },
      {
        question: "How do modern JVMs optimize dynamic binding?",
        answer: "Modern JVMs use several optimization techniques: 1) Method inlining for frequently called methods, 2) Just-in-time (JIT) compilation to native code, 3) Hotspot optimization for hot code paths, 4) Devirtualization when only one implementation is loaded, 5) Profile-guided optimizations based on runtime behavior."
      }
    ]
  },
  {
    id: 'deep-shallow-copy',
    title: 'Deep Copy vs Shallow Copy',
    explanation: 'Copying objects is a fundamental concept in programming. Shallow copy creates a new object but references to nested objects are shared between original and copy. Deep copy creates a new object and recursively copies all nested objects, creating completely independent copies.',
    keyPoints: [
      'Shallow copy copies object references, not actual objects',
      'Deep copy recursively copies all nested objects',
      'Shallow copy is faster but can cause side effects',
      'Deep copy is safer but more expensive',
      'Choice depends on object structure and requirements',
      'Immutable objects make copying considerations simpler'
    ],
    codeExamples: [
      {
        title: 'Deep vs Shallow Copy Example',
        language: 'java',
        code: `class Address {
    private String street;
    private String city;
    
    public Address(String street, String city) {
        this.street = street;
        this.city = city;
    }
    
    // Copy constructor for deep copying
    public Address(Address other) {
        this.street = other.street;
        this.city = other.city;
    }
    
    // Getters and setters
    public String getStreet() { return street; }
    public void setStreet(String street) { this.street = street; }
    public String getCity() { return city; }
    public void setCity(String city) { this.city = city; }
    
    @Override
    public String toString() {
        return street + ", " + city;
    }
}

class Person implements Cloneable {
    private String name;
    private Address address;
    
    public Person(String name, Address address) {
        this.name = name;
        this.address = address;
    }
    
    // Shallow copy using Object.clone()
    @Override
    public Person clone() throws CloneNotSupportedException {
        return (Person) super.clone(); // Shallow copy
    }
    
    // Deep copy method
    public Person deepCopy() {
        return new Person(this.name, new Address(this.address));
    }
    
    // Getters and setters
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public Address getAddress() { return address; }
    public void setAddress(Address address) { this.address = address; }
    
    @Override
    public String toString() {
        return "Person{name='" + name + "', address=" + address + "}";
    }
}`
      }
    ],
    questions: [
      {
        question: "What is the difference between deep copy and shallow copy?",
        answer: "Shallow copy creates a new object but copies only references to nested objects, so changes to nested objects affect both original and copy. Deep copy creates a new object and recursively copies all nested objects, creating completely independent copies where changes don't affect each other."
      },
      {
        question: "When would you use shallow copy vs deep copy?",
        answer: "Use shallow copy when: objects contain immutable nested objects, performance is critical, or you want shared references. Use deep copy when: you need completely independent objects, nested objects are mutable, or you want to avoid side effects from modifications."
      },
      {
        question: "How does Object.clone() work and what are its limitations?",
        answer: "Object.clone() performs shallow copy by default. The class must implement Cloneable interface. Limitations: only shallow copy unless overridden, throws CloneNotSupportedException, doesn't call constructors, and requires careful handling of mutable fields for deep copying."
      },
      {
        question: "What are alternative approaches to implement deep copying?",
        answer: "Alternatives include: 1) Copy constructors, 2) Factory methods, 3) Serialization/deserialization, 4) Using libraries like Apache Commons Lang, 5) Builder pattern, 6) Manual field-by-field copying. Each has trade-offs in terms of performance, complexity, and maintainability."
      },
      {
        question: "What problems can arise from shallow copying?",
        answer: "Problems include: 1) Unintended side effects when modifying nested objects, 2) Data corruption when multiple references point to same mutable object, 3) Difficulty in debugging when changes appear in unexpected places, 4) Thread safety issues in concurrent environments, 5) Violation of object immutability expectations."
      },
      {
        question: "How do you implement deep copy for objects containing collections?",
        answer: "For collections, create new collection instances and recursively copy all elements. For example: new ArrayList<>(original.getList()) for shallow copy of collection, or iterate through elements and deep copy each one for true deep copy. Consider using copy constructors or clone methods for complex nested objects."
      },
      {
        question: "What is defensive copying and how does it relate to deep/shallow copy?",
        answer: "Defensive copying is creating copies of mutable objects when they're passed to or returned from methods to prevent external modification. It's related to deep copying because you often need to create independent copies of nested mutable objects to maintain encapsulation and prevent unintended modifications."
      },
      {
        question: "How does immutability affect copying strategies?",
        answer: "Immutable objects simplify copying because shallow copy is sufficient - since objects can't be modified, sharing references is safe. This improves performance and reduces complexity. However, creating 'modified' versions of immutable objects requires creating entirely new instances with changed values."
      },
      {
        question: "What are the performance implications of deep vs shallow copy?",
        answer: "Shallow copy is faster as it only copies references, requiring O(1) time for each field. Deep copy is slower as it recursively copies all nested objects, potentially requiring O(n) time where n is the total number of objects in the object graph. Memory usage also increases significantly with deep copy."
      },
      {
        question: "How do you handle circular references in deep copying?",
        answer: "Circular references can cause infinite loops in naive deep copy implementations. Solutions include: 1) Maintaining a map of already-copied objects to detect cycles, 2) Using object identity to break cycles, 3) Implementing custom copy logic that handles specific circular relationships, 4) Using serialization libraries that handle cycles automatically."
      }
    ]
  },
  {
    id: 'solid-principles',
    title: 'SOLID Principles',
    explanation: 'SOLID is an acronym for five design principles that make software designs more understandable, flexible, and maintainable. These principles guide object-oriented design and programming to create robust, scalable applications.',
    keyPoints: [
      'S - Single Responsibility Principle: A class should have only one reason to change',
      'O - Open/Closed Principle: Open for extension, closed for modification',
      'L - Liskov Substitution Principle: Subtypes must be substitutable for base types',
      'I - Interface Segregation Principle: Clients should not depend on unused interfaces',
      'D - Dependency Inversion Principle: Depend on abstractions, not concretions'
    ],
    codeExamples: [
      {
        title: 'Single Responsibility Principle',
        language: 'java',
        code: `// Violation of SRP - multiple responsibilities
class BadEmployee {
    private String name;
    private double salary;
    
    // Responsibility 1: Employee data management
    public void setName(String name) { this.name = name; }
    public String getName() { return name; }
    
    // Responsibility 2: Salary calculation
    public double calculatePay() {
        return salary * 1.1; // Some calculation
    }
    
    // Responsibility 3: Database operations
    public void saveToDatabase() {
        // Database save logic
    }
    
    // Responsibility 4: Report generation
    public void generateReport() {
        // Report generation logic
    }
}

// Following SRP - single responsibility per class
class Employee {
    private String name;
    private double salary;
    
    public Employee(String name, double salary) {
        this.name = name;
        this.salary = salary;
    }
    
    public String getName() { return name; }
    public double getSalary() { return salary; }
}

class PayrollCalculator {
    public double calculatePay(Employee employee) {
        return employee.getSalary() * 1.1;
    }
}

class EmployeeRepository {
    public void save(Employee employee) {
        // Database save logic
    }
}

class EmployeeReportGenerator {
    public void generateReport(Employee employee) {
        // Report generation logic
    }
}`
      },
      {
        title: 'Open/Closed Principle',
        language: 'java',
        code: `// Following Open/Closed Principle
abstract class Shape {
    public abstract double calculateArea();
}

class Rectangle extends Shape {
    private double width, height;
    
    public Rectangle(double width, double height) {
        this.width = width;
        this.height = height;
    }
    
    @Override
    public double calculateArea() {
        return width * height;
    }
}

class Circle extends Shape {
    private double radius;
    
    public Circle(double radius) {
        this.radius = radius;
    }
    
    @Override
    public double calculateArea() {
        return Math.PI * radius * radius;
    }
}

class AreaCalculator {
    public double calculateTotalArea(List<Shape> shapes) {
        double totalArea = 0;
        for (Shape shape : shapes) {
            totalArea += shape.calculateArea(); // Open for extension
        }
        return totalArea;
    }
}

// Adding new shape doesn't require modifying existing code
class Triangle extends Shape {
    private double base, height;
    
    public Triangle(double base, double height) {
        this.base = base;
        this.height = height;
    }
    
    @Override
    public double calculateArea() {
        return 0.5 * base * height;
    }
}`
      }
    ],
    questions: [
      {
        question: "What does the Single Responsibility Principle state and why is it important?",
        answer: "SRP states that a class should have only one reason to change, meaning it should have only one responsibility. It's important because it makes classes more focused, easier to understand, test, and maintain. Changes to one responsibility don't affect others, reducing the risk of introducing bugs."
      },
      {
        question: "How does the Open/Closed Principle promote code maintainability?",
        answer: "OCP states that software entities should be open for extension but closed for modification. This promotes maintainability by allowing new functionality to be added through inheritance or composition without changing existing, tested code. It reduces the risk of breaking existing functionality when adding new features."
      },
      {
        question: "What is the Liskov Substitution Principle and provide an example of its violation?",
        answer: "LSP states that objects of a superclass should be replaceable with objects of a subclass without breaking the application. Violation example: if a Rectangle class has a Square subclass that behaves differently (e.g., setting width also changes height), substituting Square for Rectangle might break code that expects independent width/height control."
      },
      {
        question: "How does Interface Segregation Principle improve code design?",
        answer: "ISP states that clients should not be forced to depend on interfaces they don't use. It improves design by creating smaller, more focused interfaces instead of large, monolithic ones. This reduces coupling, makes code more flexible, and prevents classes from implementing methods they don't need."
      },
      {
        question: "Explain Dependency Inversion Principle with a practical example.",
        answer: "DIP states that high-level modules should not depend on low-level modules; both should depend on abstractions. Example: instead of a OrderService directly depending on MySQLDatabase, it should depend on a DatabaseInterface. This allows easy switching between different database implementations without changing the OrderService."
      },
      {
        question: "How do SOLID principles work together to improve software design?",
        answer: "SOLID principles complement each other: SRP creates focused classes, OCP enables extension without modification, LSP ensures proper inheritance, ISP creates cohesive interfaces, and DIP reduces coupling. Together, they create modular, testable, maintainable code that's easier to understand and modify."
      },
      {
        question: "What are the benefits of following SOLID principles?",
        answer: "Benefits include: 1) Improved code maintainability and readability, 2) Easier testing and debugging, 3) Better code reusability, 4) Reduced coupling between components, 5) Increased flexibility for future changes, 6) Better adherence to object-oriented design principles, 7) Easier team collaboration."
      },
      {
        question: "How can violating SOLID principles lead to code smells?",
        answer: "Violations lead to: 1) God classes (SRP violation), 2) Fragile code that breaks with changes (OCP violation), 3) Unexpected behavior in inheritance (LSP violation), 4) Fat interfaces forcing unnecessary dependencies (ISP violation), 5) Tight coupling making testing difficult (DIP violation). These create maintenance nightmares."
      },
      {
        question: "What is the relationship between SOLID principles and design patterns?",
        answer: "Many design patterns embody SOLID principles: Strategy pattern follows OCP, Factory pattern follows DIP, Adapter pattern helps with LSP, Command pattern follows SRP. Design patterns provide concrete implementations of SOLID principles, showing how to apply them in specific scenarios."
      },
      {
        question: "How do you refactor code to follow SOLID principles?",
        answer: "Refactoring steps: 1) Identify responsibilities and separate them (SRP), 2) Use inheritance/composition for extensions (OCP), 3) Ensure subclasses don't break contracts (LSP), 4) Split large interfaces into smaller ones (ISP), 5) Introduce abstractions and dependency injection (DIP). Use automated tests to ensure behavior preservation during refactoring."
      }
    ]
  },
  {
    id: 'diamond-problem',
    title: 'Diamond Problem (Multiple Inheritance)',
    explanation: 'The Diamond Problem occurs in multiple inheritance when a class inherits from two classes that have a common base class, creating ambiguity about which version of a method to use. Java avoids this with single inheritance for classes but addresses it in interfaces.',
    keyPoints: [
      'Occurs when multiple inheritance paths lead to the same base class',
      'Creates ambiguity in method resolution',
      'Java prevents it by allowing single inheritance for classes',
      'Interfaces can have diamond problem with default methods',
      'Resolved through explicit method overriding in implementing class',
      'Other languages handle it differently (C++ virtual inheritance, Python MRO)'
    ],
    codeExamples: [
      {
        title: 'Diamond Problem with Interfaces',
        language: 'java',
        code: `// Diamond problem scenario with interfaces
interface A {
    default void display() {
        System.out.println("Display from A");
    }
}

interface B extends A {
    @Override
    default void display() {
        System.out.println("Display from B");
    }
}

interface C extends A {
    @Override
    default void display() {
        System.out.println("Display from C");
    }
}

// Diamond problem: D inherits from both B and C, which both extend A
class D implements B, C {
    // Must override to resolve ambiguity
    @Override
    public void display() {
        System.out.println("Display from D");
        // Can call specific interface methods
        B.super.display(); // Calls B's version
        C.super.display(); // Calls C's version
    }
}

// Alternative resolution strategies
class D2 implements B, C {
    @Override
    public void display() {
        // Choose one specific implementation
        B.super.display();
    }
}

class D3 implements B, C {
    @Override
    public void display() {
        // Combine both implementations
        System.out.println("Combined display:");
        B.super.display();
        C.super.display();
    }
}`
      },
      {
        title: 'Avoiding Diamond Problem',
        language: 'java',
        code: `// Better design to avoid diamond problem
interface Drawable {
    void draw();
}

interface Colorable {
    void setColor(String color);
    String getColor();
}

interface Resizable {
    void resize(double factor);
}

// Composition over inheritance
class Shape {
    protected String color;
    protected double x, y;
    
    public Shape(double x, double y) {
        this.x = x;
        this.y = y;
    }
    
    public void setColor(String color) { this.color = color; }
    public String getColor() { return color; }
}

class Circle extends Shape implements Drawable, Colorable, Resizable {
    private double radius;
    
    public Circle(double x, double y, double radius) {
        super(x, y);
        this.radius = radius;
    }
    
    @Override
    public void draw() {
        System.out.println("Drawing circle at (" + x + "," + y + ") with radius " + radius);
    }
    
    @Override
    public void resize(double factor) {
        radius *= factor;
    }
}

// Using delegation pattern
class DrawingContext {
    private List<Drawable> drawables = new ArrayList<>();
    
    public void addDrawable(Drawable drawable) {
        drawables.add(drawable);
    }
    
    public void drawAll() {
        for (Drawable drawable : drawables) {
            drawable.draw();
        }
    }
}`
      }
    ],
    questions: [
      {
        question: "What is the Diamond Problem in object-oriented programming?",
        answer: "The Diamond Problem occurs in multiple inheritance when a class inherits from two classes that share a common base class, creating a diamond-shaped inheritance hierarchy. This leads to ambiguity about which version of inherited methods should be used, as there are multiple paths to the same base class."
      },
      {
        question: "How does Java handle the Diamond Problem?",
        answer: "Java prevents the Diamond Problem for classes by allowing only single inheritance. For interfaces, Java 8+ allows multiple inheritance of default methods, but requires the implementing class to explicitly override conflicting methods to resolve ambiguity. The class can use InterfaceName.super.methodName() to call specific interface methods."
      },
      {
        question: "Can the Diamond Problem occur with Java interfaces? How is it resolved?",
        answer: "Yes, with Java 8+ default methods in interfaces. When a class implements multiple interfaces with conflicting default methods, the compiler requires explicit resolution. The class must override the conflicting method and can choose which interface's implementation to use via InterfaceName.super.methodName() syntax."
      },
      {
        question: "What are the advantages and disadvantages of multiple inheritance?",
        answer: "Advantages: code reuse from multiple sources, modeling complex relationships, flexibility in design. Disadvantages: Diamond Problem ambiguity, increased complexity, harder to understand and maintain, potential for conflicting implementations, method resolution complexity."
      },
      {
        question: "How do other programming languages handle the Diamond Problem?",
        answer: "C++ uses virtual inheritance to share a single instance of the base class. Python uses Method Resolution Order (MRO) with C3 linearization algorithm. C# doesn't allow multiple inheritance of classes but handles interface conflicts similarly to Java. Scala uses traits with linearization rules."
      },
      {
        question: "What design patterns can help avoid the Diamond Problem?",
        answer: "Composition over inheritance, Strategy pattern, Decorator pattern, Mixin pattern (in languages that support it), Interface Segregation (SOLID principles), and Delegation pattern. These patterns provide flexibility without the complexity of multiple inheritance."
      },
      {
        question: "What is the difference between diamond problem in classes vs interfaces?",
        answer: "In classes, diamond problem involves inheriting state and behavior, leading to ambiguity about which instance variables and methods to use. In interfaces (with default methods), it's only about behavior since interfaces don't have instance state. Interface conflicts are easier to resolve through explicit overriding."
      },
      {
        question: "How does composition help solve problems that multiple inheritance tries to address?",
        answer: "Composition allows combining functionality from multiple sources without inheritance complexity. Objects can delegate to multiple composed objects, achieving code reuse and flexibility. It's more explicit, easier to understand, and avoids diamond problem while providing similar benefits to multiple inheritance."
      },
      {
        question: "What is virtual inheritance and how does it solve the Diamond Problem?",
        answer: "Virtual inheritance (in C++) ensures that only one instance of a virtually inherited base class exists in the inheritance hierarchy, regardless of how many paths lead to it. This eliminates ambiguity by guaranteeing a single shared instance of the common base class."
      },
      {
        question: "When might you actually want multiple inheritance despite the Diamond Problem?",
        answer: "Multiple inheritance can be useful for: 1) Modeling real-world relationships where objects naturally inherit from multiple sources, 2) Mixin-style programming for adding capabilities, 3) Interface implementation where objects need multiple contracts, 4) Framework design where flexibility is crucial. However, careful design and clear resolution strategies are essential."
      }
    ]
  },
  {
    id: 'association-aggregation-composition',
    title: 'Association vs Aggregation vs Composition',
    explanation: 'These are three types of relationships between classes that represent different levels of coupling and ownership. Association is a general relationship, Aggregation is "has-a" with weak ownership, and Composition is "has-a" with strong ownership and lifecycle dependency.',
    keyPoints: [
      'Association: General relationship between classes',
      'Aggregation: "Has-a" relationship with weak ownership',
      'Composition: "Has-a" relationship with strong ownership',
      'Composition implies lifecycle dependency',
      'Aggregation allows shared ownership',
      'Association can be bidirectional or unidirectional'
    ],
    codeExamples: [
      {
        title: 'Association Example',
        language: 'java',
        code: `// Association - general relationship
class Student {
    private String name;
    private List<Course> courses;
    
    public Student(String name) {
        this.name = name;
        this.courses = new ArrayList<>();
    }
    
    public void enrollInCourse(Course course) {
        courses.add(course);
        course.addStudent(this); // Bidirectional association
    }
    
    public List<Course> getCourses() { return courses; }
    public String getName() { return name; }
}

class Course {
    private String courseName;
    private List<Student> students;
    
    public Course(String courseName) {
        this.courseName = courseName;
        this.students = new ArrayList<>();
    }
    
    public void addStudent(Student student) {
        students.add(student);
    }
    
    public List<Student> getStudents() { return students; }
    public String getCourseName() { return courseName; }
}

// Usage - both objects exist independently
Student student = new Student("John");
Course course = new Course("Java Programming");
student.enrollInCourse(course); // Association created`
      },
      {
        title: 'Aggregation Example',
        language: 'java',
        code: `// Aggregation - "has-a" with weak ownership
class Department {
    private String name;
    private List<Employee> employees;
    
    public Department(String name) {
        this.name = name;
        this.employees = new ArrayList<>();
    }
    
    public void addEmployee(Employee employee) {
        employees.add(employee);
    }
    
    public void removeEmployee(Employee employee) {
        employees.remove(employee);
    }
    
    public List<Employee> getEmployees() { return employees; }
    public String getName() { return name; }
}

class Employee {
    private String name;
    private String id;
    
    public Employee(String name, String id) {
        this.name = name;
        this.id = id;
    }
    
    public String getName() { return name; }
    public String getId() { return id; }
}

// Usage - employees can exist without department
Employee emp1 = new Employee("Alice", "E001");
Employee emp2 = new Employee("Bob", "E002");

Department dept = new Department("IT");
dept.addEmployee(emp1);
dept.addEmployee(emp2);

// If department is destroyed, employees still exist
dept = null; // Department destroyed, but employees remain`
      },
      {
        title: 'Composition Example',
        language: 'java',
        code: `// Composition - "has-a" with strong ownership
class House {
    private String address;
    private List<Room> rooms;
    
    public House(String address) {
        this.address = address;
        this.rooms = new ArrayList<>();
        
        // Create rooms as part of house construction
        rooms.add(new Room("Living Room", 20.5));
        rooms.add(new Room("Bedroom", 15.0));
        rooms.add(new Room("Kitchen", 12.0));
    }
    
    public void addRoom(String name, double area) {
        rooms.add(new Room(name, area));
    }
    
    public List<Room> getRooms() { 
        return new ArrayList<>(rooms); // Defensive copy
    }
    
    public String getAddress() { return address; }
    
    // When house is destroyed, rooms are also destroyed
    // No explicit destructor in Java, but conceptually rooms die with house
}

class Room {
    private String name;
    private double area;
    
    // Package-private constructor - only House can create rooms
    Room(String name, double area) {
        this.name = name;
        this.area = area;
    }
    
    public String getName() { return name; }
    public double getArea() { return area; }
}

// Usage - rooms cannot exist without house
House house = new House("123 Main St");
// Rooms are created automatically with house
// When house is garbage collected, rooms are also destroyed`
      }
    ],
    questions: [
      {
        question: "What is the difference between Association, Aggregation, and Composition?",
        answer: "Association is a general relationship between classes where objects use each other. Aggregation is a 'has-a' relationship with weak ownership where parts can exist independently. Composition is a 'has-a' relationship with strong ownership where parts cannot exist without the whole and share the same lifecycle."
      },
      {
        question: "How do you implement Composition in code?",
        answer: "Composition is implemented by creating dependent objects inside the constructor of the containing class, making constructors of dependent classes package-private or private, and ensuring dependent objects are destroyed when the container is destroyed. The contained objects should not be accessible outside the container."
      },
      {
        question: "What is the lifecycle relationship in Composition vs Aggregation?",
        answer: "In Composition, the lifecycle of parts is tied to the whole - when the container object is destroyed, all contained objects are also destroyed. In Aggregation, parts can exist independently - destroying the container doesn't destroy the parts, which can be shared among multiple containers."
      },
      {
        question: "Can you provide real-world examples of Association, Aggregation, and Composition?",
        answer: "Association: Student-Course (many-to-many), Doctor-Patient. Aggregation: Department-Employee (employees can move between departments), Team-Player. Composition: House-Room (rooms cannot exist without house), Car-Engine (engine is integral part of car)."
      },
      {
        question: "How does multiplicity affect these relationships?",
        answer: "Association can be one-to-one, one-to-many, or many-to-many. Aggregation is typically one-to-many (one department has many employees). Composition is usually one-to-many where the 'many' side cannot exist independently (one house has many rooms, but rooms cannot exist without the house)."
      },
      {
        question: "What is the difference between Aggregation and Composition in UML?",
        answer: "In UML, Aggregation is represented by a hollow diamond at the container end, indicating weak ownership. Composition is represented by a filled diamond, indicating strong ownership and lifecycle dependency. The diamond always points from the whole to the part."
      },
      {
        question: "How do these relationships affect code coupling?",
        answer: "Association creates loose coupling - objects are independent. Aggregation creates moderate coupling - container depends on parts but parts are independent. Composition creates tight coupling - parts are completely dependent on the container, but this is often acceptable for closely related objects."
      },
      {
        question: "When should you choose Composition over Inheritance?",
        answer: "Choose Composition when: you need 'has-a' rather than 'is-a' relationship, you want to avoid inheritance hierarchy complexity, you need to change behavior at runtime, you want to combine functionality from multiple sources, or you want to avoid the fragile base class problem."
      },
      {
        question: "How do you handle shared ownership in Aggregation?",
        answer: "Shared ownership in Aggregation can be handled through: reference counting, weak references, observer pattern for lifecycle notifications, or external lifecycle management. The key is ensuring that shared objects are not destroyed while still being used by other containers."
      },
      {
        question: "What are the advantages and disadvantages of each relationship type?",
        answer: "Association: flexible but can lead to complex dependencies. Aggregation: allows reuse and sharing but requires careful lifecycle management. Composition: provides strong encapsulation and clear ownership but creates tight coupling and reduces reusability of parts."
      }
    ]
  },
  {
    id: 'virtual-functions-vtable',
    title: 'Virtual Functions and Vtable',
    explanation: 'Virtual functions enable runtime polymorphism by allowing derived classes to override base class methods. The vtable (virtual table) is the mechanism used by compilers to support dynamic dispatch of virtual function calls at runtime.',
    keyPoints: [
      'Virtual functions enable runtime polymorphism',
      'Vtable stores function pointers for dynamic dispatch',
      'Each class with virtual functions has its own vtable',
      'Virtual function calls have slight performance overhead',
      'Pure virtual functions make classes abstract',
      'Virtual destructors ensure proper cleanup in inheritance'
    ],
    codeExamples: [
      {
        title: 'Virtual Functions Example',
        language: 'java',
        code: `// Java doesn't have explicit virtual keyword - all non-static, non-final, non-private methods are virtual by default

class Animal {
    // Virtual method (implicitly virtual in Java)
    public void makeSound() {
        System.out.println("Animal makes a sound");
    }
    
    // Final method - cannot be overridden (not virtual)
    public final void breathe() {
        System.out.println("Animal is breathing");
    }
    
    // Static method - not virtual
    public static void classify() {
        System.out.println("This is an animal");
    }
}

class Dog extends Animal {
    @Override
    public void makeSound() {
        System.out.println("Dog barks: Woof!");
    }
}

class Cat extends Animal {
    @Override
    public void makeSound() {
        System.out.println("Cat meows: Meow!");
    }
}

// Vtable concept demonstration
public class VirtualDemo {
    public static void main(String[] args) {
        Animal[] animals = {
            new Dog(),
            new Cat(),
            new Animal()
        };
        
        // Runtime polymorphism - vtable lookup
        for (Animal animal : animals) {
            animal.makeSound(); // Virtual call - resolved at runtime
        }
    }
}`
      }
    ],
    questions: [
      {
        question: "What are virtual functions and how do they enable polymorphism?",
        answer: "Virtual functions are methods that can be overridden in derived classes and are resolved at runtime based on the actual object type, not the reference type. They enable polymorphism by allowing the same interface to behave differently based on the actual object being called."
      },
      {
        question: "What is a vtable and how does it work?",
        answer: "A vtable (virtual table) is a lookup table of function pointers used to resolve virtual function calls at runtime. Each class with virtual functions has its own vtable. When a virtual function is called, the program looks up the correct function address in the object's vtable based on its actual type."
      },
      {
        question: "What is the performance impact of virtual functions?",
        answer: "Virtual functions have a slight performance overhead due to: 1) Extra memory for vtable storage, 2) Indirect function call through vtable lookup, 3) Prevention of some compiler optimizations like inlining. However, modern compilers and processors minimize this impact significantly."
      },
      {
        question: "How does Java handle virtual functions differently from C++?",
        answer: "In Java, all non-static, non-final, non-private methods are virtual by default - no explicit 'virtual' keyword needed. C++ requires explicit 'virtual' keyword. Java uses single inheritance for classes, avoiding some vtable complexity. All Java objects have vtables for dynamic dispatch."
      },
      {
        question: "What are pure virtual functions and abstract classes?",
        answer: "Pure virtual functions (abstract methods in Java) have no implementation in the base class and must be overridden by derived classes. Classes containing pure virtual functions become abstract and cannot be instantiated. They define contracts that derived classes must fulfill."
      },
      {
        question: "Why are virtual destructors important in C++ but not needed in Java?",
        answer: "In C++, virtual destructors ensure proper cleanup when deleting objects through base class pointers. Without virtual destructors, only the base class destructor is called, causing memory leaks. Java doesn't need this because it has garbage collection and finalizers handle cleanup automatically."
      },
      {
        question: "How does method overriding relate to virtual functions?",
        answer: "Method overriding is the mechanism by which derived classes provide specific implementations of virtual functions. The overridden method replaces the base class method in the derived class's vtable, ensuring the correct version is called at runtime through dynamic dispatch."
      },
      {
        question: "Can static methods be virtual? Why or why not?",
        answer: "Static methods cannot be virtual because they belong to the class, not instances. Virtual functions require an object instance to determine which vtable to use for method resolution. Static methods are resolved at compile time based on the class name, not at runtime."
      },
      {
        question: "What happens to the vtable when a class inherits from multiple interfaces?",
        answer: "When a class implements multiple interfaces, it may have multiple vtables or a combined vtable with entries for all inherited virtual methods. The exact implementation varies by language and compiler, but the principle remains: each virtual method needs an entry for dynamic dispatch."
      },
      {
        question: "How do modern JVMs optimize virtual method calls?",
        answer: "Modern JVMs use several optimizations: 1) Inline caching for frequently called methods, 2) Just-in-time compilation to native code, 3) Devirtualization when only one implementation is loaded, 4) Profile-guided optimization based on runtime behavior, 5) Method inlining for hot paths."
      }
    ]
  },
  {
    id: 'design-patterns',
    title: 'Design Patterns',
    explanation: 'Design patterns are reusable solutions to commonly occurring problems in software design. They represent best practices and provide a common vocabulary for developers. The most important patterns include Singleton, Factory, Observer, Strategy, Decorator, and Adapter.',
    keyPoints: [
      'Reusable solutions to common design problems',
      'Provide common vocabulary for developers',
      'Promote code reusability and maintainability',
      'Categorized into Creational, Structural, and Behavioral patterns',
      'Should be used judiciously, not forced into every situation',
      'Help implement SOLID principles and good OOP practices'
    ],
    codeExamples: [
      {
        title: 'Singleton Pattern',
        language: 'java',
        code: `// Thread-safe Singleton implementation
public class Singleton {
    private static volatile Singleton instance;
    private String data;
    
    private Singleton() {
        // Private constructor prevents instantiation
        this.data = "Singleton Data";
    }
    
    public static Singleton getInstance() {
        if (instance == null) {
            synchronized (Singleton.class) {
                if (instance == null) {
                    instance = new Singleton();
                }
            }
        }
        return instance;
    }
    
    public String getData() { return data; }
}`
      },
      {
        title: 'Factory Pattern',
        language: 'java',
        code: `// Factory Pattern
interface Animal {
    void makeSound();
}

class Dog implements Animal {
    public void makeSound() { System.out.println("Woof!"); }
}

class Cat implements Animal {
    public void makeSound() { System.out.println("Meow!"); }
}

class AnimalFactory {
    public static Animal createAnimal(String type) {
        switch (type.toLowerCase()) {
            case "dog": return new Dog();
            case "cat": return new Cat();
            default: throw new IllegalArgumentException("Unknown animal type");
        }
    }
}

// Usage
Animal dog = AnimalFactory.createAnimal("dog");
Animal cat = AnimalFactory.createAnimal("cat");`
      },
      {
        title: 'Observer Pattern',
        language: 'java',
        code: `// Observer Pattern
interface Observer {
    void update(String message);
}

class Subject {
    private List<Observer> observers = new ArrayList<>();
    
    public void addObserver(Observer observer) {
        observers.add(observer);
    }
    
    public void removeObserver(Observer observer) {
        observers.remove(observer);
    }
    
    public void notifyObservers(String message) {
        for (Observer observer : observers) {
            observer.update(message);
        }
    }
}

class ConcreteObserver implements Observer {
    private String name;
    
    public ConcreteObserver(String name) { this.name = name; }
    
    public void update(String message) {
        System.out.println(name + " received: " + message);
    }
}`
      },
      {
        title: 'Strategy Pattern',
        language: 'java',
        code: `// Strategy Pattern
interface PaymentStrategy {
    void pay(double amount);
}

class CreditCardPayment implements PaymentStrategy {
    public void pay(double amount) {
        System.out.println("Paid $" + amount + " using Credit Card");
    }
}

class PayPalPayment implements PaymentStrategy {
    public void pay(double amount) {
        System.out.println("Paid $" + amount + " using PayPal");
    }
}

class ShoppingCart {
    private PaymentStrategy paymentStrategy;
    
    public void setPaymentStrategy(PaymentStrategy strategy) {
        this.paymentStrategy = strategy;
    }
    
    public void checkout(double amount) {
        paymentStrategy.pay(amount);
    }
}`
      },
      {
        title: 'Decorator Pattern',
        language: 'java',
        code: `// Decorator Pattern
interface Coffee {
    String getDescription();
    double getCost();
}

class SimpleCoffee implements Coffee {
    public String getDescription() {
        return "Simple Coffee";
    }
    
    public double getCost() {
        return 2.0;
    }
}

abstract class CoffeeDecorator implements Coffee {
    protected Coffee coffee;
    
    public CoffeeDecorator(Coffee coffee) {
        this.coffee = coffee;
    }
}

class MilkDecorator extends CoffeeDecorator {
    public MilkDecorator(Coffee coffee) {
        super(coffee);
    }
    
    public String getDescription() {
        return coffee.getDescription() + ", Milk";
    }
    
    public double getCost() {
        return coffee.getCost() + 0.5;
    }
}

class SugarDecorator extends CoffeeDecorator {
    public SugarDecorator(Coffee coffee) {
        super(coffee);
    }
    
    public String getDescription() {
        return coffee.getDescription() + ", Sugar";
    }
    
    public double getCost() {
        return coffee.getCost() + 0.2;
    }
}`
      },
      {
        title: 'Adapter Pattern',
        language: 'java',
        code: `// Adapter Pattern
class LegacyPrinter {
    public void printOldFormat(String text) {
        System.out.println("Legacy: " + text);
    }
}

interface ModernPrinter {
    void print(String text);
}

class PrinterAdapter implements ModernPrinter {
    private LegacyPrinter legacyPrinter;
    
    public PrinterAdapter(LegacyPrinter legacyPrinter) {
        this.legacyPrinter = legacyPrinter;
    }
    
    public void print(String text) {
        legacyPrinter.printOldFormat(text);
    }
}

// Usage
LegacyPrinter legacy = new LegacyPrinter();
ModernPrinter adapter = new PrinterAdapter(legacy);
adapter.print("Hello World");`
      }
    ],
    questions: [
      {
        question: "What are design patterns and why are they important?",
        answer: "Design patterns are reusable solutions to commonly occurring problems in software design. They're important because they: 1) Provide proven solutions, 2) Create common vocabulary among developers, 3) Promote code reusability, 4) Improve code maintainability, 5) Implement best practices, 6) Help avoid common design pitfalls."
      },
      {
        question: "Explain the Singleton pattern and its use cases.",
        answer: "Singleton ensures only one instance of a class exists globally. Use cases: database connections, logging, configuration settings, thread pools, caches. Implementation considerations: thread safety, lazy vs eager initialization, preventing reflection/serialization attacks. Modern alternatives include dependency injection containers."
      },
      {
        question: "What is the Factory pattern and when should you use it?",
        answer: "Factory pattern creates objects without specifying exact classes. Use when: object creation is complex, you need to decouple object creation from usage, creation logic might change, or you want to centralize object creation. It promotes loose coupling and follows the Open/Closed principle."
      },
      {
        question: "How does the Observer pattern work and what problems does it solve?",
        answer: "Observer pattern defines one-to-many dependency between objects. When subject changes state, all observers are notified automatically. Solves: tight coupling between objects, need for broadcast communication, maintaining consistency across related objects. Common in MVC architectures and event systems."
      },
      {
        question: "Explain the Strategy pattern and its benefits.",
        answer: "Strategy pattern defines family of algorithms, encapsulates each one, and makes them interchangeable. Benefits: eliminates conditional statements, promotes Open/Closed principle, enables runtime algorithm selection, improves testability. Common use: payment processing, sorting algorithms, validation strategies."
      },
      {
        question: "What is the Decorator pattern and how does it differ from inheritance?",
        answer: "Decorator pattern adds new functionality to objects dynamically without altering structure. Unlike inheritance (compile-time), decorators provide runtime flexibility. Benefits: follows Single Responsibility Principle, avoids class explosion, enables feature combinations. Example: Java I/O streams, UI component enhancement."
      },
      {
        question: "How does the Adapter pattern solve compatibility issues?",
        answer: "Adapter pattern allows incompatible interfaces to work together by wrapping existing class with new interface. Use cases: integrating third-party libraries, legacy system integration, interface standardization. It acts as a bridge between incompatible interfaces without modifying existing code."
      },
      {
        question: "What are the three categories of design patterns?",
        answer: "1) Creational: deal with object creation (Singleton, Factory, Builder, Abstract Factory), 2) Structural: deal with object composition (Adapter, Decorator, Facade, Composite), 3) Behavioral: deal with object interaction and responsibilities (Observer, Strategy, Command, State, Template Method)."
      },
      {
        question: "When should you avoid using design patterns?",
        answer: "Avoid patterns when: 1) Problem is simple and doesn't need the complexity, 2) Forcing patterns where they don't fit naturally, 3) Over-engineering simple solutions, 4) Team lacks understanding of the pattern, 5) Performance is critical and pattern adds overhead. Remember: patterns solve problems, don't create them."
      },
      {
        question: "How do design patterns relate to SOLID principles?",
        answer: "Design patterns often implement SOLID principles: Strategy follows Open/Closed, Observer promotes loose coupling (Dependency Inversion), Factory follows Single Responsibility, Adapter enables Interface Segregation. Patterns provide concrete implementations of these abstract principles, showing how to apply them in practice."
      }
    ]
  }
];