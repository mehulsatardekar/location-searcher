import {
  type FitBoundsOptions,
  type LatLngBoundsExpression,
  Map as LeafletMap,
  type MapOptions,
} from "leaflet";
type MapDataType = {
  place_id: number;
  licence: string;
  osm_type: string;
  osm_id: number;
  boundingbox: string[];
  lat: string;
  lon: string;
  display_name: string;
  class: string;
  type: string;
  importance: number;
  icon: string;
  address: {
    city: string;
    county: string;
    state: string;
    country: string;
    country_code: string;
  };
  geojson: {
    type: string;
    coordinates: any;
  };
  extratags: {
    ele: string;
    place: string;
    capital: string;
    wikidata: string;
    wikipedia: string;
    population: string;
    border_type: string;
    import_uuid: string;
    linked_place: string;
    state_capital: string;
    "census:population": string;
  };
};

export type { MapDataType };
