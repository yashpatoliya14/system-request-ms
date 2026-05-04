// Re-export all types from services
export * from '../services/auth.service';
export * from '../services/technician.service';
export * from '../services/hod.service';
export * from '../services/admin.service';

// Common utility types
export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data: T;
}

export interface PaginatedResponse<T = any> extends ApiResponse<T[]> {
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface SelectOption {
  value: string;
  label: string;
}

export interface TableColumn<T = any> {
  key: keyof T;
  title: string;
  render?: (value: any, item: T) => React.ReactNode;
  sortable?: boolean;
  filterable?: boolean;
}

export interface FilterConfig {
  search?: string;
  status?: string;
  priority?: string;
  dateRange?: {
    start: Date;
    end: Date;
  };
}

export interface SortConfig {
  key: string;
  direction: 'asc' | 'desc';
}

// Loading states
export type LoadingState = 'idle' | 'loading' | 'success' | 'error';

// Priority levels
export type Priority = 'Low' | 'Medium' | 'High' | 'Urgent';

// User roles
export type UserRole = 'admin' | 'hod' | 'technician' | 'user';
