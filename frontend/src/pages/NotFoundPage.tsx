import { Link } from "react-router-dom";

function NotFoundPage() {
  return (
    <>
      <h2>Sayfa bulunamadı</h2>
      <div className="hata-kutusu">
        <p>Aradığın sayfa ya da etkinlik yok.</p>
        <Link to="/">← Ana sayfaya dön</Link>
      </div>
    </>
  );
}

export default NotFoundPage;