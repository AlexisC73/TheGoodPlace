import { BooksFetcherProvider } from "@/application/catalog/contexts/getForSaleBooks";
import BookPage from "@/presentation/pages/ForSaleBookPage/BookPage";

export default function Home() {
  return (
    <BooksFetcherProvider>
      <BookPage bookId="" />
    </BooksFetcherProvider>
  );
}
