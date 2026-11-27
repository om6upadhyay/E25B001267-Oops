# include<iostream>
using namespace std;
class Bankaccount {
    int balance;
public:
    void setBalance(int b) {
        balance = b;
    }
    void showBalance() {
        cout << "Balance : " << balance << endl;
    }
};

class SavingAccount : public Bankaccount {
public:
    void accountType() {
        cout << "Accout type : " << "Savings Account" << endl;
    }
};

int main() {
    SavingAccount a1;
    a1.setBalance(5000);
    a1.accountType();
    a1.showBalance();
    return 0;
}