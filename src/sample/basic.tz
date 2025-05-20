# A comment

# Variables
int a: 5
str s: "Hello"
int arr: [1, 2, 3]
int preallocated: arr(512)
obj dict: {key: "value", 2: 3}
var inferred_type: "String"

# Classes
class Example:
  var foo: "bar"

  init():
    print("Hello world")

  # Overrides are possible, use super to call the original
  func something(p1, p2):
    super(p1, p2)

    # Or call another function on the parent
    super.another(p1, p2)

# Class instances
init Example:
  # Blocks are accepted and late assigned to the instance
  foo = "baz"

# Enums
enum test:
  UNIT_NEUTRAL
  UNIT_ENEMY
  UNIT_ALLY = 5

# Vector types
vec2 v2 = (1, 2)
vec3 v3 = (1, 2, 3)

# Control
when:
  a < 5:
    print(a)
  b > 5:
    print(b)
  else:
    print("Fail!")

for i in 0..20:
  print(i)

while a != 0:
  a -= 1

when param3:
  == 3:
    print("param3 is 3!")
  else:
    print("param3 is not 3!")

# Fuzzy matching
when "foo" ~= "f*":
  return true
else

# Functions
func some_function(param1, param2, param3):
	const local_const = 5
	var local_var = param1 + 3

	return local_var

# Calls
some_function(param3 = 3)

# Decorators
@decorate()
func foo():
  nil

# Signals
signal foo

foo << "Test" # Emits "test" to the signal
foo >> (str) # Receives "str" from the signal

# Closures

# Asynchronous

# Threads