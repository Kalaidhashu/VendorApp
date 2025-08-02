'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Home() {
  const [vendors, setVendors] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const vendorsPerPage = 5;
  const router = useRouter();

  useEffect(() => {
    const loggedIn = localStorage.getItem('isLoggedIn');
    if (!loggedIn) {
      router.push('/login'); 
    }

    fetch('/api/vendors')
      .then(res => res.json())
      .then(setVendors);
  }, [router]);

  const deleteVendor = async (id) => {
    if (confirm("Are you sure you want to delete this vendor?")) {
      await fetch(`/api/vendors/${id}`, { method: 'DELETE' });
      setVendors(vendors.filter(v => v._id !== id));
    }
  };

  const indexOfLastVendor = currentPage * vendorsPerPage;
  const indexOfFirstVendor = indexOfLastVendor - vendorsPerPage;
  const currentVendors = vendors.slice(indexOfFirstVendor, indexOfLastVendor);
  const totalPages = Math.ceil(vendors.length / vendorsPerPage);

  const logout = () => {
    localStorage.removeItem('isLoggedIn');
    router.push('/login');
  };

  return (
    <div>
      <h1>Vendor List</h1>
      <button className="LogoutBtn" onClick={logout}>Logout</button>
      <Link href="/add">
        <button className="AddBtn">Add Vendor</button>
      </Link>

      <table className="vendor-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Company</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Address</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentVendors.map(v => (
            <tr key={v._id}>
              <td>{v.name}</td>
              <td>{v.company}</td>
              <td>{v.email}</td>
              <td>{v.phone}</td>
              <td>{v.address}</td>
              <td>
                <Link href={`/edit/${v._id}`}>
                  <button className="Edit">Edit</button>
                </Link>
                <button className="Delete" onClick={() => deleteVendor(v._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="pagination">
        <button disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)}> Prev</button>
        <span> Page {currentPage} of {totalPages} </span>
        <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(currentPage + 1)}>Next</button>
      </div>
    </div>
  );
}
