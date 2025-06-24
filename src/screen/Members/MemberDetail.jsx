import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { UseDependency } from "../../shared/hooks/UseDependency";
import { FormatDate } from "../../utils/TimeFormat";
import { APP_NAVIGATION } from "../../shared/Constants";

const MemberDetail = () => {
  const { memberService } = UseDependency();
  const navigate = useNavigate();
  const { id } = useParams();
  const [member, setMember] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState(null);

  useEffect(() => {
    const fetchMember = async () => {
      setLoading(true);
      try {
        const response = await memberService.getMemberById(id);
        setMember(response.data || {});
        setForm(response.data || {});
      } catch (error) {
        console.error("Error fetching member:", error);
        setMember(null);
        setForm(null)
      } finally {
        setLoading(false);
      }
    };
    fetchMember();
  }, [id, editMode, memberService]);

  const handleEdit = () => setEditMode(true);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await memberService.updateMemberById(id, form);
      setMember(form);
      setEditMode(false);
    } catch (error) {
      alert("Failed to update member: " + error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this member?")) {
      setLoading(true);
      try {
        await memberService.deleteMember(id);
        navigate(APP_NAVIGATION.MEMBERS);
      } catch (error) {
        console.log("Failed to delete member: "+ error.errorMessage);
        alert("Cannot delete member: borrowed books data exist. Remove related records first.");
      } finally {
        setLoading(false);
        navigate(APP_NAVIGATION.MEMBERS);
      }
    }
  };

  if (!member) {
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
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Email"
                  required
                />
                <input
                  className="w-full rounded-xl border border-gray-300 dark:border-gray-500 bg-grey-300 dark:bg-gray-600 p-2"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="Phone"
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
                  {member.name}
                </h2>
                <div className="mb-4">
                  <p className="text-gray-700 dark:text-gray-300 mb-2">
                    <span className="font-semibold">Email:</span> {member.email}
                  </p>
                  <p className="text-gray-700 dark:text-gray-300 mb-2">
                    <span className="font-semibold">Phone:</span> {member.phone}
                  </p>
                  <p className="text-gray-700 dark:text-gray-300 mb-2">
                    <span className="font-semibold">Created At:</span> {FormatDate(member.createdAt)}
                  </p>
                  <p className="text-gray-700 dark:text-gray-300 mb-2">
                    <span className="font-semibold">Updated At:</span> {FormatDate(member.updatedAt)}
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

export default MemberDetail;
