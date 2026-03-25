import { memo } from 'react'
import Flora from './Flora'
import Fauna from './Fauna'


function InfoSections() {
  return (
    <>
      <Flora />
      <Fauna />
    </>
  )
}

export default memo(InfoSections)
