/* eslint-disable */
// 该文件由 OneAPI 自动生成，请勿手动修改！

declare namespace API {
  // my-app/src/services/demo/BackendController.ts
  // ... existing code ...

  // 定义 API.Result__ 接口
  interface Result__ {
    success: boolean;
    message?: string;
    data?: any; // 根据需要调整类型
  }

  interface Result_TeaCategory__ {
    success: boolean;
    message?: string;
    data?: TeaCategory; // 根据需要调整类型
  }

  interface Result_TeaSpecification__ {
    success: boolean;
    message?: string;
    data?: TeaSpecification; // 根据需要调整类型
  }

  // 定义 API.Result_PageInfo_TeaCategory__ 接口
  interface Result_PageInfo_TeaCategory__ {
    success: boolean;
    message?: string;
    data?: {
      total: number;
      items: TeaCategory[];
    };
  }

  // 定义 TeaCategory 接口
  interface TeaCategory {}

  // 定义 API.Result_PageInfo_TeaSpecification__ 接口
  interface Result_PageInfo_TeaSpecification__ {
    success: boolean;
    message?: string;
    data?: {
      total: number;
      items: TeaSpecification[];
    };
  }

  // 定义 TeaSpecification 接口
  interface TeaSpecification {
    id: number;
    name: string;
    category_id: number;
    cans_per_unit: number;
  }

  // ... existing code ...
}
