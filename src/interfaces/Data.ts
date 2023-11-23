export interface DataI {
  data:{
    id: number
    description: string
    hero_title: string
    services_title: string
    services_description: string
    gallery_title: string
    contact_title: string
    contact_subtitle: string
    services: ServiceI[]
    images: ImageI[]
  }

}


export interface AdminI {
  
    id: number
    description: string
    hero_title: string
    services_title: string
    services_description: string
    gallery_title: string
    contact_title: string
    contact_subtitle: string
    services: ServiceI[]
    images: ImageI[]
  

}
export interface ServiceI {
  id: number
  name: string
  description:string
  images: ServiceImageI[]
}

export interface ServiceImageI {
  id: number
  url: string
}

export interface ImageI {
  id: number
  url: string
}


export interface ServiceDataI{
  data:{
    id: number
    name: string
    description:string
    images: ServiceImageI[]
  }
}