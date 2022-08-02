import Location from "../schema/LocationSchema";

export async function ordering(postOrder: number) {
  let needUpdate = [],
    isExist: any,
    ordering = postOrder;

  while (isExist !== null) {
    isExist = await Location.findOne({
      ordering: ordering,
    });
    ordering = ordering + 1;
    if (isExist) {
      needUpdate.push({ id: isExist._id, ordering: isExist.ordering });
    }
  }
  if (needUpdate.length) {
    needUpdate.forEach(async (location) => {
      await Location.updateOne(
        { _id: location.id },
        { ordering: location.ordering + 1 }
      );
    });
  }
}
