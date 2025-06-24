import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { UseDependency } from "../../shared/hooks/UseDependency";
import { FormatDate } from "../../utils/TimeFormat";

const AuthorDetail = () => {
  const { authorService } = UseDependency();
  const navigate = useNavigate();
  const { id } = useParams();
  const [author, setAuthor] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState(null);

  useEffect(() => {
    const fetchAuthor = async () => {
      setLoading(true);
      try {
        const response = await authorService.getAuthorById(id);
        setAuthor(response.data || {});
        setForm(response.data || {});
      } catch (error) {
        console.error("Error fetching author:", error);
        setAuthor(null);
        setForm(null)
      } finally {
        setLoading(false);
      }
    };
    fetchAuthor();
  }, [id, editMode, authorService]);

  const handleEdit = () => setEditMode(true);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Ganti dengan API update asli jika sudah ada
      await authorService.updateAuthorById(id, form);
      setAuthor(form);
      setEditMode(false);
      // Optionally fetch again for fresh data
    } catch (error) {
      alert("Failed to update author: " + error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this author?")) {
      setLoading(true);
      try {
        // Ganti dengan API delete asli jika sudah ada
        await authorService.deleteAuthor(id);
        navigate("/authors");
      } catch (error) {
        alert("Failed to delete author: " + error);
      } finally {
        setLoading(false);
      }
    }
  };

  if (!author) {
    return <div className="text-center py-10">Loading...</div>;
  }

  return (
    <div className="min-h-[60vh] flex items-center justify-center py-10">
      <div className="w-full max-w-xl bg-gray-200 dark:bg-gray-700 rounded-2xl shadow-2xl p-8">
        {loading ? (
          <div className="text-center py-10">Loading...</div>
        ) : (
          <div>
            {editMode ? (
              <form onSubmit={handleSave} className="space-y-4">
                <input
                  className="w-full rounded-xl border border-gray-300 dark:border-gray-500 bg-grey-300 dark:bg-gray-600 p-2"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Name"
                  required
                />
                <input
                  className="w-full rounded-xl border border-gray-300 dark:border-gray-500 bg-grey-300 dark:bg-gray-600 p-2"
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  placeholder="Description"
                  required
                />
                <div className="flex gap-2 mt-4 justify-end">
                  <button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full font-semibold"
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-full font-semibold"
                    onClick={() => setEditMode(false)}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            ) : (
              <>
                <h2 className="text-3xl font-bold mb-4 text-center">
                  {author.name}
                </h2>
                <div className="mb-4">
                  <p className="text-gray-700 dark:text-gray-300 mb-2">
                    <span className="font-semibold">Description:</span> {author.description}
                  </p>
                  <p className="text-gray-700 dark:text-gray-300 mb-2">
                    <span className="font-semibold">Created At:</span> {FormatDate(author.createdAt)}
                  </p>
                  <p className="text-gray-700 dark:text-gray-300 mb-2">
                    <span className="font-semibold">Updated At:</span> {FormatDate(author.updatedAt)}
                  </p>
                </div>
                <div className="flex gap-2 mt-6 justify-end">
                  <button
                    className="bg-yellow-400 hover:bg-yellow-500 text-white px-4 py-2 rounded-full font-semibold"
                    onClick={handleEdit}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-full font-semibold"
                    onClick={handleDelete}
                  >
                    Delete
                  </button>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AuthorDetail;
