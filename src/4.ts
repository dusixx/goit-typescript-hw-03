class Key {
  constructor(private signature: number = Math.random()) {}
  getSignature(): number {
    return this.signature;
  }
}

//
// Person
//

class Person {
  private key: Key;
  public name: string;

  constructor({ key, name }: { key: Key; name?: string }) {
    this.key = key;
    this.name = name ?? 'Anonymous';
  }

  getKey(): Key {
    return this.key;
  }
}

//
// House
//

abstract class House {
  protected door: 'locked' | 'unlocked';
  protected tenants: Person[] = [];

  constructor(protected key: Key) {}

  abstract unlockDoor(key: Key): void;
  abstract lockDoor(key: Key): void;

  comeIn(person: Person): void {
    if (this.door === 'unlocked') {
      this.tenants.push(person);
      return console.log(`Welcome home, ${person.name}`);
    }
    console.log(`The door is locked, use your key`);
  }
}

//
// MyHouse
//

class MyHouse extends House {
  constructor(key: Key) {
    super(key);
  }

  unlockDoor(key: Key) {
    const isUnlocked =
      this.door === 'unlocked' ||
      this.key.getSignature() === key.getSignature();

    this.door = isUnlocked ? 'unlocked' : 'locked';
    console.log(
      isUnlocked
        ? 'The door is unlocked, you can come in'
        : "This key doesn't fit. Are you trying to break into someone else's house?"
    );
  }

  lockDoor(key: Key) {
    if (this.key.getSignature() !== key.getSignature()) {
      return console.log("This key doesn't fit. Try another one");
    }
    if (this.door === 'locked') {
      return console.log('The door is already locked');
    }
    this.door = 'locked';
    console.log("The door was locked, you're safe now");
  }
}

//
// Main
//

const key = new Key();
const house = new MyHouse(key);
const kelly = new Person({ name: 'Kelly', key });
const anon = new Person({ key: new Key() });

// Kelly
house.comeIn(kelly); // The door is locked, use your key, Kelly
house.unlockDoor(kelly.getKey()); // The door is unlocked, you can come in
house.comeIn(kelly); // Welcome home, Kelly
house.lockDoor(kelly.getKey()); // The door was locked, you're safe now

// Rolf
house.comeIn(anon); // The door is locked, use your key
house.unlockDoor(anon.getKey()); // This key doesn't fit. Are you trying to break into someone else's house?

export {};
