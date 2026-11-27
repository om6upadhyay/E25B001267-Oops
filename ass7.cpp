#include <iostream>
using namespace std;

class Complex {
    int real, imag;

public:
    Complex() {
        real = 0;
        imag = 0;
    }

    Complex(int r, int i) {
        real = r;
        imag = i;
    }

    void display() {
        cout << real << " + " << imag << "i" << endl;
    }

    void add(Complex c) {
        cout << "Addition: ";
        Complex temp(real + c.real, imag + c.imag);
        temp.display();
    }

    void add(Complex c1, Complex c2) {
        cout << "Addition of three numbers: ";
        Complex temp(real + c1.real + c2.real,
                     imag + c1.imag + c2.imag);
        temp.display();
    }

    Complex operator+(Complex c) {
        Complex temp;
        temp.real = real + c.real;
        temp.imag = imag + c.imag;
        return temp;
    }

    Complex operator-(Complex c) {
        Complex temp;
        temp.real = real - c.real;
        temp.imag = imag - c.imag;
        return temp;
    }
};

int main() {
    Complex c1(10, 5);
    Complex c2(5, 3);
    Complex c3(2, 4);

    c1.add(c2);

    c1.add(c2, c3);

    Complex c4 = c1 + c2;
    cout << "Operator Overloading (+): ";
    c4.display();

    Complex c5 = c1 - c2;
    cout << "Operator Overloading (-): ";
    c5.display();

    return 0;
}