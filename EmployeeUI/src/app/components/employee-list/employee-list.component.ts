import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { EmployeeService } from '../../services/employee.service';
import { Employee } from '../../models/employee.model';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, ScrollingModule],
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.scss'
})
export class EmployeeListComponent implements OnInit {
  /** Master list returned from the API. */
  employees: Employee[] = [];

  /** Derived list bound to the virtual viewport (re-computed on filter changes). */
  filteredEmployees: Employee[] = [];

  searchTerm = '';
  loading = true;
  errorMessage = '';

  /**
   * Pixel height of a single row. Must match the .row height in SCSS, otherwise
   * the virtual scrollbar is offset incorrectly. Keep the two in sync.
   */
  readonly rowHeight = 56;

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
          this.applyFilter();
        }
      },
      error: () => {
        this.loading = false;
        this.errorMessage = 'Failed to load employees.';
      }
    });
  }

  applyFilter(): void {
    const term = this.searchTerm.trim().toLowerCase();
    if (!term) {
      this.filteredEmployees = this.employees;
      return;
    }
    this.filteredEmployees = this.employees.filter((e) => {
      const fullName = `${e.firstName} ${e.lastName}`.toLowerCase();
      return (
        fullName.includes(term) ||
        e.email?.toLowerCase().includes(term) ||
        e.department?.toLowerCase().includes(term) ||
        e.designation?.toLowerCase().includes(term) ||
        e.location?.toLowerCase().includes(term)
      );
    });
  }

  /**
   * trackBy for *cdkVirtualFor — Angular reuses DOM nodes for items with the
   * same id instead of recreating them, which is essential when virtualizing.
   */
  trackById = (_: number, employee: Employee): number => employee.id;

  editEmployee(id: number): void {
    this.router.navigate(['/employees/edit', id]);
  }

  deleteEmployee(id: number, name: string): void {
    if (!confirm(`Are you sure you want to delete ${name}?`)) return;

    this.employeeService.delete(id).subscribe({
      next: (response) => {
        if (response.success) {
          this.employees = this.employees.filter((e) => e.id !== id);
          this.applyFilter();
        }
      },
      error: () => {
        this.errorMessage = 'Failed to delete employee.';
      }
    });
  }
}
