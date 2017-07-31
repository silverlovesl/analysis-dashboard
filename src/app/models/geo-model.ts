import { Serializable } from './serializable';

export class Geography implements Serializable<Geography> {

  type: string;
  features: GeographyFeatures[];

  deserialize(input: any): Geography {
    this.type = input.type;
    this.features = input.features.map(d => new GeographyFeatures().deserialize(d));
    return this;
  }
}

export class GeographyFeatures implements Serializable<GeographyFeatures> {
  type: string;
  properties: GeographyPropery;
  geometry: Geometry;
  deserialize(input: any): GeographyFeatures {
    this.type = input.type;
    this.properties = input.properties;
    this.geometry = input.geometry;
    return this;
  }
}

export class GeographyPropery implements Serializable<GeographyPropery> {
  id: number;
  name: string;
  name_en?: string;

  deserialize(input: any): GeographyPropery {
    this.id = input.id;
    this.name = input.name;
    this.name_en = input.name_en;
    return this;
  }
}

export class Geometry implements Serializable<Geometry> {
  type: string;
  coordinates: Array<Array<Array<Array<number>>>>
  deserialize(input: any): Geometry {
    this.type = input.type;
    this.coordinates = input.coordinates;
    return this;
  }
}