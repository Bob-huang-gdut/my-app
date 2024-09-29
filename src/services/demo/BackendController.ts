// my-app/src/services/demo/BackendController.ts
/* eslint-disable */
// 该文件由 OneAPI 自动生成，请勿手动修改！
import { request } from '@umijs/max';

/** GET /backend/v1/tea-categories */
export async function queryTeaCategories(
  params: {
    /** category name */
    name?: string;
    /** current page */
    page?: number;
    /** items per page */
    per_page?: number;
  },
  options?: { [key: string]: any },
) {
  return request<API.Result_PageInfo_TeaCategory__>(
    '/backend/v1/tea-categories',
    {
      method: 'GET',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** POST /backend/v1/tea-categories */
export async function createTeaCategory(
  body: {
    /** category name */
    name: string;
    /** category description */
    description: string;
  },
  options?: { [key: string]: any },
) {
  return request<API.Result_TeaCategory__>('/backend/v1/tea-categories', {
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}

/** GET /backend/v1/tea-categories/:id */
export async function getTeaCategory(
  id: number,
  options?: { [key: string]: any },
) {
  return request<API.Result_TeaCategory__>(`/backend/v1/tea-categories/${id}`, {
    method: 'GET',
    ...(options || {}),
  });
}

/** PUT /backend/v1/tea-categories/:id */
export async function updateTeaCategory(
  id: number,
  body: {
    /** category name */
    name: string;
    /** category description */
    description: string;
  },
  options?: { [key: string]: any },
) {
  return request<API.Result_TeaCategory__>(`/backend/v1/tea-categories/${id}`, {
    method: 'PUT',
    data: body,
    ...(options || {}),
  });
}

/** DELETE /backend/v1/tea-categories/:id */
export async function deleteTeaCategory(
  id: number,
  options?: { [key: string]: any },
) {
  return request<API.Result__>(`/backend/v1/tea-categories/${id}`, {
    method: 'DELETE',
    ...(options || {}),
  });
}

/** GET /backend/v1/tea-specifications */
export async function queryTeaSpecifications(
  params: {
    /** specification name */
    name?: string;
    /** category id */
    category_id?: number;
    /** current page */
    page?: number;
    /** items per page */
    per_page?: number;
  },
  options?: { [key: string]: any },
) {
  return request<API.Result_PageInfo_TeaSpecification__>(
    '/backend/v1/tea-specifications',
    {
      method: 'GET',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** POST /backend/v1/tea-specifications */
export async function createTeaSpecification(
  body: {
    /** specification name */
    name: string;
    /** category id */
    category_id: number;
    /** cans per unit */
    cans_per_unit: number;
  },
  options?: { [key: string]: any },
) {
  return request<API.Result_TeaSpecification__>(
    '/backend/v1/tea-specifications',
    {
      method: 'POST',
      data: body,
      ...(options || {}),
    },
  );
}

/** GET /backend/v1/tea-specifications/:id */
export async function getTeaSpecification(
  id: number,
  options?: { [key: string]: any },
) {
  return request<API.Result_TeaSpecification__>(
    `/backend/v1/tea-specifications/${id}`,
    {
      method: 'GET',
      ...(options || {}),
    },
  );
}

/** PUT /backend/v1/tea-specifications/:id */
export async function updateTeaSpecification(
  id: number,
  body: {
    /** specification name */
    name: string;
    /** category id */
    category_id: number;
    /** cans per unit */
    cans_per_unit: number;
  },
  options?: { [key: string]: any },
) {
  return request<API.Result_TeaSpecification__>(
    `/backend/v1/tea-specifications/${id}`,
    {
      method: 'PUT',
      data: body,
      ...(options || {}),
    },
  );
}

/** DELETE /backend/v1/tea-specifications/:id */
export async function deleteTeaSpecification(
  id: number,
  options?: { [key: string]: any },
) {
  return request<API.Result__>(`/backend/v1/tea-specifications/${id}`, {
    method: 'DELETE',
    ...(options || {}),
  });
}

/** POST /backend/v1/tea-inventory/add */
export async function addTeaInventory(
  body: {
    /** specification id */
    specification_id: number;
    /** batch number */
    batch_number: string;
    /** quantity */
    quantity: number;
    /** production date */
    production_date: string;
    /** expiry date */
    expiry_date: string;
  },
  options?: { [key: string]: any },
) {
  return request<API.Result__>('/backend/v1/tea-inventory/add', {
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}

/** POST /backend/v1/tea-cans/print-code */
export async function printTeaCanCode(
  body: {
    /** specification id */
    specification_id: number;
    /** batch number */
    batch_number: string;
    /** quantity */
    quantity: number;
  },
  options?: { [key: string]: any },
) {
  return request<API.Result__>('/backend/v1/tea-cans/print-code', {
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}

/** POST /backend/v1/small-boxes */
export async function createSmallBoxes(
  body: {
    /** quantity */
    quantity: number;
  },
  options?: { [key: string]: any },
) {
  return request<API.Result__>('/backend/v1/small-boxes', {
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}

/** POST /backend/v1/small-boxes/pack */
export async function packSmallBoxes(
  body: {
    /** small box code */
    small_box_code: string;
    /** can codes */
    can_codes: string[];
  },
  options?: { [key: string]: any },
) {
  return request<API.Result__>('/backend/v1/small-boxes/pack', {
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}

/** POST /backend/v1/big-boxes */
export async function createBigBoxes(
  body: {
    /** quantity */
    quantity: number;
  },
  options?: { [key: string]: any },
) {
  return request<API.Result__>('/backend/v1/big-boxes', {
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}

/** POST /backend/v1/big-boxes/pack */
export async function packBigBoxes(
  body: {
    /** big box code */
    big_box_code: string;
    /** small box codes */
    small_box_codes: string[];
  },
  options?: { [key: string]: any },
) {
  return request<API.Result__>('/backend/v1/big-boxes/pack', {
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}

/** PUT /backend/v1/big-boxes/shelf-number */
export async function updateBigBoxShelfNumber(
  body: {
    /** big box code */
    big_box_code: string;
    /** new shelf number */
    shelf_number: string;
  },
  options?: { [key: string]: any },
) {
  return request<API.Result__>('/backend/v1/big-boxes/shelf-number', {
    method: 'PUT',
    data: body,
    ...(options || {}),
  });
}

/** POST /backend/v1/inventory/check-in */
export async function checkInInventory(
  body: {
    /** tea can id */
    tea_can_id: string;
    /** small box id */
    small_box_id: string;
    /** big box id */
    big_box_id: string;
    /** note */
    note?: string;
  },
  options?: { [key: string]: any },
) {
  return request<API.Result__>('/backend/v1/inventory/check-in', {
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}

/** POST /backend/v1/inventory/check-out */
export async function checkOutInventory(
  body: {
    /** tea can id */
    tea_can_id: string;
    /** small box id */
    small_box_id: string;
    /** big box id */
    big_box_id: string;
    /** order id */
    order_id: string;
    /** note */
    note?: string;
  },
  options?: { [key: string]: any },
) {
  return request<API.Result__>('/backend/v1/inventory/check-out', {
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}
