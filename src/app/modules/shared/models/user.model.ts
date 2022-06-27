export interface User {
  _id: string;
  name: string;
  username: string;
  password?: string;
  role_name?: string;
  role_type?: string;
  roles_assigned?: boolean;
  user_custom_roles?: boolean;
  created_by?: boolean;
  created_by_role?: boolean;
  status: boolean;
  is_deleted: boolean;
}
