import {
  ModalForm,
  PageContainer,
  ProFormDatePicker,
} from '@ant-design/pro-components';
import { Button, Form, message, Transfer, TransferProps } from 'antd';
import { FormInstance } from 'antd/lib';
import { useRef, useState } from 'react';
import './index.less';

interface RecordType {
  key: string;
  title: string;
  description: string;
}

// 假设的数据源
const orderDatas = Array.from({ length: 20 }).map<RecordType>((_, i) => ({
  key: i.toString(),
  title: `订单${i + 1}`,
  description: `description of content${i + 1}`,
}));

const HomePage: React.FC = () => {
  // 测试数据
  const [modalVisible, setModalVisible] = useState(false);
  const [targetKeys, setTargetKeys] = useState<TransferProps['targetKeys']>([]);
  const [selectedKeys, setSelectedKeys] = useState<TransferProps['targetKeys']>(
    [],
  );
  const formRef = useRef<FormInstance>();
  const onChange: TransferProps['onChange'] = (
    nextTargetKeys,
    direction,
    moveKeys,
  ) => {
    formRef.current?.setFieldValue('orderDatas', moveKeys);
    setTargetKeys(nextTargetKeys);
  };

  const onSelectChange: TransferProps['onSelectChange'] = (
    sourceSelectedKeys,
    targetSelectedKeys,
  ) => {
    console.log('sourceSelectedKeys:', sourceSelectedKeys);
    console.log('targetSelectedKeys:', targetSelectedKeys);
    setSelectedKeys([...sourceSelectedKeys, ...targetSelectedKeys]);
  };

  return (
    <PageContainer>
      <Button type="primary" onClick={() => setModalVisible(true)}>
        打开报价汇总表单
      </Button>
      <ModalForm
        title="汇总报价"
        open={modalVisible}
        formRef={formRef}
        onFinish={async (values: any) => {
          const targetOrderDatas = (targetKeys || []).map((key) =>
            orderDatas.find((item) => item.key === key),
          );
          const query = {
            month: values.month,
            orderDatas,
            targetOrderDatas: targetOrderDatas,
          };
          console.log('Success %c⧭', 'color: #aa00ff', query);
          message.success('提交成功');
          setModalVisible(false);
        }}
        onOpenChange={(visible) => {
          setModalVisible(visible);
          if (!visible) {
            // 重置表单
            setTargetKeys([]);
            setSelectedKeys([]);
          }
        }}
        modalProps={{ destroyOnClose: true }}
      >
        <ProFormDatePicker.Month
          name="month"
          label="汇总月份"
          placeholder="请选择月份"
          rules={[{ required: true, message: '请选择月份' }]}
        />
        <Form.Item
          name="orderDatas"
          label="订单数据"
          rules={[{ required: true, message: '请选择订单' }]}
        >
          <Transfer
            dataSource={orderDatas}
            titles={['报价单', 'AC Sterilization']}
            targetKeys={targetKeys}
            selectedKeys={selectedKeys}
            onChange={onChange}
            onSelectChange={onSelectChange}
            render={(item) => item.title}
            oneWay
            showSearch
            pagination
          />
        </Form.Item>
      </ModalForm>
    </PageContainer>
  );
};

export default HomePage;
