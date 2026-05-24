'use client';
import { useState, useEffect } from 'react';
import emailjs from '@emailjs/browser';
import { translations, Lang } from '@/lib/translations';

export default function ContactForm({ lang }: { lang: Lang }) {
  const t = translations[lang].contact;
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  // Initialize EmailJS
  useEffect(() => {
    emailjs.init(process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || '');
  }, []);

  const update = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    try {
      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || '',
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || '',
        {
          to_email: 'aimedivinchristian@gmail.com',
          from_name: form.name,
          from_email: form.email,
          message: form.message,
        }
      );
      setStatus('success');
      setForm({ name: '', email: '', message: '' });
    } catch (err) {
      console.error('EmailJS error:', err);
      setStatus('error');
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

      {status === 'success' && <p className="form-status success">{t.success}</p>}
      {status === 'error' && <p className="form-status error">{t.error}</p>}

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
