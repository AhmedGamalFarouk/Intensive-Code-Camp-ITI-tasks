abstract class Character {
  void attack();
  void defend();
  void heal();
}

mixin Attacker {
  void attack() {
    print('${this.runtimeType} Attacking!');
  }
}
mixin Defender {
  void defend() {
    print('${this.runtimeType} Defending!');
  }
}

mixin Healer {
  void heal() {
    print('${this.runtimeType} Healing!');
  }
}

class Warrior extends Character with Attacker, Defender {
  void attack() {
    print('Warrior attacking!');
  }

  void defend() {
    print('Warrior defending!');
  }

  void heal() {
    print('Warriors cannot heal!');
  }
}

class Mage extends Character with Attacker, Healer {
  void attack() {
    print('Mage attacking!');
  }

  void heal() {
    print('Mage healing!');
  }

  void defend() {
    print('Mages cannot defend!');
  }
}

class Archer extends Character with Attacker, Defender {
  void attack() {
    print('Archer attacking!');
  }

  void defend() {
    print('Archer defending!');
  }

  void heal() {
    print('Archer healing!');
  }
}

void main() {
  List<Character> characters = [
    Warrior(),
    Mage(),
    Archer(),
  ];

  for (Character character in characters) {
    character.attack();
    character.defend();
    character.heal();
    print('-----------------');
  }
}
