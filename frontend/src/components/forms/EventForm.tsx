interface EventFormProps {
  onSubmit: () => void;
}

function EventForm({ onSubmit }: EventFormProps) {
  return (
    <>
      <p>Bu sprintte form sadece görünüm; kayıt yapılmaz.</p>

      <form
        id="etkinlik-formu"
        noValidate
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit();
        }}
      >
        <p>
          <label htmlFor="ad">Etkinlik Adı</label>
          <input
            type="text"
            id="ad"
            name="ad"
            maxLength={80}
            placeholder="Örn. Temel Algoritma Öğrenimi"
          />
        </p>

        <p>
          <label htmlFor="kategori">Kategori</label>
          <select id="kategori" name="kategori" defaultValue="">
            <option value="">Seçiniz</option>
            <option value="Seminer">Seminer</option>
            <option value="Atölye">Atölye</option>
            <option value="Söyleşi">Söyleşi</option>
            <option value="Yarışma">Yarışma</option>
          </select>
        </p>

        <p>
          <label htmlFor="tarih">Tarih</label>
          <input type="date" id="tarih" name="tarih" />
        </p>

        <p>
          <label htmlFor="saat">Saat</label>
          <input type="time" id="saat" name="saat" />
        </p>

        <p>
          <label htmlFor="yer">Yer</label>
          <input
            type="text"
            id="yer"
            name="yer"
            placeholder="Örn. B Blok Konferans Salonu"
          />
        </p>

        <p>
          <label htmlFor="kontenjan">Kontenjan (isteğe bağlı)</label>
          <input
            type="number"
            id="kontenjan"
            name="kontenjan"
            min={1}
            max={1000}
          />
        </p>

        <p>
          <label htmlFor="aciklama">Açıklama</label>
          <textarea id="aciklama" name="aciklama" rows={4} />
        </p>

        <button type="submit">Kaydet</button>
      </form>
    </>
  );
}

export default EventForm;