import React, { useEffect, useState } from "react";
import { IoCloseOutline } from "react-icons/io5";
import { UseDependency } from "../../shared/hooks/UseDependency";

const BorrowPopup = ({ borrowPopup, setBorrowPopup, selectedBookId }) => {
  const { memberService, borrowedBookService } = UseDependency();

  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch books for dropdown
  useEffect(() => {
    setLoading(true);
    const fetchMembers = async () => {
      try {
        const response = await memberService.getAllMembers(-1, -1);
        setMembers(response.data || []);
      } catch (err) {
        console.log("errors getAllMembers: ", err);
        setMembers([]);
      }
    };
    fetchMembers();
    setLoading(false);
  }, [borrowPopup, memberService]);

  const [selectedMemberId, setSelectedMemberId] = useState(0);

  // Create borrowedBook handler
  const handleCreateBorrowedBook = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await borrowedBookService.createNewBorrowedBook(
        { id: selectedMemberId },
        { id: selectedBookId }
      );
      setBorrowPopup(false);
      setSelectedMemberId(0);
    } catch (err) {
      alert("Failed to create author, " + err.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      {borrowPopup && (
        <div className="h-screen w-screen fixed top-0 left-0 bg-black/50 z-50 backdrop-blur-sm">
          <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-4 shadow-md bg-white dark:bg-gray-900 rounded-md duration-200 w-[300px]">
            {" "}
            {/* Header */}
            <div className="flex items-center justify-between">
              <div>
                <h1>Borrow Newest Book</h1>
              </div>
              <div>
                <IoCloseOutline
                  className="text-2xl cursor-pointer "
                  onClick={() => setBorrowPopup(false)}
                />
              </div>
            </div>
            {/* Body */}
            <form className="mt-4" onSubmit={handleCreateBorrowedBook}>
              {/* Dropdown Member */}
              <select
                className="w-full rounded-full border border-gray-300 dark:border-gray-500 dark:bg-gray-800 px-2 py-1 mb-3"
                onChange={(e) => setSelectedMemberId(Number(e.target.value))}
                required
              >
                <option value="">Choose Member's Name</option>
                {members.map((member) => (
                  <option key={member.id} value={member.id}>
                    {member.name}
                  </option>
                ))}
              </select>
              <div className="flex justify-center">
                <button
                  type="submit"
                  className="bg-gradient-to-r from-primary to-secondary hover:scale-105 duration-200 text-white py-1 px-4 rounded-full"
                  disabled={loading}
                >
                  {loading ? "Saving..." : "Save"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default BorrowPopup;
