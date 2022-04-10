import React from "react";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";
import GoogleMapReact from "google-map-react";
import { GOOGLE_API_KEY } from "../../config";

interface LocationSearchInputProps {}
interface LocationSearchInputState {
  address: string;
  latLng: google.maps.LatLngLiteral;
}

export class LocationSearchInput extends React.Component<
  LocationSearchInputProps,
  LocationSearchInputState
> {
  defaultLatLng: google.maps.LatLngLiteral;

  constructor(props: LocationSearchInputProps) {
    super(props);
    this.defaultLatLng = { lat: 21, lng: 105 };
    this.state = {
      address: "",
      latLng: this.defaultLatLng,
    };
  }

  handleChange = (address: string) => {
    this.setState({ address });
  };

  handleSelect = (address: string) => {
    geocodeByAddress(address)
      .then((results) => getLatLng(results[0]))
      .then((latLng) => this.setState({ latLng }))
      .catch((error) => console.error("Error", error));
  };

  render() {
    return (
      <div>
        <h1>Map</h1>
        <PlacesAutocomplete
          value={this.state.address}
          onChange={this.handleChange}
          onSelect={this.handleSelect}
        >
          {({
            getInputProps,
            suggestions,
            getSuggestionItemProps,
            loading,
          }) => (
            <div>
              <input
                {...(getInputProps({
                  placeholder: "Search Places ...",
                  className: "location-search-input",
                }) as any)}
              />
              <div className="autocomplete-dropdown-container">
                {loading && <div>Loading...</div>}
                {suggestions.map((suggestion) => {
                  const className = suggestion.active
                    ? "suggestion-item--active"
                    : "suggestion-item";
                  // inline style for demonstration purpose
                  const style = suggestion.active
                    ? { backgroundColor: "#fafafa", cursor: "pointer" }
                    : { backgroundColor: "#ffffff", cursor: "pointer" };
                  return (
                    <div
                      {...(getSuggestionItemProps(suggestion, {
                        className,
                        style,
                      }) as any)}
                    >
                      <span>{suggestion.description}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </PlacesAutocomplete>
        <div style={{ height: "500px", width: "100%" }}>
          <GoogleMapReact
            bootstrapURLKeys={{ key: GOOGLE_API_KEY }}
            defaultCenter={this.defaultLatLng}
            center={this.state.latLng}
            defaultZoom={6}
          />
        </div>
      </div>
    );
  }
}
