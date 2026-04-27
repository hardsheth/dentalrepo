export const ROLE_PERMISSIONS: Record<string, string[]> = {
  SUPERADMIN: ['org:manage', 'clinic:manage', 'users:create', 'users:assign-role', 'audit:read'],
  CLINIC_ADMIN: ['clinic:manage', 'users:manage', 'patients:read', 'patients:write', 'appointments:write', 'billing:write', 'hr:approve', 'reports:read'],
  DENTIST: ['patients:read', 'patients:write', 'appointments:read', 'treatment:write'],
  RECEPTIONIST: ['patients:read', 'appointments:write', 'billing:read'],
  HR_MANAGER: ['attendance:write', 'leave:approve', 'payroll:approve', 'reports:read'],
  BILLING_STAFF: ['billing:write', 'invoices:write', 'reports:read'],
  ASSISTANT: ['patients:read', 'appointments:read'],
};

export const SUPERADMIN_BLOCKED_PERMISSIONS = [
  'patients:read',
  'patients:write',
  'appointments:read',
  'appointments:write',
  'treatment:write',
  'billing:write',
  'attendance:write',
  'payroll:approve',
];
