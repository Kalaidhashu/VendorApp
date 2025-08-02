'use client';
import { useRouter } from 'next/navigation';

export default function AddPage() {
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.target));
    await fetch('/api/vendors', {
      method: 'POST',
      body: JSON.stringify(data),
    });
    router.push('/');
  };

  return (
    <form onSubmit={handleSubmit}>
    
      <h2>Add Vendor</h2>
      <input name="name" placeholder="Name" required />
      <input name="company" placeholder="Company" required />
      <input name="email" type="email" placeholder="Email" required />
      <input name="phone" placeholder="Phone" required />
      <input name="address" placeholder="Address" required />
      <button type="submit">Add</button>

    </form>
  );
}
