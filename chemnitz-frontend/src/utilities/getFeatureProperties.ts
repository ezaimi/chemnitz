import { Feature } from "@/types/Features";  

export const getFeatureProperties = (feature: Feature, type: string) => {
  const { properties } = feature;
//   console.log("Feature", feature)
// console.log("Propertie, " , properties)
  switch (type) {
    case 'restaurant':
      return {
        name: properties.name,
        address: `${properties['addr:street']}, ${properties['addr:housenumber']}, ${properties['addr:postcode']}, ${properties['addr:city']}`,
        openingHours: properties.opening_hours,
        website: properties.website,
        cuisine: properties.cuisine,
        phone: properties.phone,
        wheelchair: properties.wheelchair,
        outdoorSeating: properties.outdoor_seating,
        indoorSeating: properties.indoor_seating,
      };
    case 'museum':
      return {
        name: properties.name,
        address: `${properties['addr:street']}, ${properties['addr:housenumber']}, ${properties['addr:postcode']}, ${properties['addr:city']}`,
        openingHours: properties.opening_hours,
        website: properties.website,
        wheelchair: properties.wheelchair,
        phone: properties.phone,
        email: properties.email,
        fee: properties.fee,
        description: properties.description,
        wikidata: properties.wikidata,
      };
    case 'gallery':
      return {
        name: properties.name,
        address: `${properties['addr:street']}, ${properties['addr:housenumber']}, ${properties['addr:postcode']}, ${properties['addr:city']}`,
        wheelchair: properties.wheelchair,
        openingHours: properties.opening_hours,
        fee: properties.fee,
        website: properties.website,
        altName: properties.alt_name,
      };
    case 'artwork':
      return {
        name: properties.name,
        artistName: properties.artist_name,
        artworkType: properties.artwork_type,
        address: `${properties['addr:street']}, ${properties['addr:housenumber']}, ${properties['addr:postcode']}, ${properties['addr:city']}`,
        wheelchair: properties.wheelchair,
        website: properties.website,
        wikidata: properties.wikidata,
        description: properties.description,
        material: properties.material,
        fee: properties.fee,
      };
    case 'guest_house':
      return {
        name: properties.name,
        address: `${properties['addr:street']}, ${properties['addr:housenumber']}, ${properties['addr:postcode']}, ${properties['addr:city']}`,
        website: properties.website,
        phone: properties.phone,
        email: properties.email,
        wheelchair: properties.wheelchair,
        openingHours: properties.opening_hours,
        indoorSeating: properties.indoor_seating,
        outdoorSeating: properties.outdoor_seating,
        dietaryOptions: properties.diet,
        smokingPolicy: properties.smoking,
      };
    case 'hotel':
      return {
        name: properties.name,
        address: `${properties['addr:street']}, ${properties['addr:housenumber']}, ${properties['addr:postcode']}, ${properties['addr:city']}`,
        website: properties.website,
        phone: properties.phone,
        email: properties.email,
        wheelchair: properties.wheelchair,
        rooms: properties.rooms,
        stars: properties.stars,
        cuisine: properties.cuisine,
        dietaryOptions: properties.diet,
        fax: properties.fax,
        roof: properties.roof,
      };
    case 'bench':
      return {
        name: properties.name,
        artistName: properties.artist_name,
        artworkType: properties.artwork_type,
        material: properties.material,
        backrest: properties.backrest,
        creationYear: properties.start_date,
        wikipediaLink: properties['artist:wikipedia'],
        wikidataLink: properties['artist:wikidata'],
      };
    case 'theatre':
      return {
        name: properties.name,
        address: `${properties['addr:street']}, ${properties['addr:housenumber']}, ${properties['addr:postcode']}, ${properties['addr:city']}`,
        website: properties.website,
        phone: properties.phone,
        email: properties.email,
        wheelchair: properties.wheelchair,
        openingHours: properties.opening_hours,
        description: properties.description,
        theatreType: properties['theatre:type'],
        facebookLink: properties['contact:facebook'],
        operator: properties.operator,
      };
    case 'clock':
      return {
        name: properties.name,
        display: properties.display,
        wheelchair: properties.wheelchair,
        type: properties['@geometry'],
      };
    case 'deli':
      return {
        name: properties.name,
        address: `${properties['addr:street']}, ${properties['addr:housenumber']}, ${properties['addr:postcode']}, ${properties['addr:city']}`,
        cuisine: properties.cuisine,
        website: properties['contact:website'],
        phone: properties['contact:phone'],
        email: properties['contact:email'],
        openingHours: properties.opening_hours,
        outdoorSeating: properties.outdoor_seating,
        dietaryOptions: properties.diet,
        description: properties.description,
        wheelchair: properties.wheelchair,
      };
    default:
      return {};
  }
};
