"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

type CurrentUser = {
  name: string;
  email: string;
  role: "customer" | "admin";
};

const categories = ["Tất cả", "Điện tử", "Thời trang", "Gia dụng", "Mỹ phẩm"];

const products = [
  {
    id: 1,
    name: "Tai nghe không dây Pro",
    category: "Điện tử",
    price: "2.490.000đ",
    description: "Âm thanh rõ nét, pin bền và kết nối nhanh.",
    badge: "Mới",
    gradient: "from-cyan-500 to-blue-600",
  },
  {
    id: 2,
    name: "Áo khoác nhẹ mùa thu",
    category: "Thời trang",
    price: "890.000đ",
    description: "Thiết kế thoáng mát, phù hợp nhiều phong cách.",
    badge: "Hot",
    gradient: "from-fuchsia-500 to-rose-500",
  },
  {
    id: 3,
    name: "Máy hút bụi thông minh",
    category: "Gia dụng",
    price: "3.290.000đ",
    description: "Làm sạch hiệu quả với điều khiển qua ứng dụng.",
    badge: "Bán chạy",
    gradient: "from-emerald-500 to-teal-600",
  },
  {
    id: 4,
    name: "Serum dưỡng da vitamin C",
    category: "Mỹ phẩm",
    price: "650.000đ",
    description: "Cung cấp độ sáng và làm dịu da nhanh chóng.",
    badge: "Ưu đãi",
    gradient: "from-amber-500 to-orange-500",
  },
  {
    id: 5,
    name: "Loa bluetooth mini",
    category: "Điện tử",
    price: "1.190.000đ",
    description: "Nhỏ gọn, âm lượng mạnh và dễ mang theo.",
    badge: "Mới",
    gradient: "from-violet-500 to-indigo-600",
  },
  {
    id: 6,
    name: "Túi xách thời trang",
    category: "Thời trang",
    price: "1.350.000đ",
    description: "Phong cách hiện đại, đủ chỗ cho mọi nhu cầu.",
    badge: "Hot",
    gradient: "from-pink-500 to-purple-600",
  },
  {
    id: 7,
    name: "Máy pha cà phê mini",
    category: "Gia dụng",
    price: "2.150.000đ",
    description: "Pha cà phê thơm ngon ngay tại nhà.",
    badge: "Bán chạy",
    gradient: "from-slate-500 to-slate-700",
  },
  {
    id: 8,
    name: "Son tint lâu phai",
    category: "Mỹ phẩm",
    price: "420.000đ",
    description: "Màu sắc rực rỡ, bền màu suốt cả ngày.",
    badge: "Mới",
    gradient: "from-red-500 to-rose-600",
  },
];

const itemsPerPage = 6;

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("Tất cả");
  const [currentPage, setCurrentPage] = useState(1);
  const [user, setUser] = useState<CurrentUser | null>(null);

  const filteredProducts = useMemo(() => {
    const normalizedSearch = searchTerm.toLowerCase();

    return products.filter((product) => {
      const matchesCategory =
        activeCategory === "Tất cả" || product.category === activeCategory;
      const matchesSearch =
        normalizedSearch.length === 0 ||
        product.name.toLowerCase().includes(normalizedSearch) ||
        product.description.toLowerCase().includes(normalizedSearch);

      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchTerm]);

  useEffect(() => {
    setCurrentPage(1);
  }, [activeCategory, searchTerm]);

  useEffect(() => {
    const storedUser = window.localStorage.getItem("auth-current-user");

    if (storedUser) {
      setUser(JSON.parse(storedUser) as CurrentUser);
    } else {
      setUser(null);
    }
  }, []);

  const handleSignOut = () => {
    window.localStorage.removeItem("auth-current-user");
    setUser(null);
  };

  const totalPages = Math.max(
    1,
    Math.ceil(filteredProducts.length / itemsPerPage),
  );
  const startIndex = (currentPage - 1) * itemsPerPage;
  const visibleProducts = filteredProducts.slice(
    startIndex,
    startIndex + itemsPerPage,
  );
  const pageNumbers = Array.from(
    { length: totalPages },
    (_, index) => index + 1,
  );

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(34,211,238,0.18),_transparent_45%),linear-gradient(135deg,_#020617_0%,_#111827_45%,_#0f172a_100%)] text-slate-100">
      <header className="border-b border-white/10 bg-slate-950/70 backdrop-blur">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-cyan-300">
              ShopHub
            </p>
            <h1 className="text-2xl font-semibold text-white">
              Khám phá sản phẩm mới mỗi ngày
            </h1>
          </div>

          <div className="flex flex-1 flex-col gap-3 lg:max-w-2xl lg:flex-row lg:items-center">
            <label className="flex-1">
              <span className="sr-only">Tìm kiếm sản phẩm</span>
              <input
                type="text"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder="Tìm kiếm sản phẩm..."
                className="w-full rounded-2xl border border-white/10 bg-slate-900/80 px-4 py-3 text-sm text-slate-100 outline-none ring-0 transition focus:border-cyan-400"
              />
            </label>
            <div className="flex flex-wrap gap-2">
              {user ? (
                <>
                  <div className="rounded-2xl border border-cyan-500/30 bg-cyan-500/10 px-4 py-3 text-sm text-cyan-200">
                    <p className="font-semibold text-white">{user.name}</p>
                    <p className="text-xs uppercase tracking-[0.25em] text-cyan-300">
                      {user.role === "admin" ? "Admin" : "Customer"}
                    </p>
                  </div>
                  
                  <button
                    type="button"
                    onClick={handleSignOut}
                    className="rounded-2xl border border-slate-700 px-4 py-3 text-sm font-semibold text-slate-200 transition hover:border-cyan-400 hover:text-cyan-300"
                  >
                    Đăng xuất
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/signup"
                    className="rounded-2xl bg-cyan-500 px-4 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400"
                  >
                    Đăng ký
                  </Link>
                  <Link
                    href="/signin"
                    className="rounded-2xl border border-slate-700 px-4 py-3 text-sm font-semibold text-slate-200 transition hover:border-cyan-400 hover:text-cyan-300"
                  >
                    Đăng nhập
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>

        <nav className="mx-auto flex max-w-7xl gap-2 overflow-x-auto px-4 pb-4 sm:px-6 lg:px-8">
          {categories.map((category) => {
            const active = category === activeCategory;

            return (
              <button
                key={category}
                type="button"
                onClick={() => setActiveCategory(category)}
                className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                  active
                    ? "bg-cyan-500 text-slate-950"
                    : "bg-slate-900/70 text-slate-300 hover:bg-slate-800"
                }`}
              >
                {category}
              </button>
            );
          })}
        </nav>
      </header>

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-8 grid gap-6 rounded-[2rem] border border-white/10 bg-white/10 p-6 shadow-2xl shadow-cyan-950/30 backdrop-blur lg:grid-cols-[1.2fr_0.8fr] lg:p-8">
          <div>
            <div>
<p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">
              Ưu đãi mùa hè
            </p>
            <h2 className="mt-3 text-3xl font-semibold text-white sm:text-4xl">
              Mua sắm thông minh với giá tốt và giao hàng nhanh.
            </h2>
            <p className="mt-4 max-w-2xl text-lg text-slate-300">
              Khám phá bộ sưu tập mới, ưu đãi độc quyền và nhiều sản phẩm chất
              lượng được chọn lọc mỗi ngày.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
            </div>
            
              {/* {user ? (
                <>
                  <button
                    type="button"
                    onClick={handleSignOut}
                    className="rounded-2xl border border-white/20 px-5 py-3 text-sm font-semibold text-slate-100 transition hover:border-cyan-400 hover:text-cyan-300"
                  >
                    Đăng xuất
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/signup"
                    className="rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-slate-200"
                  >
                    Tạo tài khoản
                  </Link>
                  <Link
                    href="/signin"
                    className="rounded-2xl border border-white/20 px-5 py-3 text-sm font-semibold text-slate-100 transition hover:border-cyan-400 hover:text-cyan-300"
                  >
                    Đăng nhập ngay
                  </Link>
                </>
              )} */}
            </div>
          </div>

          <div className="rounded-[1.5rem] border border-white/10 bg-slate-950/70 p-5">
            <p className="text-sm font-semibold text-cyan-300">
              Tiêu chí của chúng tôi
            </p>
            <ul className="mt-4 space-y-3 text-sm text-slate-300">
              <li>• Hàng chính hãng với bảo hành rõ ràng.</li>
              <li>• Giao hàng nhanh trong 24 giờ tại nội thành.</li>
              <li>• Hỗ trợ đổi trả linh hoạt trong 7 ngày.</li>
            </ul>
          </div>
        </div>

        <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h3 className="text-2xl font-semibold text-white">
              Danh sách sản phẩm
            </h3>
            <p className="text-sm text-slate-400">
              Hiển thị {filteredProducts.length} sản phẩm phù hợp với tìm kiếm
              của bạn.
            </p>
          </div>
          <p className="text-sm text-slate-400">
            Trang {currentPage}/{totalPages}
          </p>
        </div>

        {visibleProducts.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {visibleProducts.map((product) => (
              <article
                key={product.id}
                className="rounded-[1.5rem] border border-white/10 bg-slate-900/80 p-5 shadow-lg shadow-slate-950/30"
              >
                <div
                  className={`h-32 rounded-[1.1rem] bg-gradient-to-br ${product.gradient}`}
                />
                <div className="mt-4 flex items-center justify-between">
                  <span className="rounded-full bg-cyan-500/15 px-3 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-cyan-300">
                    {product.category}
                  </span>
                  <span className="text-sm text-slate-400">
                    {product.badge}
                  </span>
                </div>
                <h4 className="mt-4 text-xl font-semibold text-white">
                  {product.name}
                </h4>
                <p className="mt-2 text-sm leading-6 text-slate-400">
                  {product.description}
                </p>
                <div className="mt-5 flex items-center justify-between">
                  <span className="text-lg font-semibold text-cyan-300">
                    {product.price}
                  </span>
                  <button
                    type="button"
                    className="rounded-full border border-slate-700 px-3 py-2 text-sm font-medium text-slate-100 transition hover:border-cyan-400 hover:text-cyan-300"
                  >
                    Thêm vào giỏ
                  </button>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="rounded-[1.5rem] border border-dashed border-slate-700 bg-slate-900/60 p-10 text-center text-slate-400">
            Không tìm thấy sản phẩm phù hợp. Hãy thử từ khóa khác.
          </div>
        )}

        {totalPages > 1 && (
          <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
            <button
              type="button"
              onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
              disabled={currentPage === 1}
              className="rounded-full border border-slate-700 px-4 py-2 text-sm font-medium text-slate-200 transition disabled:cursor-not-allowed disabled:opacity-50"
            >
              Trước
            </button>
            {pageNumbers.map((page) => (
              <button
                key={page}
                type="button"
                onClick={() => setCurrentPage(page)}
                className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                  currentPage === page
                    ? "bg-cyan-500 text-slate-950"
                    : "border border-slate-700 text-slate-200 hover:border-cyan-400 hover:text-cyan-300"
                }`}
              >
                {page}
              </button>
            ))}
            <button
              type="button"
              onClick={() =>
                setCurrentPage((page) => Math.min(totalPages, page + 1))
              }
              disabled={currentPage === totalPages}
              className="rounded-full border border-slate-700 px-4 py-2 text-sm font-medium text-slate-200 transition disabled:cursor-not-allowed disabled:opacity-50"
            >
              Sau
            </button>
          </div>
        )}
      </section>
    </main>
  );
}
