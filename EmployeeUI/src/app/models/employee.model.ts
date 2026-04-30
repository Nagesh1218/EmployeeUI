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
  location?: string;
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
  location?: string;
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
  location?: string;
}
