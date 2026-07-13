'use client';
import { useState } from 'react';
import { translations, Lang } from '@/lib/translations';

export default function ContactForm({ lang }: { lang: Lang }) {
  const t = translations[lang].contact;
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const update = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    setMessage('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          message: form.message,
        }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(data.error || 'Failed to send email');
      }

      setStatus('success');
      setForm({ name: '', email: '', message: '' });
      setMessage(t.success);
    } catch (err) {
      console.error('Contact form error:', err);
      setStatus('error');
      setMessage(err instanceof Error ? err.message : t.error);
    }
  };

  return (
    <form className="contact-form" onSubmit={submit}>
      <div className="form-group">
        <label htmlFor="name">{t.name}</label>
        <input
          id="name" name="name" type="text" required
          placeholder="Aime Divin"
          value={form.name} onChange={update}
        />
      </div>
      <div className="form-group">
        <label htmlFor="email">{t.email}</label>
        <input
          id="email" name="email" type="email" required
          placeholder="you@example.com"
          value={form.email} onChange={update}
        />
      </div>
      <div className="form-group">
        <label htmlFor="message">{t.message}</label>
        <textarea
          id="message" name="message" required
          placeholder="Tell me about your project…"
          value={form.message} onChange={update}
        />
      </div>

      {status === 'success' && message && <p className="form-status success">{message}</p>}
      {status === 'error' && message && <p className="form-status error">{message}</p>}

      <button
        type="submit"
        className="btn btn-primary"
        disabled={status === 'sending'}
        style={{ alignSelf: 'flex-start' }}
      >
        {status === 'sending' ? t.sending : t.send}
      </button>
    </form>
  );
}
