class Account {
  String accountNumber;
  String accountHolderName;
  double _balance;

  Account(this.accountNumber, this.accountHolderName, this._balance);

  double getBalance() {
    return _balance;
  }

  void setBalance(double newBalance) {
    _balance = newBalance;
  }

  void deposit(double amount) {
    _balance += amount;
    print('Deposited: $amount');
  }

  void withdraw(double amount) {
    if (amount <= _balance) {
      _balance -= amount;
      print('Withdrawn: $amount');
    } else {
      print('Insufficient funds');
    }
  }

  void checkBalance() {
    print('Account Number: $accountNumber, Balance: $_balance');
  }
}

class SavingsAccount extends Account {
  double interestRate;
  SavingsAccount(this.interestRate, super.accountNumber,
      super.accountHolderName, super.balance);

  void addInterest() {
    double interest = getBalance() * (interestRate / 100);

    setBalance(getBalance() + interest);

    print('Interest added: $interest , total balance: ${getBalance()}');
  }
}

class CurrentAccount extends Account {
  double overdraftLimit;
  CurrentAccount(this.overdraftLimit, super.accountNumber,
      super.accountHolderName, super.balance);

  @override
  void withdraw(double amount) {
    if (amount <= getBalance() + overdraftLimit) {
      setBalance(getBalance() - amount);
      print('Withdrawn: $amount');
    } else {
      print('Overdraft limit exceeded');
    }
  }
}

void main() {
  Account myAccount = Account('12345', 'Ahmed Gamal', 1000.0);
  myAccount.checkBalance(); //* Account Number: 12345, Balance: 1000.0
  myAccount.deposit(500.0); //* Deposited: 500.0
  myAccount.checkBalance(); //* Account Number: 12345, Balance: 1500.0
  myAccount.withdraw(200.0); //* Withdrawn: 200.0
  myAccount.checkBalance(); //* Account Number: 12345, Balance: 1300.0
  myAccount.withdraw(1500.0); //* Insufficient funds

  print('\n--- Savings Account ---');
  SavingsAccount mySavings =
      SavingsAccount(2.5, 'S67890', 'Ahmed Mohsen', 2000.0);
  mySavings.checkBalance(); //*Account Number: S67890, Balance: 2000.0
  mySavings.addInterest(); //*Interest added: 50.0 , total balance: 2050.0
  mySavings.checkBalance(); //*Account Number: S67890, Balance: 2050.0

  print('\n--- Current Account ---');
  CurrentAccount myCurrent = CurrentAccount(500.0, 'C11223', 'Sha3bola', 300.0);
  myCurrent.checkBalance(); //*Account Number: C11223, Balance: 300.0
  myCurrent.withdraw(600.0); //!Withdraws 600, balance becomes -300
  myCurrent.checkBalance(); //*Account Number: C11223, Balance: -300.0
  myCurrent.withdraw(300.0); //!Overdraft limit exceeded
  myCurrent.checkBalance(); //*Account Number: C11223, Balance: -300.0
}
