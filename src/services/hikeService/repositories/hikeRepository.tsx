export interface HikeRepository {
  getHikes: (page: number, pageSize: number) => Promise<any[]>;
  getHikeById: (id: string) => Promise<any>;
  searchHikes: (keyword: string) => Promise<any>;
}
