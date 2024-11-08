export function TableDataWithSequence(data: any[]) {
  data =
    data?.map((attendeeType: any, index: number) => ({
      ...attendeeType,
      seq: index + 1,
    })) ?? [];
  return data;
}
