export function TableDataWithSequence(data: any[]) {
  if (!Array.isArray(data)) {
    return [];
  }
  data =
    data.map((e: any, index: number) => {
      if (!e._id) {
        e._id = Math.random().toString();
      }
      return {
        ...e,
        seq: index + 1,
      };
    }) ?? [];
  return data;
}
