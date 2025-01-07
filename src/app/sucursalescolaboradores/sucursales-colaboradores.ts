export interface SucursalesColaboradoresCreacionDTO {
  sucursalID: number;
  colaboradorID: number;
  disctancia: number;
  estado: string;
  }

export interface SucursalesColaboradoresDTO {
    sucursalID: number;
    colaboradorID: number;
    disctancia: number;
    estado: string;
  }

export interface Sucursal {
    sucursalID: number;
    descripcion: string;
    direccion: string;
    coordenada: string;
    estado: string;
  }
export interface Colaboradores {
    sucursalID: number;
    descripcion: string;
    colaboradorID: number;
    nombre: string;
    distancia: number;
    estado: string;
  }