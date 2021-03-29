// success response
export interface DtoSuccessResponse<T> {
  code: '2000';
  data: T;
  message: null | string;
  page?: { count: Number; pageNumber: Number; pageSize: Number; totalPage: Number };
}

// picture response
export interface DtoPicture {}
