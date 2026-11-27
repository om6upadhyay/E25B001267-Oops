# include<iostream>
using namespace std;
class Rectangle {
    int length;
    int breadth;
public:
    Rectangle() {
        length = 0;
        breadth = 0;
    }
    Rectangle(int l , int b) {
        length = l;
        breadth = b;
    }
    Rectangle(Rectangle &r) {
        length = r.length;
        breadth = r.breadth;
    }
    void area() {
        cout << "Area = " << length * breadth << endl;
    }
};
int main() {
    Rectangle r1;
    cout << "Default constructor : " << endl;
    r1.area();

    Rectangle r2(10 , 5);
    cout << "Parameterized constructor : " << endl;
    r2.area();

    Rectangle r3(r2);
    cout << "Copy constrcutor : " << endl;
    r3.area();

    return 0;
}