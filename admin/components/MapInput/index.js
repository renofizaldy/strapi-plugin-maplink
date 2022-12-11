import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useIntl } from 'react-intl'
import { GoogleMap, MarkerF, LoadScript } from '@react-google-maps/api'
import { Field, FieldHint, FieldError, FieldLabel } from '@strapi/design-system/Field'

const Input = ({
  attribute,
  description,
  disabled,
  error,
  intlLabel,
  labelAction,
  name,
  onChange,
  required,
  value
}) => {

  const { formatMessage } = useIntl()
  const gmaps_key = process.env.STRAPI_ADMIN_GMAPSKEY

  const onVal = (value.length > 0) ? value : "-41.21222018286648, 174.8906183549883"
  const initVal = onVal.split(", ")
  const [defLocation, setDefLocation] = useState({
    lat: parseFloat(initVal[0]),
    lng: parseFloat(initVal[1])
  })

  const dragChange = (e) => {
    const lat = JSON.parse(JSON.stringify(e.latLng)).lat
    const lon = JSON.parse(JSON.stringify(e.latLng)).lng
    setDefLocation(prev => ({
      ...prev,
      lat: lat,
      lng: lon
    }))
    //* TRIGER SAVE BUTTON
    onChange({ target: { name, value: lat+', '+lon, type: "text" } })
  }

  return (
    <Field
      name  = {name}
      id    = {name}
      error = {error}
      hint  = {description && formatMessage(description)}
    >
      <FieldLabel action={labelAction} required={required}>
        {formatMessage(intlLabel)}
      </FieldLabel>
      <LoadScript googleMapsApiKey={gmaps_key}>
        <GoogleMap
          mapContainerStyle={{ width : '100%', height: '300px' }}
          center={defLocation}
          zoom={15}
        >
          <MarkerF draggable onDragEnd={dragChange} position={defLocation} />
        </GoogleMap>
      </LoadScript>
      <FieldHint />
      <FieldError />
    </Field>
  )
}
Input.defaultProps = {
  description: null,
  disabled: false,
  error: null,
  labelAction: null,
  required: false,
  value: '',
};

Input.propTypes = {
  intlLabel: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  attribute: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.object,
  disabled: PropTypes.bool,
  error: PropTypes.string,
  labelAction: PropTypes.object,
  required: PropTypes.bool,
  value: PropTypes.string,
};
export default Input