export interface Employee {
    id: string;
    position: string;
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    birthDate: Date;
    basicSalary: number;
    status: string;
    group: string;
    description: string;
}

export interface registerAccount {
    email: string,
    password: string
    username: string
}

export interface confirmationDialog{
    title: string,
    sub_title: string
    cancel: string
    confirm: string
    image: string
}
  