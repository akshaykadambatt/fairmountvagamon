interface TestimonialProps {
  name: string;
  content: string;
  status: boolean;
  order: number;
  id?: string;
}

interface ProductProps {
  name: string;
  shortDescription: string;
  description: string;
  status: boolean;
  sale: boolean;
  order: number;
  totalCapacity: number;
  peoplePerRoom: number;
  price: number;
  amenities: number[];
  images: MediaProps[];
  videos: MediaProps[];
  id?: string;
  slug: string;
}

interface MediaProps {
  name: string;
  url: string;
  fullPath: string;
}

interface ContactData {
  email: string;
  phone: string;
  address: string;
  hours: string;
  twitter: string;
  youtube: string;
  instagram: string;
  whatsapp: string;
  facebook: string;
  map: string;
  coordinatesx: string;
  coordinatesy: string;
  status: boolean;
}