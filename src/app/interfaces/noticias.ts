
// ng g i interfaces/noticias para crear interfaces
export interface Noticias {
    Id: string,
    description:string, 
    content:string, 
    url:string, 
    image:string, 
    FechaCreacion:Date, 
    FechaModificacion:Date, 
}