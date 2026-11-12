# Answers · MD
Lab 4 — Answers
Part 1
Prediction 1. No red underline, because any turns the checks off. When I run it, it prints Awa, then crashes with TypeError: awa.describe is not a function (a Member has no describe()).

# Question 1.
 It gave up type checking. TypeScript does not know what find returns, so it accepts anything. memberList.add(42) would not be caught by the editor. It would crash when running, because 42.getId() does not exist.

# Part 2
Question 2. Message: Property 'getId' does not exist on type 'T'. T could be any type (a number, a string...), so TypeScript cannot be sure it has a getId() method.

# Question 3. 
TypeScript only checks the shape of an object. Book and Member both have getId(): string, so they fit HasId automatically. No implements is needed.

# Question 4.

(a) books.add(new Member(...)): TypeScript refused a Member in a Catalog<Book>. This works because T was fixed to Book when I wrote new Catalog<Book>().
(b) new Catalog<number>(): TypeScript refused a number because it has no getId(). This works because of the constraint T extends HasId.
(c) found.describe() without the if: TypeScript prevented using a value that may be undefined. This works because find returns T | undefined.
Prediction 2. No test line needs to change. The output is still Checkpoint 1.

# Question 5.
 The methods have the same names, parameters and return types. Only the inside (array → Map) changed, and items is private, so the outside code cannot see it.

# Question 6.
 Caller code: books.all().push(new Book("B-001", "Copy"));. This would add a duplicate directly, skipping add. Returning a new array means the caller only changes a copy, and the real list stays safe.

# Part 3
Question 7. Message: Property 'describe' does not exist on type 'Borrowable'. The function returns Borrowable, so TypeScript only knows what Borrowable has (lateFee). It forgot that the item was really a Dvd.

# Prediction 3.
worstOverall has type Book | Laptop | undefined. worstOverall.describe() is not accepted, because Laptop has no describe(). (Hovering confirms this.) lateFee works because both types have it.

# Question 8. 
A generic is worth it when the function returns something taken from the input, and we want to keep its exact type (the return type depends on the input type). totalFees returns a plain number, so it needs no T. In Prediction 3, T was inferred from the mixed array [novel, laptop], so it became Book | Laptop.

# Part 4
# Question 9. 
T is chosen inside Book, in the line Queue<string>. So T is string. If Book extends Queue<string>, then anyone could call book.enqueue("Fatou") and skip the borrowing rules (or call dequeue() directly).

# Question 10.

First time: Moussa was added to the waiting queue, because Awa had the book.
Second time: nothing happened, because Moussa was already waiting.
The caller cannot tell why it was false (queued, already waiting, already borrowing).

Task 3 — Mermaid diagram

reservations
1
1
Book
-String title
-String borrower
-Queue<String> reservations
+borrow(member: String) : boolean
+giveBack() : boolean
+getBorrower() : String
+waiting() : int
Queue<T>
-T[] items
+enqueue(item: T) : void
+dequeue() : T
+size() : int
+includes(item: T) : boolean
Question 11. Composition (filled diamond). The Queue is created inside Book and belongs only to that book. If the book is deleted, its queue disappears too. Each Book has exactly one Queue, and each queue belongs to exactly one Book.

# Part 5
Prediction 4. Red underline: 'T' only refers to a type, but is being used as a value here. When I run it, it stops with ReferenceError: T is not defined.

Prediction 5. The first line prints Things Fall Apart. The second prints NaN, because copies is missing (undefined + 1).

# Question 12.
 node just removes the types when it runs a .ts file, so types do not exist at runtime. That is why instanceof T fails (there is no T) and why parseJson cannot check the data (the JSON has no copies, but nobody noticed). Data from outside the program (JSON, files, user input) must be checked at runtime, with real code.

# Part 6
Question 13. The caller could no longer use the methods of Book, like describe(). It would only see getId().



