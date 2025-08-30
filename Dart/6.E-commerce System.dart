interface class Product {
  double getPrice() {
    return 0.0;
  }

  String getDescription() {
    return '';
  }
}

class PhysicalProduct implements Product {
  String name;
  double price;
  double weight;
  double shippingCost;

  PhysicalProduct(this.name, this.price, this.weight, this.shippingCost);

  @override
  double getPrice() {
    return price + shippingCost;
  }

  @override
  String getDescription() {
    return '$name (Physical) - Weight: ${weight}kg, Shipping: \$${shippingCost.toStringAsFixed(2)}';
  }
}

class DigitalProduct implements Product {
  String name;
  double price;
  double fileSize;
  String downloadLink;

  DigitalProduct(this.name, this.price, this.fileSize, this.downloadLink);

  @override
  double getPrice() {
    return price;
  }

  @override
  String getDescription() {
    return '$name (Digital) - Size: ${fileSize}MB, Link: $downloadLink';
  }
}

class ShoppingCart {
  List<Product> _items = [];

  void addProduct(Product product) {
    _items.add(product);
    print('Added "${product.getDescription()}" to cart.');
  }

  void removeProduct(Product product) {
    if (_items.remove(product)) {
      print('Removed "${product.getDescription()}" from cart.');
    } else {
      print('Product "${product.getDescription()}" not found in cart.');
    }
  }

  double getTotalPrice() {
    double total = 0;
    for (var item in _items) {
      total += item.getPrice();
    }
    return total;
  }

  void viewCart() {
    if (_items.isEmpty) {
      print('Shopping cart is empty.');
      return;
    }
    print('\n--- Shopping Cart ---');
    for (var item in _items) {
      print(
          '- ${item.getDescription()} - Price: \$${item.getPrice().toStringAsFixed(2)}');
    }
    print('---------------------');
    print('Total: \$${getTotalPrice().toStringAsFixed(2)}');
    print('---------------------\n');
  }
}

class Customer {
  String name;
  ShoppingCart cart;

  Customer(this.name) : cart = ShoppingCart();

  void addToCart(Product product) {
    cart.addProduct(product);
  }

  void removeFromCart(Product product) {
    cart.removeProduct(product);
  }

  void viewCart() {
    print('$name\'s Cart:');
    cart.viewCart();
  }

  void placeOrder() {
    if (cart._items.isEmpty) {
      print('Cannot place an order with an empty cart.');
      return;
    }
    print('\n--- Placing Order for $name ---');
    cart.viewCart();
    print('Order placed successfully for $name!');
    print('Total amount: \$${cart.getTotalPrice().toStringAsFixed(2)}');

    cart._items.clear();
    print('Order Placed sucessfully and Cart has been cleared.');
    print('-----------------------------\n');
  }
}

void main() {
  Product laptop = PhysicalProduct('Laptop Pro', 1200.00, 2.5, 25.00);
  Product ebook = DigitalProduct('Dart Programming Guide', 29.99, 5.0,
      'http://example.com/dart-guide.pdf');
  Product headphones =
      PhysicalProduct('Wireless Headphones', 150.00, 0.5, 10.00);
  Product softwareLicense = DigitalProduct('Photo Editor Pro', 99.99, 0.1,
      'http://example.com/photo-editor-license');

  Customer alice = Customer('Alice');

  alice.addToCart(laptop);
  alice.addToCart(ebook);
  alice.addToCart(headphones);

  alice.viewCart();

  alice.removeFromCart(headphones);
  alice.viewCart();

  alice.addToCart(softwareLicense);
  alice.viewCart();

  alice.placeOrder();

  alice.placeOrder();
}
