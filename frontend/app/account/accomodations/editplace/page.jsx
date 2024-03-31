import React, { Suspense } from 'react'
import EditPlaceComponent from './EditPlaceComponent'

function EditPlace() {
  return (
    <Suspense>
      <EditPlaceComponent />
    </Suspense>
  )
}

export default EditPlace