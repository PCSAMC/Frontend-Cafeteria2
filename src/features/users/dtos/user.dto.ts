
export interface UserRoleDto {
  id: number;
  name: string;
}


export interface UserEntityDto {
  id: number;
  username: string;
  fullName: string;
  email: string;
  active: boolean;
  createdAt: string;
  requiresPwdChange: boolean;
  role: UserRoleDto;
}


export interface CreateUserDto {
  username: string;
  fullName: string;
  email: string;
  password?: string; 
  roleId: number;
}


export interface UpdateUserDto extends Partial<CreateUserDto> {
  active?: boolean;
}

export interface PaginationMetaDto {
  totalItems: number;
  itemCount: number;
  itemsPerPage: number;
  totalPages: number;
  currentPage: number;
}

export interface UsersResponseDto {
  [x: string]: UserEntityDto[] | PromiseLike<UserEntityDto[]>;
  items: UserEntityDto[];
  meta: PaginationMetaDto;
}