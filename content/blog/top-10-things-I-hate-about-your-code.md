---
path: /top-10-things-i-hate-about-your-code
date: 2022-01-04T01:22:55.506Z
title: Top 10 Things I Hate About Your Code. 
featuredImage: ../assets/hate-your-code.jpeg
---

Forgive the provocative title; as you read, please do not take this as an attack on your person. Remember, you are not your code.
Also, please take this with a  grain of salt. Everything has its tradeoff and what I'm about to say are values also shared by legendary 
experts such as Martin Fowler, Robert C. Martin, and Kent Beck.

## 1. Zero to no automated tests
Do I have to manually test all features every time I make a simple change? 
No tests will lead developers to skip the cleaning/refactoring step since you probably don't want to break the already 
working code. Without cleaning/refactoring, your code slowly rots. 

Code without a test by my definition and many professionals is called legacy code.

## 2. Your code heavily depends on frameworks or 3rd party dependencies.
If you build your code around frameworks and 3rd party dependencies, whenever you have to change the dependency, you're
going to have an expensive problem! I have known of companies that had to shut down due to 3rd parties changing their 
policies, and since they built their product around it, they just had to throw away their code.

I suggest you create interfaces for these third-party dependencies and implement classes based on these interfaces with 
the third-party code, so when you need to move away from the third-party, you only have to change it in one place.

## 3. Your critical business logic is coupled with an input/output (UI/Database) component.
This leads to many bugs, impedes code reusability, creates circular dependencies, and a convoluted codebase! 

Make sure your code is at the right level of abstraction. Check out my blog about [clean architecture](/blog/clean-architecture)
to learn more.

## 4. Code duplication
Imagine fixing a bug to find later that you only corrected one of the many duplicates. Every time you see duplication, it represents a missed opportunity for abstraction. 
Once you move the abstraction to a higher level, coding becomes faster and less error-prone.

Follow Kent Becks Extreme Programing Principle "Once, and only once."

## 5. Huge modules, classes, or functions.
Separate concerns and extract till you drop. Functions and classes should do one thing and do it well.
If a function has multiple sections or a series of steps with nested if/else statements, there is an opportunity to 
break it down into smaller functions that do one thing well.

For example:
```javascript
class Player {
  areaOfEffectAttack() {
    for(let o in opponents){
      if (o.isInRange()){
        const damage = o.calculateDamage();
        o.takeDamage(damage);
      }
    }
  }
}
```

This bit of code does four things. First, It loops over all opponents, checks to see if they are in the range of the attack,
calculates the damage, and applies the damage to the opponents. This code would be better broken down into smaller
functions as:

```javascript
class Player {
  areaOfEffectAttack() {
    for(let o in opponents) {
      maybeTakeDamage(o);
    }
  }

  maybeTakeDamage(player) {
    if(player.isInRange())
      calculateAndTakeDamage(player)
  }
  
  calculateAndTakeDamage(player) {
    const damage = player.calculateDamge();
    player.takeDamage(damage);
  }

}
```

At first glance, you might think this is worse because it has more lines of code. Still, the modularity and reusability 
of all these small functions will allow for faster development. In addition, you will find smaller functions like these
are now easier to read, compose, test and reuse.

## 6. Misleading variables or functions names.
Function and variable names should say what they do.

```javascript
const player = new Player();
player.add(10);
```

What does add do? Your users probably won't know if they haven't looked at the source code or documentation. 
Avoid them having to do so by finding a better name like:
```javascript
player.addMana(10);
player.addHealth(10);
```

I spend most of my coding time selecting meaningful names, and appropriately so. Use meaningful names!

## 7. Selector/boolean arguments in functions.

What does the boolean argument mean?
 ```javascript
player.takeDamage(20, true);
```
You are now forced to look at the implementation of `takeDamage` or worse, its documentation.

```javascript
class Player {
  takeDamage(amount, isCritical) {
    if(isCritial){
      return this.health -= amount * 2;
    } 
    return this.health -= amount;
  }
}
```

When a boolean is true or false in a function call, what does it mean? What would it change if it were true? 
Selector arguments are lazy attempts to avoid splitting a large function into several smaller parts. 

Take for example the following:
```javascript
player.takeDamage(20);
player.takeCritialDamage(20);

class Player {
  takeDamage(amount){ this.health -= amount; }
  takeCritialDamage(amount){ this.health -= amount * 2; }
}
```

Now that's a lot clearer and less convoluted!

## 8. Heavy use of comments.
Comments do not make up for bad code. Comments usually lie and carry misinformation because the code changes, but no one maintains them. 

Don't get me wrong, some comments are helpful, like legal comments or warning of consequence, but usually, comments are
there to compensate for our failure to express ourselves in code.

## 9. Your build requires more than one step.
Building a project should be one step. It would be best if you did not have to memorize different sequences; this is highly error-prone. Instead, you should check out your code and build it with one command.

## 10. Hard to read and follow.
Please respect your reader's time. But, like newspapers, do write the important stuff at the top, leave the low-level details to deeper parts of the module/class.
