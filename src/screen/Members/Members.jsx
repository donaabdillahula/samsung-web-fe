import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { APP_NAVIGATION } from "../../shared/Constants";
import { UseDependency } from "../../shared/hooks/UseDependency";
import { IoCloseOutline } from "react-icons/io5";
import PopUpCreateMember from "./PopUpCreateMember";

const PAGE_SIZE = 10;

const Members = () => {
  const { memberService } = UseDependency();
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [members, setMembers] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  // Popup state
  const [showCreate, setShowCreate] = useState(false);
  const [newMember, setNewMember] = useState({
    name: "",
    email: "",
    phone: "",
  });

  useEffect(() => {
    if (searchValue) {
      // If search value is provided, filter members
      const fetchFilteredMembers = async () => {
        setLoading(true);
        try {
          const response = await memberService.searchMembersByName(page - 1, PAGE_SIZE, searchValue);
          setMembers(response.data || []);
          setTotalPages(response.totalPage || 1);
        } catch (error) {
          console.error("Error fetching filtered members:", error);
          setMembers([]);
          setTotalPages(1);
        } finally {
          setLoading(false);
        }
      };
      fetchFilteredMembers();
    } else {
      const fetchMembers = async () => {
        setLoading(true);
        try {
          const response = await memberService.getAllMembers(page - 1, PAGE_SIZE);
          setMembers(response.data || []);
          setTotalPages(response.totalPage || 1);
        } catch (error) {
          console.error("Error fetching members:", error);
          setMembers([]);
          setTotalPages(1);
        } finally {
          setLoading(false);
        }
      };
      fetchMembers();
    }
  }, [page, searchValue, memberService]);

  // Create member handler
  const handleCreateMember = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await memberService.createNewMember(
        newMember.name,
        newMember.email,
        newMember.phone
      );
      setShowCreate(false);
      setNewMember({ name: "", email: "", phone: "" });
      // Refresh member list
      const response = await memberService.getAllMembers(page - 1, PAGE_SIZE);
      setMembers(response.data || []);
      setTotalPages(response.totalPage || 1);
    } catch (err) {
      alert("Failed to create member, " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-14 mb-12">
      <div className="container">
        {/* header */}
        <div className="w-full mb-10">
          <div className="text-center mb-10 max-w-[600px] mx-auto">
            <h1 className="text-3xl font-bold">Members</h1>
          </div>
          <div className="flex justify-end gap-4 text-gray-600 dark:text-gray-400">
            <input
              type="text"
              placeholder="Search by name"
              className="rounded-full border border-gray-300 dark:border-gray-500 bg-gray-200 dark:bg-gray-700 px-2 py-1"
              onChange={(e) => { setSearchValue(e.target.value) }}
            />
            <button
              className="px-4 py-2 bg-primary text-white rounded-full"
              onClick={() => setShowCreate(true)}
            >
              + Add Member
            </button>
          </div>
        </div>

        {/* Body section */}
        <div>
          {loading ? (
            <div className="text-center py-10">Loading...</div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 place-items-center gap-10">
              {members.map((item) => (
                <div
                  key={item.id}
                  className="w-[170px] h-[100px] flex flex-col justify-center space-y-3 border p-4 rounded-md shadow-md rounded-2xl bg-gray-200 dark:bg-gray-700 hover:bg-primary dark:hover:bg-primary hover:text-white relative shadow-xl duration-high group"
                  onClick={() =>
                    navigate(`${APP_NAVIGATION.MEMBERS}/${item.id}`)
                  }
                >
                  <div>
                    <h3
                      className="font-semibold text-center truncate"
                      title={item.name}
                    >
                      {item.name}
                    </h3>
                    <p
                      className="text-sm text-center truncate"
                      title={item.email}
                    >
                      {item.email}
                    </p>
                    <p
                      className="text-sm text-center truncate"
                      title={item.phone}
                    >
                      {item.phone}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center mt-8 gap-2">
              <button
                className="px-3 py-1 rounded bg-gray-200 dark:bg-gray-700 hover:bg-primary dark:hover:bg-primary hover:text-white"
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
              >
                Prev
              </button>
              {[...Array(totalPages)].map((_, idx) => (
                <button
                  key={idx}
                  className={`px-3 py-1 rounded ${
                    page === idx + 1
                      ? "bg-primary text-white"
                      : "bg-gray-200 dark:bg-gray-700 hover:bg-primary dark:hover:bg-primary hover:text-white"
                  }`}
                  onClick={() => setPage(idx + 1)}
                >
                  {idx + 1}
                </button>
              ))}
              <button
                className="px-3 py-1 rounded bg-gray-200 dark:bg-gray-700 hover:bg-primary dark:hover:bg-primary hover:text-white"
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
              >
                Next
              </button>
            </div>
          )}
        </div>

        {/* Create Member Popup */}
        {showCreate && (
          <PopUpCreateMember
            newMember={newMember}
            setNewMember={setNewMember}
            handleCreateMember={handleCreateMember}
            loading={loading}
            setShowCreate={setShowCreate}
          />
        )}
      </div>
    </div>
  );
};

export default Members;
