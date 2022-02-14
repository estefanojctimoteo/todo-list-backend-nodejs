export interface CRUD {
  create: (resource: any) => Promise<any>;
  deleteById: (id: string) => Promise<string>;
}