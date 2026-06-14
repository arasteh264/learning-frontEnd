export function mapCourseToCardProps(course: any) {
  const discount = course.discount ?? 0;
  const price = course.price ?? 0;
  const oldPrice = discount > 0 ? Math.round(price / (1 - discount / 100)) : price;

  return {
    title: course.name,
    href: course.href,
    image: course.cover,
    description: course.description,
    author: {
      name: course.teachers?.bio || "بدون مدرس",
      avatar: course.teachers?.avatar || "/images/default-avatar.png",
    },
    rating: course.teachers?.rating ?? 0,
    students: course.students_count ?? 0,
    price,
    oldPrice,
    discount,
  };
}