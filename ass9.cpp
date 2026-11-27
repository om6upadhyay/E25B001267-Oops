#include <iostream>
#include <vector>
#include <map>
#include <unordered_map>
#include <algorithm>
using namespace std;

int main() {

    vector<int> marks = {75, 90, 65, 85, 50};

    map<string, int> students = {
        {"Rahul", 75},
        {"Amit", 90},
        {"Priya", 65},
        {"Neha", 85},
        {"Rohan", 50}
    };

    unordered_map<int, string> student_id = {
        {101, "Rahul"},
        {102, "Amit"},
        {103, "Priya"},
        {104, "Neha"},
        {105, "Rohan"}
    };

    cout << "Student Marks:" << endl;

    for (auto s : students) {
        cout << s.first << " : " << s.second << endl;
    }

    sort(marks.begin(), marks.end());

    cout << "\nSorted Marks:" << endl;

    for (int m : marks) {
        cout << m << " ";
    }

    auto it = find_if(marks.begin(), marks.end(),
                      [](int m) {
                          return m > 80;
                      });

    if (it != marks.end()) {
        cout << "\n\nFirst Marks Above 80: " << *it << endl;
    }

    transform(marks.begin(), marks.end(), marks.begin(),
              [](int m) {
                  return m + 5;
              });

    cout << "\nMarks After Adding 5 Grace Marks:" << endl;

    for (int m : marks) {
        cout << m << " ";
    }

    cout << "\n\nStudent ID Details:" << endl;

    for (auto s : student_id) {
        cout << s.first << " : " << s.second << endl;
    }

    return 0;
}