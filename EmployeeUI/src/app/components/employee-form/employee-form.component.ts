import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from '../../services/employee.service';
import { CreateEmployee, UpdateEmployee } from '../../models/employee.model';

@Component({
  selector: 'app-employee-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './employee-form.component.html',
  styleUrl: './employee-form.component.scss'
})
export class EmployeeFormComponent implements OnInit {
  isEditMode = false;
  employeeId: number | null = null;
  loading = false;
  errorMessage = '';
  successMessage = '';

  formData: UpdateEmployee = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    department: '',
    designation: '',
    salary: 0,
    dateOfJoining: new Date().toISOString().split('T')[0],
    isActive: true
  };

  constructor(
    private employeeService: EmployeeService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.employeeId = +id;
      this.loadEmployee(this.employeeId);
    }
  }

  loadEmployee(id: number): void {
    this.loading = true;
    this.employeeService.getById(id).subscribe({
      next: (response) => {
        this.loading = false;
        if (response.success && response.data) {
          const emp = response.data;
          this.formData = {
            firstName: emp.firstName,
            lastName: emp.lastName,
            email: emp.email,
            phone: emp.phone || '',
            department: emp.department || '',
            designation: emp.designation || '',
            salary: emp.salary,
            dateOfJoining: emp.dateOfJoining.split('T')[0],
            isActive: emp.isActive
          };
        }
      },
      error: () => {
        this.loading = false;
        this.errorMessage = 'Failed to load employee details.';
      }
    });
  }

  onSubmit(): void {
    this.loading = true;
    this.errorMessage = '';
    this.successMessage = '';

    if (this.isEditMode && this.employeeId) {
      this.employeeService.update(this.employeeId, this.formData).subscribe({
        next: (response) => {
          this.loading = false;
          if (response.success) {
            this.successMessage = 'Employee updated successfully!';
            setTimeout(() => this.router.navigate(['/employees']), 1500);
          } else {
            this.errorMessage = response.message;
          }
        },
        error: (err) => {
          this.loading = false;
          this.errorMessage = err.error?.message || 'Failed to update employee.';
        }
      });
    } else {
      const createData: CreateEmployee = {
        firstName: this.formData.firstName,
        lastName: this.formData.lastName,
        email: this.formData.email,
        phone: this.formData.phone,
        department: this.formData.department,
        designation: this.formData.designation,
        salary: this.formData.salary,
        dateOfJoining: this.formData.dateOfJoining
      };

      this.employeeService.create(createData).subscribe({
        next: (response) => {
          this.loading = false;
          if (response.success) {
            this.successMessage = 'Employee created successfully!';
            setTimeout(() => this.router.navigate(['/employees']), 1500);
          } else {
            this.errorMessage = response.message;
          }
        },
        error: (err) => {
          this.loading = false;
          this.errorMessage = err.error?.message || 'Failed to create employee.';
        }
      });
    }
  }

  cancel(): void {
    this.router.navigate(['/employees']);
  }
}
