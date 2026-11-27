#include <iostream>
using namespace std;

class Account {
protected:
    int account_number;
    string name;
    double balance;

public:
    Account(int acc, string n, double bal) {
        account_number = acc;
        name = n;
        balance = bal;
    }

    void deposit(double amount) {
        balance += amount;
        cout << "Amount Deposited Successfully!" << endl;
    }

    void withdraw(double amount) {
        if (amount <= balance) {
            balance -= amount;
            cout << "Amount Withdrawn Successfully!" << endl;
        }
        else {
            cout << "Insufficient Balance!" << endl;
        }
    }

    virtual void display() {
        cout << "\nAccount Number: " << account_number;
        cout << "\nAccount Holder: " << name;
        cout << "\nBalance: " << balance << endl;
    }
};

class SavingsAccount : public Account {
public:
    SavingsAccount(int acc, string n, double bal)
        : Account(acc, n, bal) {}

    void display() override {
        cout << "\n--- Savings Account Details ---";
        Account::display();
    }
};

int main() {
    SavingsAccount acc(101, "Rahul", 5000);

    int choice;
    double amount;

    do {
        cout << "\n1. Deposit";
        cout << "\n2. Withdraw";
        cout << "\n3. Display Account Details";
        cout << "\n4. Exit";
        cout << "\nEnter your choice: ";
        cin >> choice;

        if (choice == 1) {
            cout << "Enter amount: ";
            cin >> amount;
            acc.deposit(amount);
        }
        else if (choice == 2) {
            cout << "Enter amount: ";
            cin >> amount;
            acc.withdraw(amount);
        }
        else if (choice == 3) {
            acc.display();
        }
        else if (choice == 4) {
            cout << "Thank You!";
        }
        else {
            cout << "Invalid Choice!";
        }

    } while (choice != 4);

    return 0;
}