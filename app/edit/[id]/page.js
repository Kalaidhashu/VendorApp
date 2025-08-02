'use client';
import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';

export default function EditPage() {
  const router = useRouter();
  const { id } = useParams();
  const [vendor, setVendor] = useState(null);

  useEffect(() => {
    fetch('/api/vendors')
      .then(res => res.json())
      .then(data => {
        const v = data.find(v => v._id === id);
        if (v) setVendor(v);
      });
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.target));
    await fetch(`/api/vendors/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
    router.push('/');
  };

  if (!vendor) return <p>Loading...</p>;

  return (
    <form onSubmit={handleSubmit}>
      <h2>Edit Vendor</h2>
      <input name="name" defaultValue={vendor.name} required />
      <input name="company" defaultValue={vendor.company} required />
      <input name="email" defaultValue={vendor.email} required />
      <input name="phone" defaultValue={vendor.phone} required />
      <input name="address" defaultValue={vendor.address} required />
      <button type="submit">Update</button>
    </form>
  );
}
