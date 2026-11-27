#include <iostream>
#include <exception>
using namespace std;

class BankingException : public exception {
public:
    const char* what() const noexcept override {
        return "Banking Error";
    }
};

class InsufficientBalanceException : public BankingException {
public:
    const char* what() const noexcept override {
        return "Insufficient Balance!";
    }
};

class InvalidAmountException : public BankingException {
public:
    const char* what() const noexcept override {
        return "Invalid Transaction Amount!";
    }
};

class AccountNotFoundException : public BankingException {
public:
    const char* what() const noexcept override {
        return "Account Not Found!";
    }
};

class Bank {
    int balance;
    bool account_exists;

public:
    Bank(int b, bool exists) {
        balance = b;
        account_exists = exists;
    }

    void withdraw(int amount) {
        if (!account_exists)
            throw AccountNotFoundException();

        if (amount <= 0)
            throw InvalidAmountException();

        if (amount > balance)
            throw InsufficientBalanceException();

        balance -= amount;

        cout << "Transaction Successful!" << endl;
        cout << "Remaining Balance: " << balance << endl;
    }
};

int main() {
    Bank b(5000, true);

    try {
        int amount;

        cout << "Enter withdrawal amount: ";
        cin >> amount;

        b.withdraw(amount);
    }

    catch (const InsufficientBalanceException& e) {
        cout << e.what() << endl;
    }

    catch (const InvalidAmountException& e) {
        cout << e.what() << endl;
    }

    catch (const AccountNotFoundException& e) {
        cout << e.what() << endl;
    }

    catch (const BankingException& e) {
        cout << e.what() << endl;
    }

    return 0;
}
