export interface Employee {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  department?: string;
  designation?: string;
  salary: number;
  dateOfJoining: string;
  isActive: boolean;
}

export interface CreateEmployee {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  department?: string;
  designation?: string;
  salary: number;
  dateOfJoining: string;
}

export interface UpdateEmployee {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  department?: string;
  designation?: string;
  salary: number;
  dateOfJoining: string;
  isActive: boolean;
}
