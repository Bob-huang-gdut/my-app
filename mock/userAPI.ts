import { Random } from 'mockjs';

// 模拟茶叶分类数据
const teaCategories = [
  { id: 1, name: '绿茶', description: '清香型茶叶，富含茶多酚' },
  { id: 2, name: '红茶', description: '醇厚回甘，温和不伤胃' },
  { id: 3, name: '乌龙茶', description: '介于绿茶与红茶之间的半发酵茶' },
  { id: 4, name: '白茶', description: '清淡雅致，滋味甘醇' },
  { id: 5, name: '普洱茶', description: '越陈越香，具有独特的陈香' },
];

// 模拟茶叶规格数据
const teaSpecifications = [
  {
    id: 1,
    name: '特级',
    category_id: 1,
    category_name: '绿茶',
    cans_per_unit: 12,
    total_units: 100,
  },
  {
    id: 2,
    name: '一级',
    category_id: 1,
    category_name: '绿茶',
    cans_per_unit: 24,
    total_units: 200,
  },
  {
    id: 3,
    name: '特级',
    category_id: 2,
    category_name: '红茶',
    cans_per_unit: 12,
    total_units: 150,
  },
  {
    id: 4,
    name: '一级',
    category_id: 3,
    category_name: '乌龙茶',
    cans_per_unit: 18,
    total_units: 180,
  },
  {
    id: 5,
    name: '精选',
    category_id: 4,
    category_name: '白茶',
    cans_per_unit: 6,
    total_units: 50,
  },
];

// 导出默认的 API 模拟
export default {
  // 茶叶分类 CRUD 接口
  'GET /backend/v1/tea-categories': (req: any, res: any) => {
    const { name, page = 1, per_page = 15 } = req.query; // 获取查询参数
    let filteredCategories = teaCategories; // 默认所有分类
    if (name) {
      // 根据名称过滤分类
      filteredCategories = teaCategories.filter((cat) =>
        cat.name.includes(name),
      );
    }
    const start = (page - 1) * per_page; // 计算分页起始位置
    const end = start + per_page; // 计算分页结束位置
    res.json({
      code: 0,
      msg: 'success',
      data: {
        current_page: page,
        data: filteredCategories.slice(start, end).map((cat) => ({
          ...cat,
          created_at: Random.datetime(), // 随机生成创建时间
          updated_at: Random.datetime(), // 随机生成更新时间
        })),
        total: filteredCategories.length, // 总分类数量
        per_page: per_page, // 每页分类数量
      },
    });
  },

  // 创建茶叶分类
  'POST /backend/v1/tea-categories': (req: any, res: any) => {
    const { name, description } = req.body; // 获取请求体参数
    const newCategory = {
      id: teaCategories.length + 1, // 新分类 ID
      name,
      description,
      created_at: new Date().toISOString(), // 当前时间
      updated_at: new Date().toISOString(), // 当前时间
    };
    teaCategories.push(newCategory); // 添加新分类
    res.json({
      code: 0,
      msg: 'success',
      data: newCategory, // 返回新分类数据
    });
  },

  // 获取单个茶叶分类
  'GET /backend/v1/tea-categories/:id': (req: any, res: any) => {
    const { id } = req.params; // 获取路径参数
    const category = teaCategories.find((cat) => cat.id === parseInt(id)); // 查找分类
    if (category) {
      res.json({
        code: 0,
        msg: 'success',
        data: {
          ...category,
          created_at: Random.datetime(), // 随机生成创建时间
          updated_at: Random.datetime(), // 随机生成更新时间
        },
      });
    } else {
      res.status(404).json({
        code: 1,
        msg: 'Category not found', // 分类未找到
        data: null,
      });
    }
  },

  // 更新茶叶分类
  'PUT /backend/v1/tea-categories/:id': (req: any, res: any) => {
    const { id } = req.params; // 获取路径参数
    const { name, description } = req.body; // 获取请求体参数
    const index = teaCategories.findIndex((cat) => cat.id === parseInt(id)); // 查找分类索引
    if (index !== -1) {
      // 更新分类信息
      teaCategories[index] = {
        ...teaCategories[index],
        name,
        description,
        updated_at: new Date().toISOString(),
      };
      res.json({
        code: 0,
        msg: 'success',
        data: teaCategories[index], // 返回更新后的分类数据
      });
    } else {
      res.status(404).json({
        code: 1,
        msg: 'Category not found', // 分类未找到
        data: null,
      });
    }
  },

  // 删除茶叶分类
  'DELETE /backend/v1/tea-categories/:id': (req: any, res: any) => {
    const { id } = req.params; // 获取路径参数
    const index = teaCategories.findIndex((cat) => cat.id === parseInt(id)); // 查找分类索引
    if (index !== -1) {
      teaCategories.splice(index, 1); // 删除分类
      res.json({
        code: 0,
        msg: 'success', // 删除成功
        data: {},
      });
    } else {
      res.status(404).json({
        code: 1,
        msg: 'Category not found', // 分类未找到
        data: null,
      });
    }
  },

  // 茶叶规格 CRUD 接口
  'GET /backend/v1/tea-specifications': (req: any, res: any) => {
    const { name, category_id, page = 1, per_page = 15 } = req.query; // 获取查询参数
    let filteredSpecs = teaSpecifications; // 默认所有规格
    if (name) {
      // 根据名称过滤规格
      filteredSpecs = filteredSpecs.filter((spec) => spec.name.includes(name));
    }
    if (category_id) {
      // 根据分类 ID 过滤规格
      filteredSpecs = filteredSpecs.filter(
        (spec) => spec.category_id === parseInt(category_id),
      );
    }
    const start = (page - 1) * per_page; // 计算分页起始位置
    const end = start + per_page; // 计算分页结束位置
    res.json({
      code: 0,
      msg: 'success',
      data: {
        current_page: page,
        data: filteredSpecs.slice(start, end).map((spec) => ({
          ...spec,
          created_at: Random.datetime(), // 随机生成创建时间
          updated_at: Random.datetime(), // 随机生成更新时间
        })),
        total: filteredSpecs.length, // 总规格数量
        per_page: per_page, // 每页规格数量
      },
    });
  },

  // 创建茶叶规格
  'POST /backend/v1/tea-specifications': (req: any, res: any) => {
    const { name, category_id, cans_per_unit } = req.body; // 获取请求体参数
    const category = teaCategories.find((cat) => cat.id === category_id); // 查找分类
    if (!category) {
      return res.status(400).json({
        code: 1,
        msg: 'Invalid category_id', // 分类 ID 无效
        data: null,
      });
    }
    const newSpec = {
      id: teaSpecifications.length + 1, // 新规格 ID
      name,
      category_id,
      category_name: category.name,
      cans_per_unit,
      total_units: 0, // 初始总单位数为 0
      created_at: new Date().toISOString(), // 当前时间
      updated_at: new Date().toISOString(), // 当前时间
    };
    teaSpecifications.push(newSpec); // 添加新规格
    res.json({
      code: 0,
      msg: 'success',
      data: newSpec, // 返回新规格数据
    });
  },

  // 获取单个茶叶规格
  'GET /backend/v1/tea-specifications/:id': (req: any, res: any) => {
    const { id } = req.params; // 获取路径参数
    const spec = teaSpecifications.find((s) => s.id === parseInt(id)); // 查找规格
    if (spec) {
      res.json({
        code: 0,
        msg: 'success',
        data: {
          ...spec,
          created_at: Random.datetime(), // 随机生成创建时间
          updated_at: Random.datetime(), // 随机生成更新时间
        },
      });
    } else {
      res.status(404).json({
        code: 1,
        msg: 'Specification not found', // 规格未找到
        data: null,
      });
    }
  },

  // 更新茶叶规格
  'PUT /backend/v1/tea-specifications/:id': (req: any, res: any) => {
    const { id } = req.params; // 获取路径参数
    const { name, category_id, cans_per_unit } = req.body; // 获取请求体参数
    const index = teaSpecifications.findIndex((s) => s.id === parseInt(id)); // 查找规格索引
    if (index !== -1) {
      // 更新规格信息
      const updatedSpec = {
        ...teaSpecifications[index],
        name,
        category_id,
        cans_per_unit,
        updated_at: new Date().toISOString(),
      };
      teaSpecifications[index] = updatedSpec;
      res.json({
        code: 0,
        msg: 'success',
        data: updatedSpec, // 返回更新后的规格数据
      });
    } else {
      res.status(404).json({
        code: 1,
        msg: 'Specification not found', // 规格未找到
        data: null,
      });
    }
  },

  // 删除茶叶规格
  'DELETE /backend/v1/tea-specifications/:id': (req: any, res: any) => {
    const { id } = req.params; // 获取路径参数
    const index = teaSpecifications.findIndex((s) => s.id === parseInt(id)); // 查找规格索引
    if (index !== -1) {
      teaSpecifications.splice(index, 1); // 删除规格
      res.json({
        code: 0,
        msg: 'success', // 删除成功
        data: {},
      });
    } else {
      res.status(404).json({
        code: 1,
        msg: 'Specification not found', // 规格未找到
        data: null,
      });
    }
  },

  // 茶叶库存添加
  'POST /backend/v1/tea-inventory/add': (req: any, res: any) => {
    const {
      specification_id,
      batch_number,
      quantity,
      production_date,
      expiry_date,
    } = req.body; // 获取请求体参数
    const spec = teaSpecifications.find((s) => s.id === specification_id); // 查找规格
    if (!spec) {
      return res.status(400).json({
        code: 1,
        msg: 'Invalid specification_id', // 规格 ID 无效
        data: null,
      });
    }
    spec.total_units += quantity; // 更新总单位数
    res.json({
      code: 0,
      msg: 'success',
      data: {
        specification_id,
        batch_number,
        quantity,
        production_date,
        expiry_date,
        current_total_units: spec.total_units, // 返回当前总单位数
      },
    });
  },

  // 小罐茶编码打印
  'POST /backend/v1/tea-cans/print-code': (req: any, res: any) => {
    const { specification_id, batch_number, quantity } = req.body; // 获取请求体参数
    const codes = Array.from(
      { length: quantity },
      (_, i) => `${batch_number}${String(i + 1).padStart(6, '0')}`, // 生成编码
    );
    res.json({
      code: 0,
      msg: 'success',
      data: {
        specification_id,
        batch_number,
        quantity,
        codes,
        count: codes.length, // 返回生成的编码数量
      },
    });
  },

  // 小箱操作
  'POST /backend/v1/small-boxes': (req: any, res: any) => {
    const { quantity } = req.body; // 获取请求体参数
    const box_codes = Array.from(
      { length: quantity },
      (_, i) => `SB${String(i + 1).padStart(5, '0')}`, // 生成小箱编码
    );
    res.json({
      code: 0,
      msg: 'success',
      data: {
        box_codes,
        count: box_codes.length, // 返回生成的小箱数量
      },
    });
  },
  'POST /backend/v1/small-boxes/pack': (req: any, res: any) => {
    const { small_box_code, can_codes } = req.body; // 获取请求体参数
    res.json({
      code: 0,
      msg: 'success',
      data: {
        small_box_code,
        packed_cans: can_codes.length, // 返回打包的罐子数量
      },
    });
  },

  // 大箱操作
  'POST /backend/v1/big-boxes': (req: any, res: any) => {
    const { quantity } = req.body; // 获取请求体参数
    const box_codes = Array.from(
      { length: quantity },
      (_, i) => `BB${String(i + 1).padStart(5, '0')}`, // 生成大箱编码
    );
    res.json({
      code: 0,
      msg: 'success',
      data: {
        box_codes,
        count: box_codes.length, // 返回生成的大箱数量
      },
    });
  },
  'POST /backend/v1/big-boxes/pack': (req: any, res: any) => {
    const { big_box_code, small_box_codes } = req.body; // 获取请求体参数
    res.json({
      code: 0,
      msg: 'success',
      data: {
        big_box_code,
        packed_small_boxes: small_box_codes.length, // 返回打包的小箱数量
      },
    });
  },
  'PUT /backend/v1/big-boxes/shelf-number': (req: any, res: any) => {
    const { big_box_code, shelf_number } = req.body; // 获取请求体参数
    res.json({
      code: 0,
      msg: 'success',
      data: {
        big_box_code,
        new_shelf_number: shelf_number, // 返回新的货架号
      },
    });
  },

  // 库存操作
  'POST /backend/v1/inventory/check-in': (req: any, res: any) => {
    const { tea_can_id, small_box_id, big_box_id, note } = req.body; // 获取请求体参数
    res.json({
      code: 0,
      msg: 'success',
      data: {
        check_in_id: Random.guid(), // 生成入库 ID
        tea_can_id,
        small_box_id,
        big_box_id,
        note,
        check_in_time: new Date().toISOString(), // 当前时间
      },
    });
  },
  'POST /backend/v1/inventory/check-out': (req: any, res: any) => {
    const { tea_can_id, small_box_id, big_box_id, order_id, note } = req.body; // 获取请求体参数
    res.json({
      code: 0,
      msg: 'success',
      data: {
        check_out_id: Random.guid(), // 生成出库 ID
        tea_can_id,
        small_box_id,
        big_box_id,
        order_id,
        note,
        check_out_time: new Date().toISOString(), // 当前时间
      },
    });
  },
};
