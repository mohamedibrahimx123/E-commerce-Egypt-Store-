import React, { useState, useEffect } from "react";
import {
  ShoppingBag,
  TrendingUp,
  Star,
  ArrowRight,
  Zap,
  Shield,
  Truck,
  Heart,
  Loader2,
} from "lucide-react";

export default function Home() {
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    try {
      setLoading(true);

      const categoriesRes = await fetch(
        "https://ecommerce.routemisr.com/api/v1/categories"
      );
      const categoriesData = await categoriesRes.json();
      setCategories(categoriesData.data?.slice(0, 6) || []);

      const brandsRes = await fetch(
        "https://ecommerce.routemisr.com/api/v1/brands"
      );
      const brandsData = await brandsRes.json();
      setBrands(brandsData.data?.slice(0, 6) || []);

      const productsRes = await fetch(
        "https://ecommerce.routemisr.com/api/v1/products"
      );
      const productsData = await productsRes.json();
      setProducts(productsData.data?.slice(0, 8) || []);

      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  const features = [
    { icon: Truck, title: "Free Shipping", desc: "On orders over $50" },
    { icon: Shield, title: "Secure Payment", desc: "100% protected" },
    { icon: Zap, title: "Fast Delivery", desc: "2-3 business days" },
    { icon: Star, title: "Best Quality", desc: "Guaranteed products" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-6 py-16">
          <div className="max-w-3xl">
            <h1 className="text-5xl font-bold mb-4">
              Welcome to SmartShop
            </h1>
            <p className="text-xl mb-8 text-blue-100">
              Discover SmartShop products at unbeatable prices.
            </p>
            <div className="flex gap-4">
              <a
                href="/products"
                className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold flex items-center gap-2"
              >
                <ShoppingBag className="w-5 h-5" />
                Shop Now
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Loading */}
      {loading ? (
        <div className="container mx-auto px-6 py-20 text-center">
          <Loader2 className="w-12 h-12 text-blue-600 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading...</p>
        </div>
      ) : (
        <>
          {/* Features */}
          <div className="container mx-auto px-6 -mt-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {features.map((feature, idx) => (
                <div
                  key={idx}
                  className="bg-white p-6 rounded-xl shadow-lg flex gap-4"
                >
                  <feature.icon className="w-6 h-6 text-blue-600" />
                  <div>
                    <h3 className="font-semibold">{feature.title}</h3>
                    <p className="text-sm text-gray-600">{feature.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="container mx-auto px-6 py-12">
            {/* Categories */}
            <section className="mb-16">
              <h2 className="text-3xl font-bold mb-6">
                Shop by Category
              </h2>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {categories.map((category) => (
                  <a
                    key={category._id}
                    href={`/categories/`}
                    className="bg-white rounded-xl shadow-md hover:shadow-xl overflow-hidden"
                  >
                    <img
                      src={category.image}
                      alt={category.name}
                      className="h-40 w-full object-cover"
                    />
                    <p className="text-center font-semibold py-3">
                      {category.name}
                    </p>
                  </a>
                ))}
              </div>
            </section>

            {/* Brands */}
            <section className="mb-16">
              <h2 className="text-3xl font-bold mb-6">
                Popular Brands
              </h2>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {brands.map((brand) => (
                  <a
                    key={brand._id}
                    href={`/brands/`}
                    className="bg-white rounded-xl shadow-md p-6 text-center"
                  >
                    <img
                      src={brand.image}
                      alt={brand.name}
                      className="h-20 mx-auto mb-3 object-contain"
                    />
                    <p className="font-semibold">{brand.name}</p>
                  </a>
                ))}
              </div>
            </section>

            {/* Products */}
            <section>
              <h2 className="text-3xl font-bold mb-6 flex items-center gap-2">
                <TrendingUp className="text-blue-600" />
                Featured Products
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {products.map((product) => (
                  <div
                    key={product._id}
                    className="bg-white rounded-xl shadow-md overflow-hidden"
                  >
                    <img
                      src={product.imageCover}
                      alt={product.title}
                      className="h-56 w-full object-cover"
                    />

                    <div className="p-4">
                      <h3 className="font-semibold mb-2 line-clamp-2">
                        {product.title}
                      </h3>

                      <div className="flex items-center gap-1 mb-2">
                        <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                        <span>{product.ratingsAverage}</span>
                      </div>

                      <div className="flex justify-between items-center">
                        <span className="font-bold">
                          {product.price} EGP
                        </span>
                        <a
                          href={`/products/`}
                          className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm"
                        >
                          View
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </>
      )}
    </div>
  );
}
