import React from 'react';

const CardsSection = () => {
  return (
    <section className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
      <div className="bg-white shadow-md rounded-lg p-4 text-center">
        <img src="/rafiki-dark.png" alt="Translate" className="mx-auto h-16" />
        <h3 className="text-xl font-semibold">ترجمه AI</h3>
        <p className="text-gray-600">توضیح کوتاه در مورد ترجمه با هوش مصنوعی.</p>
      </div>
      <div className="bg-white shadow-md rounded-lg p-4 text-center">
        <img src="/rafiki-dark.png" alt="AI Caption" className="mx-auto h-16" />
        <h3 className="text-xl font-semibold">کپشن AI</h3>
        <p className="text-gray-600">توضیح کوتاه در مورد تولید کپشن.</p>
      </div>
      <div className="bg-white shadow-md rounded-lg p-4 text-center">
        <img src="/rafiki-dark.png" alt="AI Vision" className="mx-auto h-16" />
        <h3 className="text-xl font-semibold">بینایی AI</h3>
        <p className="text-gray-600">توضیح کوتاه در مورد بینایی کامپیوتری.</p>
      </div>
    </section>
  );
};

export default CardsSection;