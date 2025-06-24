import { useEffect } from "react";
import { APP_NAVIGATION } from "../shared/Constants";
import AOS from "aos";
import Home from "../screen/Home/Home";
import Books from "../screen/Books/Books";
import Authors from "../screen/Authors/Authors";
import BorrowedBooks from "../screen/BorrowedBooks/BorrowedBooks";
import { ScrollToTop } from "../utils/ScrollToTop";
import { Route, Routes } from "react-router-dom";
import AppLayout from "../components/AppLayout/AppLayout";
import BookDetail from "../screen/Books/BookDetail";
import Members from "../screen/Members/Members";
import MemberDetail from "../screen/Members/MemberDetail";
import AuthorDetail from "../screen/Authors/AuthorDetail";
import BorrowedBookDetail from "../screen/BorrowedBooks/BorrowedBookDetail";


export const AppRouter = () => {
  useEffect(() => {
    AOS.init({
      offset: 100,
      duration: 800,
      easing: "ease-in-sine",
      delay: 100,
    });
    AOS.refresh();
  }, []);

  return (
    <div>
      <ScrollToTop />
        <Routes>
            <Route path={APP_NAVIGATION.HOME} element={<AppLayout />}>
              <Route path={APP_NAVIGATION.HOME} element={<Home />} />
              <Route path={APP_NAVIGATION.BOOKS} element={<Books />} />
              <Route path={APP_NAVIGATION.BOOKS_DETAIL} element={<BookDetail />} />
              <Route path={APP_NAVIGATION.AUTHORS} element={<Authors />} />
              <Route path={APP_NAVIGATION.AUTHOR_DETAIL} element={<AuthorDetail />} />
              <Route path={APP_NAVIGATION.MEMBERS} element={<Members />} />
              <Route path={APP_NAVIGATION.MEMBER_DETAIL} element={<MemberDetail />} />
              <Route path={APP_NAVIGATION.BORROWED_BOOKS} element={<BorrowedBooks />} />
              <Route path={APP_NAVIGATION.BORROWED_BOOK_DETAIL} element={<BorrowedBookDetail />} />
            </Route>
        </Routes>
    </div>
  )
}
