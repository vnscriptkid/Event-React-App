import * as React from 'react';
import GoogleMapReact from 'google-map-react';
import { GOOGLE_API_KEY } from '../../config';

export interface SimpleMapProps {
  latLng: google.maps.LatLngLiteral;
}

const SimpleMap: React.SFC<SimpleMapProps> = props => {
  return (
    <div>
      <div style={{ height: '500px', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: GOOGLE_API_KEY }}
          defaultCenter={props.latLng}
          defaultZoom={6}
        />
      </div>
    </div>
  );
};

export { SimpleMap };
