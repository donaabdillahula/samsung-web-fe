import React, { useEffect, useState } from "react";
import Hero from "../../components/Hero/Hero";
import TopBooks from "../../components/TopBooks/TopBooks";
import AppStore from "../../components/AppStore/AppStore";
import TopMembers from "../../components/TopMembers/TopMembers";
import About from "../../components/About/About";
import { UseDependency } from "../../shared/hooks/UseDependency";
import BorrowPopup from "../../components/BorrowPopup/BorrowPopup";

const Home = () => {
  const { bookService, memberService, borrowedBookService } = UseDependency();
  const [newestBooks, setNewestBooks] = useState([]);
  const [topBooks, setTopBooks] = useState([]);
  const [topMembers, setTopMembers] = useState([]);
  const [borrowPopup, setBorrowPopup] = useState(false);
  const [selectedBookId, setSelectedBookId] = useState(0);
  const [selectedMemberId, setSelectedMemberId] = useState(0);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [newestBooksRes, topBooksRes, topMembersRes] = await Promise.all([
          bookService.getNewestBooks(0, 3, "AVAILABLE"),
          bookService.getTopBooks(3),
          memberService.getTopMembers(5),
        ]);
        setNewestBooks(newestBooksRes.data || []);
        setTopBooks(topBooksRes.data || []);
        setTopMembers(topMembersRes.data || []);
      } catch (err) {
        console.log("error occur:", err);
        setTopBooks([]);
        setTopMembers([]);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [borrowPopup, bookService, memberService]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <span className="text-lg font-semibold">Loading...</span>
      </div>
    );
  }

  // Create borrowedBook handler
  const handleCreateBorrowedBook = async () => {
    setLoading(true);
    try {
      await borrowedBookService.createNewBorrowedBook(
        { id: Number(selectedMemberId) },
        { id: Number(selectedBookId) }
      );
      setBorrowPopup(false);
      setSelectedMemberId(0);
      setSelectedBookId(0);
    } catch (err) {
      alert("Failed to create borrowed book, " + err.message);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div>
      <Hero
        setSelectedBookId={setSelectedBookId}
        setBorrowPopup={setBorrowPopup}
        newestBooks={newestBooks}
      />
      <TopBooks topBooks={topBooks} />
      <TopMembers topMembers={topMembers} />
      <AppStore />
      <About />
      {borrowPopup && (
        <BorrowPopup
          selectedMemberId={selectedMemberId}
          setSelectedMemberId={setSelectedMemberId}
          setBorrowPopup={setBorrowPopup}
          handleCreateBorrowedBook={handleCreateBorrowedBook}
        />
      )}
    </div>
  );
};

export default Home;
