import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { EmployeeService } from '../../services/employee.service';
import { Employee } from '../../models/employee.model';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.scss'
})
export class EmployeeListComponent implements OnInit {
  employees: Employee[] = [];
  loading = true;
  errorMessage = '';

  constructor(
    private employeeService: EmployeeService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadEmployees();
  }

  loadEmployees(): void {
    this.loading = true;
    this.employeeService.getAll().subscribe({
      next: (response) => {
        this.loading = false;
        if (response.success && response.data) {
          this.employees = response.data;
        }
      },
      error: (err) => {
        this.loading = false;
        this.errorMessage = 'Failed to load employees.';
      }
    });
  }

  editEmployee(id: number): void {
    this.router.navigate(['/employees/edit', id]);
  }

  deleteEmployee(id: number, name: string): void {
    if (confirm(`Are you sure you want to delete ${name}?`)) {
      this.employeeService.delete(id).subscribe({
        next: (response) => {
          if (response.success) {
            this.employees = this.employees.filter(e => e.id !== id);
          }
        },
        error: () => {
          this.errorMessage = 'Failed to delete employee.';
        }
      });
    }
  }
}
