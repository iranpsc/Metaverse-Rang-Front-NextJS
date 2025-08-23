import React from 'react';
import Image from 'next/image';

const ListingsGrid = () => {
  const listings = [
    { id: 1, img: '/rafiki-dark.png', title: 'خانه لوکس ۱', desc: 'توضیح کوتاه', price: '۱۲۰ میلیون' },
    { id: 2, img: '/rafiki-dark.png', title: 'خانه لوکس ۲', desc: 'توضیح کوتاه', price: '۱۵۰ میلیون' },
    { id: 3, img: '/rafiki-dark.png', title: 'خانه لوکس ۲', desc: 'توضیح کوتاه', price: '111 میلیون' },
    { id: 4, img: '/rafiki-dark.png', title: 'خانه لوکس ۲', desc: 'توضیح کوتاه', price: '222 میلیون' },
    { id: 5, img: '/rafiki-dark.png', title: 'خانه لوکس ۲', desc: 'توضیح کوتاه', price: '۱333۵۰ میلیون' },
    // بقیه آیتم‌ها رو اضافه کن (از تصویر حدود ۶ تا هست)
  ];

  return (
    <section className="grid gap-4  w-full">
      {listings.map((item) => (
        <div key={item.id} className="bg-white shadow-lg rounded-xl overflow-hidden w-full flex flex-col ">
          <div className='h-36 overflow-hidden aspect-video p-3'><Image src={item.img} alt={item.title} width={300} height={144} className="w-full h-full object-cover object-center rounded-xl" /></div>
          <div className="p-4 text-right">
            <h3 className="text-lg font-semibold">{item.title}</h3>
            <p className="text-gray-600">{item.desc}</p>
            <p className="text-blue-500 font-bold">{item.price}</p>
          </div>
        </div>
      ))}
    </section>
  );
};

export default ListingsGrid;