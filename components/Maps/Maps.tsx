import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} from "react-google-maps";
import { compose, withProps } from "recompose";
import classes from './Maps.module.scss';

export const Maps = compose(
  withProps({
    googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyD4ddb2Cq0cemcXtyJirQ5d5_RTvHiN2ig",
    loadingElement: <div style={{ height: `300px` }} />,
    containerElement: <div style={{ height: `70vh`, width: `70vw`, position: 'absolute', zIndex: 2, top: 0 }} />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  withScriptjs,
  withGoogleMap
)((props) =>  {
  return (
    <div className={classes.container}>
      <GoogleMap
        defaultZoom={10}
        defaultCenter={{ lat: props.lat, lng: props.lon }}
        >
        {props.isMarkerShown && <Marker position={{ lat: props.lat, lng: props.lon }} />}
      </GoogleMap>
    </div>
  )
}

)