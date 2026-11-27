#include <iostream>
using namespace std;

class Person {
protected:
    string name;
    int age;

public:
    void getPersonDetails() {
        cout << "Enter Name: ";
        cin >> name;

        cout << "Enter Age: ";
        cin >> age;
    }

    void displayPerson() {
        cout << "Name: " << name << endl;
        cout << "Age: " << age << endl;
    }
};

class Student : public Person {
protected:
    int rollNo;
    string course;

public:
    void getStudentDetails() {
        getPersonDetails();

        cout << "Enter Roll Number: ";
        cin >> rollNo;

        cout << "Enter Course: ";
        cin >> course;
    }

    void displayStudent() {
        displayPerson();

        cout << "Roll Number: " << rollNo << endl;
        cout << "Course: " << course << endl;
    }
};

class GraduateStudent : public Student {
    string researchTopic;
    int duration;

public:
    void getGraduateDetails() {
        getStudentDetails();

        cout << "Enter Research Topic: ";
        cin >> researchTopic;

        cout << "Enter Duration (Years): ";
        cin >> duration;
    }

    void displayGraduate() {
        displayStudent();

        cout << "Research Topic: " << researchTopic << endl;
        cout << "Duration: " << duration << " Years" << endl;
    }
};

int main() {
    GraduateStudent g;

    cout << "Enter Graduate Student Details" << endl;
    g.getGraduateDetails();

    cout << "\nGraduate Student Information" << endl;
    g.displayGraduate();

    return 0;
}