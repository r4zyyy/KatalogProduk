export default function TentangPage() {
  return (
    <article className="about-page">
      <header className="page-header">
        <p className="label-caps">Informasi Proyek</p>
        <h1 className="page-title">Tentang</h1>
        <p className="page-subtitle">
          Tugas kuliah React Routing, State Management, Data Fetching, dan Application Architecture.
        </p>
      </header>

      <div className="about-grid">
        <section className="about-block">
          <h2 className="section-title">Arsitektur Aplikasi</h2>
          <p className="about-text">
            Aplikasi ini memisahkan lapisan tampilan (components dan pages), logika penggunaan ulang (hooks dan context), utilitas (utils), serta akses jaringan (services). Seluruh permintaan ke DummyJSON API dipusatkan di productService dan dikonsumsi melalui custom hook useFetch dengan AbortController.
          </p>
        </section>

        <section className="about-block">
          <h2 className="section-title">Identitas Mahasiswa</h2>
          <table className="spec-table">
            <tbody>
              <tr>
                <th scope="row">Nama</th>
                <td>Muhammad Ramdhan Al Qusyairi</td>
              </tr>
              <tr>
                <th scope="row">NIM</th>
                <td className="price-num">1247050121</td>
              </tr>
              <tr>
                <th scope="row">Sumber Data</th>
                <td>DummyJSON Products API</td>
              </tr>
              <tr>
                <th scope="row">Routing</th>
                <td>HashRouter (React Router)</td>
              </tr>
            </tbody>
          </table>
        </section>
      </div>
    </article>
  );
}
