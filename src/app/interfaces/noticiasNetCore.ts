
// ng g i interfaces/noticias para crear interfaces
export interface NoticiasNetCore {
    id?: string,
    titulo: string,
    content:string, 
    imagen:string, 
    fechaCreacion:Date, 
    fechaModificacion?:Date, 
    description:string, 
    url:string, 
}