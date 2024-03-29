---
path: /rust-game-test-driven-development-bevy-engine
date: 2023-03-3T01:22:55.506Z
title: Test-Driven Development in Rust Game Development with Bevy
featuredImage: ../assets/Bevy Game Engine Test Driven Development.png
---

In this article, we will explore test-driven development (TDD) in the context of developing a game in Rust using
the Bevy engine. Additionally, I will explain some benefits of TDD, when to use it, and when not to.

I've been learning the programming language Rust since last year when I did my last Clean Coders Apprenticeship
exercise: Learn one new language and implement the Tic Tac Toe game with unbeatable AI using TDD, all in one week
([source code](https://github.com/donedgardo/tic-tac-toe-rust), [blog post](https://edgardocarreras.com/blog/tic-tac-toe-wrap/)).
It was an incredible learning experience, and since then, I've been experimenting
with applying various disciplines like TDD, continuous integration, and deployment to the game development workflow.

From what I've learned trying out different popular game engines like Unity, Unreal Engine, and Godot, the game
industry (like most others) doesn't practice TDD. Of course, some do, but most don't and shockingly abhor it.

Test Driven Development (TDD) is a software development approach that advocates for writing automated tests before
writing code. The process encourages developers to focus on writing small tests that verify the behavior of their code,
which leads to more modular, maintainable, and reliable code. In addition, TDD fosters confidence in developers and
relieves the stress of changing the code.

Bevy is a new and fast game engine written in Rust. It is designed to make game development simple and enjoyable for
developers. One of the main advantages of Rust is its focus on safety and performance, which makes it an excellent
language for game development.

## The Bevy Engine

Before we dive into TDD, let's take a quick look at the [Bevy engine](https://bevyengine.org/). Bevy
is a data-driven game engine, which means it is built around entities and components. Entities are objects in the game 
world, while components are the attributes that define the behavior of entities. In Bevy, the state of the game is
represented as a collection of entities, and their components define how they interact with the world.

One of the key features of Bevy is its support for the ECS (Entity Component System) architecture. The ECS architecture
is a data-driven approach to game development that separates data from behavior. This means the game's state is
represented as a collection of entities and their components. The game logic is implemented as systems that operate
on those entities and components.

## Benefits of TDD
Now that we have a basic understanding of Bevy let's explore how we can use TDD to develop a game in Bevy. TDD is a
development approach that emphasizes writing tests before writing code. The basic idea is to write a failing test that
verifies the code's behavior; then, we write the code to make the test pass. Following this approach, we can ensure
our code behaves as expected, catch bugs early on, and allow us to change the code more confidently.

The benefits of TDD are numerous. For one, it ensures that the code is thoroughly tested, reducing the number of bugs
and increasing code quality. TDD also promotes the creation of modular and loosely coupled code, as tests are written to
test behavioral units of the code. Additionally, TDD can streamline the development process, as tests can be
automated, allowing quick feedback and increased efficiency.

Let's take a closer look at some of the benefits of TDD, as spoken about by Kent Beck, Martin Fowler, and Robert Martin.

[Kent Beck](https://www.kentbeck.com/), the creator of Extreme Programming (XP), writer of the book Test Driven 
Development By Example. According to Beck, TDD helps create a safety net for developers, ensuring that the code works as
expected. In addition, by writing tests first, the developer is forced to think about the code from the user's 
perspective, helping to ensure that the code is easy to use and maintain.

[Martin Fowler](https://martinfowler.com/), writer of the book Refactoring Legacy Code, argues that TDD helps to create a 
feedback loop for developers. By writing tests first, developers can quickly see whether their code is working as 
expected. This allows them to catch bugs early and make changes before the code becomes too complex.

[Robert Martin](https://cleancoders.com/), writer of the book Clean Code, argues that TDD helps create a solid code foundation. By
writing tests first, the developer can ensure that the code works as expected and can be easily modified. This helps
reduce the technical debt in the codebase, as changes can be made easily and quickly.

## TDD in Bevy

Now that we understand TDD and its benefits better let's look at how we can apply it to our Rust code.

First, we need to identify the individual units of code that we want to test. In our case, we want to test the animation
system. Then, we can create a test module and write tests that simulate different scenarios. For example, we
can write tests to ensure that the animation system correctly updates the animation state and that the sprite sheet
gets updated by frame.

Let's take a look at an example from my [recent game](https://onyx.edgardocarreras.com). Suppose we are developing a character animation system for our game. We want to create
a system that updates the character's animation based on their movement. The character animation system will take as
input the character's velocity and update the character's sprite sheet accordingly.

To start, we need to write a failing test that verifies the behavior of the animation system. Then, we can write our
tests using the Bevy
engine's built-in test framework. A good start is to write a simple test that can answer your main question: how would
this look for an end user of your code?

Here is a simple test that won't compile because we are referencing structs and systems that still need to be created.
So here I create a new app, spawn an entity with our animation component, add our system, make the app run the schedule
once, and test that the animation state is idle by default.

```rust 
#[test]
fn it_has_idle_animation_when_not_moving() {
  let mut app = App::new();
  let player = app.world.spawn(CharacterAnimation::default()).id();
  app.add_system(animation_system);
  app.update();

  let animation = app.world.entity(player).get::<CharacterAnimation>().unwrap();
  assert_eq!(animation.state, AnimationState::Idle);
}
```

Here is some of the code that makes this pass:

```rust
#[derive(Debug, PartialEq, Default)]
pub enum AnimationState {
  #[default]
  Idle,
}

#[derive(Component, Default)]
pub struct CharacterAnimation {
  pub state: AnimationState,
}

pub fn animation_system() {
}
```

That was the minimum production code that made the testing code pass; this is important. Once we are in the green
phase (test passing), let's go to the blue phase (tidy up) by removing duplication, if any, or any other refactor to
help simplify our design. I worry about performance when there is a performance issue; otherwise, I'm primarily
concerned with the reusability and modularity of the production and test code. Low-performant code is easier to debug
and fix if you have hidden away the details of the implementations by their proper use cases, which TDD forces you to
do.

After a few experiments and iterations, here is another failing test:

```rust
#[test]
fn it_changes_to_moving_animation_when_moving() {
  let (mut app, player) = setup();
  add_velocity(&mut app, player, Vec2::new(10., 0.));
  app.update();
  let animation = app.world.entity(player).get::<CharacterAnimation>().unwrap();
  assert_eq!(animation.state, AnimationState::Moving);
}

fn add_velocity(app: &mut App, player: Entity, linvel: Vec2) {
  app.world
   .entity_mut(player)
   .insert(Velocity {
     linvel,
     ..default()
  });
}
```

And after some more cycles of TDD, here is some of the production code:

```rust
pub fn animation_system(
  time: Res<Time>,
  mut query: Query<(&mut CharacterAnimation, &Velocity), Or<(Added<Velocity>, Changed<Velocity>)>>,
) {
  for (mut animation, velocity) in query.iter_mut() {
    if velocity.linvel.length() == 0 {
      animation.state = AnimationState::Idle;
    } else {
      animation.state = AnimationState::Moving;
    }
  }
}
```

It's a good start, but now I want to make sure that through the app cycle, the animation sprite goes from the first
index to the last index at a rate in time, so it animates as the animation state is moving.

So let's add a failing test. After a few iterations, we end up with this:

```rust
#[test]
fn updates_sprite_by_frame() {
  let (mut app, player) = setup();
  
  // test to check it doesnt update sprite if velocity is 0.
  add_velocity(&mut app, player, Vec2::new(0., 0.));
  update_time_resource(&mut app, Duration::from_secs(1));
  app.update();
  
  let sprite_sheet = app.world.entity(player).get::<TextureAtlasSprite>().unwrap();
  assert_eq!(sprite_sheet.index, 0);
  
  add_velocity(&mut app, player, Vec2::new(10., 0.));
  update_time_resource(&mut app, Duration::from_secs(1));
  app.update();
  
  let sprite_sheet = app.world.entity(player).get::<TextureAtlasSprite>().unwrap();
  assert_eq!(sprite_sheet.index, 1);
}
```

Here we get to see how Time is a Resource injected at runtime in the bevy engine and how I mocked time and became a Time
traveler by adding time to the resource and inserting it into our app before rerunning our system.

We eventually extracted the setup part of most of our apps to do run them clean before each test:

```rust
fn setup() -> (App, Entity) {
  let mut app = App::new();
  initialize_time(&mut app);
  let player = app.world
    .spawn((
      SpriteSheetBundle::default(),
      CharacterAnimation {
        timer: Timer::from_seconds(1., TimerMode::Repeating),
        state: AnimationState::Idle,
        first: 0,
        last: 7,
      },
    )).id();
  app.add_system(animation_system);
  app.update();
  (app, player)
}

fn initialize_time(app: &mut App) {
  app.init_resource::<Time>();
  let mut time = Time::default();
  time.update();
  app.world.insert_resource(time);
}

fn update_time_resource(app: &mut App, duration: Duration) {
  let mut time = app.world.resource_mut::<Time>();
  let last_update = time.last_update().unwrap();
  time.update_with_instant(last_update + duration);
}
```

And the following is the production code that made this pass after a few refactoring iterations:

```rust
pub fn animation_system(
  time: Res<Time>,
  mut query: Query<(&mut CharacterAnimation,&mut TextureAtlasSprite, &Velocity),
             Or<(Added<Velocity>, Changed<Velocity>)>>,
) {
  for (mut animation, mut sprite, velocity) in query.iter_mut() {
    update_animation_state(&mut animation, velocity);
    update_sprite_sheet(&time, &mut animation, &mut sprite);
  }
}

fn update_sprite_sheet(
  time: &Res<Time>, animation: &mut Mut<CharacterAnimation>,
  sprite: &mut Mut<TextureAtlasSprite>
) {
  if time.delta().is_zero() || animation.state == AnimationState::Idle { return; }
  animation.timer.tick(time.delta());
  if animation.timer.just_finished() {
    sprite.index = if sprite.index == animation.last {
      animation.first
    } else {
      sprite.index + 1
    };
  }
}

fn update_animation_state(animation: &mut Mut<CharacterAnimation>, velocity: &Velocity) {
  if velocity.linvel.length() == 0. {
    animation.state = AnimationState::Idle;
  } else {
    animation.state = AnimationState::Moving;
  }
}
```

## When should I practice test-driven development?

If you haven't practiced TDD before, I suggest you go all in. First, try writing a test that fails and making it pass,
then cleaning up your code. The quick iterations and feedback hit like good old dopamine. TDD is one of those
disciplines that, once you do it a few times, you will get some "aha" moments that will change how you view your
programming process.

You should test when your code base is meant to grow and change rapidly; in most enterprise work I've done, this is
almost always. Being able to confidently change the code to meet a market's demand while maintaining low error rates and
high deployment rates are key metrics for successful software companies.

Another good way of learning external libraries or frameworks, like the bevy engine, is to add integration tests against
them. These tests have great educational value about your dependencies, how they work, and if it works as expected.
Exceptionally great for catching unexpected behavior when upgrading dependencies. Most importantly, these tests allow
you to draw clear boundaries between code that defines business rules and its implementation, which is critical for
[clean architecture](https://edgardocarreras.com/blog/clean-architecture/).

Generally, you want to test when you have lots to lose.

## When not to practice test-driven development?
When you are experimenting or exploring an idea rapidly I wouldn't recommend practicing TDD. Of course,
I'm talking about hackathons, game jams, throw-away prototypes, etc., where you have almost nothing to lose. I'm not
saying that TDD provides no value in the code you write in those scenarios, but there is a point to be made on the
opportunity cost missed on just being able to try multiple ideas quickly to explore the space.

Another example of when not to practice TDD is when you have no idea how to implement something in code. So you decide to
spike it, meaning you write very experimental code to see how far you get and learn roadblocks you might expect earlier
than usual. This is usually less than a week in duration, and you want to be able to throw the code and redo it with
tests for longevity instead of explorative.

TDD purists will disagree with me here, but testing every line of code is not a discipline I advocate during an
experimental phase. Recently I came across a [speaking event](https://www.youtube.com/watch?v=YX2XR73LnRY) from Kent Beck,
the creator of TDD, in which he talks about different types of programming to varying stages of a product or business 
after experiencing programming on Facebook. He explains that programming has three eX's: Exploratory, Expansion, and
Extraction phases. And that TDD provides a lot of value in the expansion and extraction phase but less in the 
exploratory stage. As a result, he practices it less often in that phase.



## Where does this leave us? 

In conclusion, Test Driven Development is a powerful software development process that can help to increase code
quality, reduce bugs, and improve efficiency. By writing tests first, developers can ensure the code is thoroughly
tested and works as expected. When combined with a powerful language like Rust and an efficient engine like Bevy, TDD can help to
create high-quality games that are easy to maintain and update. However, we can also now understand where TDD is less
valuable when exploring ideas and is not a one-size-fits-all approach.

This may be why the gaming industry practices TDD less. Since the quick iteration of a game involves getting
ideas quickly to the user for feedback. A lot of the process is trying again and hoping a gameplay feature is delightful
for the players. Much of it involves writing a lot of throw-away code building digital prototypes.
