#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#define MAX_NAME_LEN 50
#define MAX_EMAIL_LEN 100
#define MAX_USERS 100

typedef struct {
    int id;
    char name[MAX_NAME_LEN];
    char email[MAX_EMAIL_LEN];
} User;

User users[MAX_USERS];
int userCount = 0;

void addUser() {
    if (userCount >= MAX_USERS) {
        printf("User limit reached.\n");
        return;
    }
    int id = userCount + 1;
    char name[MAX_NAME_LEN];
    char email[MAX_EMAIL_LEN];

    printf("Enter name: ");
    scanf("%s", name);
    printf("Enter email: ");
    scanf("%s", email);

    User newUser;
    newUser.id = id;
    strncpy(newUser.name, name, MAX_NAME_LEN);
    strncpy(newUser.email, email, MAX_EMAIL_LEN);

    users[userCount++] = newUser;
    printf("User added successfully!\n");
}

void listUsers() {
    printf("Users:\n");
    for (int i = 0; i < userCount; i++) {
        printf("ID: %d, Name: %s, Email: %s\n", users[i].id, users[i].name, users[i].email);
    }
}

void saveUsersToFile() {
    FILE *file = fopen("users.txt", "w");
    if (file == NULL) {
        printf("Error opening file!\n");
        return;
    }
    for (int i = 0; i < userCount; i++) {
        fprintf(file, "ID: %d, Name: %s, Email: %s\n", users[i].id, users[i].name, users[i].email);
    }
    fclose(file);
    printf("Users saved to file.\n");
}

void loadUsersFromFile() {
    FILE *file = fopen("users.txt", "r");
    if (file == NULL) {
        printf("Error opening file!\n");
        return;
    }

    User tempUser;
    while (fscanf(file, "ID: %d, Name: %s, Email: %s\n", &tempUser.id, tempUser.name, tempUser.email) != EOF) {
        users[userCount++] = tempUser;
        if (userCount >= MAX_USERS) break;
    }
    fclose(file);
    printf("Users loaded from file.\n");
}

int main() {
    int choice;

    while (1) {
        printf("\nBackend System Menu:\n");
        printf("1. Add User\n");
        printf("2. List Users\n");
        printf("3. Save Users to File\n");
        printf("4. Load Users from File\n");
        printf("5. Exit\n");
        printf("Enter your choice: ");
        scanf("%d", &choice);

        switch (choice) {
            case 1:
                addUser();
                break;
            case 2:
                listUsers();
                break;
            case 3:
                saveUsersToFile();
                break;
            case 4:
                loadUsersFromFile();
                break;
            case 5:
                printf("Exiting program.\n");
                exit(0);
            default:
                printf("Invalid choice. Please try again.\n");
        }
    }

    return 0;
}
