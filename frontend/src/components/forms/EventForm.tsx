import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import type {
  Category,
  EventFormData,
  EventFormErrors,
} from "../../types/campus-event";
import { validateEvent } from "../../utils/validate-event";

const CATEGORIES: Category[] = ["Seminer", "Atölye", "Söyleşi", "Yarışma"];

interface EventFormProps {
  initialData: EventFormData;
  submitText: string;
  onSubmit: (data: EventFormData) => void;
}

function EventForm({ initialData, submitText, onSubmit }: EventFormProps) {
  const [data, setData] = useState<EventFormData>(initialData);
  const [errors, setErrors] = useState<EventFormErrors>({});

  function handleChange(
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) {
    setData({ ...data, [e.target.name]: e.target.value });
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const found = validateEvent(data);
    setErrors(found);
    if (Object.keys(found).length === 0) {
      onSubmit(data);
    }
  }

  return (
    <form id="etkinlik-formu" noValidate onSubmit={handleSubmit}>
      <p>
        <label htmlFor="title">Etkinlik Adı</label>
        <input
          type="text"
          id="title"
          name="title"
          maxLength={100}
          placeholder="Örn. Temel Algoritma Öğrenimi"
          value={data.title}
          onChange={handleChange}
          aria-invalid={errors.title ? true : undefined}
        />
        <span className="hata">{errors.title}</span>
      </p>

      <p>
        <label htmlFor="category">Kategori</label>
        <select
          id="category"
          name="category"
          value={data.category}
          onChange={handleChange}
          aria-invalid={errors.category ? true : undefined}
        >
          <option value="">Seçiniz</option>
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
        <span className="hata">{errors.category}</span>
      </p>

      <p>
        <label htmlFor="date">Tarih</label>
        <input
          type="date"
          id="date"
          name="date"
          value={data.date}
          onChange={handleChange}
          aria-invalid={errors.date ? true : undefined}
        />
        <span className="hata">{errors.date}</span>
      </p>

      <p>
        <label htmlFor="time">Saat</label>
        <input
          type="time"
          id="time"
          name="time"
          value={data.time}
          onChange={handleChange}
          aria-invalid={errors.time ? true : undefined}
        />
        <span className="hata">{errors.time}</span>
      </p>

      <p>
        <label htmlFor="location">Yer</label>
        <input
          type="text"
          id="location"
          name="location"
          placeholder="Örn. B Blok Konferans Salonu"
          value={data.location}
          onChange={handleChange}
          aria-invalid={errors.location ? true : undefined}
        />
        <span className="hata">{errors.location}</span>
      </p>

      <p>
        <label htmlFor="capacity">Kontenjan</label>
        <input
          type="number"
          id="capacity"
          name="capacity"
          min={1}
          max={1000}
          value={data.capacity}
          onChange={handleChange}
          aria-invalid={errors.capacity ? true : undefined}
        />
        <span className="hata">{errors.capacity}</span>
      </p>

      <p>
        <label htmlFor="description">Açıklama</label>
        <textarea
          id="description"
          name="description"
          rows={4}
          value={data.description}
          onChange={handleChange}
          aria-invalid={errors.description ? true : undefined}
        />
        <span className="hata">{errors.description}</span>
      </p>

      <button type="submit">{submitText}</button>
    </form>
  );
}

export default EventForm;