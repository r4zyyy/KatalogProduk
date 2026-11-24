import { Outlet } from 'react-router-dom';

// Layout pembungkus untuk rute bersarang /produk dan /produk/:id
export default function ProdukLayout() {
  return <Outlet />;
}
