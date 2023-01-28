interface TestimonialProps {
  name: string;
  content: string;
  status: boolean;
  order: number;
  id?: string;
}

interface AddonProps {
  name: string;
  content: string;
  status: boolean;
  price: number;
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
interface ProductPropsWithValue extends ProductProps {
  value: string;
  label: string;
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

type BookingDate = [Date | null, Date | null]

interface BookingData {
  email: string;
  phone: string;
  name: string;
  status: boolean;
  id?: string;
  numberOfOccupants: number[]; //[adults,children]
  addons: string[]; //[firestoreId,firestoreId,...]
  notes: string;
  date: BookingDate;
  product: string;
  productData: ProductPropsWithValue;
  shownPrice: number; //productData.price
  deleted: boolean;
  referenceId: string;
  state: number; //default: BookingState.PENDING (2)
}

interface ExperienceProps {
  name: string;
  content: string;
  images: MediaProps[];
  status: boolean;
  order: number;
  show_in_carousel: boolean;
  show_in_carousel_caption: string;
  show_in_about: boolean;
  show_in_about_order: number;
  id?: string;
}