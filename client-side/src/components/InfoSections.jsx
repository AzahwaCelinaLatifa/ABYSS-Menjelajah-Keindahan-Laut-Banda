/**
 * InfoSections.jsx
 *
 * Komponen gabungan yang merender Fauna, Flora
 * sebagai satu bagian konten informatif dalam satu halaman.
 */
import Flora from './Flora'
import Fauna from './Fauna'


export default function InfoSections() {
  return (
    <>
      <Flora />
      <Fauna />
    </>
  )
}
