import * as React from 'react';
import GoogleMapReact from 'google-map-react';
import { GOOGLE_API_KEY } from '../../../config';
import { Icon } from 'semantic-ui-react';

export interface EventDetailedMapProps {
  latLng: google.maps.LatLngLiteral | undefined;
}

const Marker = (props: any) => <Icon name='marker' size='big' color='red' />;

const defaultLatLng = { lat: 21.0245, lng: 105.84117 };

const EventDetailedMap: React.SFC<EventDetailedMapProps> = props => {
  return (
    <div style={{ height: '200px', width: '100%' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: GOOGLE_API_KEY }}
        defaultCenter={defaultLatLng}
        center={props.latLng}
        defaultZoom={1}
        zoom={10}
      >
        {props.latLng && (
          <Marker lat={props.latLng.lat} lng={props.latLng.lng} />
        )}
      </GoogleMapReact>
    </div>
  );
};

export { EventDetailedMap };
