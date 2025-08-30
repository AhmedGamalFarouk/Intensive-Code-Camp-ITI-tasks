
class Pizza {
    #dough;
    #sauce;
    #toppings;

    constructor(builder) {
        this.#dough = builder.dough;
        this.#sauce = builder.sauce;
        this.#toppings = builder.toppings;
    }

    getDescription() {
        return `A delicious pizza with ${this.#dough} dough, ${this.#sauce} sauce, and ${this.#toppings.join(', ')} toppings.`;
    }
}

class PizzaBuilder {
    constructor() {
        this.dough = 'thin crust';
        this.sauce = 'tomato';
        this.toppings = [];
    }

    setDough(dough) {
        this.dough = dough;
        return this;
    }

    setSauce(sauce) {
        this.sauce = sauce;
        return this;
    }

    addTopping(topping) {
        this.toppings.push(topping);
        return this;
    }

    build() {
        return new Pizza(this);
    }
}

const myPizza = new PizzaBuilder()
    .setDough('thick crust')
    .setSauce('pesto')
    .addTopping('mozzarella')
    .addTopping('chicken')
    .build();

console.log(myPizza.getDescription());

const anotherPizza = new PizzaBuilder()
    .addTopping('pepperoni')
    .addTopping('mushrooms')
    .build();

console.log(anotherPizza.getDescription());