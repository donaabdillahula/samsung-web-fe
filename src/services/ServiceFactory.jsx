import { AuthorService } from "./AuthorServices"
import { BookService } from "./BookService"
import { BorrowedBookService } from "./BorrowedBookServices"
import { MemberService } from "./MemberServices"

const ServiceFactory = (apiClient) => {
  return {
    // Import all services here
    memberService : MemberService(apiClient),
    authorService : AuthorService(apiClient),
    bookService : BookService(apiClient),
    borrowedBookService : BorrowedBookService(apiClient),
  }
}

export default ServiceFactory