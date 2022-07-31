import Category from "../schema/CategorySchema";

export async function ordering(postOrder: number) {
  let needUpdate = [],
    isExist: any,
    ordering = postOrder;

  while (isExist !== null) {
    isExist = await Category.findOne({
      ordering: ordering,
    });
    ordering = ordering + 1;
    if (isExist) {
      needUpdate.push({ id: isExist._id, ordering: isExist.ordering });
    }
  }
  if (needUpdate.length) {
    needUpdate.forEach(async (category) => {
      await Category.updateOne(
        { _id: category.id },
        { ordering: category.ordering + 1 }
      );
    });
  }
}
