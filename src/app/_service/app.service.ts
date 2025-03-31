import { Injectable } from '@angular/core';
import { Employee, registerAccount } from '../_model/app.model';
import * as bcrypt from 'bcryptjs';
import { bankData } from '../shared/bank-data';

@Injectable({
  providedIn: 'root'
})
export class BankDataEmployeeService {
  private employees: Employee[] = bankData;

  private registeredAccount: registerAccount[] = [
    {email: 'benni@sample.com', username: 'benni', password: '$2b$10$Sa5ekYR/DS8q18nAKDpqI.zvs1.HQ4SfQqnIjphJ3ds3y./wbvJCq'},
    {email: 'admin@sample.com', username: 'admin', password: '$2b$10$Sa5ekYR/DS8q18nAKDpqI.zvs1.HQ4SfQqnIjphJ3ds3y./wbvJCq'},
    {email: 'admin@gmail.com', username: 'admin', password: '$2b$10$Sa5ekYR/DS8q18nAKDpqI.zvs1.HQ4SfQqnIjphJ3ds3y./wbvJCq'}
  ]



  constructor() {}
  
  // Check status login
  public isLogin(): boolean {
    return !!sessionStorage.getItem('isLogin');
  }

  // Get all employees
  getEmployees(): Employee[] {
    return this.employees;
  }

  // Get detail employee
  getDetailEmployees(id: string): Employee | undefined {
    return this.employees.find((res) => res.id === id);
  }

  // Add new employee
  addEmployee(employee: Employee) {
    this.employees.push(employee);
  }

  // Update existing employee
  updateEmployee(employee: Employee) {
    this.employees = this.employees.map(res =>  res.id === employee.id ? res = employee : res);
    return this.employees;
  }

  // Delete existing employee
  deleteEmployee(employee: Employee) {
    this.employees = this.employees.filter((res) => res.id !== employee.id);
    return this.employees;
  }

  // Check email and password for verify login
  verifyLogin(account: registerAccount){
    const user = this.registeredAccount.find(user => user.email === account.email);

    console.log('user', user);
    
    
    if (!user) {
      return false;
    }
  
    const isMatch = bcrypt.compareSync(account.password, user.password);
    if (!isMatch) {
      return false;
    }
    sessionStorage.setItem('account', JSON.stringify({email: user.email, username: user.username}));
    sessionStorage.setItem('isLogin', JSON.stringify(true));
    return true;
  };

  // Check username and email for verify register
  verifyRegister(account: registerAccount){
    console.log('account', account);
    
    const userName = this.registeredAccount.find(user => user.username === account.username);
    const email = this.registeredAccount.find(user => user.email === account.email);
    
    if (userName) {
      return {status: false, messages: 'Oops! This username is taken. Try another one.'};
    }
    
    if (email) {
      return {status: false, messages: 'Email has already been registered.'};
    }
    
    this.registeredAccount.push({username: account.username, email: account.email, password: bcrypt.hashSync(account.password, 10)});
    return {status: true, messages: ''};
  };

  // Get Greeting
  getGreeting() {
    const hour = new Date().getHours();
    const user = JSON.parse(sessionStorage.getItem('account')!!);
    if (hour >= 5 && hour < 12) {
      return `Hello${user && user.username ? ' ' + user.username : ''}, Good morning! ☀️`;
    } else if (hour >= 12 && hour < 15) {
      return `Hello${user && user.username ? ' ' + user.username : ''}, Good afternoon! 🌤`;
    } else if (hour >= 15 && hour < 18) {
      return `Hello${user && user.username ? ' ' + user.username : ''}, Good evening! 🌆`;
    } else {
      return `Hello${user && user.username ? ' ' + user.username : ''}, Good night! 🌙`;
    }
}
}
